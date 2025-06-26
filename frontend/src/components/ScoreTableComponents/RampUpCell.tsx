import React from 'react';

interface RampUpCellProps {
  rampUp: number;
}

const RampUpCell: React.FC<RampUpCellProps> = ({ rampUp }) => (
  <div
    className={`w-6 h-6 rounded ${rampUp === 0 ? 'bg-green-400' : 'bg-red-400'} flex items-center justify-center text-sm text-black px-3 py-1 rounded h-12 w-12 flex-col text-center mx-auto`}
  >
    {rampUp}
  </div>
);

export default RampUpCell;