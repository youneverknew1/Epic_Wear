import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      padding: '15px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <h1 style={{
        color: 'white',
        cursor: 'pointer',
        fontSize: '24px',
        fontWeight: '800',
        letterSpacing: '1px'
      }} onClick={() => navigate('/')}>
        ⚽ <span style={{color: '#e94560'}}>Epic</span>Wear
      </h1>
      <div style={{display: 'flex', gap: '12px'}}>
        <button onClick={() => navigate('/')} style={{
          padding: '8px 20px',
          backgroundColor: 'transparent',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '25px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>Home</button>
        <button onClick={() => navigate('/cart')} style={{
          padding: '8px 20px',
          backgroundColor: '#e94560',
          color: 'white',
          border: 'none',
          borderRadius: '25px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600'
        }}>🛒 Cart</button>
      </div>
    </nav>
  );
}

export default Navbar;