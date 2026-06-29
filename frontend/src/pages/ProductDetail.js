import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, addToCart } from '../services/api';

const USER_ID = 1;

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(id).then(res => setProduct(res.data));
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ user_id: USER_ID, product_id: product.id, quantity: 1 })
      .then(() => { setMessage('✅ Added to cart!'); setAdded(true); })
      .catch(() => setMessage('❌ Error adding to cart'));
  };

  if (!product) return <div style={{ textAlign: 'center', padding: '100px', color: '#eee' }}>Loading...</div>;

  return (
    <div style={{ padding: '40px 60px', maxWidth: '900px', margin: '0 auto', background: '#0f0f1a', minHeight: '100vh' }}>
      <button onClick={() => navigate('/')} style={{
        marginBottom: '25px', padding: '8px 20px',
        backgroundColor: 'transparent', border: '1px solid #2a2a3e',
        borderRadius: '20px', cursor: 'pointer', fontSize: '14px', color: '#aaa'
      }}>← Back</button>

      <div style={{
        display: 'flex', gap: '40px', backgroundColor: '#1a1a2e',
        borderRadius: '20px', padding: '40px',
        boxShadow: '0 4px 30px rgba(0,0,0,0.4)', border: '1px solid #2a2a3e'
      }}>
        <img src={product.image_url} alt={product.name}
          style={{ width: '350px', height: '350px', objectFit: 'cover', borderRadius: '16px', flexShrink: 0 }} />

        <div style={{ flex: 1 }}>
          <span style={{
            backgroundColor: '#e94560', color: 'white',
            padding: '4px 12px', borderRadius: '20px', fontSize: '12px'
          }}>In Stock: {product.stock}</span>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '15px 0', color: 'white' }}>{product.name}</h1>
          <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '20px' }}>{product.description}</p>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#e94560', marginBottom: '25px' }}>৳{product.price}</div>

          <button onClick={handleAddToCart} disabled={added} style={{
            width: '100%', padding: '15px',
            backgroundColor: added ? '#28a745' : '#e94560',
            color: 'white', border: 'none', borderRadius: '12px',
            fontSize: '16px', fontWeight: '700', cursor: 'pointer'
          }}>
            {added ? '✅ Added to Cart!' : '🛒 Add to Cart'}
          </button>

          {message && <div style={{ marginTop: '15px', textAlign: 'center', color: '#28a745', fontWeight: '600' }}>{message}</div>}

          <button onClick={() => navigate('/cart')} style={{
            width: '100%', padding: '12px', marginTop: '12px',
            backgroundColor: '#16213e', color: 'white',
            border: '1px solid #2a2a3e', borderRadius: '12px', fontSize: '14px', cursor: 'pointer'
          }}>View Cart →</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;