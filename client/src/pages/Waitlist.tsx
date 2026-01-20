import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import EmailVerificationStyled from "../components/waitlist/EmailVerificationStyled";
import DashboardStyled from "../components/waitlist/DashboardStyled";

const WaitlistContent: React.FC = () => {
    const {
        user,
        queueStats,
        referralStats,
        isAuthenticated,
        login,
        logout,
        refreshData,
    } = useAuth();
    const [searchParams] = useSearchParams();
    const [referralFromUrl, setReferralFromUrl] = useState<string | null>(null);

    // Get referral code from URL on mount
    useEffect(() => {
        const ref = searchParams.get('ref');
        if (ref) {
            setReferralFromUrl(ref.toUpperCase());
        }
    }, [searchParams]);

    const handleVerificationSuccess = async (
        email: string,
        referralCode: string | null
    ) => {
        // Use URL referral code if no code provided in form
        const codeToUse = referralCode || referralFromUrl;
        await login(email, codeToUse);
    };

    // Show dashboard if authenticated
    if (
        isAuthenticated &&
        user &&
        queueStats &&
        referralStats
    ) {
        return (
            <DashboardStyled
                user={user}
                onLogout={logout}
                onRefresh={refreshData}
                queueStats={queueStats}
                referralStats={referralStats}
            />
        );
    }

    // Show email verification page
    return (
        <EmailVerificationStyled
            onVerificationSuccess={handleVerificationSuccess}
        />
    );
};

export default function WaitlistPage() {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-navy m-0 p-0" style={{ paddingTop: 0, marginTop: 0 }}>
                <WaitlistContent />
            </div>
        </AuthProvider>
    )
}
