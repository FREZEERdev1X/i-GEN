
import React, { useMemo } from 'react';

const Snowfall: React.FC = () => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.5 + 0.3,
      };
      const size = Math.random() * 3 + 1;
      return (
        <div
          key={i}
          className="absolute top-0 w-1 h-1 bg-white rounded-full animate-snow"
          style={{...style, width: `${size}px`, height: `${size}px`}}
        />
      );
    });
  }, []);

  return <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">{snowflakes}</div>;
};

export default Snowfall;
