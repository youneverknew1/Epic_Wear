import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api';

const USER_ID = 1;

function Checkout() {
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('COD');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleOrder = () => {
    if (!address) return setMessage('Please enter delivery address!');
    createOrder({ user_id: USER_ID, delivery_address: address, payment_method: payment })
      .then(res => {
        setSuccess(true);
        setMessage(`Order #${res.data.order_id} placed successfully!`);
        setTimeout(() => navigate('/'), 3000);
      })
      .catch(() => setMessage('❌ Error placing order. Please try again.'));
  };

  return (
    <div style={{padding:'40px 60px', maxWidth:'550px', margin:'0 auto', background:'#0f0f1a', minHeight:'100vh'}}>
      <h1 style={{fontSize:'32px', fontWeight:'800', color:'white', marginBottom:'30px'}}>📦 Checkout</h1>

      {success ? (
        <div style={{textAlign:'center', padding:'60px', backgroundColor:'#1a1a2e', borderRadius:'16px', border:'1px solid #2a2a3e'}}>
          <div style={{fontSize:'60px', marginBottom:'15px'}}>🎉</div>
          <h2 style={{color:'#28a745', marginBottom:'10px'}}>{message}</h2>
          <p style={{color:'#aaa'}}>Redirecting to home...</p>
        </div>
      ) : (
        <div style={{backgroundColor:'#1a1a2e', padding:'35px', borderRadius:'16px', border:'1px solid #2a2a3e'}}>
          <label style={{display:'block', fontWeight:'700', marginBottom:'8px', color:'white'}}>Delivery Address</label>
          <textarea
            placeholder="Enter your full delivery address..."
            value={address}
            onChange={e => setAddress(e.target.value)}
            rows={3}
            style={{
              width:'100%', padding:'12px', marginBottom:'20px',
              borderRadius:'10px', border:'1px solid #2a2a3e',
              fontSize:'14px', resize:'none', fontFamily:'inherit',
              backgroundColor:'#16213e', color:'white'
            }}
          />

          <label style={{display:'block', fontWeight:'700', marginBottom:'8px', color:'white'}}>Payment Method</label>
          <select value={payment} onChange={e => setPayment(e.target.value)} style={{
            width:'100%', padding:'12px', marginBottom:'25px',
            borderRadius:'10px', border:'1px solid #2a2a3e',
            fontSize:'14px', backgroundColor:'#16213e', color:'white'
          }}>
            <option value="COD">💵 Cash on Delivery</option>
            <option value="bKash">📱 bKash</option>
            <option value="Card">💳 Card</option>
          </select>

          {message && <p style={{color:'#e94560', marginBottom:'15px', textAlign:'center'}}>{message}</p>}

          <button onClick={handleOrder} style={{
            width:'100%', padding:'15px',
            backgroundColor:'#e94560', color:'white',
            border:'none', borderRadius:'12px',
            fontSize:'16px', fontWeight:'700', cursor:'pointer'
          }}>Place Order 🎉</button>
        </div>
      )}
    </div>
  );
}

export default Checkout;