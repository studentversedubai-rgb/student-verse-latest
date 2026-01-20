"use client";

import React, { memo, useCallback, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Copy, Check, Crown, Sparkles, Rocket, Lock } from "lucide-react";
import RadarVisual from "./RadarVisual";
import ChipSlots from "./ChipSlots";
import QueueVisualization from "../QueueVisualization";
import HolographicPlanet from "./HolographicPlanet";
import type { ReferralStats } from "../../../services/api";

interface BentoDashboardProps {
    queuePosition: number;
    totalUsers?: number;
    referralStats: ReferralStats;
    referralCode: string;
}

// Stagger animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

// Memoized BentoCard component with animated gradient border (same as EmailVerificationStyled)
const BentoCard = memo(({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`relative rounded-3xl overflow-visible ${className}`}
        >
            {/* Animated gradient border orbit - same as EmailVerificationStyled */}
            <div className="absolute -inset-[2px] rounded-3xl opacity-80">
                <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                        background: "linear-gradient(90deg, #8B5CF6 0%, #EC4899 18%, #FB923C 35%, #3B82F6 52%, #06B6D4 68%, #FB923C 85%, #8B5CF6 100%)",
                        backgroundSize: "300% 300%"
                    }}
                    animate={{
                        backgroundPosition: ["0% 50%", "300% 50%"]
                    }}
                    transition={{
                        duration: 4,
                        ease: "linear",
                        repeat: Infinity
                    }}
                />
                {/* Soft multi-color glow effect */}
                <div className="absolute inset-0 rounded-3xl blur-lg" style={{
                    background: "linear-gradient(90deg, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.4) 20%, rgba(251, 146, 60, 0.35) 40%, rgba(59, 130, 246, 0.4) 60%, rgba(251, 146, 60, 0.35) 80%, rgba(139, 92, 246, 0.4) 100%)"
                }} />
            </div>

            {/* Card content with black background */}
            <div className="relative bg-black rounded-3xl border-2 border-transparent p-5 sm:p-6 lg:p-8 z-10">
                {children}
            </div>
        </motion.div>
    );
});
BentoCard.displayName = "BentoCard";

// Social link component with animated RGB border
const SocialLink = memo(({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-16 h-16 sm:w-17 sm:h-17 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
        whileHover={{
            scale: 1.1,
        }}
        whileTap={{ scale: 0.95 }}
        aria-label={label}
    >
        {/* Animated gradient border orbit */}
        <div className="absolute -inset-[2px] rounded-full opacity-80">
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background: "linear-gradient(90deg, #8B5CF6 0%, #EC4899 18%, #FB923C 35%, #3B82F6 52%, #06B6D4 68%, #FB923C 85%, #8B5CF6 100%)",
                    backgroundSize: "300% 300%"
                }}
                animate={{
                    backgroundPosition: ["0% 50%", "300% 50%"]
                }}
                transition={{
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity
                }}
            />
            {/* Soft multi-color glow effect */}
            <div className="absolute inset-0 rounded-full blur-md" style={{
                background: "linear-gradient(90deg, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.4) 20%, rgba(251, 146, 60, 0.35) 40%, rgba(59, 130, 246, 0.4) 60%, rgba(251, 146, 60, 0.35) 80%, rgba(139, 92, 246, 0.4) 100%)"
            }} />
        </div>

        {/* Icon container with black background */}
        <div className="relative bg-black rounded-full w-full h-full flex items-center justify-center border-2 border-transparent z-10">
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-110" />
        </div>

        {/* Hover ripple effect */}
        <motion.div
            className="absolute inset-0 rounded-full bg-azure/20"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.4 }}
        />
    </motion.a>
));
SocialLink.displayName = "SocialLink";

