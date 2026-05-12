import { motion } from 'framer-motion';

/**
 * RainbowCard - A reusable component with animated rainbow gradient border
 * Used across the site for consistent visual language (Features, Pricing, etc.)
 */
export default function RainbowCard({ children, featured = false, className = '' }) {
    return (
        <div className={`relative rounded-3xl overflow-visible ${className}`}>
            {/* Animated gradient border orbit */}
            <div className={`absolute -inset-[2px] rounded-3xl ${featured ? 'opacity-100' : 'opacity-80'}`}>
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
                <div
                    className={`absolute inset-0 rounded-3xl ${featured ? 'blur-xl' : 'blur-lg'}`}
                    style={{
                        background: "linear-gradient(90deg, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.4) 20%, rgba(251, 146, 60, 0.35) 40%, rgba(59, 130, 246, 0.4) 60%, rgba(251, 146, 60, 0.35) 80%, rgba(139, 92, 246, 0.4) 100%)"
                    }}
                />
                {/* Extra glow layer for featured cards */}
                {featured && (
                    <div
                        className="absolute inset-0 rounded-3xl blur-2xl opacity-60"
                        style={{
                            background: "linear-gradient(90deg, rgba(139, 92, 246, 0.5) 0%, rgba(236, 72, 153, 0.5) 20%, rgba(251, 146, 60, 0.4) 40%, rgba(59, 130, 246, 0.5) 60%, rgba(251, 146, 60, 0.4) 80%, rgba(139, 92, 246, 0.5) 100%)"
                        }}
                    />
                )}
            </div>

            {/* Card content with black background */}
            <div className={`relative bg-black rounded-3xl border-2 border-transparent z-10 ${featured ? 'ring-1 ring-white/5' : ''}`}>
                {children}
            </div>
        </div>
    );
}
