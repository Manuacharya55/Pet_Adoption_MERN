import React from "react";
import { NavLink } from "react-router-dom";
import { MdPets } from "react-icons/md";

const Footer = ({ array }) => {
  return (
    <footer style={{
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border-light)',
      padding: 'var(--space-2xl) 0 var(--space-lg)',
      marginTop: 'var(--space-2xl)',
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xl)',
      }}>
        {/* Footer Top */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-xl)',
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}>
                <MdPets size={18} />
              </div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: '800',
                fontSize: '1.15rem',
              }}>
                Pet<span style={{ color: 'var(--text-muted)' }}>Daily</span>
              </span>
            </div>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              lineHeight: '1.7',
              maxWidth: '280px',
            }}>
              Connecting loving families with pets in need of a forever home. Every pet deserves a second chance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              fontSize: '0.95rem',
              marginBottom: 'var(--space-md)',
              letterSpacing: '0.02em',
            }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {array?.map((route, idx) => (
                <li key={idx}>
                  <NavLink
                    to={route.route}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.9rem',
                      transition: 'color 0.15s ease',
                      textTransform: 'capitalize',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                  >
                    {route.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              fontSize: '0.95rem',
              marginBottom: 'var(--space-md)',
              letterSpacing: '0.02em',
            }}>Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Help Center', 'Terms of Service', 'Privacy Policy', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.9rem',
                      transition: 'color 0.15s ease',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              fontSize: '0.95rem',
              marginBottom: 'var(--space-md)',
              letterSpacing: '0.02em',
            }}>Stay Connected</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--space-sm)' }}>
              Subscribe for adoption updates.
            </p>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '10px 48px 10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-light)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
              <button style={{
                position: 'absolute',
                right: '4px',
                top: '4px',
                bottom: '4px',
                padding: '0 12px',
                borderRadius: '6px',
                background: 'var(--accent-primary)',
                color: 'white',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}>→</button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: 'var(--space-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-sm)',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
        }}>
          <span>© {new Date().getFullYear()} PetDaily. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