// Instagram icon
const InstagramIcon = () => (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

// LinkedIn icon
const LinkedInIcon = () => (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

// X icon
const XIcon = () => (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export default function BentoDashboard({ queuePosition, totalUsers = 1000, referralStats, referralCode }: BentoDashboardProps) {
    const [copied, setCopied] = useState(false);

    // Determine PRO status based on referral count
    const isPro = referralStats.count >= 5 || referralStats.rewardStatus === 'unlocked';
    
    // Generate dynamic chip labels based on referral count
    const chipLabels = Array.from({ length: 5 }, (_, i) => {
        if (i < referralStats.count) {
            return `REFERRAL ${i + 1}`;
        }
        return 'LOCKED';
    });

    const handleCopyLink = useCallback(() => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [referralCode]);

    const handleSocialShare = useCallback((platform: string) => {
        const shareMessage = `🎓 Join me on StudentVerse - the ultimate student platform! 

Get exclusive discounts, connect with fellow students, and never pay full price again! 

Use my referral code: ${referralCode}

Join the waitlist: https://studentverse.ae/waitlist

#StudentVerse #StudentLife #Discounts`;

        const encodedMessage = encodeURIComponent(shareMessage);
        const encodedUrl = encodeURIComponent('https://studentverse.ae/waitlist');

        switch (platform) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
                break;
            case 'instagram':
                // Instagram doesn't support direct sharing with text, so copy to clipboard
                navigator.clipboard.writeText(shareMessage);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
                // Open Instagram
                window.open('https://instagram.com', '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodedMessage}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(shareMessage);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                break;
            default:
                break;
        }
    }, [referralCode]);

    return (
        <motion.div
            id="sv_bento-dashboard"
            className="min-h-screen flex items-start justify-center px-0 pt-0 pb-6 relative"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-6xl w-full relative z-10 px-4 sm:px-6">
                {/* Main Grid - Proper Bento Layout with Better Mobile Spacing */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-3">

                    {/* Top Left: Queue Position - Slightly reduced width */}
                    <BentoCard className="lg:col-span-3 min-h-[280px] lg:min-h-[240px]">
                        <div className="h-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
                            {/* Queue Position Content */}
                            <div className="flex-1 text-center lg:text-left lg:pl-8">
                                <motion.p
                                    className="text-gray-400 mb-3 font-mono text-xs sm:text-sm uppercase tracking-[0.2em]"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Queue Position
                                </motion.p>

                                {/* Animated Queue Number */}
                                <motion.div
                                    className="relative"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
                                >
                                    <motion.span
                                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black font-display block"
                                        style={{
                                            background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            filter: "drop-shadow(0 0 30px rgba(59, 130, 246, 0.5))",
                                        }}
                                        animate={{
                                            filter: [
                                                "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))",
                                                "drop-shadow(0 0 40px rgba(59, 130, 246, 0.6))",
                                                "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))",
                                            ]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        #{queuePosition.toLocaleString()}
                                    </motion.span>
                                </motion.div>
                            </div>

                            {/* Radar Visual */}
                            <motion.div
                                className="flex justify-center lg:justify-end flex-shrink-0"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <RadarVisual
                                    size="lg"
                                    blips={[
                                        { x: 25, y: 30, color: "#03d0e6", id: "target-1" },
                                        { x: 70, y: 45, color: "#03d0e6", id: "target-2" },
                                        { x: 45, y: 65, color: "#03d0e6", id: "target-3" },
                                        { x: 80, y: 70, color: "#03d0e6", id: "target-4" },
                                        { x: 15, y: 75, color: "#03d0e6", id: "target-5" }
                                    ]}
                                    scanning={true}
                                />
                            </motion.div>
                        </div>
                    </BentoCard>

                    {/* Top Right: Pro Membership Unlock - Slightly increased width */}
                    <BentoCard className="lg:col-span-2 min-h-[280px] lg:min-h-[240px]">
                        <motion.div
                            className="h-full flex flex-col justify-between"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Crown className="w-5 h-5 text-gold" />
                                    <h3 className="font-display text-lg sm:text-xl font-bold text-white">UNLOCK PRO</h3>
                                </div>

                                <p className="text-gray-400 mb-5 text-sm leading-relaxed">
                                    Refer <span className="text-gold font-semibold">5 students</span> to unlock
                                    <span className="text-cyan font-semibold"> 1 month free</span> SV Pro membership
                                </p>

                                <ChipSlots
                                    total={5}
                                    filled={referralStats.count}
                                    labels={chipLabels}
                                />

                                {/* Progress indicator */}
                                <div className="mt-5 mb-4">
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-gray-500">Progress</span>
                                        <span className="text-gold font-mono">{referralStats.count}/5</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-linear-to-r from-gold to-orange-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(referralStats.count / 5) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mt-auto"
                                animate={isPro ? {} : { opacity: [0.7, 1, 0.7] }}
                                transition={isPro ? {} : { duration: 2, repeat: Infinity }}
                            >
                                {isPro ? (
                                    <>
                                        <Crown className="w-4 h-4 text-gold" />
                                        <span className="text-gold">PRO STATUS: UNLOCKED</span>
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-4 h-4 text-gold" />
                                        <span className="text-gold">PRO STATUS: LOCKED</span>
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    </BentoCard>

                    {/* Bottom: SV Orbit AI (Full width) - Clean Desktop Layout */}
                    <BentoCard className="lg:col-span-5 min-h-[180px]">
                        <div className="relative h-full">
                            {/* Background Gradient */}
                            <div className="absolute inset-0 rounded-3xl" />
                            
                            {/* Main Content */}
                            <div className="relative z-10 h-full flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                                
                                {/* Left: Planet Visual */}
                                <motion.div
                                    className="shrink-0 mt-3 sm:mt-0"
                                    whileHover={{ scale: 1.05, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <HolographicPlanet size="lg" />
                                </motion.div>
                                
                                {/* Center: Main Content */}
                                <div className="flex-1 text-center lg:text-left lg:ml-4">
                                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                                        <Sparkles className="w-6 h-6 text-violet pt-3" />
                                        <h3 className="font-display text-2xl lg:text-3xl font-bold text-white">SV Orbit AI</h3>
                                    </div>
                                    
                                    <p className="text-violet text-base font-medium mb-3">
                                        Tell me your vibe. I&apos;ll plan the night.
                                    </p>
                                    
                                    <p className="text-gray-300 text-sm lg:text-base mb-4 leading-relaxed max-w-2xl">
                                        Your personal AI companion that understands your mood, preferences, and social circle. 
                                        From spontaneous coffee dates to epic weekend adventures.
                                    </p>

                                    {/* Feature Tags */}
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-5 lg:mt-0">
                                        <motion.span 
                                            className="px-3 py-1 rounded-full bg-violet/10 border border-violet/20 text-violet text-xs font-medium"
                                            whileHover={{ scale: 1.05, backgroundColor: "rgba(123, 44, 191, 0.15)" }}
                                        >
                                            🎯 Smart Recommendations
                                        </motion.span>
                                        <motion.span 
                                            className="px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-medium"
                                            whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 240, 255, 0.15)" }}
                                        >
                                            🌐 Social Integration
                                        </motion.span>
                                        <motion.span 
                                            className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium"
                                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 184, 0, 0.15)" }}
                                        >
                                            ⚡ Instant Planning
                                        </motion.span>
                                    </div>
                                </div>

                                {/* Right: Status Panel */}
                                <div className="shrink-0 text-center lg:text-right">
                                    <motion.div
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet/10 border border-violet/30 mb-4"
                                        animate={{
                                            boxShadow: [
                                                "0 0 0 rgba(123, 44, 191, 0)",
                                                "0 0 20px rgba(123, 44, 191, 0.3)",
                                                "0 0 0 rgba(123, 44, 191, 0)",
                                            ]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <motion.div
                                            className="w-2 h-2 rounded-full bg-violet"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        />
                                        <span className="text-violet text-sm font-mono">SYSTEM LOADING...</span>
                                    </motion.div>

                                    {/* Progress Stats */}
                                    <div className="space-y-1.5">
                                        <motion.div 
                                            className="flex items-center justify-center lg:justify-end gap-2 text-xs text-gray-400"
                                            animate={{ opacity: [0.6, 1, 0.6] }}
                                            transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-violet" />
                                            <span>AI Training: 87%</span>
                                        </motion.div>
                                        
                                        <motion.div 
                                            className="flex items-center justify-center lg:justify-end gap-2 text-xs text-gray-400"
                                            animate={{ opacity: [0.6, 1, 0.6] }}
                                            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
                                            <span>Neural Networks: 92%</span>
                                        </motion.div>
                                        
                                        <motion.div 
                                            className="flex items-center justify-center lg:justify-end gap-2 text-xs text-gray-400"
                                            animate={{ opacity: [0.6, 1, 0.6] }}
                                            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                                            <span>Pro Features: 95%</span>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Subtle Floating Elements */}
                            <motion.div
                                className="absolute top-4 right-6 w-2 h-2 rounded-full bg-violet/30"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute bottom-4 left-1/3 w-1.5 h-1.5 rounded-full bg-cyan/30"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3]
                                }}
                                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                            />
                        </div>
                    </BentoCard>
                </div>

                {/* Referral Code & Social Sharing Section */}
                <motion.div
                    className="mt-6"
                    variants={cardVariants}
                >
                    <h4 className="font-semibold mb-3 text-gray-400 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 ">
                        <Rocket className="w-4 h-4 text-cyan" />
                        Share Your Referral Code
                    </h4>
                    
                    {/* Referral Code Card with Animated Border - Horizontal Layout */}
                    <div className="relative rounded-3xl overflow-visible mt-5 ">
                        {/* Animated gradient border orbit - same as other cards */}
                        <div className="absolute -inset-[2px] rounded-3xl opacity-80">
                            <motion.div
                                className="absolute inset-0 rounded-3xl"
                                style={{
                                    background: "linear-gradient(90deg, #8B5CF6 0%, #EC4899 18%, #FB923C 35%, #3B82F6 52%, #06B6D4 68%, #FB923C 85%, #8B5CF6 100%)",
                                    backgroundSize: "300% 300%"
                                }}
                                animate={{
                                    backgroundPosition: ["0% 50%", "300% 50%"]
                                }}
                                transition={{
                                    duration: 4,
                                    ease: "linear",
                                    repeat: Infinity
                                }}
                            />
                            {/* Soft multi-color glow effect */}
                            <div className="absolute inset-0 rounded-3xl blur-lg" style={{
                                background: "linear-gradient(90deg, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.4) 20%, rgba(251, 146, 60, 0.35) 40%, rgba(59, 130, 246, 0.4) 60%, rgba(251, 146, 60, 0.35) 80%, rgba(139, 92, 246, 0.4) 100%)"
                            }} />
                        </div>

                        {/* Card content - Horizontal Layout */}
                        <div className="relative bg-black rounded-3xl border-2 border-transparent p-5 sm:p-6 z-10">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                
                                {/* Left Section: Referral Code Display */}
                                <div className="text-center lg:text-left">
                                    <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">Your Referral Code</p>
                                    <motion.div
                                        className="font-mono text-4xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 lg:mb-0 mt-4 lg:mt-0"
                                        animate={{
                                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        style={{
                                            backgroundSize: "200% 200%",
                                            
                                        }}
                                    >
                                        {referralCode}
                                    </motion.div>
                                    
                                  
                                </div>

                                {/* Right Section: Social Sharing Buttons */}
                                <div className="text-center lg:text-right">
                                    <p className="text-gray-400 text-xs mb-4 uppercase tracking-wider flex items-center justify-center lg:justify-end gap-2">
                                        <Sparkles className="w-3 h-3" />
                                        Share & Earn Rewards
                                    </p>
                                    
                                    {/* Social Buttons Row */}
                                    <div className="flex justify-center lg:justify-end gap-3 mt-6 mb-8">
                                        {/* WhatsApp */}
                                        <motion.button
                                            onClick={() => handleSocialShare('whatsapp')}
                                            className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/30 border border-green-500/30 flex items-center justify-center text-green-400 hover:text-green-300 transition-all duration-300 group backdrop-blur-sm"
                                            whileHover={{ scale: 1.05, backgroundColor: "rgba(37, 211, 102, 0.2)" }}
                                            whileTap={{ scale: 0.95 }}
                                            title="Share on WhatsApp"
                                        >
                                            <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                                            </svg>
                                        </motion.button>

                                        {/* Instagram */}
                                        <motion.button
                                            onClick={() => handleSocialShare('instagram')}
                                            className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/30 border border-pink-500/30 flex items-center justify-center text-pink-400 hover:text-pink-300 transition-all duration-300 group backdrop-blur-sm"
                                            whileHover={{ scale: 1.05, backgroundColor: "rgba(240, 148, 51, 0.2)" }}
                                            whileTap={{ scale: 0.95 }}
                                            title="Share on Instagram"
                                        >
                                            <InstagramIcon />
                                        </motion.button>

                                        {/* Facebook */}
                                        <motion.button
                                            onClick={() => handleSocialShare('facebook')}
                                            className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-all duration-300 group backdrop-blur-sm"
                                            whileHover={{ scale: 1.05, backgroundColor: "rgba(24, 119, 242, 0.2)" }}
                                            whileTap={{ scale: 0.95 }}
                                            title="Share on Facebook"
                                        >
                                            <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                        </motion.button>

                                        {/* Twitter/X */}
                                        <motion.button
                                            onClick={() => handleSocialShare('twitter')}
                                            className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/30 border border-sky-500/30 flex items-center justify-center text-sky-400 hover:text-sky-300 transition-all duration-300 group backdrop-blur-sm"
                                            whileHover={{ scale: 1.05, backgroundColor: "rgba(29, 161, 242, 0.2)" }}
                                            whileTap={{ scale: 0.95 }}
                                            title="Share on Twitter"
                                        >
                                            <XIcon />
                                        </motion.button>

                                        {/* Copy Message */}
                                        <motion.button
                                            onClick={() => handleSocialShare('copy')}
                                            className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-600/30 border border-purple-500/30 flex items-center justify-center text-purple-400 hover:text-purple-300 transition-all duration-300 group backdrop-blur-sm"
                                            whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.2)" }}
                                            whileTap={{ scale: 0.95 }}
                                            title="Copy Share Message"
                                        >
                                            <Copy className="w-5 h-5 transition-transform group-hover:scale-110" />
                                        </motion.button>
                                    </div>

                                    <p className="text-gray-500 text-xs mt-4">
                                        Share your code and earn rewards when friends join!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                {/* Social Links */}
                <motion.div
                    className="flex justify-center gap-4 mt-10"
                    variants={cardVariants}
                >
                    <SocialLink href="https://instagram.com/studentverse.ae" icon={InstagramIcon} label="Instagram" />
                    <SocialLink href="https://linkedin.com/company/studentverse.ae" icon={LinkedInIcon} label="LinkedIn" />
                    <SocialLink href="https://x.com/studentverse.ae" icon={XIcon} label="X (Twitter)" />
                </motion.div>

                {/* Launch Target */}
                <motion.div
                    className="text-center mt-6 mb-10"
                    variants={cardVariants}
                >
                    <motion.p
                        className="text-gray-400 font-semibold text-sm sm:text-base flex items-center justify-center gap-2"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <Rocket className="w-4 h-4 text-purple-400" />
                        Launch Target: March, 2026
                    </motion.p>
                </motion.div>

                {/* Queue Visualization with Animated RGB Border */}
                <motion.div
                    className="mt-6"
                    variants={cardVariants}
                >
                    {/* Queue Visualization Card with Animated Border */}
                    <div className="relative rounded-3xl overflow-visible">
                        {/* Animated gradient border orbit - same as other cards */}
                        <div className="absolute -inset-[2px] rounded-3xl opacity-80">
                            <motion.div
                                className="absolute inset-0 rounded-3xl"
                                style={{
                                    background: "linear-gradient(90deg, #8B5CF6 0%, #EC4899 18%, #FB923C 35%, #3B82F6 52%, #06B6D4 68%, #FB923C 85%, #8B5CF6 100%)",
                                    backgroundSize: "300% 300%"
                                }}
                                animate={{
                                    backgroundPosition: ["0% 50%", "300% 50%"]
                                }}
                                transition={{
                                    duration: 4,
                                    ease: "linear",
                                    repeat: Infinity
                                }}
                            />
                            {/* Soft multi-color glow effect */}
                            <div className="absolute inset-0 rounded-3xl blur-lg" style={{
                                background: "linear-gradient(90deg, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.4) 20%, rgba(251, 146, 60, 0.35) 40%, rgba(59, 130, 246, 0.4) 60%, rgba(251, 146, 60, 0.35) 80%, rgba(139, 92, 246, 0.4) 100%)"
                            }} />
                        </div>

                        {/* Card content with black background */}
                        <div className="relative bg-black rounded-3xl border-2 border-transparent z-10 overflow-hidden">
                            <QueueVisualization
                                currentPosition={queuePosition}
                                totalUsers={totalUsers}
                                className="!bg-transparent !border-none !shadow-none !backdrop-blur-none p-5 sm:p-6 lg:p-8"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
