import React from 'react';

interface HelmetIconProps {
  number: number;
  color?: 'green' | 'gray' | 'red';
  size?: number; // in pixels
}

const HelmetIcon: React.FC<HelmetIconProps> = ({ number, color = 'gray', size = 52 }) => {
  const colorClass = {
    green: 'text-green-500',
    gray: 'text-gray-500',
    red: 'text-red-500',
  }[color];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 70 70"
        className={`w-full h-full fill-current ${colorClass}`}
      >
        <path d="M32 2C15.4 2 2 15.4 2 32s13.4 30 30 30c4.4 0 8-3.6 8-8v-3h6c1.7 0 3-1.3 3-3v-8c0-1.7-1.3-3-3-3h-6v-5.2c0-1.8 1-3.4 2.6-4.2 4.3-2.1 7.4-6.7 7.4-11.6C49 9.4 41.6 2 32 2zM12 32c0-11 9-20 20-20s20 9 20 20c0 4.3-2.8 8.4-6.6 10.4C42 43.5 40 46 40 48.8V52c0 1.1-.9 2-2 2h-4v-4c0-1.1-.9-2-2-2h-6v-2c0-1.1-.9-2-2-2H16v-6c0-3.3-1.3-6.3-3.4-8.6C12.2 33 12 32.5 12 32z" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-sm" style={{ transform: 'translateX(-10%)'}}>
        {number}
      </div>
    </div>
  );
};

export default HelmetIcon;
