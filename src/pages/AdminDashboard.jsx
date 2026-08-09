import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  UserCheck, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  BookOpen,
  PieChart
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    students, 
    mentors, 
    groups, 
    tasks 
  } = useApp();

  // Compute analytics
  const totalStudents = students.length;
  const studentsWithGroups = students.filter(s => s.groupId).length;
  const unassignedStudents = totalStudents - studentsWithGroups;

  const totalMentors = mentors.length;
  const totalCapacity = mentors.reduce((acc, curr) => acc + curr.maxQuota, 0);
  const allocatedCapacity = mentors.reduce((acc, curr) => acc + curr.currentAllocated, 0);
  const utilizationPercent = Math.round((allocatedCapacity / totalCapacity) * 100) || 0;

  const completedTasks = tasks.filter(t => t.status === 'Done').length;
  const totalTasks = tasks.length;
  const globalProgress = Math.round((completedTasks / totalTasks) * 100) || 0;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div style={{ 
        padding: '2.5rem 2rem', 
        borderRadius: '20px', 
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        color: '#1e293b',
        boxShadow: '0 10px 30px -10px rgba(99, 102, 241, 0.15)'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'linear-gradient(to right, #4f46e5, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          <Activity size={32} color="#6366f1" />
          Project Cell Analytics
        </h2>
        <p style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>
          Global overview of batch progress, mentor utilization, and academic health.
        </p>
      </div>

      {/* Top Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        
        {/* Student Group Formation */}
        <div className="portal-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>STUDENT ALLOCATION</div>
            <Users size={20} color="#3b82f6" />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{studentsWithGroups} / {totalStudents}</div>
            <div style={{ fontSize: '0.85rem', color: unassignedStudents > 0 ? '#ef4444' : '#10b981', fontWeight: 600 }}>
              {unassignedStudents > 0 ? `${unassignedStudents} Unassigned Students Action Required` : '100% Allocation Achieved'}
            </div>
          </div>
        </div>

        {/* Mentor Capacity */}
        <div className="portal-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>MENTOR UTILIZATION</div>
            <UserCheck size={20} color="#8b5cf6" />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{utilizationPercent}%</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
              {allocatedCapacity} of {totalCapacity} groups assigned
            </div>
          </div>
          <div style={{ width: '100%', backgroundColor: '#e2e8f0', height: '6px', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${utilizationPercent}%`, backgroundColor: '#8b5cf6', height: '100%' }} />
          </div>
        </div>

        {/* Global Progress */}
        <div className="portal-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>GLOBAL MILESTONE PROGRESS</div>
            <Activity size={20} color="#10b981" />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{globalProgress}%</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
              {completedTasks} / {totalTasks} major deliverables evaluated
            </div>
          </div>
          <div style={{ width: '100%', backgroundColor: '#e2e8f0', height: '6px', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${globalProgress}%`, backgroundColor: '#10b981', height: '100%' }} />
          </div>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
        {/* Mock Bell Curve Chart */}
        <div className="portal-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Semester Grading Distribution</h3>
            <span style={{ fontSize: '0.75rem', backgroundColor: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>Mid-Term Eval</span>
          </div>
          <div style={{ height: '260px', display: 'flex', alignItems: 'flex-end', gap: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0', marginTop: '1rem' }}>
            {/* Simple CSS Bar Chart Mock */}
            {[
              { grade: '< 60', count: 5 },
              { grade: '60-70', count: 15 },
              { grade: '70-80', count: 45 },
              { grade: '80-90', count: 85 },
              { grade: '90+', count: 30 }
            ].map((bar, i) => {
              const maxCount = 85;
              const height = (bar.count / maxCount) * 100;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: i === 3 ? '#6366f1' : '#64748b' }}>{bar.count}</div>
                  <div style={{ 
                    width: '48px', 
                    height: `${height}%`, 
                    background: i === 3 ? 'linear-gradient(180deg, #6366f1 0%, #4f46e5 100%)' : 'linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)',
                    borderRadius: '8px 8px 0 0',
                    transition: 'height 1s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: i === 3 ? '0 10px 20px -5px rgba(99, 102, 241, 0.5)' : 'none'
                  }} />
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>{bar.grade}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Center */}
        <div className="portal-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Admin Action Center</h3>
           
           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'none'}>
             <AlertTriangle size={24} color="#ef4444" />
             <div>
               <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#991b1b' }}>Pending Reviews</div>
               <div style={{ fontSize: '0.75rem', color: '#b91c1c' }}>14 Groups waiting for Mentor Allocation</div>
             </div>
           </div>

           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', backgroundColor: 'rgba(34, 197, 94, 0.05)', borderRadius: '12px', border: '1px solid rgba(34, 197, 94, 0.2)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'none'}>
             <BookOpen size={24} color="#16a34a" />
             <div>
               <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#166534' }}>Generate End-Term Report</div>
               <div style={{ fontSize: '0.75rem', color: '#15803d' }}>Export all scores to UPES Examination format</div>
             </div>
           </div>

           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', backgroundColor: 'rgba(99, 102, 241, 0.05)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'none'}>
             <PieChart size={24} color="#6366f1" />
             <div>
               <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#4338ca' }}>Domain Analytics</div>
               <div style={{ fontSize: '0.75rem', color: '#4f46e5' }}>65% AI/ML, 20% Web3, 15% Cloud</div>
             </div>
           </div>
        </div>
      </div>

    </div>
  );
};
