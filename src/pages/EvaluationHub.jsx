import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  FileText, 
  Upload, 
  ExternalLink, 
  ShieldCheck, 
  Sliders,
  Sparkles,
  Plus,
  Printer,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/common/Modal';

export const EvaluationHub = () => {
  const { currentUser, groups, evalScores, updateGroupScore, deliverables, addDeliverable } = useApp();

  const activeGroup = groups.find((g) => g.members.includes(currentUser.profile?.id)) || groups[0];

  // Faculty grading interactive state (initialized from global AppContext)
  const [scores, setScores] = useState({
    techDepth: evalScores?.techDepth ?? 19,
    literature: evalScores?.literature ?? 18,
    codeQuality: evalScores?.codeQuality ?? 19,
    collaboration: evalScores?.collaboration ?? 18,
    viva: evalScores?.viva ?? 18,
  });

  const [mentorComment, setMentorComment] = useState(
    evalScores?.comment || 'Excellent technical implementation and architecture. The AI matchmaker and standardized portal audit flow exceed standard B.Tech Major Project expectations.'
  );

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newDelivTitle, setNewDelivTitle] = useState('');
  const [newDelivType, setNewDelivType] = useState('pdf');

  const { students, submitPeerReview, peerReviews } = useApp();
  const groupStudents = students.filter(s => activeGroup?.members.includes(s.id) && s.id !== currentUser.profile?.id);
  
  const [peerScores, setPeerScores] = useState({});
  const [peerComments, setPeerComments] = useState({});

  const handleGeneratePdf = () => {
    window.print();
  };

  const totalScore = Number(scores.techDepth) + Number(scores.literature) + Number(scores.codeQuality) + Number(scores.collaboration) + Number(scores.viva);

  const getGradeBadge = (pts) => {
    if (pts >= 90) return { label: 'A+ Grade (Outstanding)', color: '#10b981', bg: '#d1fae5' };
    if (pts >= 80) return { label: 'A Grade (Excellent)', color: '#0284c7', bg: '#e0f2fe' };
    if (pts >= 70) return { label: 'B+ Grade (Good)', color: '#d97706', bg: '#fef3c7' };
    return { label: 'B Grade (Satisfactory)', color: '#64748b', bg: '#f1f5f9' };
  };

  const currentGrade = getGradeBadge(totalScore);

  const rubrics = [
    {
      id: 'techDepth',
      title: '1. Technical Depth & System Architecture (20 pts)',
      desc: 'Complexity of algorithms, database schema, scalability, and security posture.',
    },
    {
      id: 'literature',
      title: '2. Literature Review & Problem Framing (20 pts)',
      desc: 'Clarity of problem statement, relevance of citations, and novelty of approach.',
    },
    {
      id: 'codeQuality',
      title: '3. Code Quality, UI/UX & Implementation (20 pts)',
      desc: 'Clean code aesthetics, responsiveness, error handling, and visual design fidelity.',
    },
    {
      id: 'collaboration',
      title: '4. Team Collaboration & Portal Audit Trail (20 pts)',
      desc: 'Evidence of standardized portal usage, task Kanban contributions, and milestone timeliness.',
    },
    {
      id: 'viva',
      title: '5. Final Defense Presentation & Oral Viva (20 pts)',
      desc: 'Communication skills, defense of technical choices, and demonstration of working prototype.',
    },
  ];

  const handleScoreChange = (paramId, val) => {
    setScores((prev) => ({
      ...prev,
      [paramId]: Number(val),
    }));
  };

  const handlePublish = (e) => {
    e.preventDefault();
    updateGroupScore(scores, mentorComment);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newDelivTitle.trim()) return;
    addDeliverable({
      title: newDelivTitle,
      type: newDelivType,
    });
    setNewDelivTitle('');
    setIsUploadModalOpen(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Top Banner */}
      <div className="portal-card" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        backgroundColor: '#ffffff',
        borderBottom: '4px solid #10b981'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: currentGrade.bg,
            color: currentGrade.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Award size={28} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
              <span className="badge-pill badge-info">{activeGroup?.groupCode || 'UPES-2026-CS-042'}</span>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                backgroundColor: currentGrade.bg,
                color: currentGrade.color,
                padding: '0.2rem 0.65rem',
                borderRadius: '99px'
              }}>
                {currentGrade.label}
              </span>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Standardized Evaluation & Rubrics Hub
            </h2>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Replaces informal grading with transparent, 5-parameter rubric evaluation by SoCS faculty mentors.
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>
              FINAL PROJECT SCORE
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
              {totalScore} <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>/ 100</span>
            </div>
          </div>
          
          <button 
            onClick={handleGeneratePdf}
            className="btn-upes hide-on-print" 
            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', backgroundColor: '#0f172a', borderColor: '#0f172a' }}
          >
            <Printer size={16} />
            Generate Official Report (PDF)
          </button>
        </div>
      </div>

      {/* TWO COLUMNS: Rubric Grading Sheet & Deliverable Submissions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
        gap: '1.75rem'
      }}>
        {/* Left Card: 5-Parameter Standardized Rubrics */}
        <div className="portal-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Major Project Evaluation Rubrics
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {currentUser.role === 'mentor' ? 'Interactive Faculty Grading Sheet (You are grading)' : 'Evaluated by Dr. Tanupriya Choudhury'}
              </span>
            </div>
            {currentUser.role === 'mentor' && (
              <span className="badge-pill badge-purple" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sliders size={13} />
                <span>Adjust Sliders</span>
              </span>
            )}
          </div>

          <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {rubrics.map((rubric) => {
              const currentVal = scores[rubric.id];
              return (
                <div key={rubric.id} style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                      {rubric.title}
                    </span>
                    <span style={{
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      color: 'var(--upes-purple)',
                      backgroundColor: '#ede9fe',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px'
                    }}>
                      {currentVal} / 20 pts
                    </span>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    {rubric.desc}
                  </p>

                  {currentUser.role === 'mentor' ? (
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={currentVal}
                      onChange={(e) => handleScoreChange(rubric.id, e.target.value)}
                      style={{
                        width: '100%',
                        accentColor: 'var(--upes-purple)',
                        cursor: 'pointer'
                      }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${(currentVal / 20) * 100}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #00d2ff, #7d2ae8)',
                        borderRadius: '99px'
                      }} />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mentor Remarks & Publish */}
            <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                FACULTY EVALUATOR COMMENTS & REMARKS
              </label>
              {currentUser.role === 'mentor' ? (
                <textarea
                  rows={3}
                  value={mentorComment}
                  onChange={(e) => setMentorComment(e.target.value)}
                  style={{ width: '100%', fontSize: '0.88rem', marginBottom: '0.75rem' }}
                />
              ) : (
                <div style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: '#fff1f2',
                  borderLeft: '4px solid #f107a3',
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.5
                }}>
                  "{mentorComment}"
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.4rem', fontWeight: 600 }}>
                    — Verified by Dr. Tanupriya Choudhury (Head of Project Cell)
                  </div>
                </div>
              )}

              {currentUser.role === 'mentor' && (
                <button
                  type="submit"
                  className="btn-upes"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '0.95rem' }}
                >
                  <Award size={18} />
                  <span>Publish Evaluation & Update Student GPA</span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Card: Milestone Deliverable Submission Portal */}
        <div className="portal-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Milestone Deliverable Repository
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Submitted reports, LaTeX synopses, and GitHub source code links for auditable faculty evaluation.
              </p>
            </div>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="btn-upes"
              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
            >
              <Plus size={15} />
              <span>Submit New</span>
            </button>
          </div>

          {/* List of Submitted Items from AppContext */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {deliverables.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    backgroundColor: item.type === 'github' ? '#f3e8ff' : '#e0f2fe',
                    color: item.type === 'github' ? '#7e22ce' : '#0284c7',
                    padding: '0.6rem',
                    borderRadius: '8px'
                  }}>
                    {item.type === 'github' ? <ExternalLink size={20} /> : <FileText size={20} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Submitted by {item.submittedBy} • {item.date}
                    </div>
                  </div>
                </div>
                <span className="badge-pill badge-success" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <CheckCircle2 size={14} />
                  <span>Verified</span>
                </span>
              </div>
            ))}
          </div>

          {/* Quick Upload Box */}
          <div style={{
            padding: '1.25rem',
            borderRadius: '8px',
            border: '2px dashed var(--border-color)',
            backgroundColor: '#ffffff',
            textAlign: 'center'
          }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#f1f5f9', color: 'var(--upes-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto' }}>
              <Upload size={20} />
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              Submit New Milestone Deliverable
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Upload PDF report, IEEE paper draft, or live demonstration URL.
            </div>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="btn-upes"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.82rem' }}
            >
              <Upload size={15} />
              <span>Upload Document / Link</span>
            </button>
          </div>

          {/* Audit Verification Footer */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '0.85rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)'
          }}>
            <ShieldCheck size={16} color="#10b981" />
            <span>
              All evaluations are digitally timestamped and synced with UPES Controller of Examinations DB.
            </span>
          </div>
        </div>
        
        {/* Peer Evaluation (Student Only) */}
        {currentUser.role === 'student' && (
          <div className="portal-card hide-on-print" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={20} color="var(--upes-purple)" />
                Intra-Group Peer Review
              </h3>
            </div>
            
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Evaluate your group members confidentially. This helps mentors identify individual contributions.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {groupStudents.map(student => {
                const hasReviewed = peerReviews.some(pr => pr.reviewerId === currentUser.profile?.id && pr.revieweeId === student.id);
                
                return (
                <div key={student.id} style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>{student.name}</div>
                  
                  {hasReviewed ? (
                    <div style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={16} /> Review Submitted Successfully
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          <span>Contribution Score</span>
                          <span style={{ color: 'var(--upes-purple)' }}>{peerScores[student.id] || 5} / 10</span>
                        </div>
                        <input 
                          type="range" min="1" max="10" 
                          value={peerScores[student.id] || 5} 
                          onChange={(e) => setPeerScores(prev => ({...prev, [student.id]: e.target.value}))}
                          style={{ width: '100%', accentColor: 'var(--upes-purple)' }}
                        />
                      </div>
                      
                      <textarea 
                        rows={2}
                        placeholder="Private feedback..."
                        value={peerComments[student.id] || ''}
                        onChange={(e) => setPeerComments(prev => ({...prev, [student.id]: e.target.value}))}
                        style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem' }}
                      />
                      
                      <button 
                        onClick={() => submitPeerReview(student.id, peerScores[student.id] || 5, peerComments[student.id] || '')}
                        className="btn-upes" style={{ fontSize: '0.75rem', padding: '0.5rem', alignSelf: 'flex-start' }}
                      >
                        Submit Confidential Review
                      </button>
                    </div>
                  )}
                </div>
              )})}
            </div>
          </div>
        )}

      </div>

      {/* UPLOAD MODAL */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Submit New Milestone Deliverable"
      >
        <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Deliverable Title / Report Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Phase 2 End-Term Report & Architecture Diagram"
              value={newDelivTitle}
              onChange={(e) => setNewDelivTitle(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Deliverable Format
            </label>
            <select
              value={newDelivType}
              onChange={(e) => setNewDelivType(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="pdf">LaTeX Report / IEEE Paper Draft (.pdf)</option>
              <option value="github">GitHub Source Repository / Pull Request (.git)</option>
              <option value="link">Live Demonstration URL / Web Portal Link (.html)</option>
            </select>
          </div>

          <div style={{ padding: '0.85rem', backgroundColor: '#f8fafc', borderRadius: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <b>Audit Note:</b> Once uploaded, a permanent SHA-256 timestamp will be recorded in the UPES Project Cell registry for faculty verification.
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={() => setIsUploadModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-upes">
              Confirm Submission
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
