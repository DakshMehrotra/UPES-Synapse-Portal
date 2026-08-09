import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Kanban, 
  Award, 
  Calendar, 
  ShieldCheck, 
  HelpCircle,
  ExternalLink 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = ({ isCollapsed, onSelectTab }) => {
  const { activeTab, currentUser } = useApp();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Portal Dashboard',
      icon: <LayoutDashboard size={19} />,
      badge: null,
    },
    {
      id: 'groups',
      label: 'Group Formation',
      icon: <Users size={19} />,
      badge: 'Max 4',
    },
    {
      id: 'mentors',
      label: 'Mentor Allocation',
      icon: <UserCheck size={19} />,
      badge: 'AI Match',
    },
    {
      id: 'tracking',
      label: 'Milestones & Kanban',
      icon: <Kanban size={19} />,
      badge: null,
    },
    {
      id: 'evaluation',
      label: 'Evaluation & Rubrics',
      icon: <Award size={19} />,
      badge: currentUser.role === 'mentor' ? 'Grade' : null,
    },
    {
      id: 'meetings',
      label: 'Meetings & Circulars',
      icon: <Calendar size={19} />,
      badge: '3 New',
    },
  ];

  return (
    <aside
      className="upes-sidebar-gradient"
      style={{
        width: isCollapsed ? '76px' : '260px',
        minWidth: isCollapsed ? '76px' : '260px',
        height: 'calc(100vh - 65px)',
        position: 'sticky',
        top: '65px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width 0.25s ease, min-width 0.25s ease',
        overflowX: 'hidden',
        borderRight: '1px solid #1e293b',
        zIndex: 40,
        backgroundColor: '#0f172a',
        boxShadow: '4px 0 15px rgba(0,0,0,0.05)'
      }}
    >
      {/* Top Navigation Items */}
      <div style={{ padding: '1.5rem 1rem' }}>
        {!isCollapsed && (
          <div style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#64748b',
            fontWeight: 700,
            padding: '0 0.5rem',
            marginBottom: '0.85rem'
          }}>
            Project Cell Modules
          </div>
        )}

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isCollapsed ? 'center' : 'space-between',
                  width: '100%',
                  padding: '0.75rem 0.85rem',
                  borderRadius: '8px',
                  backgroundColor: isActive ? '#1e293b' : 'transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.88rem',
                  borderLeft: isActive ? '4px solid #2563eb' : '4px solid transparent',
                  boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer'
                }}
                title={item.label}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', overflow: 'hidden' }}>
                  <span style={{ color: isActive ? '#60a5fa' : '#64748b', flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span style={{ 
                      whiteSpace: 'nowrap', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      color: isActive ? '#ffffff' : '#cbd5e1'
                    }}>
                      {item.label}
                    </span>
                  )}
                </div>

                {/* Clean, Non-overlapping Pill Badge */}
                {!isCollapsed && item.badge && (
                  <span style={{
                    fontSize: '0.68rem',
                    padding: '0.15rem 0.55rem',
                    borderRadius: '99px',
                    backgroundColor: isActive ? '#2563eb' : '#1e293b',
                    color: '#ffffff',
                    fontWeight: 700,
                    flexShrink: 0,
                    letterSpacing: '0.02em',
                    boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.2)' : 'none'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Institutional Support Footer */}
      <div style={{
        padding: '1.25rem 1rem',
        borderTop: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {!isCollapsed ? (
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '10px',
            padding: '0.9rem',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.35rem' }}>
              <ShieldCheck size={16} />
              <span>UPES Verified Portal</span>
            </div>
            <p style={{ fontSize: '0.74rem', color: '#94a3b8', lineHeight: 1.4 }}>
              Structured SoCS Capstone workflow with full digital audit trail.
            </p>
            <div style={{
              marginTop: '0.75rem',
              paddingTop: '0.6rem',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.72rem',
              color: '#64748b'
            }}>
              <span>AY 2026–27</span>
              <a 
                href="https://github.com/PrinceV007/Insync" 
                target="_blank" 
                rel="noreferrer"
                style={{ color: '#60a5fa', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <span>Ref</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#16a34a',
              boxShadow: '0 0 8px rgba(22, 163, 74, 0.6)'
            }} title="Portal Online" />
          </div>
        )}
      </div>
    </aside>
  );
};
