import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/api';
import Footer from '../components/Footer';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then(res => { 
        setProducts(res.data); 
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    // 1. Flexbox layout wrapper keeps the footer glued to the bottom
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* 2. Content wrapper contains the padding, leaving the footer free to stretch full-width */}
      <div style={{ padding: '40px 60px', flex: '1 0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: 'white' }}>Premium Collection</h1>
          <p style={{ color: '#ddd', marginTop: '8px' }}>Premium jerseys for crazyfan</p>
        </div>
        
        {/* 3. Inline conditional rendering ensures layout and footer stay intact during loading */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px', fontSize: '20px', color: '#eee' }}>
            Loading products...
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '25px'
          }}>
            {products.map(p => (
              <div key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                style={{
                  backgroundColor: '#1a1a2e',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 2px 15px rgba(0,0,0,0.3)',
                  border: '1px solid #2a2a3e',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(233,69,96,0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 15px rgba(0,0,0,0.3)';
                }}
              >
                <img src={p.image_url} alt={p.name} 
                  style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} />
                <div style={{ padding: '18px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px', color: 'white' }}>{p.name}</h3>
                  <p style={{ color: '#888', fontSize: '13px', marginBottom: '12px' }}>Stock: {p.stock} left</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '22px', fontWeight: '800', color: '#e94560' }}>৳{p.price}</span>
                    <span style={{
                      backgroundColor: '#e94560', color: 'white',
                      padding: '6px 14px', borderRadius: '20px', fontSize: '12px'
                    }}>View →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Footer sits safely outside the padded body container */}
      <Footer />
    </div>
  );
}

export default Home;