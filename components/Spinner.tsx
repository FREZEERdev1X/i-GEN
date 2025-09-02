
import React from 'react';

interface SpinnerProps {
  large?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ large = false }) => {
  const sizeClasses = large ? 'w-10 h-10' : 'w-5 h-5';
  const marginClass = large ? '' : 'mr-2';

  return (
    <div
      className={`${sizeClasses} ${marginClass} animate-spin rounded-full border-4 border-t-transparent border-slate-300`}
      style={{ borderTopColor: 'transparent' }}
    ></div>
  );
};

export default Spinner;
