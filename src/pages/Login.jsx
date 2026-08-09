import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Mail, 
  Building2,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Login = ({ onLoginSuccess }) => {
  const { loginAsRole } = useApp();

  const [email, setEmail] = useState('Daksh.125960@stu.upes.ac.in');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState('student');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'student') {
      setEmail('Daksh.125960@stu.upes.ac.in');
      setPassword('••••••••••••');
    } else if (role === 'mentor') {
      setEmail('tanupriya.c@ddn.upes.ac.in');
      setPassword('••••••••••••');
    } else if (role === 'admin') {
      setEmail('projectcell.socs@ddn.upes.ac.in');
      setPassword('••••••••••••');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCaptchaVerified) {
      alert('Please verify security check!');
      return;
    }
    setIsLoggingIn(true);
    setTimeout(() => {
      loginAsRole(selectedRole);
      onLoginSuccess();
    }, 450);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-primary)',
      backgroundColor: '#f8fafc',
      backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      color: '#0f172a'
    }}>
      
      {/* Pristine Enterprise Login Card */}
      <div className="animate-fade-in" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '3rem 2.5rem',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        margin: '2rem'
      }}>
        
        {/* Branding Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            backgroundColor: '#0f172a',
            borderRadius: '12px',
            marginBottom: '1.25rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <ShieldCheck size={24} color="#ffffff" />
          </div>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.02em',
            margin: '0 0 0.5rem 0',
            color: '#0f172a'
          }}>
            Synapse Portal
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Sign in to access your capstone workspace.
          </p>
        </div>

        {/* SSO Button */}
        <button
          type="button"
          disabled={isLoggingIn}
          onClick={handleSubmit}
          className="hover-elevate"
          style={{
            width: '100%',
            padding: '0.85rem',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            color: '#334155',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            marginBottom: '1.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0H0V10H10V0Z" fill="#f25022"/>
            <path d="M21 0H11V10H21V0Z" fill="#7fba00"/>
            <path d="M10 11H0V21H10V11Z" fill="#00a4ef"/>
            <path d="M21 11H11V21H21V11Z" fill="#ffb900"/>
          </svg>
          <span>Sign in with UPES Account</span>
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ height: '1px', flex: 1, backgroundColor: '#e2e8f0' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Or continue with email</span>
          <div style={{ height: '1px', flex: 1, backgroundColor: '#e2e8f0' }} />
        </div>

        {/* Demo Role Selector */}
        <div style={{
          display: 'flex',
          backgroundColor: '#f8fafc',
          padding: '0.35rem',
          borderRadius: '10px',
          marginBottom: '1.5rem',
          border: '1px solid #e2e8f0'
        }}>
          {[
            { id: 'student', label: 'Student' },
            { id: 'mentor', label: 'Mentor' },
            { id: 'admin', label: 'Admin' }
          ].map((roleObj) => (
            <button
              key={roleObj.id}
              type="button"
              onClick={() => handleRoleSelect(roleObj.id)}
              style={{
                flex: 1,
                padding: '0.5rem 0.25rem',
                fontSize: '0.78rem',
                fontWeight: selectedRole === roleObj.id ? 700 : 500,
                borderRadius: '6px',
                backgroundColor: selectedRole === roleObj.id ? '#ffffff' : 'transparent',
                color: selectedRole === roleObj.id ? '#0f172a' : '#64748b',
                transition: 'all 0.2s',
                border: 'none',
                cursor: 'pointer',
                boxShadow: selectedRole === roleObj.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {roleObj.label}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
              Email address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  color: '#0f172a',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.02)';
                }}
                required
              />
              <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  color: '#0f172a',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.02)';
                }}
                required
              />
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: '#64748b' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#2563eb', cursor: 'pointer' }}
              />
              <span>Remember me</span>
            </label>
            <a href="#" style={{ fontSize: '0.85rem', color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="hover-elevate"
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '8px',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              marginTop: '0.75rem',
              transition: 'all 0.2s ease'
            }}
          >
            {isLoggingIn ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="spinner" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                Signing in...
              </span>
            ) : (
              <>
                <span>Sign in with Email</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.85rem', color: '#64748b' }}>
          Don't have an account? <a href="#" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>Request Access</a>
        </div>
      </div>
      
      {/* Required keyframes for animations used inline */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
