import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  ShieldCheck, 
  Award, 
  Mail, 
  CheckCircle2, 
  AlertCircle,
  PlusCircle,
  FolderPlus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/common/Modal';

export const GroupFormation = () => {
  const { 
    currentUser, 
    students, 
    groups, 
    createGroup, 
    inviteMemberToGroup,
    removeMemberFromGroup
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Group Form State
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupTitle, setNewGroupTitle] = useState('');
  const [newGroupDomain, setNewGroupDomain] = useState('AI & Machine Learning');
  const [newGroupAbstract, setNewGroupAbstract] = useState('');

  // Get current user's group
  const myGroup = groups.find((g) => g.members.includes(currentUser.profile?.id));
  const myGroupMembers = myGroup
    ? students.filter((s) => myGroup.members.includes(s.id))
    : [];

  const allSkills = ['All', 'React', 'AI/ML Integration', 'Full Stack', 'Node.js', 'Deep Learning', 'AWS', 'Solidity', 'Python'];

  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.sapId.includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkill = 
      selectedSkillFilter === 'All' || 
      (student.skills && student.skills.includes(selectedSkillFilter));
    
    return matchesSearch && matchesSkill;
  });

  const handleCreateGroupSubmit = (e) => {
    e.preventDefault();
    if (!newGroupName.trim() || !newGroupTitle.trim()) return;

    createGroup({
      name: newGroupName,
      title: newGroupTitle,
      domain: newGroupDomain,
      abstract: newGroupAbstract,
      memberIds: []
    });

    setIsCreateModalOpen(false);
    setNewGroupName('');
    setNewGroupTitle('');
    setNewGroupAbstract('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Top Standardized Policy Banner */}
      <div className="portal-card" style={{
        backgroundColor: '#f8fafc',
        borderLeft: '4px solid var(--upes-purple)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            backgroundColor: '#ede9fe',
            color: 'var(--upes-purple)',
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Standardized Group Formation & Roster Hub
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Replaces informal verbal communication with an auditable, rule-validated team invitation workflow (Max 4 students per group).
            </div>
          </div>
        </div>

        {!myGroup && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-upes"
          >
            <FolderPlus size={18} />
            <span>Create New Project Group</span>
          </button>
        )}
      </div>

      {/* SECTION 1: USER'S ACTIVE GROUP ROSTER (If in a group) */}
      {myGroup ? (
        <div className="portal-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--upes-purple)', backgroundColor: '#ede9fe', padding: '0.2rem 0.6rem', borderRadius: '99px' }}>
                  {myGroup.groupCode}
                </span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--status-success)', backgroundColor: 'var(--status-success-bg)', padding: '0.2rem 0.6rem', borderRadius: '99px' }}>
                  {myGroup.status}
                </span>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {myGroup.name}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                <b>Project Title:</b> {myGroup.title}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'right', marginRight: '0.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Team Capacity</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: myGroup.members.length >= 4 ? 'var(--status-warning)' : 'var(--status-success)' }}>
                  {myGroup.members.length} / 4 Students
                </div>
              </div>

              {myGroup.members.length < 4 && (
                <button
                  onClick={() => setIsInviteModalOpen(true)}
                  className="btn-upes"
                >
                  <UserPlus size={16} />
                  <span>Invite Student</span>
                </button>
              )}
            </div>
          </div>

          {/* Group Abstract Block */}
          <div style={{ backgroundColor: '#f8fafc', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Standardized Project Abstract
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {myGroup.abstract}
            </p>
          </div>

          {/* Member Cards Grid */}
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={18} color="var(--upes-purple)" />
            <span>Formal Team Roster ({myGroupMembers.length} Verified Members)</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {myGroupMembers.map((member) => (
              <div
                key={member.id}
                style={{
                  padding: '1.1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {member.name}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge-pill badge-info" style={{ fontSize: '0.68rem' }}>
                        GPA: {member.gpa}
                      </span>
                      {member.id !== currentUser.profile?.id && (
                        <button
                          onClick={() => removeMemberFromGroup(myGroup.id, member.id)}
                          style={{
                            fontSize: '0.7rem',
                            color: '#be185d',
                            backgroundColor: '#fff1f2',
                            border: '1px solid #fecdd3',
                            padding: '0.15rem 0.55rem',
                            borderRadius: '4px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                    SAP: {member.sapId} • {member.program}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.6rem' }}>
                    {member.skills?.map((sk) => (
                      <span
                        key={sk}
                        style={{
                          fontSize: '0.7rem',
                          backgroundColor: '#f1f5f9',
                          color: 'var(--text-secondary)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          fontWeight: 600
                        }}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="portal-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#ede9fe', color: 'var(--upes-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            <Users size={32} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            You Are Not Assigned to a Major Project Group
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
            To begin your Capstone Project, either create a structured group and invite your peers, or ask a team leader to send you an official portal invitation.
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-upes"
            style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem' }}
          >
            <PlusCircle size={18} />
            <span>Create New Project Group Now</span>
          </button>
        </div>
      )}

      {/* SECTION 2: STUDENT DIRECTORY & SKILL FINDER */}
      <div className="portal-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              UPES Student Directory & Skill Finder
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Search students by SAP ID, name, or domain expertise to form balanced, multi-skilled teams.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search by name or SAP ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.3rem', fontSize: '0.85rem' }}
              />
            </div>
          </div>
        </div>

        {/* Skill Filter Pills */}
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {allSkills.map((sk) => (
            <button
              key={sk}
              onClick={() => setSelectedSkillFilter(sk)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '99px',
                fontSize: '0.78rem',
                fontWeight: selectedSkillFilter === sk ? 700 : 500,
                backgroundColor: selectedSkillFilter === sk ? '#0077b6' : '#f8fafc',
                color: selectedSkillFilter === sk ? 'white' : 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                transition: 'all 0.2s ease'
              }}
            >
              {sk}
            </button>
          ))}
        </div>

        {/* Directory List Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>STUDENT NAME</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>SAP ID</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>PROGRAM & SEMESTER</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>DOMAIN SKILLS</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>STATUS</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((st) => {
                const isInMyGroup = myGroup && myGroup.members.includes(st.id);
                return (
                  <tr key={st.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                          src={st.avatar}
                          alt={st.name}
                          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                            {st.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {st.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '0.9rem 1rem', fontSize: '0.85rem', fontWeight: 600 }}>
                      {st.sapId}
                    </td>
                    <td style={{ padding: '0.9rem 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {st.program}
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                        {st.skills?.map((sk) => (
                          <span
                            key={sk}
                            style={{
                              fontSize: '0.7rem',
                              backgroundColor: '#f1f5f9',
                              color: 'var(--text-secondary)',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '4px'
                            }}
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      {st.groupId ? (
                        <span className="badge-pill badge-info">In Group</span>
                      ) : (
                        <span className="badge-pill badge-success">Available</span>
                      )}
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      {myGroup && !st.groupId && myGroup.members.length < 4 ? (
                        <button
                          onClick={() => inviteMemberToGroup(myGroup.id, st.id)}
                          className="btn-primary"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                        >
                          <UserPlus size={14} />
                          <span>Invite</span>
                        </button>
                      ) : isInMyGroup ? (
                        <span style={{ fontSize: '0.78rem', color: 'var(--status-success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <CheckCircle2 size={15} />
                          <span>Member</span>
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {st.groupId ? 'Assigned' : 'Group Full'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* INVITE MODAL */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite Student to Project Group"
      >
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Select an available peer from the directory to add to <b>{myGroup?.name}</b>. All invitations are logged for audit compliance.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '320px', overflowY: 'auto' }}>
          {students.filter((s) => !s.groupId).map((s) => (
            <div
              key={s.id}
              style={{
                padding: '0.85rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.name} ({s.sapId})</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{s.program} • GPA: {s.gpa}</div>
              </div>
              <button
                onClick={() => {
                  inviteMemberToGroup(myGroup.id, s.id);
                  setIsInviteModalOpen(false);
                }}
                className="btn-upes"
                style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
              >
                <span>Add to Team</span>
              </button>
            </div>
          ))}
          {students.filter((s) => !s.groupId).length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              No unassigned students available at this time.
            </div>
          )}
        </div>
      </Modal>

      {/* CREATE GROUP MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Major Project Group"
      >
        <form onSubmit={handleCreateGroupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Team Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Team Synapse Beta"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Project Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AI-Powered Smart Campus Evaluation System"
              value={newGroupTitle}
              onChange={(e) => setNewGroupTitle(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Research / Project Domain
            </label>
            <select
              value={newGroupDomain}
              onChange={(e) => setNewGroupDomain(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="AI & Machine Learning">AI & Machine Learning</option>
              <option value="Full-Stack Web Engineering">Full-Stack Web Engineering</option>
              <option value="Cybersecurity & Zero Trust">Cybersecurity & Zero Trust</option>
              <option value="Cloud Computing & Microservices">Cloud Computing & Microservices</option>
              <option value="Blockchain & Web3">Blockchain & Web3</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Standardized Project Abstract
            </label>
            <textarea
              rows={4}
              placeholder="Describe problem statement, objectives, and technology stack..."
              value={newGroupAbstract}
              onChange={(e) => setNewGroupAbstract(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-upes"
            >
              Create Project Group
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
