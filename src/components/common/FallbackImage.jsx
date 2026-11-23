import React, { useState } from 'react';
import { getFallbackImage } from '../../utils/imageFallback';

export const FallbackImage = ({
  src,
  alt = 'Artisanal Bake',
  title = '',
  category = 'Bakery',
  className = '',
  loading = 'lazy'
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasFailed, setHasFailed] = useState(false);

  const handleError = () => {
    if (!hasFailed) {
      setHasFailed(true);
      setImgSrc(getFallbackImage(title || alt, category));
    }
  };

  return (
    <img
      src={imgSrc || getFallbackImage(title || alt, category)}
      alt={alt}
      loading={loading}
      onError={handleError}
      className={`object-cover ${className}`}
    />
  );
};
