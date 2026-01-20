"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";

interface RadarVisualProps {
    size?: 'sm' | 'md' | 'lg';
    blips?: Array<{
        x: number;
        y: number;
        color?: string;
        id: string;
    }>;
    scanning?: boolean;
}

const RadarVisual = memo(function RadarVisual({
    size = 'md',
    blips = [],
    scanning = true
}: RadarVisualProps) {

    const sizeConfig = {
        sm: {
            container: "w-32 h-32",
            grid: 3,
            blip: "w-1.5 h-1.5"
        },
        md: {
            container: "w-64 h-64",
            grid: 4,
            blip: "w-2 h-2"
        },
        lg: {
            container: "w-63 sm:w-83 h-60.5 sm:h-83",
            grid: 5,
            blip: "w-2.5 h-2.5"
        }
    };

    const config = sizeConfig[size];
    const hudColor = "#03d0e6";
    const hudColorRGB = "3, 208, 230";

    const gridCircles = Array.from({ length: config.grid }, (_, i) => {
        const scale = (i + 1) * (100 / config.grid) / 100;
        return (
            <motion.div
                key={`grid-${i}`}
                className="absolute top-1/2 left-1/2 border rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{
                    borderColor: `rgba(${hudColorRGB}, ${0.12 - (i * 0.02)})`,
                    width: `${scale * 100}%`,
                    height: `${scale * 100}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: "easeOut"
                }}
            />
        );
    });

    const crosshairs = (
        <>
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div
                    className="w-full h-px"
                    style={{
                        background: `linear-gradient(90deg, transparent, rgba(${hudColorRGB}, 0.25), transparent)`
                    }}
                />
                <div
                    className="h-full w-px absolute"
                    style={{
                        background: `linear-gradient(180deg, transparent, rgba(${hudColorRGB}, 0.25), transparent)`
                    }}
                />
            </motion.div>
        </>
    );

    const scanningLine = scanning && (
        <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
            }}
        >
            <div
                className="absolute top-1/2 left-1/2 w-px -translate-x-1/2 -translate-y-full"
                style={{
                    height: '50%',
                    background: `linear-gradient(to bottom, ${hudColor}, rgba(${hudColorRGB}, 0.4), transparent)`,
                    transformOrigin: 'bottom center',
                    boxShadow: `0 0 10px ${hudColor}, 0 0 20px ${hudColor}`
                }}
            />
        </motion.div>
    );

    return (
        <div className={`relative ${config.container} rounded-full overflow-hidden`}>
            <div
                className="absolute inset-0 rounded-full backdrop-blur-sm"
                style={{
                    background: 'rgba(8, 12, 31, 0.25)',
                    border: `1px solid rgba(${hudColorRGB}, 0.2)`,
                    boxShadow: `
                        0 0 20px rgba(${hudColorRGB}, 0.2),
                        inset 0 0 20px rgba(${hudColorRGB}, 0.03)
                    `
                }}
            />

            {gridCircles}

            {crosshairs}

            {scanningLine}

            {blips.map((blip, i) => (
                <motion.div
                    key={blip.id}
                    className={`absolute ${config.blip} rounded-full`}
                    style={{
                        left: `${blip.x}%`,
                        top: `${blip.y}%`,
                        background: hudColor,
                        boxShadow: `0 0 8px ${hudColor}, 0 0 16px ${hudColor}`,
                        transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1.5, 1, 0.8]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.8, 1]
                    }}
                />
            ))}

            <motion.div
                className="absolute top-1/2 left-1/2 rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{
                    width: '6px',
                    height: '6px',
                    background: hudColor,
                    boxShadow: `0 0 10px ${hudColor}, 0 0 20px ${hudColor}`
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.9, 1]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
});

export default RadarVisual;
