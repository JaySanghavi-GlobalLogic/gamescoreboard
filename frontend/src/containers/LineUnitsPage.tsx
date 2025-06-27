import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getDateTime } from '../utils/DisplayDateTime';
import GraphComponent from '../components/GraphComponent';
import XBarChart from '../components/XBar';
import RChart from '../components/RChart';
import { ChartData, ChartOptions } from 'chart.js';

interface Props {
  lineName: string;
  onBack: () => void;
  defaultTab?: string;
}

const options: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { mode: 'index', intersect: false },
  },
  scales: {
    y: { beginAtZero: true, ticks: { stepSize: 3 } },
  },
};

const LineUnitsPage: React.FC<Props> = ({ lineName, onBack, defaultTab = 'Units/Man Hour' }) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const { formattedDate, currentTime } = getDateTime();

  const unitsData = useSelector((state: RootState) => state?.websocketLineUnitsPage?.unitsData);

  const data: ChartData<'bar' | 'line'> = {
    labels: unitsData?.unitsManHourData?.map((item: any) => item.time),
    datasets: [
      {
        type: 'bar',
        label: 'Units',
        data: unitsData?.unitsManHourData?.map((item: any) => item.value),
        backgroundColor: '#D32F2F',
        borderRadius: 4,
        barThickness: 40,
      },
      {
        type: 'line',
        label: 'Trend',
        data: unitsData?.unitsManHourData?.map((item: any) => item.value),
        borderColor: '#999',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  };

  const renderGraph = () => {
    if (selectedTab === 'Units/Man Hour') {
      return (
        <div data-testid="graph-units-man-hour">
          <GraphComponent
            type="bar"
            data={data}
            options={options}
            height={300}
            width={1020}
          />
        </div>
      );
    }

    if (selectedTab === 'X-Bar R') {
      return (
        <div data-testid="graph-xbar-r">
          <XBarChart
            xBarRData={unitsData?.xBarData?.xBarRData}
            xBarStats={unitsData?.xBarData?.xBarStats}
            rChartStats={unitsData?.rChartData?.Stats}
          />
          <RChart
            rData={unitsData?.xBarData?.xBarRData}
            stats={unitsData?.rChartData?.Stats}
          />
        </div>
      );
    }

    return (
      <div data-testid="graph-not-implemented">
        {selectedTab} view not implemented yet.
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100" data-testid="line-units-page">
      <aside className="w-40 bg-gray-200 p-4" data-testid="sidebar">
        <h1 className="text-xl font-bold mb-4">Units</h1>
        {unitsData?.navItems?.map((item: string) => (
          <button
            key={item}
            data-testid={`tab-${item.toLowerCase().replace(/[^a-z]/g, '-')}`}
            onClick={() => setSelectedTab(item)}
            className={`block w-full px-4 py-2 my-1 rounded ${selectedTab === item ? 'bg-white' : 'bg-gray-300'}`}
          >
            {item}
          </button>
        ))}
        <button onClick={onBack} className="mt-4" data-testid="back-button">
          ← Back
        </button>
      </aside>

      <main className="flex-1 p-4">
        <div className="flex justify-between mb-4" data-testid="line-header">
          <h1 data-testid="line-title">
            {lineName} - {selectedTab}
          </h1>
          <div data-testid="datetime-display">{formattedDate} - {currentTime}</div>
        </div>
        {renderGraph()}
      </main>
    </div>
  );
};

export default LineUnitsPage;
