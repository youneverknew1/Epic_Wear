import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/api';

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
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{textAlign:'center'}}>Loading products...</h2>;

  return (
    <div style={{padding:'20px'}}>
      <h1 style={{textAlign:'center'}}>🛒 Our Products</h1>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px'}}>
        {products.map(p => (
          <div key={p.id} style={{border:'1px solid #ddd', borderRadius:'8px', padding:'15px', cursor:'pointer'}}
            onClick={() => navigate(`/product/${p.id}`)}>
            <img src={p.image_url} alt={p.name} style={{width:'100%', height:'200px', objectFit:'cover'}} />
            <h3>{p.name}</h3>
            <p>৳{p.price}</p>
            <p>Stock: {p.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;