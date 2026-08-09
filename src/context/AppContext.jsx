import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_STUDENTS,
  INITIAL_MENTORS,
  INITIAL_GROUPS,
  INITIAL_TASKS,
  INITIAL_NOTICES
} from '../data/mockData';
import { Sparkles, CheckCircle2, X } from 'lucide-react';

const AppContext = createContext();

const LOCAL_STORAGE_KEY = 'synapse_pro_state_v2';

export const INITIAL_MEETINGS = [
  {
    id: 'mt1',
    title: 'Phase 2 Architecture & Rubric Defense',
    type: 'mid-term',
    date: 'November 2, 2026',
    time: '14:00 - 15:00 IST',
    mentor: 'Dr. Tanupriya Choudhury',
    panel: ['Dr. Tanupriya Choudhury', 'Dr. Vimal Kumar'],
    location: 'Room 402, Block 3 (SoCS Lab)',
    status: 'Confirmed',
    agenda: 'Standardized evaluation of backend microservices and AI matchmaker semantic ranking accuracy.',
    groupId: 'g1',
    attendance: {},
    escalated: false,
  },
  {
    id: 'mt2',
    title: 'Plagiarism & Audit Trail Compliance Review',
    type: 'mock',
    date: 'November 10, 2026',
    time: '11:00 - 12:00 IST',
    mentor: 'Dr. Tanupriya Choudhury',
    panel: ['Dr. Tanupriya Choudhury'],
    location: 'Virtual Meeting (MS Teams)',
    status: 'Scheduled',
    agenda: 'Checking GitHub commit timestamps against portal Kanban milestones.',
    groupId: 'g1',
    attendance: {},
    escalated: false,
  },
  {
    id: 'mt3',
    title: 'Pre-Submission Mock Viva & Demonstration',
    type: 'end-term',
    date: 'November 22, 2026',
    time: '16:00 - 17:00 IST',
    mentor: 'Prof. Manish Kumar & Panel',
    panel: ['Prof. Manish Kumar', 'Dr. Sumeet Gupta', 'Dr. Alok Aggarwal'],
    location: 'Seminar Hall 2, Energy Acres',
    status: 'Scheduled',
    agenda: 'Final capstone demonstration before external evaluation panel.',
    groupId: 'g2',
    attendance: {},
    escalated: false,
  }
];

export const INITIAL_DELIVERABLES = [
  {
    id: 'del1',
    title: 'Project Synopsis & Literature Review (LaTeX PDF)',
    submittedBy: 'Daksh Mehrotra',
    date: 'Oct 15, 2026',
    type: 'pdf',
    verified: true,
  },
  {
    id: 'del2',
    title: 'GitHub Source Code & Architecture Demo',
    submittedBy: 'Prince Verma',
    date: 'Oct 28, 2026',
    type: 'github',
    verified: true,
  }
];

