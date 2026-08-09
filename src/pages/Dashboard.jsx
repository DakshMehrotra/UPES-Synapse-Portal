import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  FileText, 
  Sparkles,
  ArrowRight,
  UserCheck,
  ShieldCheck,
  MapPin,
  Mail,
  CheckSquare,
  Square,
  BookOpen,
  ChevronRight,
  ArrowUpRight,
  GitBranch,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GitHubGraph } from '../components/common/GitHubGraph';

export const Dashboard = () => {
  const { 
    currentUser, 
    groups, 
    notices, 
    tasks, 
    setActiveTab,
    triggerToast 
  } = useApp();

  const [sessionTab, setSessionTab] = useState('sessions'); // 'sessions' | 'notices'
  const [sprintTasks, setSprintTasks] = useState([
    { id: 1, text: 'System Architecture Document & ER Diagram', completed: true },
    { id: 2, text: 'AI Mentor Research Matchmaker Algorithm', completed: true },
    { id: 3, text: 'Mid-Term Capstone Defense Presentation Deck', completed: false }
  ]);

  const activeGroup = groups.find((g) => g.members.includes(currentUser.profile?.id)) || groups[0];

  const handleToggleTask = (taskId) => {
    setSprintTasks(sprintTasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
    triggerToast('Sprint deliverable checklist updated.');
  };

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '6rem', padding: '4rem 0' }}>
      
      {/* 1. MASSIVE TYPOGRAPHY HERO SECTION */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 2rem' }}>
        <h1 className="editorial-display" style={{ marginBottom: '2rem' }}>
          Welcome back,<br/>
          <span style={{ color: 'var(--upes-gray)' }}>{currentUser.profile?.name.split(' ')[0]}</span>.
        </h1>
        <p className="editorial-subtitle">
          {activeGroup?.title || 'Autonomous AI-Powered Mentor & Group Allocation Portal'}
        </p>
        <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-editorial-primary" onClick={() => setActiveTab('groups')}>
            Team Roster <ArrowUpRight size={20} />
          </button>
          <button className="btn-editorial-outline" onClick={() => setActiveTab('mentors')}>
            Mentor Hub <ArrowUpRight size={20} />
          </button>
        </div>
      </section>

      {/* 2. HUGE STATS GRID */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 2rem' }}>
        <div className="editorial-grid">
          
          <div className="editorial-card col-span-3 delay-100 hover-elevate">
            <div className="editorial-card-label">Credits Req.</div>
            <div className="editorial-card-stat">200</div>
            <div style={{ color: 'var(--upes-gray-dark)', fontWeight: 500 }}>B.Tech CSE Final Year</div>
          </div>
          
          <div className="editorial-card col-span-3 delay-200 hover-elevate">
            <div className="editorial-card-label">Completed</div>
            <div className="editorial-card-stat" style={{ color: 'var(--upes-accent)' }}>160</div>
            <div style={{ color: 'var(--upes-gray-dark)', fontWeight: 500 }}>80% Degree Progress</div>
          </div>

          <div className="editorial-card col-span-6 delay-300 hover-elevate" style={{ background: 'var(--text-main)', color: 'var(--upes-white)' }}>
            <div className="editorial-card-label" style={{ color: 'var(--upes-gray)' }}>Assigned Faculty Mentor</div>
            <div className="editorial-h2" style={{ marginTop: '1rem', marginBottom: '0.5rem', color: 'var(--upes-white)' }}>
              Dr. Tanupriya Choudhury
            </div>
            <div style={{ color: 'var(--upes-gray)', marginBottom: '3rem' }}>Head of Project Cell • SoCS</div>
            
            <div style={{ marginTop: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 600 }}>
                <span>Phase 3: Defense</span>
                <span>78%</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)' }}>
                <div style={{ width: '78%', height: '100%', background: 'var(--upes-white)' }}></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. EDITORIAL LISTS / ASYMMETRICAL LAYOUT */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 2rem' }}>
        <div className="editorial-grid">
          
          {/* Left: Agenda */}
          <div className="col-span-8">
            <h3 className="editorial-h2" style={{ marginBottom: '2rem' }}>Today's Agenda</h3>
            
            <div style={{ borderTop: '2px solid var(--text-main)' }}>
              {/* Session Item */}
              <div style={{ padding: '2rem 0', borderBottom: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '150px 1fr auto', gap: '2rem', alignItems: 'start' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>14:00</div>
                <div>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Mentor Review Sync</h4>
                  <p style={{ color: 'var(--upes-gray-dark)', marginBottom: '1rem' }}>Room 402 • Block 3 (SoCS)</p>
                  <p style={{ color: 'var(--upes-gray-dark)' }}>Presentation of Phase 3 implementation, AI Matchmaker validation, and review of the grading rubric.</p>
                </div>
                <div>
                  <button className="btn-editorial-outline" style={{ padding: '0.75rem 1.5rem', fontSize: '0.85rem' }} onClick={() => triggerToast('Check-in recorded.')}>
                    Check In
                  </button>
                </div>
              </div>
              {/* Notice Item */}
              <div style={{ padding: '2rem 0', borderBottom: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '150px 1fr auto', gap: '2rem', alignItems: 'start' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Notice</div>
                <div>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#b91c1c' }}>Final PPT Submission Guidelines</h4>
                  <p style={{ color: 'var(--upes-gray-dark)', marginBottom: '1rem' }}>High Priority</p>
                  <p style={{ color: 'var(--upes-gray-dark)' }}>All groups must submit their finalized presentation decks by Friday EOD for the external review panel.</p>
                </div>
                <div>
                  <button className="btn-editorial-outline" style={{ padding: '0.75rem 1.5rem', fontSize: '0.85rem' }} onClick={() => triggerToast('Downloaded Guidelines')}>
                    Download
                  </button>
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '4rem' }}>
              <h3 className="editorial-h2" style={{ marginBottom: '1.5rem' }}>Source Code Validation</h3>
              <GitHubGraph />
            </div>
          </div>

          {/* Right: Deliverables */}
          <div className="col-span-4">
             <h3 className="editorial-h2" style={{ marginBottom: '2rem' }}>Deliverables</h3>
             
             <div style={{ borderTop: '2px solid var(--text-main)', paddingTop: '2rem' }}>
                {sprintTasks.map((task, idx) => (
                  <div key={task.id} style={{ marginBottom: '2rem' }}>
                    <div onClick={() => handleToggleTask(task.id)} style={{ display: 'flex', gap: '1.25rem', cursor: 'pointer', alignItems: 'flex-start', padding: '0.5rem', borderRadius: '8px', transition: 'background-color 0.2s', ':hover': { backgroundColor: 'var(--upes-gray-light)' } }}>
                      <div style={{ marginTop: '2px', transition: 'transform 0.2s', transform: task.completed ? 'scale(1.1)' : 'scale(1)' }}>
                        {task.completed ? <CheckSquare size={28} color="var(--text-main)" /> : <Square size={28} color="var(--upes-gray)" />}
                      </div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 600, color: task.completed ? 'var(--upes-gray)' : 'var(--text-main)', textDecoration: task.completed ? 'line-through' : 'none', lineHeight: 1.4, transition: 'all 0.2s' }}>
                        {task.text}
                      </div>
                    </div>
                    {/* Mock Turnitin/GitHub integrations for completed deliverables */}
                    {task.completed && idx === 0 && (
                      <div style={{ marginLeft: '3.75rem', marginTop: '0.5rem', display: 'flex', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 700, color: '#16a34a', backgroundColor: '#f0fdf4', padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid #bbf7d0' }}>
                          <FileCheck size={14} /> Turnitin: 8% (Safe)
                        </div>
                      </div>
                    )}
                    {task.completed && idx === 1 && (
                      <div style={{ marginLeft: '3.75rem', marginTop: '0.5rem', display: 'flex', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', backgroundColor: '#eff6ff', padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid #bfdbfe' }}>
                          <GitBranch size={14} /> Synced to Main Branch
                        </div>
                      </div>
                    )}
                  </div>
                ))}
             </div>
             
             <div style={{ marginTop: '4rem' }}>
                <h3 className="editorial-h2" style={{ marginBottom: '2rem' }}>Team</h3>
                <div style={{ borderTop: '2px solid var(--text-main)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   {[
                    { name: 'Daksh Mehrotra', role: 'Team Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
                    { name: 'Ananya Sharma', role: 'Frontend Lead', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80' },
                    { name: 'Rohan Verma', role: 'Auth Lead', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' }
                   ].map((member, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src={member.avatar} alt="avatar" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                           <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{member.name}</div>
                           <div style={{ color: 'var(--upes-gray-dark)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{member.role}</div>
                        </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

        </div>
      </section>

    </div>
  );
};
