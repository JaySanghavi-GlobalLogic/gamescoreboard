import React from 'react';
import GraphComponent from './GraphComponent';

interface RDatum {
  time: string;
  range: number;
}

interface RChartStats {
  UCL: number;
  LCL: number;
  mean: number;
}

interface Props {
  rData: RDatum[];
  stats: RChartStats;
}

const RChart: React.FC<Props> = ({ rData, stats }) => {
  const labels = rData.map((d) => d.time);

  const maxY =
    Math.max(...rData.map((d) => d.range), stats.UCL, stats.mean) * 1.1;

  const data = {
    labels,
    datasets: [
      {
        label: 'Range',
        data: rData.map((d) => d.range),
        borderColor: 'black',
        borderWidth: 3,
        tension: 0.3,
        fill: false,
      },
      {
        label: 'Mean',
        data: rData.map(() => stats.mean),
        borderColor: '#4caf50',
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
      {
        label: 'UCL',
        data: rData.map(() => stats.UCL),
        borderColor: '#f44336',
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
      {
        label: 'LCL',
        data: rData.map(() => stats.LCL),
        borderColor: '#f44336',
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      tooltip: { mode: 'index' as const, intersect: false },
      title: {
        display: true,
        text: 'R Chart (Range)',
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        min: 0,
        max: maxY,
      },
    },
  };

  return (
    <div
      className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 overflow-y-auto"
      data-testid="rchart-container"
    >
      <div data-testid="rchart-graph">
        <GraphComponent type="line" data={data} options={options} height={300} width={900} />
      </div>

      <div className="bg-white rounded-lg p-6 shadow" data-testid="rchart-stats">
        <h3 className="font-semibold mb-2">Specifications</h3>
        <div className="space-y-1">
          <div>
            <span className="font-medium">USL:</span> {stats?.UCL}
          </div>
          <div>
            <span className="font-medium">LSL:</span> {stats.LCL}
          </div>
          <div>
            <span className="font-medium">Mean:</span> {stats?.mean}
          </div>
        </div>
        <hr className="my-3" />
        <h3 className="font-semibold mb-2">Legend</h3>
        <div className="flex items-center space-x-2 text-xs">
          <span className="w-4 h-1 bg-black inline-block rounded"></span>
          <span>Range</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="w-4 h-1 bg-green-600 border-dashed inline-block rounded"></span>
          <span>Mean</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="w-4 h-1 bg-red-600 border-dashed inline-block rounded"></span>
          <span>UCL / LCL</span>
        </div>
      </div>
    </div>
  );
};

export default RChart;
