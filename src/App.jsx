import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { GroupFormation } from './pages/GroupFormation';
import { MentorAllocation } from './pages/MentorAllocation';
import { ProjectTracking } from './pages/ProjectTracking';
import { EvaluationHub } from './pages/EvaluationHub';
import { MeetingsAndCirculars } from './pages/MeetingsAndCirculars';

const PortalMainContent = () => {
  const { isLoggedIn, login, logout, activeTab, setActiveTab, currentUser } = useApp();

  if (!isLoggedIn) {
    return <Login onLoginSuccess={login} />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return currentUser?.role === 'admin' ? <AdminDashboard /> : <Dashboard />;
      case 'groups':
        return <GroupFormation />;
      case 'mentors':
        return <MentorAllocation />;
      case 'tracking':
        return <ProjectTracking />;
      case 'evaluation':
        return <EvaluationHub />;
      case 'meetings':
        return <MeetingsAndCirculars />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      {/* Editorial Navigation Bar */}
      <Header 
        onLogout={logout} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Full-Bleed Layout */}
      <main style={{ 
        flex: 1, 
        width: '100%',
        overflowX: 'hidden',
        backgroundColor: '#ffffff' /* Crisp editorial white background */
      }}>
        <div key={activeTab} className="animate-fade-in">
          {renderActiveTab()}
        </div>

        {/* Bottom Editorial Footer */}
        <footer style={{
          padding: '4rem 5%',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          fontSize: '0.85rem'
        }}>
          <div>
            <b style={{ fontSize: '1.25rem', display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Synapse</b> 
            <span style={{ color: '#94a3b8' }}>University of Tomorrow — SoCS Major Project Cell AY 2026-27</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', fontWeight: 600 }}>
            <a href="#privacy" onClick={(e) => e.preventDefault()} style={{ color: '#cbd5e1', transition: 'color 0.2s' }}>Security & Audit Policy</a>
            <a href="#rubrics" onClick={(e) => e.preventDefault()} style={{ color: '#cbd5e1', transition: 'color 0.2s' }}>5-Parameter Rubrics</a>
            <a href="https://github.com/PrinceV007/Insync" target="_blank" rel="noreferrer" style={{ color: '#ffffff', borderBottom: '1px solid #ffffff', paddingBottom: '2px' }}>
              Reference Repository
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <PortalMainContent />
    </AppProvider>
  );
}
