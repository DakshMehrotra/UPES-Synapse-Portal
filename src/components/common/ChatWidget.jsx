import React, { useState } from 'react';
import { Send, User, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChatWidget = ({ groupId }) => {
  const { chatMessages, addChatMessage, currentUser } = useApp();
  const [inputText, setInputText] = useState('');

  const groupMessages = chatMessages.filter(msg => msg.groupId === groupId);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    addChatMessage(groupId, inputText);
    setInputText('');
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
            const isMe = msg.sender === currentUser.profile?.name;
            return (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: msg.isMentor ? 'var(--upes-purple)' : 'var(--text-secondary)' }}>
                    {msg.sender}
                  </span>
                  {msg.isMentor && <ShieldCheck size={12} color="var(--upes-purple)" />}
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{msg.timestamp}</span>
                </div>
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  backgroundColor: isMe ? '#2563eb' : (msg.isMentor ? '#ede9fe' : '#ffffff'),
                  color: isMe ? '#ffffff' : 'var(--text-primary)',
                  border: isMe ? 'none' : '1px solid var(--border-color)',
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
