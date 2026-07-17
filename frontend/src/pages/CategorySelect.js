import React from 'react';
import { useNavigate } from 'react-router-dom';

function CategorySelect() {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate('/home');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Choose Your Style</h1>
      <p style={styles.subtitle}>Pick a collection to explore</p>

      <div style={styles.grid}>
        <div style={styles.card} onClick={handleSelect}>
          <img
            src="https://res.cloudinary.com/ddatom50t/image/upload/v1784267757/rn-image_picker_lib_temp_62fe2df9-5b70-46c6-85cf-2f3943f6aaf6_rpq0i7.webp"
            alt="Fan Edition"
            style={styles.image}
          />
          <div style={styles.overlay}>
            <h2 style={styles.cardTitle}>Fan Edition</h2>
            <button style={styles.button}>Explore →</button>
          </div>
        </div>

        <div style={styles.card} onClick={handleSelect}>
          <img
            src="https://res.cloudinary.com/ddatom50t/image/upload/v1784267755/images_nfbmel.jpg"
            alt="Player Edition"
            style={styles.image}
          />
          <div style={styles.overlay}>
            <h2 style={styles.cardTitle}>Player Edition</h2>
            <button style={styles.button}>Explore →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0e1a',
    padding: '60px 20px',
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#8892b0',
    fontSize: '1.1rem',
    marginBottom: '50px',
  },
  grid: {
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  card: {
    position: 'relative',
    width: '400px',
    height: '500px',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
    padding: '30px 20px 20px',
    textAlign: 'left',
  },
  cardTitle: {
    color: '#fff',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  button: {
    backgroundColor: '#dc2f4a',
    color: '#fff',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default CategorySelect;