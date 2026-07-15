import React, { useState } from 'react';
import './ImageWithLoader.css';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ src, alt, className }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`image-loader-container ${className || ''}`}>
      {loading && <div className="loader-spinner"></div>}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)} // También oculta el spinner si la imagen falla
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  );
};

export default ImageWithLoader;