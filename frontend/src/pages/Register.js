import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) return setError('All fields required');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      const res = await axios.post('https://epic-wear-backend.onrender.com/api/auth/register', { name, email, password });
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div style={{minHeight:'100vh', background:'#0f0f1a', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{backgroundColor:'#1a1a2e', padding:'40px', borderRadius:'20px', width:'100%', maxWidth:'420px', border:'1px solid #2a2a3e'}}>
        <h1 style={{color:'white', textAlign:'center', marginBottom:'8px', fontSize:'28px'}}>Create Account</h1>
        <p style={{color:'#aaa', textAlign:'center', marginBottom:'30px'}}>Join EpicWear today</p>

        <label style={{color:'#aaa', fontSize:'13px'}}>Full Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)}
          placeholder="Your name"
          style={{width:'100%', padding:'12px', marginBottom:'15px', marginTop:'5px',
            borderRadius:'10px', border:'1px solid #2a2a3e', backgroundColor:'#16213e',
            color:'white', fontSize:'14px'}} />

        <label style={{color:'#aaa', fontSize:'13px'}}>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={{width:'100%', padding:'12px', marginBottom:'15px', marginTop:'5px',
            borderRadius:'10px', border:'1px solid #2a2a3e', backgroundColor:'#16213e',
            color:'white', fontSize:'14px'}} />

        <label style={{color:'#aaa', fontSize:'13px'}}>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          placeholder="Min 6 characters"
          style={{width:'100%', padding:'12px', marginBottom:'20px', marginTop:'5px',
            borderRadius:'10px', border:'1px solid #2a2a3e', backgroundColor:'#16213e',
            color:'white', fontSize:'14px'}} />

        {error && <p style={{color:'#e94560', marginBottom:'15px', textAlign:'center', fontSize:'14px'}}>{error}</p>}

        <button onClick={handleRegister} disabled={loading} style={{
          width:'100%', padding:'14px', backgroundColor:'#e94560',
          color:'white', border:'none', borderRadius:'12px',
          fontSize:'16px', fontWeight:'700', cursor:'pointer'
        }}>{loading ? 'Creating account...' : 'Sign Up'}</button>

        <p style={{color:'#aaa', textAlign:'center', marginTop:'20px', fontSize:'14px'}}>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} style={{color:'#e94560', cursor:'pointer', fontWeight:'600'}}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;