import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav style={{backgroundColor:'#333', padding:'10px 20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <h2 style={{color:'white', cursor:'pointer', margin:0}} onClick={() => navigate('/')}>🛒 ShopBD</h2>
      <div>
        <button onClick={() => navigate('/')} style={{marginRight:'10px', padding:'8px 16px', cursor:'pointer', backgroundColor:'transparent', color:'white', border:'1px solid white', borderRadius:'4px'}}>Home</button>
        <button onClick={() => navigate('/cart')} style={{padding:'8px 16px', cursor:'pointer', backgroundColor:'#ff6600', color:'white', border:'none', borderRadius:'4px'}}>Cart 🛒</button>
      </div>
    </nav>
  );
}

export default Navbar;