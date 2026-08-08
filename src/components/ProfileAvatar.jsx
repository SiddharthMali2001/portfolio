import { useState } from 'react';
import Avatar from './Avatar';

const DEFAULT_SRC = '/images/profile.png';

const ProfileAvatar = ({
  imgSrc = DEFAULT_SRC,
  alt = 'Siddharth Mali',
  className = '',
}) => {
  const [useFallback, setUseFallback] = useState(false);

  if (useFallback) {
    return <Avatar />;
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setUseFallback(true)}
      className={`h-44 w-44 md:h-52 md:w-52 rounded-full object-cover border border-gray-200/60 dark:border-muted/30 shadow-lg bg-white/40 dark:bg-primary/30 ${className}`}
    />
  );
};

export default ProfileAvatar;
