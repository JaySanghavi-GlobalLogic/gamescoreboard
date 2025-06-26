import React from 'react';

interface PowerHourCellProps {
  pwrHr: number;
}

const PowerHourCell: React.FC<PowerHourCellProps> = ({ pwrHr }) => (
  <div className="flex items-center justify-center gap-1">
    {pwrHr >= 60 ? <span className="text-yellow-500">⭐</span> : <span className="text-red-500">🔻</span>}
    <span>{pwrHr}%</span>
  </div>
);

export default PowerHourCell;