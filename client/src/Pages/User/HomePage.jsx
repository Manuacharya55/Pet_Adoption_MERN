import React, { useEffect, useState } from "react";
import Tile from "../../Components/Tile";
import CategoryFan from "../../Components/CategoryFan";
import Loader from "../../Components/Loader";
import { useGet } from "../../hooks/apiRequests";
import { useAuth } from "../../Context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const HomePage = () => {
  const [stats, setStats] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, catRes] = await Promise.all([
        useGet("/stats", user?.token),
        useGet("/category", user?.token)
      ]);

      if (statsRes?.success) setStats(statsRes.data);
      if (catRes?.success) setCategories(catRes.data);
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [user?.token]);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-primary)' }}>

      {/* ─── Hero Section ────────────────────────── */}
      <section style={{
        position: 'relative',
        paddingTop: '160px',
        paddingBottom: '80px',
        overflow: 'hidden',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '64px',
            flexWrap: 'wrap',
          }}>
            {/* Left Column */}
            <div style={{ flex: '1 1 400px', position: 'relative', zIndex: 10 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  color: 'var(--text-secondary)',
                  background: 'var(--bg-card)',
                  marginBottom: '24px',
                }}>
                  ✨ The #1 Pet Adoption Platform
                </span>

                <h1 style={{
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  fontWeight: '800',
                  lineHeight: '1.1',
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  marginBottom: '24px',
                }}>
                  Find your new<br />
                  <span style={{
                    color: 'var(--text-muted)',
                    fontStyle: 'italic',
                    fontFamily: 'Georgia, serif',
                  }}>best friend.</span>
                </h1>

                <p style={{
                  fontSize: '1.2rem',
                  color: 'var(--text-secondary)',
                  maxWidth: '480px',
                  lineHeight: '1.7',
                  marginBottom: '32px',
                }}>
                  Connect with thousands of pets waiting for a loving home.
                  Simple, transparent, and trusted by families everywhere.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <button
                    className="primary-btn"
                    onClick={() => navigate('/pets')}
                    style={{ fontSize: '1.05rem', padding: '16px 32px' }}
                  >
                    Start Browsing
                  </button>
                  <button
                    className="outline-btn"
                    onClick={() => navigate('/shops')}
                    style={{ fontSize: '1.05rem', padding: '16px 32px' }}
                  >
                    Explore Shops <FaArrowRight style={{ marginLeft: '4px' }} />
                  </button>
                </div>

                {/* Social Proof */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '48px' }}>
                  <div style={{ display: 'flex' }}>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        border: '3px solid white',
                        overflow: 'hidden',
                        marginLeft: i > 1 ? '-12px' : '0',
                        background: 'var(--bg-tertiary)',
                      }}>
                        <img
                          src={`https://i.pravatar.cc/100?img=${i + 10}`}
                          alt="User"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                      2,000+ Adoptions
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      this month alone
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column — Image Grid */}
            <div style={{ flex: '1 1 400px', position: 'relative' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ position: 'relative', zIndex: 10 }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '48px' }}>
                    <img
                      src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600"
                      style={{ borderRadius: 'var(--radius-2xl)', width: '100%', height: '220px', objectFit: 'cover', boxShadow: 'var(--shadow-xl)' }}
                      alt="Dog"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600"
                      style={{ borderRadius: 'var(--radius-2xl)', width: '100%', height: '280px', objectFit: 'cover', boxShadow: 'var(--shadow-xl)' }}
                      alt="Cat"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <img
                      src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=600"
                      style={{ borderRadius: 'var(--radius-2xl)', width: '100%', height: '280px', objectFit: 'cover', boxShadow: 'var(--shadow-xl)' }}
                      alt="Puppy"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600"
                      style={{ borderRadius: 'var(--radius-2xl)', width: '100%', height: '220px', objectFit: 'cover', boxShadow: 'var(--shadow-xl)' }}
                      alt="Dog"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Decorative Blob */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120%',
                height: '120%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(249,115,22,0.06) 50%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                zIndex: 0,
                pointerEvents: 'none',
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Section ───────────────────────── */}
      <section className="container" style={{ padding: 'var(--space-xl) var(--space-md)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          {stats.map((stat, index) => (
            <Tile key={index} count={stat.count} name={stat.name} />
          ))}
        </motion.div>
      </section>

      {/* ─── Categories Section ──────────────────── */}
      <section className="container" style={{ padding: 'var(--space-2xl) var(--space-md)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            letterSpacing: '-0.02em',
          }}>
            Discover Categories
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            marginTop: '8px',
            fontSize: '1.05rem',
          }}>
            Browse pets by their breeds and categories
          </p>
        </div>

        {isLoading ? (
          <Loader text="Loading categories..." />
        ) : (
          <CategoryFan categories={categories} />
        )}
      </section>

      {/* ─── CTA Section ─────────────────────────── */}
      <section className="container" style={{ padding: 'var(--space-2xl) var(--space-md) var(--space-xl)' }}>
        <div style={{
          background: 'var(--accent-primary)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'clamp(48px, 8vw, 96px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '640px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '800',
              color: 'white',
              marginBottom: '16px',
              lineHeight: '1.15',
            }}>
              Ready to change a life?
            </h2>
            <p style={{
              fontSize: '1.15rem',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '32px',
              lineHeight: '1.6',
            }}>
              Adopting a pet is one of the most rewarding experiences. Start your journey today.
            </p>
            <button
              onClick={() => navigate('/pets')}
              style={{
                background: 'white',
                color: 'var(--accent-primary)',
                padding: '16px 40px',
                borderRadius: 'var(--radius-full)',
                fontSize: '1.05rem',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Find a Pet
            </button>
          </div>

          {/* Decorative circles */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '300px',
            height: '300px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            transform: 'translate(-50%, -50%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '300px',
            height: '300px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            transform: 'translate(50%, 50%)',
          }} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
