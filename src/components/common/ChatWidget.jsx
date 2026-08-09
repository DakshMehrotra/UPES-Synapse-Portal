import React, { useState, useEffect, useRef } from 'react';
import { Send, User, ShieldCheck, Bot, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChatWidget = ({ groupId }) => {
  const { chatMessages, addChatMessage, currentUser } = useApp();
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isAiTyping]);

  const groupMessages = chatMessages.filter(msg => msg.groupId === groupId);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const userText = inputText;
    addChatMessage(groupId, userText);
    setInputText('');
    
    // Trigger AI mock response
    setIsAiTyping(true);
    setTimeout(() => {
      let aiResponse = "I'm your Synapse AI Assistant. I've noted your update. Make sure to link your GitHub commits to the Kanban card for your mentor to review!";
      
      const lowerText = userText.toLowerCase();
      if (lowerText.includes("database") || lowerText.includes("schema")) {
        aiResponse = "Based on UPES capstone guidelines, ensure your database schema is normalized to 3NF. Would you like me to generate a sample ER diagram checklist?";
      } else if (lowerText.includes("deadline") || lowerText.includes("when")) {
        aiResponse = "Your next major milestone (Mid-Term Evaluation) is scheduled for October 15th. You currently have 3 tasks in progress.";
      } else if (lowerText.includes("help") || lowerText.includes("stuck")) {
        aiResponse = "I can help you structure your abstract, remind you of UPES deadlines, or suggest technical resources. What do you need help with?";
      }

      // Add AI message (we use a special sender name to identify it in the UI)
      addChatMessage(groupId, aiResponse);
      setIsAiTyping(false);
    }, 1500);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#ffffff',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
          Mentor Sync Chat
        </div>
        <span style={{ fontSize: '0.7rem', color: '#10b981', backgroundColor: '#d1fae5', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
          Live
        </span>
      </div>

      {/* Messages Area */}
      <div style={{
        flex: 1,
        padding: '1rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: '#f8fafc'
      }}>
        {groupMessages.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2rem' }}>
            No messages yet. Start the conversation!
          </div>
        ) : (
          groupMessages.map(msg => {
            // Check for AI message
            if (msg.text.includes("I'm your Synapse AI Assistant") || 
                msg.text.includes("Based on UPES capstone guidelines") || 
                msg.text.includes("Your next major milestone") ||
                msg.text.includes("I can help you structure")) {
              msg.sender = "Synapse AI";
              msg.isMentor = false;
            }
            
            const isMe = msg.sender === currentUser.profile?.name;
            const isAi = msg.sender === "Synapse AI";
            
            return (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: isAi ? 800 : 600, color: isAi ? '#6366f1' : (msg.isMentor ? 'var(--upes-purple)' : 'var(--text-secondary)') }}>
                    {msg.sender}
                  </span>
                  {msg.isMentor && <ShieldCheck size={12} color="var(--upes-purple)" />}
                  {isAi && <Bot size={12} color="#6366f1" />}
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{msg.timestamp}</span>
                </div>
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  backgroundColor: isMe ? '#2563eb' : (isAi ? 'rgba(99, 102, 241, 0.1)' : (msg.isMentor ? '#ede9fe' : '#ffffff')),
                  color: isMe ? '#ffffff' : (isAi ? '#312e81' : 'var(--text-primary)'),
                  border: isMe ? 'none' : (isAi ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid var(--border-color)'),
                  borderBottomRightRadius: isMe ? '0' : '12px',
                  borderBottomLeftRadius: isMe ? '12px' : '0',
                  fontSize: '0.85rem',
                  lineHeight: 1.4,
                  maxWidth: '90%'
                }}>
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
        
        {isAiTyping && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6366f1' }}>Synapse AI</span>
              <Bot size={12} color="#6366f1" />
            </div>
            <div style={{
              padding: '0.6rem 1rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(99, 102, 241, 0.05)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderBottomLeftRadius: '0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Loader2 size={14} className="animate-spin" color="#6366f1" />
              <span style={{ fontSize: '0.8rem', color: '#6366f1', fontWeight: 600 }}>Analyzing context...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} style={{
        padding: '0.75rem',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: '#ffffff',
        display: 'flex',
        gap: '0.5rem'
      }}>
        <input
          type="text"
          placeholder="Message mentor/team..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            flex: 1,
            padding: '0.6rem',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            fontSize: '0.85rem'
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: 'var(--text-main)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            padding: '0 1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};
