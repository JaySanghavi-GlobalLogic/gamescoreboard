import React from 'react';
import GraphComponent from '../GraphComponent';

interface CountsGraphCellProps {
  counts: number[];
}

const CountsGraphCell: React.FC<CountsGraphCellProps> = ({ counts }) => (
  <GraphComponent
    type="bar"
    width={120}
    height={40}
    data={{
      labels: counts.map((_, index) => `${index}`),
      datasets: [
        {
          label: 'Counts',
          data: counts,
          backgroundColor: '#1e3a8a',
          borderRadius: 0,
          barPercentage: 1.0,
          categoryPercentage: 1.0,
        },
      ],
    }}
    options={{
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        x: { display: false, grid: { display: false } },
        y: { display: false, grid: { display: false } },
      },
    }}
  />
);

export default CountsGraphCell;