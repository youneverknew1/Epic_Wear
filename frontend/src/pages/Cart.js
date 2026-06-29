import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../services/api';

const USER_ID = 1; // temporary hardcoded user

function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCart(USER_ID)
      .then(res => {
        setCart(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{textAlign:'center'}}>Loading cart...</h2>;

  return (
    <div style={{padding:'20px', maxWidth:'600px', margin:'0 auto'}}>
      <h1>🛒 Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty. <span style={{color:'blue', cursor:'pointer'}} onClick={() => navigate('/')}>Shop now</span></p>
      ) : (
        <>
          {cart.items.map(item => (
            <div key={item.id} style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #eee', padding:'10px 0'}}>
              <div>
                <h3>{item.name}</h3>
                <p>Qty: {item.quantity}</p>
              </div>
              <p>৳{item.price * item.quantity}</p>
            </div>
          ))}
          <h2 style={{textAlign:'right'}}>Total: ৳{cart.total}</h2>
          <button onClick={() => navigate('/checkout')}
            style={{width:'100%', padding:'12px', backgroundColor:'#28a745', color:'white', border:'none', borderRadius:'8px', fontSize:'16px', cursor:'pointer'}}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;