export const AppProvider = ({ children }) => {
  const loadInitialState = () => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse localStorage state:', e);
    }
    return null;
  };

  const savedState = loadInitialState();

  const [isLoggedIn, setIsLoggedIn] = useState(savedState?.isLoggedIn ?? true);
  const [currentUser, setCurrentUser] = useState(
    savedState?.currentUser || {
      role: 'student',
      profile: INITIAL_STUDENTS[0], // Daksh Mehrotra
    }
  );

  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState(savedState?.students || INITIAL_STUDENTS);
  const [mentors, setMentors] = useState(savedState?.mentors || INITIAL_MENTORS);
  const [groups, setGroups] = useState(savedState?.groups || INITIAL_GROUPS);
  const [tasks, setTasks] = useState(savedState?.tasks || INITIAL_TASKS);
  const [notices, setNotices] = useState(savedState?.notices || INITIAL_NOTICES);
  const [meetings, setMeetings] = useState(savedState?.meetings || INITIAL_MEETINGS);
  const [deliverables, setDeliverables] = useState(savedState?.deliverables || INITIAL_DELIVERABLES);
  const [evalScores, setEvalScores] = useState(savedState?.evalScores || {
    techDepth: 19,
    literature: 18,
    codeQuality: 19,
    collaboration: 18,
    viva: 18,
    comment: 'Excellent technical implementation and architecture. The AI matchmaker and standardized portal audit flow exceed standard B.Tech Major Project expectations.'
  });

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Mentor Dr. Tanupriya Choudhury reviewed Mid-Term deliverable', time: '10m ago', unread: true },
    { id: 2, text: 'Mandatory Synopsis Deadline is August 15, 2026', time: '1h ago', unread: true },
    { id: 3, text: 'AI Mentor Matchmaker is now available in portal', time: '2d ago', unread: false }
  ]);

  const [chatMessages, setChatMessages] = useState(savedState?.chatMessages || [
    { id: 'c1', groupId: 'g1', sender: 'Dr. Tanupriya Choudhury', text: 'Please ensure your database schema is normalized before the next meeting.', timestamp: '10:30 AM', isMentor: true },
    { id: 'c2', groupId: 'g1', sender: 'Daksh Mehrotra', text: 'Will do, ma\'am. We are finalizing the ER diagram today.', timestamp: '10:45 AM', isMentor: false }
  ]);

  const [peerReviews, setPeerReviews] = useState(savedState?.peerReviews || []);

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          isLoggedIn,
          currentUser,
          students,
          mentors,
          groups,
          tasks,
          notices,
          meetings,
          deliverables,
          evalScores,
          chatMessages,
          peerReviews
        })
      );
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }, [isLoggedIn, currentUser, students, mentors, groups, tasks, notices, meetings, deliverables, evalScores, chatMessages, peerReviews]);

  const triggerToast = (text) => {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage((current) => (current === text ? null : current));
    }, 4200);
  };

  const addNotification = (text) => {
    setNotifications((prev) => [
      {
        id: Date.now(),
        text,
        time: 'Just now',
        unread: true,
      },
      ...prev,
    ]);
    triggerToast(text);
  };

  const login = () => {
    setIsLoggedIn(true);
    triggerToast(`Welcome back, ${currentUser.profile?.name || 'User'}!`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    triggerToast('Logged out successfully.');
  };

  // Role Switcher / Demo account loader
  const loginAsRole = (role) => {
    setIsLoggedIn(true);
    if (role === 'student') {
      const studentProfile = students.find((s) => s.sapId === '500096123') || INITIAL_STUDENTS[0];
      setCurrentUser({
        role: 'student',
        profile: studentProfile,
      });
      triggerToast('Logged in as Student: Daksh Mehrotra');
    } else if (role === 'mentor') {
      setCurrentUser({
        role: 'mentor',
        profile: mentors[0], // Dr. Tanupriya Choudhury
      });
      triggerToast('Logged in as Faculty Mentor: Dr. Tanupriya Choudhury');
    } else if (role === 'admin') {
      setCurrentUser({
        role: 'admin',
        profile: {
          id: 'admin01',
          name: 'Prof. Manish Gupta (Project Cell Lead)',
          email: 'projectcell@ddn.upes.ac.in',
          title: 'Project Coordinator & Portal Admin',
          school: 'School of Computer Science',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
        },
      });
      triggerToast('Logged in as Project Cell Coordinator Admin');
    }
    setActiveTab('dashboard');
  };

  // Group Formation: Create a new project group
  const createGroup = (newGroupData) => {
    const newGroup = {
      id: `g_${Date.now()}`,
      groupCode: `UPES-2026-CS-${Math.floor(100 + Math.random() * 899)}`,
      name: newGroupData.name,
      title: newGroupData.title,
      domain: newGroupData.domain || 'AI & Machine Learning',
      abstract: newGroupData.abstract || 'Structured project abstract under review.',
      members: [currentUser.profile.id, ...(newGroupData.memberIds || [])],
      mentorId: newGroupData.mentorId || null,
      status: newGroupData.mentorId ? 'Pending Allocation' : 'Draft Roster',
      progress: 25,
      githubUrl: 'https://github.com/upes-socs/major-project-2026',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setGroups((prev) => [newGroup, ...prev]);

    // Update member student profiles
    setStudents((prev) =>
      prev.map((s) =>
        newGroup.members.includes(s.id) ? { ...s, groupId: newGroup.id } : s
      )
    );

    // If student created this, update current user profile reference
    if (currentUser.role === 'student') {
      setCurrentUser((prev) => ({
        ...prev,
        profile: { ...prev.profile, groupId: newGroup.id }
      }));
    }

    addNotification(`New project group "${newGroup.name}" created!`);
    return newGroup;
  };

  // Group Formation: Invite a member to existing group
  const inviteMemberToGroup = (groupId, studentId) => {
    const targetGroup = groups.find((g) => g.id === groupId);
    if (!targetGroup) return;
    if (targetGroup.members.length >= 4) {
      triggerToast('Maximum group capacity (4 students) reached!');
      return;
    }

    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, members: [...g.members, studentId] }
          : g
      )
    );

    const invitedStudent = students.find((s) => s.id === studentId);
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, groupId: groupId } : s
      )
    );

    addNotification(`Student ${invitedStudent?.name || ''} added to group "${targetGroup.name}".`);
  };

  // Group Formation: Remove a member from a group
  const removeMemberFromGroup = (groupId, studentId) => {
    const targetGroup = groups.find((g) => g.id === groupId);
    if (!targetGroup) return;

    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, members: g.members.filter((id) => id !== studentId) }
          : g
      )
    );

    const removedStudent = students.find((s) => s.id === studentId);
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, groupId: null } : s
      )
    );

    addNotification(`Student ${removedStudent?.name || ''} removed from roster.`);
  };

  // Mentor Allocation: Submit formal request
  const submitMentorRequest = (groupId, mentorId, abstractText) => {
    const mentorObj = mentors.find((m) => m.id === mentorId);
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              mentorId: mentorId,
              abstract: abstractText,
              status: `Pending Review (${mentorObj?.name || 'Mentor'})`,
            }
          : g
      )
    );

    addNotification(`Standardized mentor request submitted to ${mentorObj?.name || 'Faculty Mentor'}.`);
  };

  const removeMentorFromGroup = (groupId) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          if (g.mentorId) {
            setMentors((mPrev) =>
              mPrev.map((m) =>
                m.id === g.mentorId ? { ...m, currentAllocated: Math.max(0, m.currentAllocated - 1) } : m
              )
            );
          }
          return {
            ...g,
            mentorId: null,
            status: 'Draft Roster',
            abstract: '',
          };
        }
        return g;
      })
    );
    addNotification('Mentor removed from project group.');
  };

  // Mentor Allocation: Faculty review action
  const reviewMentorRequest = (groupId, isApproved, feedbackMsg) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              status: isApproved ? 'Allocated & Approved' : 'Revision Requested',
              feedback: feedbackMsg || (isApproved ? 'Approved for Major Project work.' : 'Please refine project abstract.'),
            }
          : g
      )
    );

    if (isApproved) {
      const g = groups.find((grp) => grp.id === groupId);
      if (g && g.mentorId) {
        setMentors((prev) =>
          prev.map((m) =>
            m.id === g.mentorId
              ? { ...m, currentAllocated: Math.min(m.maxQuota, m.currentAllocated + 1) }
              : m
          )
        );
      }
    }

    addNotification(`Mentor allocation status updated: ${isApproved ? 'Approved & Verified' : 'Revision Requested'}.`);
  };

  // Kanban: Add new milestone task
  const addTask = (newTaskData) => {
    const newTask = {
      id: `t_${Date.now()}`,
      title: newTaskData.title,
      description: newTaskData.description,
      status: 'To Do',
      priority: newTaskData.priority || 'High',
      assignee: newTaskData.assignee || currentUser.profile?.name || 'Team Member',
      dueDate: newTaskData.dueDate || '2026-11-30',
      score: null,
      feedback: null,
    };

    setTasks((prev) => [newTask, ...prev]);
    addNotification(`Milestone task "${newTask.title}" added to Kanban To Do.`);
    return newTask;
  };

  // Milestone Task status change
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      )
    );
    const targetTask = tasks.find((t) => t.id === taskId);
    triggerToast(`Task "${targetTask?.title || 'Deliverable'}" moved to ${newStatus}.`);
  };

  // Grade deliverable (Mentor action)
  const gradeTask = (taskId, scoreValue, feedbackText) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              score: Number(scoreValue),
              feedback: feedbackText,
              status: 'Done',
            }
          : t
      )
    );
    addNotification(`Deliverable graded: ${scoreValue}/100.`);
  };

  // Add a new circular / notice
  const addNotice = (newNoticeData) => {
    const createdNotice = {
      id: `n_${Date.now()}`,
      title: newNoticeData.title,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      author: currentUser.profile?.name || 'UPES Major Project Office',
      category: newNoticeData.category || 'Academic Notice',
      content: newNoticeData.content,
      isImportant: Boolean(newNoticeData.isImportant),
    };

    setNotices((prev) => [createdNotice, ...prev]);
    addNotification(`New circular published: "${newNoticeData.title}".`);
  };

  // Add a new mentor review meeting
  const addMeeting = (newMeetingData) => {
    const createdMeeting = {
      id: `mt_${Date.now()}`,
      title: newMeetingData.title,
      date: newMeetingData.date,
      time: newMeetingData.time || '14:00 - 15:00 IST',
      mentor: newMeetingData.mentor || 'Dr. Tanupriya Choudhury',
      location: newMeetingData.location || 'Room 402, Block 3 (SoCS Lab)',
      status: 'Confirmed',
      agenda: newMeetingData.agenda || 'Standardized capstone progress review.',
    };

    setMeetings((prev) => [createdMeeting, ...prev]);
    addNotification(`Mentor review slot booked: "${newMeetingData.title}" on ${newMeetingData.date}.`);
  };

  // Presentation Management (Panelists & Scheduling)
  const schedulePresentation = (presentationData) => {
    const createdMeeting = {
      id: `mt_${Date.now()}`,
      title: presentationData.title,
      type: presentationData.type || 'mock',
      date: presentationData.date,
      time: presentationData.time,
      mentor: presentationData.mentor || currentUser.profile?.name,
      panel: presentationData.panel || [currentUser.profile?.name],
      location: presentationData.location || 'Seminar Hall',
      status: 'Scheduled',
      agenda: presentationData.agenda || 'Project Evaluation',
      groupId: presentationData.groupId,
      attendance: {},
      escalated: false,
    };
    setMeetings((prev) => [createdMeeting, ...prev]);
    addNotification(`Scheduled ${presentationData.type} presentation on ${presentationData.date}. Notifications sent.`);
  };

  const requestReschedule = (meetingId, newDate, newTime, reason) => {
    setMeetings((prev) =>
      prev.map((m) =>
        m.id === meetingId
          ? { ...m, status: 'Reschedule Requested', rescheduleDetails: { newDate, newTime, reason } }
          : m
      )
    );
    addNotification('Reschedule request submitted to Mentor/Panelists.');
  };

  const recordAttendance = (meetingId, studentId, isPresent) => {
    setMeetings((prev) =>
      prev.map((m) => {
        if (m.id === meetingId) {
          return {
            ...m,
            attendance: { ...m.attendance, [studentId]: isPresent }
          };
        }
        return m;
      })
    );
    triggerToast(`Attendance recorded.`);
  };

  const escalateAbsence = (meetingId, studentId) => {
    setMeetings((prev) =>
      prev.map((m) =>
        m.id === meetingId ? { ...m, escalated: true } : m
      )
    );
    const student = students.find((s) => s.id === studentId);
    if (student) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === studentId ? { ...s, escalated: true } : s
        )
      );
    }
    addNotification(`CRITICAL: Student ${student?.name} has been escalated to Project Cell for absence.`);
    
    // Add an official notice globally
    addNotice({
      title: `[ESCALATION] Absence marked for ${student?.name}`,
      category: 'Disciplinary',
      content: `Student ${student?.name} (SAP: ${student?.sapId}) failed to appear for a scheduled panel presentation without prior reschedule request. Incident forwarded to Head of Project Cell.`,
      isImportant: true,
    });
  };

  // Update evaluation rubric scores
  const updateGroupScore = (newScores, commentText) => {
    setEvalScores({
      ...newScores,
      comment: commentText
    });
    const total = Number(newScores.techDepth) + Number(newScores.literature) + Number(newScores.codeQuality) + Number(newScores.collaboration) + Number(newScores.viva);
    addNotification(`Published final evaluation: ${total}/100 points! Student GPA updated.`);
  };

  // Add deliverable submission
  const addDeliverable = (deliverableData) => {
    const newItem = {
      id: `del_${Date.now()}`,
      title: deliverableData.title,
      submittedBy: currentUser.profile?.name || 'Daksh Mehrotra',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      type: deliverableData.type || 'pdf',
      verified: true,
    };

    setDeliverables((prev) => [newItem, ...prev]);
    addNotification(`Submitted deliverable: "${deliverableData.title}" to audit archive.`);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const addChatMessage = (groupId, text) => {
    const newMsg = {
      id: `c_${Date.now()}`,
      groupId,
      sender: currentUser.profile?.name,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMentor: currentUser.role === 'mentor' || currentUser.role === 'admin'
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  const submitPeerReview = (revieweeId, score, comment) => {
    const newReview = {
      id: `pr_${Date.now()}`,
      reviewerId: currentUser.profile?.id,
      revieweeId,
      score: Number(score),
      comment,
      date: new Date().toLocaleDateString('en-GB')
    };
    setPeerReviews(prev => [...prev, newReview]);
    triggerToast('Peer review submitted securely.');
  };

  // Reset demo data to initial state
  const resetDemoData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setStudents(INITIAL_STUDENTS);
    setMentors(INITIAL_MENTORS);
    setGroups(INITIAL_GROUPS);
    setTasks(INITIAL_TASKS);
    setNotices(INITIAL_NOTICES);
    setMeetings(INITIAL_MEETINGS);
    setDeliverables(INITIAL_DELIVERABLES);
    setChatMessages([
      { id: 'c1', groupId: 'g1', sender: 'Dr. Tanupriya Choudhury', text: 'Please ensure your database schema is normalized before the next meeting.', timestamp: '10:30 AM', isMentor: true },
      { id: 'c2', groupId: 'g1', sender: 'Daksh Mehrotra', text: 'Will do, ma\'am. We are finalizing the ER diagram today.', timestamp: '10:45 AM', isMentor: false }
    ]);
    setPeerReviews([]);
    setEvalScores({
      techDepth: 19,
      literature: 18,
      codeQuality: 19,
      collaboration: 18,
      viva: 18,
      comment: 'Excellent technical implementation and architecture. The AI matchmaker and standardized portal audit flow exceed standard B.Tech Major Project expectations.'
    });
    setCurrentUser({
      role: 'student',
      profile: INITIAL_STUDENTS[0],
    });
    setIsLoggedIn(true);
    setActiveTab('dashboard');
    addNotification('Portal state reset to pristine UPES Indian Demo dataset.');
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        currentUser,
        setCurrentUser,
        activeTab,
        setActiveTab,
        students,
        mentors,
        groups,
        tasks,
        notices,
        meetings,
        deliverables,
        evalScores,
        notifications,
        chatMessages,
        peerReviews,
        loginAsRole,
        createGroup,
        inviteMemberToGroup,
        removeMemberFromGroup,
        submitMentorRequest,
        removeMentorFromGroup,
        reviewMentorRequest,
        addTask,
        updateTaskStatus,
        gradeTask,
        addNotice,
        addMeeting,
        schedulePresentation,
        requestReschedule,
        recordAttendance,
        escalateAbsence,
        updateGroupScore,
        addDeliverable,
        markAllNotificationsRead,
        addChatMessage,
        submitPeerReview,
        resetDemoData,
      }}
    >
      {children}

      {/* Global Floating Toast Notification */}
      {toastMessage && (
        <div
          className="animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            border: '1px solid #1e293b',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.25)',
            padding: '0.85rem 1.25rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            zIndex: 9999,
            maxWidth: '420px',
            fontSize: '0.88rem',
            fontWeight: 600,
          }}
        >
          <div style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            padding: '0.35rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Sparkles size={16} />
          </div>
          <span style={{ flex: 1, lineHeight: 1.4 }}>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            style={{
              color: 'rgba(255,255,255,0.7)',
              padding: '0.2rem',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            title="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
