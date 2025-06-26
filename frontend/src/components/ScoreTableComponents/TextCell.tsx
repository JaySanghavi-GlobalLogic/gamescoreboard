import React from 'react';

interface TextCellProps {
  value: string | number;
}

const TextCell: React.FC<TextCellProps> = ({ value }) => (
  <div className="bg-gray-300 text-sm text-black px-3 py-1 rounded h-12 w-12 flex flex-col items-center justify-center text-center mx-auto">
    {value}
  </div>
);

export default TextCell;