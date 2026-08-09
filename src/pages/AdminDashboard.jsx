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
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Project Cell Analytics
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
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
          <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
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
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>{bar.count}</div>
                  <div style={{ 
                    width: '100%', 
                    height: `${height}%`, 
                    backgroundColor: i === 3 ? '#3b82f6' : '#cbd5e1',
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.5s ease'
                  }} />
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>{bar.grade}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Center */}
        <div className="portal-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Admin Action Center</h3>
           
           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
             <AlertTriangle size={24} color="#ef4444" />
             <div>
               <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#991b1b' }}>Pending Reviews</div>
               <div style={{ fontSize: '0.75rem', color: '#b91c1c' }}>14 Groups waiting for Mentor Allocation</div>
             </div>
           </div>

           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
             <BookOpen size={24} color="#16a34a" />
             <div>
               <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#166534' }}>Generate End-Term Report</div>
               <div style={{ fontSize: '0.75rem', color: '#15803d' }}>Export all scores to UPES Examination format</div>
             </div>
           </div>

           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
             <PieChart size={24} color="#475569" />
             <div>
               <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Domain Analytics</div>
               <div style={{ fontSize: '0.75rem', color: '#475569' }}>65% AI/ML, 20% Web3, 15% Cloud</div>
             </div>
           </div>
        </div>
      </div>

    </div>
  );
};
