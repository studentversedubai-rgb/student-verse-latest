"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import storage from '../utils/storage';

// ============================================================================
// Types - Match backend response structure
// ============================================================================

export interface BackendUserData {
    referralCode: string;
    referralCount: number;
    waitlistPosition: number;
}

export interface User {
    email: string;
    referralCode: string;
    referralCount: number;
    waitlistPosition: number;
}

export interface QueueStats {
    position: number;
    total: number;
    referralCount: number;
}

export interface ReferralStats {
    code: string;
    count: number;
    users: Array<{
        email: string;
        joinedAt: number;
    }>;
}

interface AuthContextType {
    user: User | null;
    queueStats: QueueStats | null;
    referralStats: ReferralStats | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, referralCode: string | null) => Promise<void>;
    logout: () => void;
    refreshData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

// ============================================================================
// Storage Keys
// ============================================================================

const STORAGE_KEYS = {
    USER_EMAIL: 'sv_user_email',
    USER_DATA: 'sv_user_data',
} as const;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [queueStats, setQueueStats] = useState<QueueStats | null>(null);
    const [referralStats, setReferralStats] = useState<ReferralStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user data from backend response (stored after OTP verification)
    const loadUserFromStorage = useCallback(() => {
        try {
            const email = storage.get<string>(STORAGE_KEYS.USER_EMAIL);
            const data = storage.get<BackendUserData>(STORAGE_KEYS.USER_DATA);

            if (!email || !data) {
                return null;
            }

            // Transform backend data to User format
            const user: User = {
                email,
                referralCode: data.referralCode,
                referralCount: data.referralCount,
                waitlistPosition: data.waitlistPosition,
            };

            return user;
        } catch (error) {
            console.error('Error loading user from storage:', error);
            return null;
        }
    }, []);

    // Transform User data to QueueStats and ReferralStats for display
    const transformUserData = useCallback((user: User) => {
        // Display offset - makes it appear like there are already 2791 people in queue
        // Backend stores real position (1, 2, 3...), frontend displays with offset
        const DISPLAY_OFFSET = 2791;

        // Queue stats - add display offset to position
        const queueStats: QueueStats = {
            position: user.waitlistPosition + DISPLAY_OFFSET, // e.g., position 1 displays as 2792
            total: user.waitlistPosition + DISPLAY_OFFSET + 1000, // Placeholder total
            referralCount: user.referralCount,
        };

        // Referral stats
        const referralStats: ReferralStats = {
            code: user.referralCode,
            count: user.referralCount,
            users: [], // Backend doesn't provide individual referral users
        };

        return { queueStats, referralStats };
    }, []);

    // Check for existing session on mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                const storedUser = loadUserFromStorage();
                if (storedUser) {
                    setUser(storedUser);
                    const { queueStats, referralStats } = transformUserData(storedUser);
                    setQueueStats(queueStats);
                    setReferralStats(referralStats);
                }
            } catch (error) {
                console.error('Error checking session:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, [loadUserFromStorage, transformUserData]);

    // Login is called after successful OTP verification
    // Data is already stored by verificationApi.verifyOTP
    // This function just loads it from storage and sets state
    const login = async (email: string, referralCode: string | null) => {
        console.log('🔐 Login called with:', { email, referralCode });
        setIsLoading(true);
        try {
            // Small delay to ensure localStorage write is complete
            await new Promise(resolve => setTimeout(resolve, 100));

            console.log('📦 Loading user data from localStorage...');

            // Load data that was stored by verifyOTP
            const storedUser = loadUserFromStorage();

            console.log('📦 Loaded user data:', storedUser);

            if (storedUser) {
                setUser(storedUser);
                const { queueStats, referralStats } = transformUserData(storedUser);
                setQueueStats(queueStats);
                setReferralStats(referralStats);
                console.log('✅ Login successful - user data set');
            } else {
                // This shouldn't happen if OTP verification was successful
                console.error('❌ No user data found after OTP verification');
                console.log('📦 localStorage contents:', {
                    sv_user_email: storage.get('sv_user_email'),
                    sv_user_data: storage.get('sv_user_data'),
                });
                throw new Error('No user data found. Please try again.');
            }
        } catch (error) {
            console.error('❌ Error during login:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        storage.remove(STORAGE_KEYS.USER_EMAIL);
        storage.remove(STORAGE_KEYS.USER_DATA);
        setUser(null);
        setQueueStats(null);
        setReferralStats(null);
    };

    const refreshData = async () => {
        // Backend data is one-time only, no refresh endpoint
        // Just reload from storage
        if (user) {
            const storedUser = loadUserFromStorage();
            if (storedUser) {
                setUser(storedUser);
                const { queueStats, referralStats } = transformUserData(storedUser);
                setQueueStats(queueStats);
                setReferralStats(referralStats);
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                queueStats,
                referralStats,
                isLoading,
                isAuthenticated: !!user,
                login,
                logout,
                refreshData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
