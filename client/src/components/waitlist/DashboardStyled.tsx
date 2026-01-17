import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Home, ChevronLeft } from "lucide-react";
import VelocityWeave from "./design/VelocityWeave";
import { StudentVerseLogo } from "./Logo";
import BentoDashboard from "./design/BentoDashboard";
import type { User, QueueStats, ReferralStats } from "../../services/api";

interface DashboardStyledProps {
    user: User;
    onLogout: () => void;
    queueStats: QueueStats;
    referralStats: ReferralStats;
}

const DashboardStyled = React.memo(function DashboardStyled({
    user,
    onLogout,
    queueStats,
    referralStats
}: DashboardStyledProps) {
    // Calculate total users using original logic to ensure valid numbers
    const totalUsers = Math.max(queueStats.position + 500, 1000);

    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    const handleHomeClick = useCallback(() => navigate('/'), [navigate]);

    // Scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 30);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden pb-16 bg-black">
            <VelocityWeave variant="dual" />
            
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

                        {/* Right: Logout Button */}
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

                    {/* Logo and Waitlist Active - stacked and move to left side */}
                    <motion.div
                        className="absolute left-1/2 top-4 flex flex-col gap-3 pt-2 "
                        animate={{
                            x: isScrolled ? 'calc(-50vw + 20px)' : '-50%',
                            y: 0,
                            alignItems: isScrolled ? 'flex-start' : 'center',
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                        style={{
                            alignItems: isScrolled ? 'flex-start' : 'center'
                        }}
                    >
                        {/* Logo */}
                        <div className="pointer-events-auto">
                            <StudentVerseLogo />
                        </div>

                        {/* Waitlist Active Status */}
                        <div className="pointer-events-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md" >
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            <span className="text-xs font-mono text-white/80 tracking-wide uppercase whitespace-nowrap">
                                Waitlist Active
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile Layout - unchanged */}
                <div className="sm:hidden relative px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
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

                        <div className="pointer-events-auto">
                            <StudentVerseLogo />
                        </div>

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

                    <div className="flex justify-center">
                        <div className="pointer-events-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
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
                className="pt-30 sm:pt-21 px-4 sm:px-6"
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
