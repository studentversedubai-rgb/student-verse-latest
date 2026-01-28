import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useState } from 'react';
import RainbowCard from './RainbowCard';

export default function PricingPlans() {
    const [billingCycle, setBillingCycle] = useState('monthly');

    const plans = [
        {
            name: 'Starter Plan (Free)',
            monthlyPrice: 0,
            yearlyPrice: 0,
            description: 'Basic access for students',
            features: [
                'Verified Digital Student ID',
                'Access to Partner Discounts',
                'Campus Event Feed',
                'SV Orbit AI (Basic)',
                '1 itinerary per week',
                'Eat → Play recommendations'
            ],
            popular: false
        },
        {
            name: 'StudentVerse PRO',
            monthlyPrice: 14.99,
            yearlyPrice: 152.99, // 15 * 12 * 0.85 = 153 
            description: 'Best value for everyday student life',
            features: [
                'Everything in Starter',
                'SV Orbit AI (Unlimited)',
                'Unlimited 3-stop itineraries (Eat → Play → Chill)',
                'Group Voting Mode',
                'Hidden Gem venues',
                'VIP Brand Offers',
                'Founding Member Badge'

            ],
            popular: false
        }
    ];

    const getPrice = (plan) => {
        return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    };

    const getPeriod = () => {
        return billingCycle === 'monthly' ? 'month' : 'year';
    };

    const getYearlySavings = (plan) => {
        if (billingCycle === 'yearly' && plan.monthlyPrice > 0) {
            const annualBase = plan.monthlyPrice * 12;
            return {
                base: annualBase,
                saved: annualBase - plan.yearlyPrice,
                percentage: 15
            };
        }
        return null;
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.section
            className="pricing-plans-section"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
                padding: '80px 20px',
                width: '100%',
                overflow: 'hidden',
                boxSizing: 'border-box'
            }}
        >
            <div
                className="pricing-plans-container"
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    width: '100%',
                    boxSizing: 'border-box'
                }}
            >
                {/* Billing Cycle Toggle */}
                <motion.div
                    className="billing-toggle-container"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '48px'
                    }}
                >
                    <div className="billing-toggle" style={{ position: 'relative' }}>
                        {/* Animated gradient border orbit - same as navbar */}
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
                            <div
                                className="absolute inset-0 rounded-full blur-lg"
                                style={{
                                    background: "linear-gradient(90deg, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.4) 20%, rgba(251, 146, 60, 0.35) 40%, rgba(59, 130, 246, 0.4) 60%, rgba(251, 146, 60, 0.35) 80%, rgba(139, 92, 246, 0.4) 100%)"
                                }}
                            />
                        </div>

                        <div
                            style={{
                                position: 'relative',
                                display: 'inline-flex',
                                background: '#000000',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                borderRadius: '50px',
                                padding: '4px',
                                border: '2px solid transparent',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                                zIndex: 10
                            }}
                        >

                            <button
                                onClick={() => setBillingCycle('monthly')}
                                style={{
                                    position: 'relative',
                                    padding: '10px 28px',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    color: billingCycle === 'monthly' ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                                    background: billingCycle === 'monthly'
                                        ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.4) 100%)'
                                        : 'transparent',
                                    border: 'none',
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    zIndex: 1,
                                    boxShadow: billingCycle === 'monthly'
                                        ? '0 4px 12px rgba(139, 92, 246, 0.3)'
                                        : 'none'
                                }}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                style={{
                                    position: 'relative',
                                    padding: '10px 28px',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    color: billingCycle === 'yearly' ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                                    background: billingCycle === 'yearly'
                                        ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.4) 100%)'
                                        : 'transparent',
                                    border: 'none',
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    zIndex: 1,
                                    boxShadow: billingCycle === 'yearly'
                                        ? '0 4px 12px rgba(139, 92, 246, 0.3)'
                                        : 'none'
                                }}
                            >
                                Yearly
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Pricing Cards Grid */}
                <motion.div
                    className="pricing-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '32px',
                        maxWidth: '800px',
                        margin: '0 auto',
                        width: '100%',
                        boxSizing: 'border-box'
                    }}
                >
                    {plans.map((plan, index) => {
                        const savings = getYearlySavings(plan);

                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -10 }}
                            >
                                <RainbowCard featured={plan.popular} className="h-full">
                                    <div
                                        className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                                        style={{
                                            position: 'relative',
                                            padding: plan.popular ? '32px 28px' : '28px 24px',
                                            boxSizing: 'border-box',
                                            transform: plan.popular ? 'scale(1.02)' : 'scale(1)',
                                            transition: 'transform 0.3s ease'
                                        }}
                                    >
                                        {plan.popular && (
                                            <div
                                                className="popular-badge"
                                                style={{
                                                    position: 'absolute',
                                                    top: '-12px',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    padding: '6px 16px',
                                                    borderRadius: '20px',
                                                    background: 'linear-gradient(90deg, #8B5CF6 0%, #EC4899 25%, #FB923C 50%, #3B82F6 75%, #8B5CF6 100%)',
                                                    backgroundSize: '200% 200%',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '600',
                                                    color: '#ffffff',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px',
                                                    boxShadow: '0 4px 16px rgba(139, 92, 246, 0.5), 0 0 20px rgba(236, 72, 153, 0.3)',
                                                    animation: 'rainbow-shift 3s ease infinite'
                                                }}
                                            >
                                                Most Popular
                                            </div>
                                        )}

                                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                            <h3
                                                style={{
                                                    fontSize: plan.popular ? '1.75rem' : '1.5rem',
                                                    fontWeight: '700',
                                                    color: '#ffffff',
                                                    marginBottom: '8px'
                                                }}
                                            >
                                                {plan.name}
                                            </h3>
                                            <p
                                                style={{
                                                    fontSize: '0.9rem',
                                                    color: 'rgba(255, 255, 255, 0.6)',
                                                    marginBottom: '16px',
                                                    minHeight: '40px'
                                                }}
                                            >
                                                {plan.description}
                                            </p>
                                            <div style={{ marginBottom: '8px' }}>
                                                <span
                                                    style={{
                                                        fontSize: plan.popular ? '2.5rem' : '2.25rem',
                                                        fontWeight: '700',
                                                        color: '#ffffff'
                                                    }}
                                                >
                                                    AED {getPrice(plan)}
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: '1rem',
                                                        color: 'rgba(255, 255, 255, 0.5)',
                                                        marginLeft: '4px'
                                                    }}
                                                >
                                                    / {getPeriod()}
                                                </span>
                                            </div>
                                            {savings && (
                                                <p
                                                    style={{
                                                        fontSize: '0.85rem',
                                                        color: '#10b981',
                                                        fontWeight: '500',
                                                        marginTop: '8px'
                                                    }}
                                                >
                                                    Billed yearly • {savings.percentage}% off
                                                </p>
                                            )}
                                        </div>

                                        <div
                                            style={{
                                                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                                                paddingTop: '24px'
                                            }}
                                        >
                                            <ul
                                                style={{
                                                    listStyle: 'none',
                                                    padding: 0,
                                                    margin: 0
                                                }}
                                            >
                                                {plan.features.map((feature, featureIndex) => (
                                                    <li
                                                        key={featureIndex}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            marginBottom: '12px',
                                                            fontSize: '0.95rem',
                                                            color: 'rgba(255, 255, 255, 0.8)'
                                                        }}
                                                    >
                                                        <Check
                                                            size={18}
                                                            style={{
                                                                marginRight: '10px',
                                                                color: plan.popular ? '#8b5cf6' : '#10b981',
                                                                flexShrink: 0
                                                            }}
                                                        />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </RainbowCard>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            <style>{`
        @keyframes rainbow-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .billing-toggle button:hover {
          color: #ffffff !important;
        }

        @media (max-width: 768px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            max-width: 100% !important;
          }
          
          .pricing-card.popular {
            transform: scale(1) !important;
          }
          
          .pricing-plans-section {
            padding: 60px 16px !important;
          }
          
          .billing-toggle-container {
            margin-bottom: 32px !important;
          }
        }

        @media (max-width: 480px) {
          .pricing-card {
            padding: 24px 20px !important;
          }
          
          .pricing-card.popular {
            padding: 28px 24px !important;
          }
          
          .billing-toggle button {
            padding: 8px 20px !important;
            font-size: 0.85rem !important;
          }
        }
      `}</style>
        </motion.section>
    );
}
