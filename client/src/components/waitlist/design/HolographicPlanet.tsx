"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";

interface HolographicPlanetProps {
    size?: 'sm' | 'md' | 'lg';
}

const HolographicPlanet = memo(function HolographicPlanet({ size = 'md' }: HolographicPlanetProps) {
    const sizes = {
        sm: "w-20 h-20",
        md: "w-28 h-28 sm:w-32 sm:h-32",
        lg: "w-40 h-40"
    };

    return (
        <div className={`relative ${sizes[size]} shrink-0`}>
            {/* Subtle outer glow - purplish */}
            <motion.div
                className="absolute inset-0 rounded-full blur-xl"
                style={{
                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(123, 44, 191, 0.15) 50%, transparent 70%)",
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Planet Sphere - Purplish with proper shading */}
            <motion.div
                className="absolute inset-0 rounded-full overflow-hidden border border-violet-500/40"
                style={{
                    background: "radial-gradient(circle at 25% 25%, #8B5CF6 0%, #7C3AED 20%, #6D28D9 40%, #5B21B6 60%, #4C1D95 80%, #1E1B4B 100%)",
                    boxShadow: "inset -10px -10px 20px rgba(0,0,0,0.6), inset 10px 10px 20px rgba(139, 92, 246, 0.3), 0 0 20px rgba(139, 92, 246, 0.4)"
                }}
                animate={{
                    boxShadow: [
                        "inset -10px -10px 20px rgba(0,0,0,0.6), inset 10px 10px 20px rgba(139, 92, 246, 0.3), 0 0 20px rgba(139, 92, 246, 0.4)",
                        "inset -10px -10px 20px rgba(0,0,0,0.5), inset 10px 10px 20px rgba(139, 92, 246, 0.4), 0 0 30px rgba(139, 92, 246, 0.6)",
                        "inset -10px -10px 20px rgba(0,0,0,0.6), inset 10px 10px 20px rgba(139, 92, 246, 0.3), 0 0 20px rgba(139, 92, 246, 0.4)"
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                {/* Planet surface texture */}
                <div 
                    className="absolute inset-0 rounded-full opacity-30"
                    style={{
                        background: "radial-gradient(ellipse at 30% 20%, transparent 30%, rgba(123, 44, 191, 0.25) 35%, transparent 40%), radial-gradient(ellipse at 70% 60%, transparent 25%, rgba(91, 33, 182, 0.3) 30%, transparent 35%), radial-gradient(circle at 50% 80%, transparent 20%, rgba(139, 92, 246, 0.2) 25%, transparent 30%)"
                    }}
                />

                {/* Atmospheric haze */}
                <motion.div 
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: "radial-gradient(circle at 30% 30%, rgba(123, 44, 191, 0.15) 0%, transparent 50%)"
                    }}
                    animate={{
                        opacity: [0.2, 0.35, 0.2]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* 3D Orbit Ring 1 - Elliptical, tilted */}
            <motion.div
                className="absolute inset-[-8px] border border-violet-400/50 rounded-full"
                style={{
                    transform: "rotateX(75deg) rotateY(20deg) rotateZ(-10deg)",
                    transformStyle: "preserve-3d",
                    borderRadius: "50% 40% 50% 40% / 40% 50% 40% 50%"
                }}
                animate={{ rotateZ: [350, -10] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
                <motion.div
                    className="absolute top-0 left-1/2 w-1 h-1 bg-violet-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#A78BFA]"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </motion.div>

            {/* 3D Orbit Ring 2 - Different angle */}
            <motion.div
                className="absolute inset-[-16px] border border-fuchsia-500/40 rounded-full"
                style={{
                    transform: "rotateX(65deg) rotateY(-15deg) rotateZ(15deg)",
                    transformStyle: "preserve-3d",
                    borderRadius: "45% 55% 45% 55% / 55% 45% 55% 45%"
                }}
                animate={{ rotateZ: [15, 375] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
                <motion.div
                    className="absolute bottom-0 right-1/3 w-1.5 h-1.5 bg-fuchsia-500 rounded-full shadow-[0_0_10px_#D946EF]"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
            </motion.div>

            {/* 3D Orbit Ring 3 - Most elliptical */}
            <motion.div
                className="absolute inset-[-24px] border border-purple-400/35 rounded-full"
                style={{
                    transform: "rotateX(80deg) rotateY(25deg) rotateZ(-20deg)",
                    transformStyle: "preserve-3d",
                    borderRadius: "40% 60% 40% 60% / 60% 40% 60% 40%"
                }}
                animate={{ rotateZ: [340, -20] }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            >
                <motion.div
                    className="absolute top-1/3 left-0 w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_8px_#C084FC]"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
                />
            </motion.div>

            {/* Enhanced orbiting particles */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                        top: '50%',
                        left: '50%',
                        background: i === 0 ? "#A78BFA" : i === 1 ? "#D946EF" : i === 2 ? "#C084FC" : "#8B5CF6"
                    }}
                    animate={{
                        x: [0, Math.cos(i * 1.3) * (30 + i * 10)],
                        y: [0, Math.sin(i * 1.3) * (20 + i * 8)],
                        opacity: [0, 0.9, 0.9, 0],
                        scale: [0, 1.3, 1, 0]
                    }}
                    transition={{
                        duration: 3.5 + i * 0.7,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeOut",
                        times: [0, 0.1, 0.8, 1]
                    }}
                />
            ))}
        </div>
    );
});

export default HolographicPlanet;
