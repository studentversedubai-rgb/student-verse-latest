/**
 * Backend API Service
 * 
 * Communicates with the real backend API.
 * Frontend trusts backend responses completely - NO client-side business logic.
 */

import { API_CONFIG } from '../config/api';
import storage from '../utils/storage';

// ============================================================================
// Types - Match backend response structure EXACTLY
// ============================================================================

export interface BackendUserData {
    referralCode: string;
    referralCount: number;
    waitlistPosition: number;
}

export interface VerifyOTPResponse {
    ok: boolean;
    action: 'signup' | 'login' | 'verified';
    message: string;
    data?: BackendUserData;
}

// ============================================================================
// Storage Keys
// ============================================================================

const STORAGE_KEYS = {
    USER_EMAIL: 'sv_user_email',
    USER_DATA: 'sv_user_data',
} as const;

// ============================================================================
// API Methods
// ============================================================================

/**
 * Verify OTP - Returns user data from backend
 * Frontend stores and displays this data as-is
 */
export const verifyOTP = async (email: string, otp: string): Promise<VerifyOTPResponse> => {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH_VERIFY_OTP}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to verify OTP');
        }

        // Store user data from backend response
        if (data.ok && data.data) {
            storage.set(STORAGE_KEYS.USER_EMAIL, email);
            storage.set(STORAGE_KEYS.USER_DATA, data.data);
        }

        return {
            ok: data.ok,
            action: data.action,
            message: data.message,
            data: data.data,
        };
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw error;
    }
};

/**
 * Get stored user data (from previous OTP verification)
 */
export const getStoredUserData = (): { email: string; data: BackendUserData } | null => {
    const email = storage.get<string>(STORAGE_KEYS.USER_EMAIL);
    const data = storage.get<BackendUserData>(STORAGE_KEYS.USER_DATA);

    if (!email || !data) {
        return null;
    }

    return { email, data };
};

/**
 * Clear all user data (logout)
 */
export const clearUserData = (): void => {
    storage.remove(STORAGE_KEYS.USER_EMAIL);
    storage.remove(STORAGE_KEYS.USER_DATA);
};

export default {
    verifyOTP,
    getStoredUserData,
    clearUserData,
};
