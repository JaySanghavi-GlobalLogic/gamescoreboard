// components/ThroughputDashboard.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import GraphComponent from '../components/GraphComponent';

interface Props {
  onLineClick: (lineName: string) => void;
}

const getIcon = (sign: 'Up' | 'Down' | 'Star') => {
  if (sign === 'Up') return '🔼';
  if (sign === 'Down') return '🔻';
  return '⭐';
};

const ThroughputDashboard: React.FC<Props> = ({ onLineClick }) => {
  const throughputData = useSelector((state: RootState) => state?.websocketThroughput?.throughputData);

  return (
    <div className="h-[calc(100vh-100px)] overflow-y-auto p-4" data-testid="throughput-dashboard">
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {throughputData?.map((line:any, idx:any) => (
          <div
            key={line?.name}
            className="bg-white border rounded-lg shadow-md hover:shadow-xl cursor-pointer"
            onClick={() => onLineClick(line.name)}
            data-testid={`line-card-${idx}`}
          >
            <div className="flex justify-between items-center px-4 pt-2">
              <h3 className="text-md font-semibold" data-testid={`line-name-${idx}`}>{line.name}</h3>
              <span className="text-sm text-red-500" data-testid={`line-people-${idx}`}>👥 {line.people}</span>
            </div>

            <div className="h-32 px-4 overflow-auto" data-testid={`line-chart-container-${idx}`}>
              <GraphComponent
                chartDataLabelsEnable={true}
                type="bar"
                width={250}
                height={150}
                data={{
                  labels: line?.hourlyData?.map((d:any) => d.hour),
                  datasets: [
                    {
                      label: 'Throughput',
                      data: line?.hourlyData?.map((d:any) => d.value),
                      backgroundColor: '#34D399',
                      borderRadius: 4,
                    },
                  ],
                }}
                options={{
                  responsive: false,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      ticks: { font: { size: 10 } },
                      grid: { display: false },
                    },
                    y: {
                      grid: { display: false },
                      beginAtZero: true,
                      suggestedMin: 0,
                      suggestedMax: Math.max(...line?.hourlyData?.map((item:any) => Number(item?.value)) ?? [0]) + 5,
                    },
                  },
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        title: (ctx) => `Hour: ${ctx[0].label}`,
                        label: (ctx) => `Value: ${ctx.formattedValue}`,
                      },
                    },
                    datalabels: {
                      display: true,
                      align: 'end',
                      anchor: 'end',
                      formatter: function (_: any, ctx: any) {
                        const sign = line?.hourlyData?.[ctx.dataIndex]?.sign;
                        return getIcon(sign);
                      },
                      font: {
                        size: 14,
                      },
                    },
                  },
                }}
              />
            </div>

            <div className={`text-white text-center ${line?.color} py-2 rounded-b`} data-testid={`line-footer-${idx}`}>
              <p className="text-xl font-bold" data-testid={`line-total-${idx}`}>{line?.total?.toLocaleString()}</p>
              <p className="text-sm" data-testid={`line-diff-${idx}`}>
                {line?.diff > 0 ? '+' : '-'}{line?.diff?.toLocaleString()} {line?.unit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThroughputDashboard;
