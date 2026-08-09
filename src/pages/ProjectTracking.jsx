import React, { useState } from 'react';
import { 
  Kanban, 
  Plus, 
  Calendar, 
  Award, 
  User, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRightLeft,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/common/Modal';

export const ProjectTracking = () => {
  const { tasks, updateTaskStatus, addTask, gradeTask, currentUser } = useApp();

  const [selectedTask, setSelectedTask] = useState(null);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  // New task form
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('High');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Daksh Mehrotra');
  const [newTaskDue, setNewTaskDue] = useState('2026-10-30');

  const handleCreateTaskSubmit = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask({
      title: newTaskTitle,
      description: newTaskDesc,
      priority: newTaskPriority,
      assignee: newTaskAssignee,
      dueDate: newTaskDue,
    });
    setIsCreateTaskModalOpen(false);
    setNewTaskTitle('');
    setNewTaskDesc('');
  };

  const columns = [
    { id: 'To Do', title: 'To Do / Planned', color: '#64748b', bg: '#f8fafc' },
    { id: 'In Progress', title: 'In Progress', color: '#0284c7', bg: '#e0f2fe' },
    { id: 'Under Review', title: 'Under Faculty Review', color: '#d97706', bg: '#fef3c7' },
    { id: 'Done', title: 'Completed & Evaluated', color: '#10b981', bg: '#d1fae5' },
  ];

  const handleOpenMoveModal = (taskObj) => {
    setSelectedTask(taskObj);
    setIsMoveModalOpen(true);
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedTask) return;
    updateTaskStatus(selectedTask.id, newStatus);
    setIsMoveModalOpen(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Top Header Banner */}
      <div className="portal-card" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <span className="badge-pill badge-purple">Capstone Phase 1 & 2</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Sprint Tracking</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Milestones & Agile Kanban Board
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Track project deliverables from synopsis to end-term defense. All transitions are logged for faculty review.
          </p>
        </div>

        <button
          onClick={() => setIsCreateTaskModalOpen(true)}
          className="btn-upes"
        >
          <Plus size={18} />
          <span>New Deliverable Task</span>
        </button>
      </div>

      {/* 4-Column Kanban Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(280px, 1fr))',
        gap: '1.25rem',
        overflowX: 'auto',
        paddingBottom: '1rem'
      }}>
        {columns.map((col) => {
          const columnTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div key={col.id} className="kanban-column">
              {/* Column Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                borderTop: `4px solid ${col.color}`,
                boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)',
                marginBottom: '1rem',
                position: 'sticky',
                top: 0,
                zIndex: 10
              }}>
                <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                  {col.title}
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  backgroundColor: col.bg,
                  color: col.color,
                  padding: '0.15rem 0.6rem',
                  borderRadius: '99px'
                }}>
                  {columnTasks.length}
                </span>
              </div>

              {/* Cards List in Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    className="kanban-card hover-elevate"
                    style={{ 
                      position: 'relative', 
                      cursor: 'pointer', 
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      border: '1px solid rgba(0,0,0,0.04)',
                      boxShadow: '0 4px 15px -3px rgba(0,0,0,0.05), 0 2px 6px -2px rgba(0,0,0,0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span className={`badge-pill ${
                        task.priority === 'Critical' ? 'badge-danger' : 
                        task.priority === 'High' ? 'badge-warning' : 'badge-info'
                      }`}>
                        {task.priority}
                      </span>

                      {task.score !== null && task.score !== undefined && (
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          backgroundColor: '#d1fae5',
                          color: '#10b981',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <Award size={12} />
                          <span>{task.score}/100</span>
                        </span>
                      )}
                    </div>

                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      {task.title}
                    </h4>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '0.75rem' }}>
                      {task.description}
                    </p>

                    {task.feedback && (
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6d28d9',
                        backgroundColor: '#ede9fe',
                        padding: '0.5rem 0.6rem',
                        borderRadius: '6px',
                        marginBottom: '0.75rem',
                        lineHeight: 1.3
                      }}>
                        <b>Mentor Feedback:</b> "{task.feedback}"
                      </div>
                    )}

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '0.6rem',
                      borderTop: '1px solid var(--border-color)',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)'
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={13} />
                        <span>{task.dueDate}</span>
                      </span>

                      <button
                        onClick={() => handleOpenMoveModal(task)}
                        style={{
                          backgroundColor: '#f1f5f9',
                          color: 'var(--upes-purple)',
                          padding: '0.3rem 0.65rem',
                          borderRadius: '4px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        <ArrowRightLeft size={12} />
                        <span>Move</span>
                      </button>
                    </div>
                  </div>
                ))}

                {columnTasks.length === 0 && (
                  <div style={{
                    padding: '3rem 1rem',
                    textAlign: 'center',
                    border: '2px dashed #cbd5e1',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    color: '#64748b',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <FileCheck size={24} color="#cbd5e1" />
                    No tasks in {col.title}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MOVE TASK STATUS MODAL */}
      <Modal
        isOpen={isMoveModalOpen}
        onClose={() => setIsMoveModalOpen(false)}
        title="Move Task Status"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Select the target column for <b>{selectedTask?.title}</b>:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {columns.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleStatusChange(c.id)}
                style={{
                  padding: '0.85rem',
                  borderRadius: '8px',
                  border: selectedTask?.status === c.id ? '2px solid var(--upes-purple)' : '1px solid var(--border-color)',
                  backgroundColor: selectedTask?.status === c.id ? '#ede9fe' : '#ffffff',
                  color: 'var(--text-primary)',
                  fontWeight: selectedTask?.status === c.id ? 700 : 500,
                  textAlign: 'left'
                }}
              >
                <div style={{ fontSize: '0.9rem' }}>{c.title}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Column status</div>
              </button>
            ))}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        title="Add New Deliverable Milestone"
      >
        <form onSubmit={handleCreateTaskSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Milestone / Task Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. End-Term Report LaTeX Formatting"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Description & Acceptance Criteria
            </label>
            <textarea
              rows={3}
              placeholder="Explain deliverable specifications..."
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Priority
              </label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Due Date
              </label>
              <input
                type="date"
                value={newTaskDue}
                onChange={(e) => setNewTaskDue(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={() => setIsCreateTaskModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-upes">
              Add Milestone Task
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
