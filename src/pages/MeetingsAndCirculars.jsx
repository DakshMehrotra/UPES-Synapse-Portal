import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Bell, 
  AlertCircle, 
  Plus, 
  MapPin, 
  User, 
  FileText, 
  CheckCircle2, 
  Send,
  Users,
  Video,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/common/Modal';

export const MeetingsAndCirculars = () => {
  const { notices, meetings, groups, mentors, students, schedulePresentation, requestReschedule, recordAttendance, escalateAbsence, addNotice, currentUser } = useApp();

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('mock');
  const [newDate, setNewDate] = useState('2026-11-15');
  const [newTime, setNewTime] = useState('14:30 - 15:30 IST');
  const [newLocation, setNewLocation] = useState('Room 402, Block 3 (SoCS Lab)');
  const [newAgenda, setNewAgenda] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0]?.id || '');
  const [selectedPanelists, setSelectedPanelists] = useState([]);

  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [rescheduleMeetingId, setRescheduleMeetingId] = useState(null);
  const [rescheduleReason, setRescheduleReason] = useState('');

  // Circular publication modal for faculty/admin
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('Academic Notice');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeImportant, setNoticeImportant] = useState(false);

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    schedulePresentation({
      title: newTitle,
      type: newType,
      date: newDate,
      time: newTime,
      location: newLocation,
      agenda: newAgenda,
      groupId: selectedGroupId,
      panel: [currentUser.profile?.name, ...selectedPanelists]
    });
    setIsBookModalOpen(false);
    setNewTitle('');
    setNewAgenda('');
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    requestReschedule(rescheduleMeetingId, newDate, newTime, rescheduleReason);
    setIsRescheduleModalOpen(false);
    setRescheduleReason('');
  };

  const handleNoticeSubmit = (e) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeContent.trim()) return;
    addNotice({
      title: noticeTitle,
      category: noticeCategory,
      content: noticeContent,
      isImportant: noticeImportant,
    });
    setIsNoticeModalOpen(false);
    setNoticeTitle('');
    setNoticeContent('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Top Standardized Policy Banner */}
      <div className="portal-card" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        backgroundColor: '#f8fafc',
        borderLeft: '4px solid #00d2ff'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <span className="badge-pill badge-info">Standardized Sync Module</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No Informal Scheduling</span>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Meetings, Defenses & Official Circulars
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Official calendar for mentor review sessions and university project notifications.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          {(currentUser.role === 'mentor' || currentUser.role === 'admin') && (
            <button
              onClick={() => setIsNoticeModalOpen(true)}
              className="btn-upes"
              style={{ backgroundColor: '#be185d', borderColor: '#be185d' }}
            >
              <Send size={16} />
              <span>Publish Official Circular</span>
            </button>
          )}

          <button
            onClick={() => setIsBookModalOpen(true)}
            className="btn-upes"
          >
            <Plus size={18} />
            <span>Book Mentor Review Slot</span>
          </button>
        </div>
      </div>

      {/* TWO COLUMNS: Upcoming Meetings & Official Circulars */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '1.75rem'
      }}>
        {/* Left Card: Upcoming Standardized Meetings */}
        <div className="portal-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Scheduled Mentor Review Sessions
            </h3>
            <span className="badge-pill badge-success">{meetings.length} Upcoming</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {meetings.map((mt) => {
              const meetingGroup = groups.find(g => g.id === mt.groupId);
              const meetingStudents = meetingGroup ? students.filter(s => meetingGroup.members.includes(s.id)) : [];
              const isMyMeeting = currentUser.role === 'student' && meetingGroup?.members.includes(currentUser.profile.id);
              const isPanelist = (currentUser.role === 'mentor' || currentUser.role === 'admin') && mt.panel?.includes(currentUser.profile?.name);

              return (
              <div
                key={mt.id}
                style={{
                  padding: '1.1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: mt.status === 'Confirmed' ? '#f0fdf4' : mt.status.includes('Reschedule') ? '#fffbeb' : '#ffffff',
                  borderLeft: mt.status === 'Confirmed' ? '4px solid #10b981' : mt.status.includes('Reschedule') ? '4px solid var(--status-warning)' : '4px solid var(--upes-purple)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span className={`badge-pill ${mt.status === 'Confirmed' ? 'badge-success' : mt.status.includes('Reschedule') ? 'badge-warning' : 'badge-purple'}`}>
                      {mt.status}
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', backgroundColor: '#e2e8f0', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                      {mt.type || 'MOCK'}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                    <Calendar size={14} />
                    <span>{mt.date} • {mt.time}</span>
                  </span>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {mt.title}
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Users size={14} color="var(--upes-purple)" />
                    <span><b>Panel:</b> {mt.panel?.join(', ') || mt.mentor}</span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} color="var(--upes-purple)" />
                    <span>{mt.location}</span>
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', backgroundColor: 'rgba(0,0,0,0.03)', padding: '0.65rem 0.8rem', borderRadius: '6px', marginTop: '0.35rem' }}>
                  <b>Agenda:</b> {mt.agenda}
                </div>

                {mt.status.includes('Reschedule') && mt.rescheduleDetails && (
                  <div style={{ fontSize: '0.78rem', color: '#b45309', backgroundColor: '#fef3c7', padding: '0.5rem 0.75rem', borderRadius: '6px', borderLeft: '3px solid #d97706', marginTop: '0.5rem' }}>
                    <b>Reschedule Request:</b> {mt.rescheduleDetails.newDate} @ {mt.rescheduleDetails.newTime} <br/>
                    <b>Reason:</b> {mt.rescheduleDetails.reason}
                  </div>
                )}

                {/* ACTION BLOCK FOR STUDENTS */}
                {isMyMeeting && !mt.status.includes('Reschedule') && (
                  <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => {
                        setRescheduleMeetingId(mt.id);
                        setIsRescheduleModalOpen(true);
                      }}
                      style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d97706', border: '1px solid #fcd34d', backgroundColor: '#fef3c7', padding: '0.35rem 0.75rem', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Request Reschedule
                    </button>
                  </div>
                )}

                {/* ATTENDANCE & ESCALATION BLOCK FOR PANELIST */}
                {isPanelist && meetingGroup && (
                  <div style={{ marginTop: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.5rem' }}>Mark Attendance: {meetingGroup.name}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {meetingStudents.map(student => (
                        <div key={student.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', padding: '0.4rem 0.75rem', borderRadius: '6px' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{student.name} ({student.sapId})</span>
                          
                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            <button
                              onClick={() => recordAttendance(mt.id, student.id, true)}
                              style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', borderRadius: '4px', border: '1px solid #86efac', backgroundColor: mt.attendance[student.id] === true ? '#22c55e' : '#f0fdf4', color: mt.attendance[student.id] === true ? 'white' : '#166534', cursor: 'pointer', fontWeight: 700 }}
                            >
                              Present
                            </button>
                            <button
                              onClick={() => recordAttendance(mt.id, student.id, false)}
                              style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', borderRadius: '4px', border: '1px solid #fca5a5', backgroundColor: mt.attendance[student.id] === false ? '#ef4444' : '#fef2f2', color: mt.attendance[student.id] === false ? 'white' : '#991b1b', cursor: 'pointer', fontWeight: 700 }}
                            >
                              Absent
                            </button>
                            {mt.attendance[student.id] === false && !mt.escalated && (
                              <button
                                onClick={() => escalateAbsence(mt.id, student.id)}
                                style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', borderRadius: '4px', border: 'none', backgroundColor: 'var(--status-danger)', color: 'white', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                              >
                                <AlertTriangle size={12} />
                                Escalate
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )})}
          </div>
        </div>

        {/* Right Card: Official Project Cell Circulars & Notices */}
        <div className="portal-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Official Major Project Cell Circulars
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Issued by Controller of Examinations & SoCS Project Head
              </span>
            </div>
            <span className="badge-pill badge-danger">High Priority Feed</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {notices.map((nt) => (
              <div
                key={nt.id}
                style={{
                  padding: '1.1rem',
                  borderRadius: '8px',
                  backgroundColor: nt.isImportant ? '#fff1f2' : '#f8fafc',
                  border: '1px solid var(--border-color)',
                  borderLeft: nt.isImportant ? '4px solid var(--status-danger)' : '4px solid var(--upes-purple)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: nt.isImportant ? 'var(--status-danger)' : 'var(--upes-purple)',
                    backgroundColor: nt.isImportant ? '#ffe4e6' : '#ede9fe',
                    padding: '0.15rem 0.6rem',
                    borderRadius: '4px'
                  }}>
                    {nt.isImportant ? 'DEADLINE ALERT' : 'OFFICIAL NOTICE'}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {nt.date}
                  </span>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {nt.title}
                </h4>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {nt.content}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.35rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <span><b>Issuer:</b> {nt.author}</span>
                  <span style={{ color: '#0077b6', fontWeight: 700, cursor: 'pointer' }}>Download Circular PDF ➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOOK MEETING MODAL */}
      <Modal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        title="Book Standardized Mentor Review Slot"
      >
        <form onSubmit={handleBookSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Review Session Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Phase 2 Backend API Code Review"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Presentation Type
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="mock">Mock Presentation</option>
                <option value="synopsis">Synopsis Defense</option>
                <option value="mid-term">Mid-Term Evaluation</option>
                <option value="end-term">End-Term Viva</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Target Project Group
              </label>
              <select
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="">Select a Group...</option>
                {groups.map(g => (
                  <option key={g.id} value={g.id}>{g.groupCode} - {g.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Preferred Date
              </label>
              <input
                type="date"
                required
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Preferred Time
              </label>
              <input
                type="text"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Location / Format
            </label>
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Agenda & Key Points for Mentor Discussion
            </label>
            <textarea
              rows={3}
              placeholder="Detail what you plan to demonstrate or resolve..."
              value={newAgenda}
              onChange={(e) => setNewAgenda(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={() => setIsBookModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-upes">
              Request Slot from Faculty Mentor
            </button>
          </div>
        </form>
      </Modal>

      {/* PUBLISH NOTICE MODAL (FOR FACULTY/ADMIN) */}
      <Modal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        title="Publish Official Project Cell Circular"
      >
        <form onSubmit={handleNoticeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Circular Title / Headline
            </label>
            <input
              type="text"
              required
              placeholder="e.g. [MANDATORY] Final Viva Presentation Schedule"
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Category
              </label>
              <select
                value={noticeCategory}
                onChange={(e) => setNoticeCategory(e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="Academic Notice">Academic Notice</option>
                <option value="Deadline Alert">Deadline Alert</option>
                <option value="Mentor Notice">Mentor Notice</option>
                <option value="Workshop">Workshop</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem' }}>
                <input
                  type="checkbox"
                  checked={noticeImportant}
                  onChange={(e) => setNoticeImportant(e.target.checked)}
                />
                <span style={{ color: 'var(--status-danger)' }}>Mark as Urgent / Deadline Alert</span>
              </label>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Circular Detailed Content
            </label>
            <textarea
              rows={4}
              required
              placeholder="Provide complete guidelines and instructions for SoCS students and mentors..."
              value={noticeContent}
              onChange={(e) => setNoticeContent(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={() => setIsNoticeModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-upes">
              Publish to All Users
            </button>
          </div>
        </form>
      </Modal>

      {/* REQUEST RESCHEDULE MODAL */}
      <Modal
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        title="Request Presentation Reschedule"
      >
        <form onSubmit={handleRescheduleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ backgroundColor: '#fffbeb', color: '#b45309', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem' }}>
            <b>Note:</b> Rescheduling is subject to panel availability and must be backed by a valid justification.
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Proposed Date
              </label>
              <input type="date" required value={newDate} onChange={(e) => setNewDate(e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Proposed Time
              </label>
              <input type="text" required value={newTime} onChange={(e) => setNewTime(e.target.value)} style={{ width: '100%' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Reason for Reschedule
            </label>
            <textarea
              rows={3}
              required
              placeholder="Provide a valid academic or medical reason..."
              value={rescheduleReason}
              onChange={(e) => setRescheduleReason(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={() => setIsRescheduleModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-upes">
              Submit Request
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
