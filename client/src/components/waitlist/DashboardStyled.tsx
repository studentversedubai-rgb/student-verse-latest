import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Home, ChevronLeft, RefreshCw } from "lucide-react";
import { StudentVerseLogo } from "./Logo";
import BentoDashboard from "./design/BentoDashboard";
import type { User, QueueStats, ReferralStats } from "../../services/api";

interface DashboardStyledProps {
    user: User;
    onLogout: () => void;
    onRefresh: () => Promise<void>;
    queueStats: QueueStats;
    referralStats: ReferralStats;
}

const DashboardStyled = React.memo(function DashboardStyled({
    user,
    onLogout,
    onRefresh,
    queueStats,
    referralStats
}: DashboardStyledProps) {
    const totalUsers = Math.max(queueStats.position + 500, 1000);
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleHomeClick = useCallback(() => navigate('/'), [navigate]);

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await onRefresh();
        } finally {
            setIsRefreshing(false);
        }
    }, [onRefresh]);

    // Fix body styles that might prevent scrolling
    useEffect(() => {
        // Reset body styles that EmailVerificationStyled might have set
        document.body.style.height = '';
        document.body.style.overflow = '';
        document.body.style.margin = '';
        document.body.style.padding = '';

        return () => {
            // Cleanup if needed
        };
    }, []);

    // Scroll event listener
    useEffect(() => {
        let rafId: number;

        const handleScroll = () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }

            rafId = requestAnimationFrame(() => {
                const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
                setIsScrolled(scrollY > 30);
            });
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="min-h-screen relative pb-16 bg-black">

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
                {/* Dynamic Glass Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]" />

                {/* Desktop Layout */}
                <div className="hidden sm:block relative px-4 py-4 sm:px-6">
                    {/* Top row - Home and Logout buttons */}
                    <div className="flex items-center justify-between ">
                        {/* Left: Home Button - moves down when scrolled */}
                        <motion.button
                            onClick={handleHomeClick}
                            className="pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-white/80 hover:text-white transition-all border border-white/10 text-xs backdrop-blur-xl bg-white/5 hover:bg-white/10 hover:border-azure/30"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                y: isScrolled ? 120 : 0
                            }}
                            transition={{
                                opacity: { delay: 0.3, duration: 0.3 },
                                x: { delay: 0.3, duration: 0.3 },
                                y: { duration: 0.4, ease: "easeInOut" }
                            }}
                            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(41, 98, 255, 0.2)" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                        </motion.button>

                        {/* Right: Refresh and Logout Buttons */}
                        <div className="flex items-center gap-2">
                            <motion.button
                                onClick={handleRefresh}
                                disabled={isRefreshing}
                                className="pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-white/80 hover:text-azure transition-all border border-white/10 text-xs backdrop-blur-xl bg-white/5 hover:bg-azure/10 hover:border-azure/30 group disabled:opacity-50"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                                <span>Refresh</span>
                            </motion.button>

                            <motion.button
                                onClick={onLogout}
                                className="pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-white/80 hover:text-red-300 transition-all border border-white/10 text-xs backdrop-blur-xl bg-white/5 hover:bg-red-500/10 hover:border-red-400/30 group"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <LogOut className="w-4 h-4 group-hover:text-red-400 transition-colors" />
                                <span>Logout</span>
                            </motion.button>
                        </div>
                    </div>

                    {/* Logo and Waitlist Active - stacked and move to left side */}
                    <motion.div
                        className="absolute left-1/2 top-4 flex flex-col items-center gap-3 pt-2"
                        initial={{ x: '-50%' }}
                        animate={{
                            x: isScrolled ? 'calc(-50vw + 20px)' : '-50%',
                            y: 0,
                            alignItems: isScrolled ? 'flex-start' : 'center'
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                    >
                        {/* Logo */}
                        <div className="pointer-events-auto">
                            <StudentVerseLogo />
                        </div>

                        {/* Waitlist Active Status */}
                        <div className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            <span className="text-xs font-mono text-white/80 tracking-wide uppercase whitespace-nowrap">
                                Waitlist Active
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile Layout */}
                <div className="sm:hidden relative px-4 py-4">
                    <div className="flex items-center justify-between mb-4 relative">
                        <motion.button
                            onClick={handleHomeClick}
                            className="pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-white/80 hover:text-white transition-all border border-white/10 text-xs backdrop-blur-xl bg-white/5 hover:bg-white/10 hover:border-azure/30"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <Home className="w-4 h-4" />
                        </motion.button>

                        {/* Centered Logo */}
                        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
                            <StudentVerseLogo />
                        </div>

                        <div className="flex items-center gap-1">
                            <motion.button
                                onClick={handleRefresh}
                                disabled={isRefreshing}
                                className="pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-white/80 hover:text-azure transition-all border border-white/10 text-xs backdrop-blur-xl bg-white/5 hover:bg-azure/10 hover:border-azure/30 disabled:opacity-50"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            </motion.button>

                            <motion.button
                                onClick={onLogout}
                                className="pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-white/80 hover:text-red-300 transition-all border border-white/10 text-xs backdrop-blur-xl bg-white/5 hover:bg-red-500/10 hover:border-red-400/30 group"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <LogOut className="w-4 h-4 group-hover:text-red-400 transition-colors" />
                            </motion.button>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            <span className="text-xs font-mono text-white/80 tracking-wide uppercase">
                                Waitlist Active
                            </span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main content with proper top padding */}
            <motion.div
                className="pt-20 sm:pt-18 px-4 sm:px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <BentoDashboard
                    queuePosition={queueStats.position}
                    totalUsers={totalUsers}
                    referralStats={referralStats}
                    referralCode={referralStats.code}
                />
            </motion.div>
        </div>
    );
});

export default DashboardStyled;
