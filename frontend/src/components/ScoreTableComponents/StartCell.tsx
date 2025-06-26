import React from 'react';

interface StartCellProps {
  start: string;
}

const StartCell: React.FC<StartCellProps> = ({ start }) => (
  <div className="bg-gray-300 text-sm text-black px-3 py-1 rounded h-12 w-12 flex flex-col items-center justify-center text-center mx-auto">
    {start}
  </div>
);

export default StartCell;