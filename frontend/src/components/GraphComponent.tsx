import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ChartDataLabels,
  Filler,
  Tooltip,
  Legend,
  Title
);

interface GraphComponentProps {
  type: 'bar' | 'line' | 'pie' | 'doughnut'; // Extend as needed
  data: ChartData<'bar' | 'line' | 'pie' | 'doughnut'>;
  options?: ChartOptions<'bar' | 'line' | 'pie' | 'doughnut'>;
  width?: number;
  height?: number;
  chartDataLabelsEnable?:boolean;
}

const GraphComponent: React.FC<GraphComponentProps> = ({
  type,
  data,
  options,
  width = 400,
  height = 300,
  chartDataLabelsEnable = false
}) => {
    if(chartDataLabelsEnable){
        ChartJS.register(ChartDataLabels);
    }
    else{
        ChartJS.unregister(ChartDataLabels);
    }
  return (
    <div data-testid='graph-component' style={{ width, height, overflowY:'auto'}}>
      <Chart type={type} data={data} options={options} width={width} height={height}/>
    </div>
  );
};

export default GraphComponent;