import React, { useState } from 'react';
import { Bell, LogOut, RotateCcw, UserCheck, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header = ({ onLogout, activeTab, setActiveTab }) => {
  const { 
    currentUser, 
    loginAsRole, 
    notifications, 
    markAllNotificationsRead, 
    resetDemoData,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleReset = () => {
    if (window.confirm('Reset all demo data back to pristine UPES demo state?')) {
      resetDemoData();
      setShowProfileMenu(false);
    }
  };

  return (
    <header className="portal-header" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.5rem 3.5rem',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #f1f5f9',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      fontFamily: 'var(--font-heading)'
    }}>
      {/* Left: Branding */}
      <div 
        onClick={() => setActiveTab('dashboard')} 
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
      >
        <div style={{
          color: '#0f172a',
          fontWeight: 800,
          fontSize: '1.5rem',
          letterSpacing: '-0.04em',
        }}>
          Synap<span style={{ fontWeight: 400, color: '#94a3b8' }}>se</span>
        </div>
      </div>

      {/* Center: Minimalist Navigation Links */}
      <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {[
          { id: 'dashboard', label: 'Overview' },
          { id: 'groups', label: 'Teams' },
          { id: 'mentors', label: 'Mentors' },
          { id: 'tracking', label: 'Milestones' },
          { id: 'evaluation', label: 'Evaluation' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              fontSize: '0.95rem',
              fontWeight: activeTab === item.id ? 700 : 500,
              color: activeTab === item.id ? '#0f172a' : '#94a3b8',
              cursor: 'pointer',
              borderBottom: activeTab === item.id ? '2px solid #0f172a' : '2px solid transparent',
              paddingBottom: '0.25rem',
              transition: 'all 0.2s ease',
              fontFamily: 'var(--font-heading)'
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right: Notifications & Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <button 
          onClick={() => {
            setShowNotifications(!showNotifications);
            if (!showNotifications) markAllNotificationsRead();
          }}
          style={{ position: 'relative', cursor: 'pointer', color: '#0f172a' }}
        >
          <Bell size={20} strokeWidth={1.5} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute', top: '-4px', right: '-4px',
              backgroundColor: '#0f172a', color: 'white',
              fontSize: '0.6rem', fontWeight: 800,
              width: '14px', height: '14px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="animate-fade-in" style={{
            position: 'absolute',
            right: '2rem',
            top: '4.5rem',
            width: '320px',
            backgroundColor: '#ffffff',
            border: '1px solid #f1f5f9',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
            padding: '1.5rem',
            borderRadius: '12px',
            zIndex: 100
          }}>
            <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>Updates</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
              {notifications.map((n) => (
                <div key={n.id} style={{ 
                  fontSize: '0.85rem',
                  color: n.unread ? '#0f172a' : '#64748b',
                  fontWeight: n.unread ? 600 : 400
                }}>
                  {n.text}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{currentUser.profile?.name || 'Daksh Mehrotra'}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{currentUser.role}</div>
            </div>
            <img 
              src={currentUser.profile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} 
              alt="Profile" 
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
            />
          </button>
          
          {showProfileMenu && (
            <div className="animate-fade-in" style={{
              position: 'absolute',
              right: 0,
              top: '3rem',
              width: '240px',
              backgroundColor: '#ffffff',
              border: '1px solid #f1f5f9',
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
              padding: '1rem',
              borderRadius: '12px',
              zIndex: 100
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>
                  <RotateCcw size={14} /> Reset Data
                </button>
                <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontSize: '0.85rem', fontWeight: 700 }}>
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
