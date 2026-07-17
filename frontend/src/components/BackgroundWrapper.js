import React from 'react';

function BackgroundWrapper({ children }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.bgImage}></div>
      <div style={styles.darkOverlay}></div>
      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  bgImage: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(https://res.cloudinary.com/ddatom50t/image/upload/v1784276417/Web_-16-9.png_r09kdp.webp)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(5px)',
    transform: 'scale(1.1)',
    zIndex: 0,
  },
  darkOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 14, 26, 0.75)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    minHeight: '100vh',
  },
};

export default BackgroundWrapper;