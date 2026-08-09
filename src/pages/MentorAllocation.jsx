import React, { useState } from 'react';
import { 
  UserCheck, 
  Sparkles, 
  Award, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Send, 
  MessageSquare,
  ShieldAlert,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateMentorMatchScore } from '../data/mockData';
import { Modal } from '../components/common/Modal';

export const MentorAllocation = () => {
  const { 
    currentUser, 
    mentors, 
    groups, 
    submitMentorRequest, 
    reviewMentorRequest,
    removeMentorFromGroup 
  } = useApp();

  // Get current user's group
  const myGroup = groups.find((g) => g.members.includes(currentUser.profile?.id)) || groups[0];

  const [abstractText, setAbstractText] = useState(
    myGroup?.abstract || 'Replaces informal verbal communication in UPES project formation with a standardized, auditable web portal. Features AI-based mentor matching, structured group invitations, real-time credit tracking, and continuous rubric evaluation.'
  );

  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewGroup, setReviewGroup] = useState(null);
  const [reviewFeedback, setReviewFeedback] = useState('');

  const [searchFilter, setSearchFilter] = useState('');

  // Calculate scores for all mentors based on abstractText
  const mentorsWithScores = mentors.map((mentor) => {
    const matchScore = calculateMentorMatchScore(abstractText, mentor);
    return {
      ...mentor,
      matchScore,
      isFull: mentor.currentAllocated >= mentor.maxQuota,
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const handleOpenRequestModal = (mentor) => {
    setSelectedMentor(mentor);
    setIsRequestModalOpen(true);
  };

  const handleSendRequest = (e) => {
    e.preventDefault();
    if (!myGroup || !selectedMentor) return;
    submitMentorRequest(myGroup.id, selectedMentor.id, abstractText);
    setIsRequestModalOpen(false);
  };

  const handleOpenReviewModal = (groupObj) => {
    setReviewGroup(groupObj);
    setReviewFeedback(groupObj.feedback || '');
    setIsReviewModalOpen(true);
  };

  const handleApprove = () => {
    if (!reviewGroup) return;
    reviewMentorRequest(reviewGroup.id, true, reviewFeedback);
    setIsReviewModalOpen(false);
  };

  const handleRequestRevision = () => {
    if (!reviewGroup) return;
    reviewMentorRequest(reviewGroup.id, false, reviewFeedback);
    setIsReviewModalOpen(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* 
        1. TOP ABSTRACT ANALYZER ENGINE (Developer-Style)
        This section allows students to paste their project abstract.
        It calculates a semantic keyword match against the faculty's research domains.
      */}
      <div 
        className="portal-card" 
        style={{
          backgroundColor: '#ffffff',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              backgroundColor: '#f1f5f9',
              color: '#334155',
              padding: '0.65rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e2e8f0'
            }}>
              <Search size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                Semantic Research Domain Analyzer
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Paste or edit your project abstract to compute keyword compatibility and research alignment with SoCS faculty mentors.
              </p>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'rgba(59, 130, 246, 0.15)', 
            border: '1px solid rgba(59, 130, 246, 0.35)', 
            padding: '0.45rem 1rem', 
            borderRadius: '99px',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#60a5fa',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <span>Top Recommended:</span>
            <span>{mentorsWithScores[0]?.name} ({mentorsWithScores[0]?.matchScore}% Match)</span>
          </div>
        </div>

        {/* Abstract Input Textarea */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            PROJECT ABSTRACT & DOMAIN KEYWORDS
          </label>
          <textarea
            rows={3}
            value={abstractText}
            onChange={(e) => setAbstractText(e.target.value)}
            placeholder="Describe your project (e.g., AI/ML, React portal, blockchain security, cloud microservices...)"
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              borderRadius: '6px',
              padding: '0.85rem',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-primary)'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#64748b' }}>
            <span>Analyzes keywords: AI, Cloud, React, Blockchain, Security, DevOps, UI/UX...</span>
            <span>Live semantic ranking enabled</span>
          </div>
        </div>
      </div>

      {/* 2. ROLE-SPECIFIC REVIEW DASHBOARD (If Mentor or Admin role is active) */}
      {(currentUser.role === 'mentor' || currentUser.role === 'admin') && (
        <div className="portal-card" style={{ borderLeft: '4px solid #f107a3', backgroundColor: '#fff1f2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Faculty Mentor Review & Approval Queue ({currentUser.profile?.name})
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Review incoming standardized mentor allocation requests. Replacing verbal approvals with auditable portal decisions.
              </p>
            </div>
            <span className="badge-pill badge-danger">Faculty Authority Active</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            {groups.map((grp) => (
              <div
                key={grp.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--upes-purple)', backgroundColor: '#ede9fe', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                    {grp.groupCode}
                  </span>
                  <span className={`badge-pill ${grp.status.includes('Approved') ? 'badge-success' : 'badge-warning'}`}>
                    {grp.status}
                  </span>
                </div>

                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                  {grp.title}
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {grp.abstract}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.6rem', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Team Members: <b>{grp.members.length}/4</b>
                  </span>
                  <button
                    onClick={() => handleOpenReviewModal(grp)}
                    className="btn-upes"
                    style={{ padding: '0.45rem 0.9rem', fontSize: '0.78rem' }}
                  >
                    <span>Review & Action</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 
        3. FACULTY MENTORS DIRECTORY & MATCH SCORES 
        Displays all mentors sorted by their semantic relevance score.
        Includes a search filter and visually highlights the top recommended mentor.
      */}
      <div className="portal-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              SoCS Faculty Mentor Catalog & Quota Tracking
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Standardized mentor allocation replaces informal verbal communication. Mentors are sorted by semantic abstract compatibility score.
            </p>
          </div>

          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search faculty or research domain..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{ width: '100%', paddingLeft: '2.3rem', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        {/* Mentors Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {mentorsWithScores
            .filter((m) =>
              m.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
              m.researchAreas.some((a) => a.toLowerCase().includes(searchFilter.toLowerCase()))
            )
            .map((mentor, index) => {
              const isRecommended = index === 0 && mentor.matchScore >= 75;
              const isAllocatedToMyGroup = myGroup?.mentorId === mentor.id;

              return (
                <div
                  key={mentor.id}
                  className="portal-card hover-elevate"
                  style={{
                    border: isRecommended ? '2px solid #00d2ff' : isAllocatedToMyGroup ? '2px solid var(--upes-purple)' : '1px solid var(--border-color)',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    position: 'relative'
                  }}
                >
                  {/* Top Badge: Recommended or Allocated */}
                  {isRecommended && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '16px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.65rem',
                      borderRadius: '99px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
                    }}>
                      <Search size={12} />
                      <span>TOP MATCH ({mentor.matchScore}%)</span>
                    </div>
                  )}

                  {isAllocatedToMyGroup && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '16px',
                      backgroundColor: 'var(--status-success)',
                      color: 'white',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.65rem',
                      borderRadius: '99px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}>
                      <CheckCircle2 size={12} />
                      <span>ALLOCATED TO YOUR GROUP</span>
                    </div>
                  )}

                  {/* Mentor Header Info */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {mentor.name}
                      </h4>
                      <div style={{ fontSize: '0.78rem', color: 'var(--upes-purple)', fontWeight: 600 }}>
                        {mentor.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                        {mentor.school} • ★ {mentor.rating}
                      </div>
                    </div>

                    {/* Semantic Match Score Badge */}
                    <div style={{
                      textAlign: 'center',
                      backgroundColor: '#f1f5f9',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{ fontSize: '0.65rem', color: '#475569', fontWeight: 700 }}>RELEVANCE</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                        {mentor.matchScore}%
                      </div>
                    </div>
                  </div>

                  {/* Research Specializations */}
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                      RESEARCH AREAS
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {mentor.researchAreas.map((area) => (
                        <span
                          key={area}
                          style={{
                            fontSize: '0.72rem',
                            backgroundColor: '#f1f5f9',
                            color: 'var(--text-primary)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '4px',
                            fontWeight: 600
                          }}
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio & Office Hours */}
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {mentor.bio}
                  </p>

                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    backgroundColor: '#f8fafc',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Clock size={14} color="var(--upes-purple)" />
                    <span><b>Office:</b> {mentor.officeHours}</span>
                  </div>

                  {/* Quota Gauge & Action Footer */}
                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>MENTOR QUOTA</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: mentor.isFull ? 'var(--status-danger)' : 'var(--text-primary)' }}>
                        {mentor.currentAllocated} / {mentor.maxQuota} Groups Allocated
                      </div>
                    </div>

                    {isAllocatedToMyGroup ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="badge-pill badge-success">Assigned Mentor</span>
                        {currentUser.role === 'student' && (
                          <button
                            onClick={() => removeMentorFromGroup(myGroup.id)}
                            style={{
                              fontSize: '0.75rem',
                              color: '#be185d',
                              backgroundColor: '#fff1f2',
                              border: '1px solid #fecdd3',
                              padding: '0.35rem 0.65rem',
                              borderRadius: '4px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ) : mentor.isFull ? (
                      <span className="badge-pill badge-danger">Quota Full</span>
                    ) : (
                      <button
                        onClick={() => handleOpenRequestModal(mentor)}
                        className="btn-upes"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                      >
                        <Send size={14} />
                        <span>Request Mentor</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* STUDENT: SUBMIT MENTOR REQUEST MODAL */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        title={`Submit Standardized Mentor Request (${selectedMentor?.name})`}
      >
        <form onSubmit={handleSendRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
              Selected Group: {myGroup?.name} ({myGroup?.groupCode})
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Project: {myGroup?.title}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Finalized Project Abstract & Scope (Auditable Record)
            </label>
            <textarea
              rows={5}
              required
              value={abstractText}
              onChange={(e) => setAbstractText(e.target.value)}
              style={{ width: '100%', fontSize: '0.88rem' }}
            />
          </div>

          <div style={{
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            backgroundColor: '#fffbeb',
            borderLeft: '4px solid var(--status-warning)',
            padding: '0.75rem'
          }}>
            <b>Standardized Workflow Notice:</b> Once submitted, {selectedMentor?.name} will review your abstract. Verbal approvals without portal endorsement are invalid.
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={() => setIsRequestModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-upes">
              Confirm & Send Allocation Request
            </button>
          </div>
        </form>
      </Modal>

      {/* MENTOR/ADMIN: REVIEW INCOMING REQUEST MODAL */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title={`Review Mentor Allocation Request (${reviewGroup?.groupCode})`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>{reviewGroup?.title}</h4>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Team Name: {reviewGroup?.name} • Members: {reviewGroup?.members?.length}/4
            </div>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              SUBMITTED ABSTRACT
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {reviewGroup?.abstract}
            </p>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Faculty Feedback / Review Notes
            </label>
            <textarea
              rows={3}
              placeholder="Provide constructive feedback or approval remarks..."
              value={reviewFeedback}
              onChange={(e) => setReviewFeedback(e.target.value)}
              style={{ width: '100%', fontSize: '0.88rem' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            <button
              onClick={handleRequestRevision}
              className="btn-danger"
            >
              Request Revision
            </button>
            <button
              onClick={handleApprove}
              className="btn-upes"
              style={{ backgroundColor: 'var(--status-success)', border: 'none' }}
            >
              Approve Allocation
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
