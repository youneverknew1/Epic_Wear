import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api';

const USER_ID = 1;

function Checkout() {
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('COD');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleOrder = () => {
    if (!address) return setMessage('Please enter delivery address!');
    createOrder({ user_id: USER_ID, delivery_address: address, payment_method: payment })
      .then(res => {
        setMessage(`✅ Order placed! Order ID: ${res.data.order_id}`);
        setTimeout(() => navigate('/'), 2000);
      })
      .catch(err => setMessage('❌ Error placing order'));
  };

  return (
    <div style={{padding:'20px', maxWidth:'500px', margin:'0 auto'}}>
      <h1>📦 Checkout</h1>
      <input placeholder="Delivery Address" value={address} onChange={e => setAddress(e.target.value)}
        style={{width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'6px', border:'1px solid #ddd'}} />
      <select value={payment} onChange={e => setPayment(e.target.value)}
        style={{width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'6px', border:'1px solid #ddd'}}>
        <option value="COD">Cash on Delivery</option>
        <option value="bKash">bKash</option>
        <option value="Card">Card</option>
      </select>
      <button onClick={handleOrder}
        style={{width:'100%', padding:'12px', backgroundColor:'#007bff', color:'white', border:'none', borderRadius:'8px', fontSize:'16px', cursor:'pointer'}}>
        Place Order
      </button>
      {message && <p style={{marginTop:'15px', textAlign:'center'}}>{message}</p>}
    </div>
  );
}

export default Checkout;