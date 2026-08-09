import React from 'react';

export const GaugeCard = ({ title, value, max = 200, colorType = 'blue', subtitle }) => {
  // colorType can be 'blue', 'orange', 'pink' matching the UPES portal screenshots
  const colorMap = {
    blue: {
      bg: '#e0f2fe',
      iconColor: '#0284c7',
      gradient: ['#38bdf8', '#0284c7'],
    },
    orange: {
      bg: '#fef3c7',
      iconColor: '#d97706',
      gradient: ['#fbbf24', '#d97706'],
    },
    pink: {
      bg: '#fce7f3',
      iconColor: '#db2777',
      gradient: ['#f472b6', '#db2777'],
    },
  };

  const currentTheme = colorMap[colorType] || colorMap.blue;
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className="portal-card hover-elevate"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
        padding: '1.25rem 1.5rem',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        flex: 1,
        minWidth: '240px'
      }}
    >
      {/* Animated SVG Speedometer Arc Icon */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: currentTheme.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 100 100">
          {/* Background Arc */}
          <path
            d="M 20 75 A 35 35 0 1 1 80 75"
            fill="none"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Active Progress Arc */}
          <path
            d="M 20 75 A 35 35 0 1 1 80 75"
            fill="none"
            stroke={currentTheme.iconColor}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray="165"
            strokeDashoffset={165 - (percentage / 100) * 165}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
          {/* Needle / Gauge indicator point */}
          <circle
            cx="50"
            cy="55"
            r="6"
            fill={currentTheme.iconColor}
          />
        </svg>
      </div>

      {/* Value and Title Info */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          lineHeight: 1.1,
          fontFamily: 'var(--font-heading)'
        }}>
          {value}
        </div>
        <div style={{
          fontSize: '0.85rem',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          marginTop: '0.2rem'
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            marginTop: '0.15rem'
          }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
