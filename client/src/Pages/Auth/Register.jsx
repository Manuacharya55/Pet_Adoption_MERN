import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "../../hooks/apiRequests";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/AuthContext";
import { registerSchema } from "../../Schema/AuthSchema";
import RegisterForm from "../../form/RegisterForm";
import { MdPets } from "react-icons/md";

const Register = () => {
  const { setToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await usePost("/auth/register", "", data);
    if (response.success) {
      toast.success(response.message);
      sessionStorage.setItem("justRegistered", "true");
      setToken(response.data);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--bg-primary)',
    }}>
      {/* Left Form Panel */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-2xl)',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-lg)',
        }}>
          <div>
            <h2 style={{
              fontSize: '2rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: '800',
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}>
              Create your account
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Sign up to start your pet adoption journey.
            </p>
          </div>

          <RegisterForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
          />

          <div style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
          }}>
            Already have an account?{' '}
            <NavLink
              to="/login"
              style={{
                fontWeight: '600',
                color: 'var(--accent-primary)',
                textDecoration: 'none',
              }}
            >
              Sign In
            </NavLink>
          </div>
        </div>
      </div>

      {/* Right Visual Panel */}
      <div className="auth-hero" style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=1200"
          alt="Pet Register"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to left, rgba(0,0,0,0.1), rgba(255,255,255,0.5))',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '80px',
          left: '60px',
          right: '60px',
          zIndex: 2,
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}>
            <MdPets size={28} color="white" />
          </div>
          <h1 style={{
            fontSize: '3rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: '800',
            color: 'white',
            lineHeight: '1.15',
            marginBottom: '12px',
          }}>
            Start your journey<br />with PetDaily.
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: '1.6',
            maxWidth: '400px',
          }}>
            Every pet deserves a chance at happiness. Create your account to begin.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .auth-hero { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Register;
