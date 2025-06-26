import React from 'react';

interface LocationCellProps {
  location: [string, string];
  oee: number;
}

const LocationCell: React.FC<LocationCellProps> = ({ location, oee }) => (
  <div className="whitespace-pre-line text-center">
    {location[0]}<br />
    <span className="text-sm text-gray-600">{location[1]}</span><br />
    {oee >= 60 ? '⭐' : '🔻'} {oee}%
  </div>
);

export default LocationCell;