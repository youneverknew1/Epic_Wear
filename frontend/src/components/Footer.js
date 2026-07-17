import React from 'react';

function Footer() {
  return (
    <div style={{
      textAlign: 'center',
      marginTop: '60px',
      paddingTop: '25px',
      paddingBottom: '25px',
      borderTop: '1px solid #2a2a3e'
    }}>
      <p style={{ color: '#666', fontSize: '13px', marginTop: '6px' }}>
        Developed by{' '}
        <a 
          href="https://github.com/youneverknew1"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#e94560', fontWeight: '700', textDecoration: 'none' }}
        >
          Shahriar Shadid
        </a>
      </p>
    </div>
  );
}

export default Footer;