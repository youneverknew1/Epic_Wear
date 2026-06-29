import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, addToCart } from '../services/api';

const USER_ID = 1;

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(id).then(res => setProduct(res.data));
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ user_id: USER_ID, product_id: product.id, quantity: 1 })
      .then(() => setMessage('✅ Added to cart!'))
      .catch(() => setMessage('❌ Error adding to cart'));
  };

  if (!product) return <h2 style={{textAlign:'center'}}>Loading...</h2>;

  return (
    <div style={{padding:'20px', maxWidth:'600px', margin:'0 auto'}}>
      <button onClick={() => navigate('/')} style={{marginBottom:'15px', cursor:'pointer'}}>← Back</button>
      <img src={product.image_url} alt={product.name} style={{width:'100%', height:'300px', objectFit:'cover', borderRadius:'8px'}} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <h2>৳{product.price}</h2>
      <p>Stock: {product.stock}</p>
      <button onClick={handleAddToCart}
        style={{width:'100%', padding:'12px', backgroundColor:'#ff6600', color:'white', border:'none', borderRadius:'8px', fontSize:'16px', cursor:'pointer'}}>
        Add to Cart
      </button>
      {message && <p style={{textAlign:'center', marginTop:'10px'}}>{message}</p>}
    </div>
  );
}

export default ProductDetail;