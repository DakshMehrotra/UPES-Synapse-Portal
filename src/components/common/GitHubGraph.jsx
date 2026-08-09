import React from 'react';

export const GitHubGraph = () => {
  // Generate random mock contribution data for the last 15 weeks
  const weeks = 15;
  const daysPerWeek = 7;
  
  const getContributionColor = (count) => {
    if (count === 0) return '#ebedf0'; // Empty
    if (count < 3) return '#9be9a8';   // Light green
    if (count < 6) return '#40c463';   // Medium green
    if (count < 9) return '#30a14e';   // Dark green
    return '#216e39';                  // Darkest green
  };

  const grid = [];
  for (let d = 0; d < daysPerWeek; d++) {
    const row = [];
    for (let w = 0; w < weeks; w++) {
      // Heavily weight recent weeks to simulate end-of-semester crunch
      const isRecent = w > 10;
      const count = isRecent ? Math.floor(Math.random() * 12) : Math.floor(Math.random() * 4);
      row.push(count);
    }
    grid.push(row);
  }

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '1.25rem',
      display: 'inline-flex',
      flexDirection: 'column',
      gap: '0.75rem',
      width: '100%'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#24292f' }}>
          GitHub Repository Contributions (UPES-Synapse-Portal)
        </h4>
        <span style={{ fontSize: '0.75rem', color: '#57606a', fontWeight: 600 }}>184 commits</span>
      </div>
      
      <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {grid[0].map((_, wIndex) => (
          <div key={`col-${wIndex}`} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {grid.map((row, dIndex) => (
              <div 
                key={`cell-${dIndex}-${wIndex}`} 
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: getContributionColor(row[wIndex]),
                  borderRadius: '2px',
                  border: '1px solid rgba(27, 31, 36, 0.06)'
                }}
                title={`${row[wIndex]} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: '#57606a' }}>
        <a href="#" style={{ color: '#0969da', textDecoration: 'none', fontWeight: 600 }}>View on GitHub</a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>Less</span>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#ebedf0', borderRadius: '2px' }} />
          <div style={{ width: '10px', height: '10px', backgroundColor: '#9be9a8', borderRadius: '2px' }} />
          <div style={{ width: '10px', height: '10px', backgroundColor: '#40c463', borderRadius: '2px' }} />
          <div style={{ width: '10px', height: '10px', backgroundColor: '#30a14e', borderRadius: '2px' }} />
          <div style={{ width: '10px', height: '10px', backgroundColor: '#216e39', borderRadius: '2px' }} />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
