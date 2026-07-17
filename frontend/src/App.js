import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import BackgroundWrapper from './components/BackgroundWrapper';
import CategorySelect from './pages/CategorySelect';
import Home from './pages/Home';
import FanEdition from './pages/FanEdition';
import PlayerEdition from './pages/PlayerEdition';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';

const globalStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', sans-serif; background: #0f0f1a; color: #eee; }
  button { transition: all 0.2s; }
  button:hover { opacity: 0.88; transform: scale(1.02); }
`;

function App() {
  return (
    <AuthProvider>
      <style>{globalStyles}</style>
      <Router>
        <Navbar />
        <BackgroundWrapper>
          <Routes>
            <Route path="/" element={<CategorySelect />} />
            <Route path="/home" element={<Home />} />
            <Route path="/fan-edition" element={<FanEdition />} />
            <Route path="/player-edition" element={<PlayerEdition />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BackgroundWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;