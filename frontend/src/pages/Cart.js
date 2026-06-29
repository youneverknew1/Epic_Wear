import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../services/api';

const USER_ID = 1;

function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCart(USER_ID)
      .then(res => { setCart(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{textAlign:'center', padding:'100px', color:'#eee'}}>Loading cart...</div>;

  return (
    <div style={{padding:'40px 60px', maxWidth:'700px', margin:'0 auto', background:'#0f0f1a', minHeight:'100vh'}}>
      <h1 style={{fontSize:'32px', fontWeight:'800', color:'white', marginBottom:'30px'}}>🛒 Your Cart</h1>

      {cart.items.length === 0 ? (
        <div style={{textAlign:'center', padding:'60px', backgroundColor:'#1a1a2e', borderRadius:'16px', border:'1px solid #2a2a3e'}}>
          <div style={{fontSize:'60px', marginBottom:'15px'}}>🛒</div>
          <h3 style={{color:'#aaa', marginBottom:'15px'}}>Your cart is empty</h3>
          <button onClick={() => navigate('/')} style={{
            padding:'12px 30px', backgroundColor:'#e94560',
            color:'white', border:'none', borderRadius:'25px', cursor:'pointer', fontSize:'15px'
          }}>Shop Now</button>
        </div>
      ) : (
        <div>
          {cart.items.map(item => (
            <div key={item.id} style={{
              display:'flex', justifyContent:'space-between', alignItems:'center',
              backgroundColor:'#1a1a2e', padding:'20px 25px',
              borderRadius:'12px', marginBottom:'12px',
              boxShadow:'0 2px 10px rgba(0,0,0,0.3)', border:'1px solid #2a2a3e'
            }}>
              <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
                <div style={{
                  width:'55px', height:'55px', backgroundColor:'#16213e',
                  borderRadius:'10px', display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:'28px'
                }}>⚽</div>
                <div>
                  <h3 style={{fontSize:'15px', fontWeight:'700', color:'white'}}>{item.name}</h3>
                  <p style={{color:'#888', fontSize:'13px'}}>Qty: {item.quantity}</p>
                </div>
              </div>
              <span style={{fontSize:'18px', fontWeight:'800', color:'#e94560'}}>৳{item.price * item.quantity}</span>
            </div>
          ))}

          <div style={{
            backgroundColor:'#1a1a2e', padding:'20px 25px',
            borderRadius:'12px', marginTop:'20px',
            border:'1px solid #2a2a3e'
          }}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px'}}>
              <span style={{fontSize:'18px', fontWeight:'700', color:'white'}}>Total</span>
              <span style={{fontSize:'24px', fontWeight:'800', color:'#e94560'}}>৳{cart.total}</span>
            </div>
            <button onClick={() => navigate('/checkout')} style={{
              width:'100%', padding:'15px',
              backgroundColor:'#e94560', color:'white',
              border:'none', borderRadius:'12px', fontSize:'16px',
              fontWeight:'700', cursor:'pointer'
            }}>Proceed to Checkout →</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;