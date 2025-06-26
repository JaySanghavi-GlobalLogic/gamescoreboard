import React from 'react';
import HelmetIcon from '../HelmetIcon';

interface HelmetPointsCellProps {
  points: number;
  pwrHr: number;
  oee: number;
}

const HelmetPointsCell: React.FC<HelmetPointsCellProps> = ({ points, pwrHr, oee }) => (
  <HelmetIcon
    number={points}
    color={pwrHr < 60 ? 'red' : oee > 93 ? 'green' : 'gray'}
  />
);

export default HelmetPointsCell;