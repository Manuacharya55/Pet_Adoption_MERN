import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryFan = ({ categories = [] }) => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(Math.floor(Math.min(categories.length, 5) / 2) || 0);

    const displayCategories = categories.slice(0, 5);

    const handleCardClick = (cat, index) => {
        if (index === activeIndex) {
            navigate(`/pets?category=${cat._id}`);
        } else {
            setActiveIndex(index);
        }
    };

    if (!categories || categories.length === 0) {
        return (
            <div className="empty-state">
                <p>No categories available at the moment.</p>
            </div>
        );
    }

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }}>
            <div style={{
                position: 'relative',
                width: '100%',
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <AnimatePresence>
                    {displayCategories.map((cat, index) => {
                        const offset = index - activeIndex;
                        const isCenter = index === activeIndex;

                        const x = offset * 120;
                        const y = Math.abs(offset) * 20;
                        const rotateZ = offset * 10;
                        const scale = isCenter ? 1.1 : 1 - Math.abs(offset) * 0.15;
                        const zIndex = 20 - Math.abs(offset);
                        const opacity = Math.abs(offset) > 2 ? 0 : 1;

                        return (
                            <motion.div
                                key={cat._id}
                                onClick={() => handleCardClick(cat, index)}
                                initial={false}
                                animate={{ x, y, rotateZ, scale, zIndex, opacity }}
                                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                                whileHover={!isCenter ? { y: y - 15, scale: scale + 0.05 } : { scale: 1.15 }}
                                style={{
                                    position: 'absolute',
                                    width: '220px',
                                    height: '320px',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    borderRadius: 'var(--radius-2xl)',
                                    background: 'var(--bg-card)',
                                    border: isCenter ? '2px solid var(--accent-primary)' : '1px solid var(--border-light)',
                                    boxShadow: isCenter
                                        ? '0 20px 40px rgba(0, 0, 0, 0.15)'
                                        : '0 8px 20px rgba(0, 0, 0, 0.08)',
                                }}
                            >
                                <img
                                    src={cat.image || '/placeholder.png'}
                                    alt={cat.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800"; }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    padding: 'var(--space-lg) var(--space-md)',
                                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, transparent 100%)',
                                    textAlign: 'center',
                                }}>
                                    <h3 style={{
                                        margin: 0,
                                        color: 'white',
                                        fontSize: '1.1rem',
                                        fontFamily: 'var(--font-heading)',
                                        fontWeight: '700',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                                    }}>
                                        {cat.name}
                                    </h3>
                                    {isCenter && (
                                        <div style={{
                                            marginTop: '4px',
                                            fontSize: '0.75rem',
                                            color: 'rgba(255,255,255,0.8)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            fontWeight: '600',
                                        }}>
                                            Explore →
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: 'var(--space-md)',
                zIndex: 30,
            }}>
                {displayCategories.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        style={{
                            width: index === activeIndex ? '28px' : '8px',
                            height: '8px',
                            borderRadius: '4px',
                            background: index === activeIndex ? 'var(--accent-primary)' : 'var(--border-medium)',
                            transition: 'all 0.3s ease',
                            padding: 0,
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        aria-label={`Go to category slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryFan;
