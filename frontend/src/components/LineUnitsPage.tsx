import React, { useState } from 'react';
import { getDateTime } from '../utils/DisplayDateTime';
import GraphComponent from './GraphComponent';
import XBarChart from './XBar';
import RChart from './RChart';

interface Props {
    lineName: string;
    onBack: () => void;
    defaultTab?: string;
    unitsData?: any;
}

const options = {
    responsive: true,
    plugins: {
        legend: { display: false },
        tooltip: { mode: 'index' as const, intersect: false },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 3,
            },
        },
    },
};

const LineUnitsPage: React.FC<Props> = ({ lineName, onBack, defaultTab = 'Units/Man Hour', unitsData }) => {
    const [selectedTab, setSelectedTab] = useState(defaultTab);
    const { formattedDate, currentTime } = getDateTime();

    const renderGraph = () => {
        if (selectedTab === 'Units/Man Hour') {
            return (
                <div data-testid="graph-units-man-hour" className="bg-white rounded-lg p-6 shadow">
                    <GraphComponent
                        type='bar'
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
                <div data-testid="graph-xbar-r" className="space-y-6">
                    <XBarChart
                        xBarRData={unitsData?.xBarData.xBarRData}
                        xBarStats={unitsData?.xBarData.xBarStats}
                        rChartStats={unitsData?.rChartData.Stats}
                    />
                    <RChart
                        rData={unitsData?.xBarData?.xBarRData.map((item: any) => item)}
                        stats={unitsData?.rChartData.Stats}
                    />
                </div>
            );
        }

        return (
            <div className="text-gray-500 text-xl flex items-center justify-center h-full" data-testid="graph-not-implemented">
                {selectedTab} view not implemented yet.
            </div>
        );
    };

    const data = {
        labels: unitsData?.unitsManHourData?.map((item: any) => item.time),
        datasets: [
            {
                type: 'bar' as const,
                label: 'Units',
                data: unitsData?.unitsManHourData?.map((item: any) => item.value),
                backgroundColor: '#D32F2F',
                borderRadius: 4,
                barThickness: 40,
            },
            {
                type: 'line' as const,
                label: 'Trend',
                data: unitsData?.unitsManHourData?.map((item: any) => item.value),
                borderColor: '#999',
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.3,
            },
        ],
    };

    return (
        <div className="flex h-screen bg-gray-100 overflow-auto" data-testid="line-units-page">
            <aside className="w-40 bg-gray-200 p-4">
                <h1 className="text-xl font-bold mb-4">Units</h1>
                {unitsData?.navItems.map((item: any) => (
                    <button
                        key={item}
                        data-testid={`tab-${item.toLowerCase().replace(/\s/g, '-')}`}
                        onClick={() => setSelectedTab(item)}
                        className={`block w-full text-center px-4 py-3 my-1 rounded text-sm font-medium ${
                            selectedTab === item ? 'bg-white text-black' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                    >
                        {item}
                    </button>
                ))}
                <button
                    data-testid="back-button"
                    className="mt-6 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-sm"
                    onClick={onBack}
                >
                    ← Back to Units
                </button>
            </aside>

            <main className="flex-1 flex flex-col p-4 overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold" data-testid="line-title">
                        {lineName} - {selectedTab}
                    </h1>
                    <div className="text-sm text-gray-700 font-medium" data-testid="date-time">
                        {formattedDate} - {currentTime}
                    </div>
                </div>

                <div className="flex-1">
                    {renderGraph()}
                </div>
            </main>
        </div>
    );
};

export default LineUnitsPage;
