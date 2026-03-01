import React from 'react';

const Card = ({ heading = "Pet Name", children, img = "kitty.jpg", className = "" }) => {
  return (
    <div
      className={className}
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-2xl)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      {/* Image */}
      <div style={{
        width: '100%',
        height: '240px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <img
          src={img}
          alt={heading}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
      </div>

      {/* Content */}
      <div style={{
        padding: 'var(--space-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-sm)',
        flex: 1,
      }}>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: '700',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-0.01em',
        }}>
          {heading}
        </h3>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;