import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LuCircleUserRound } from "react-icons/lu";
import { IoCloseSharp, IoLogOutOutline } from "react-icons/io5";
import { TbMenu2 } from "react-icons/tb";
import { MdPets } from "react-icons/md";
import { useAuth } from "../Context/AuthContext";

const NavBar = ({ array }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { clearToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768) setIsOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <nav style={{
      position: 'fixed',
      top: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: '1280px',
      zIndex: 1000,
    }}>
      {/* Main Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        borderRadius: '9999px',
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${scrolled ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.04)'}`,
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : '0 2px 10px rgba(0,0,0,0.04)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Logo */}
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            overflow: 'hidden',
          }}>
            <img src="../../public/logo.png" alt="" />
          </div>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: '800',
            fontSize: '1.2rem',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}>
            Pet<span style={{ color: 'var(--text-muted)' }}>Daily</span>
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {array?.map((route, idx) => (
              <NavLink
                key={idx}
                to={route.route}
                style={({ isActive }) => ({
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  transition: 'color 0.2s ease',
                  textTransform: 'capitalize',
                  textDecoration: 'none',
                })}
              >
                {route.name}
              </NavLink>
            ))}
          </div>

          <div style={{
            width: '1px',
            height: '24px',
            background: 'var(--border-light)',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <NavLink to="/profile" style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              background: 'var(--bg-secondary)',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
            }}>
              <LuCircleUserRound size={22} />
            </NavLink>

            <button
              className="logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              <IoLogOutOutline size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            padding: '8px',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {isOpen ? <IoCloseSharp /> : <TbMenu2 />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: '16px',
          right: '16px',
          background: 'white',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
          border: '1px solid var(--border-light)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          animation: 'modalIn 0.2s ease',
        }}>
          {array?.map((route, idx) => (
            <NavLink
              key={idx}
              to={route.route}
              onClick={() => setIsOpen(false)}
              style={({ isActive }) => ({
                fontSize: '1.05rem',
                fontWeight: '500',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-primary)',
                padding: '12px 16px',
                borderRadius: '12px',
                background: isActive ? 'var(--bg-secondary)' : 'transparent',
                textDecoration: 'none',
                textTransform: 'capitalize',
                transition: 'all 0.15s ease',
              })}
            >
              {route.name}
            </NavLink>
          ))}
          <div style={{ height: '1px', background: 'var(--border-light)', margin: '4px 0' }} />
          <NavLink
            to="/profile"
            onClick={() => setIsOpen(false)}
            style={{
              fontSize: '1.05rem',
              fontWeight: '500',
              color: 'var(--text-primary)',
              padding: '12px 16px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
            }}
          >
            <LuCircleUserRound size={20} /> Profile
          </NavLink>
          <button
            className="logout-btn-mobile"
            onClick={() => { setIsOpen(false); handleLogout(); }}
          >
            <IoLogOutOutline size={20} /> Logout
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
