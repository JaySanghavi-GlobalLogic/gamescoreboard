// GraphComponent.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import GraphComponent from '../GraphComponent';

// Automatically mock Chart.js rendering
jest.mock('react-chartjs-2', () => ({
  Chart: () => <div data-testid="mock-chart" />,
}));

describe('GraphComponent', () => {
  const sampleData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Sales',
        data: [10, 20, 30],
        backgroundColor: 'blue',
      },
    ],
  };

  const sampleOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Sample Chart' },
    },
  };

  it('renders the chart container with testid', () => {
    render(
      <GraphComponent
        type="bar"
        data={sampleData}
        options={sampleOptions}
        width={500}
        height={300}
      />
    );

    expect(screen.getByTestId('graph-component')).toBeInTheDocument();
    expect(screen.getByTestId('mock-chart')).toBeInTheDocument();
  });

  it('renders correctly with datalabels enabled', () => {
    render(
      <GraphComponent
        type="bar"
        data={sampleData}
        options={sampleOptions}
        chartDataLabelsEnable={true}
      />
    );

    expect(screen.getByTestId('graph-component')).toBeInTheDocument();
    expect(screen.getByTestId('mock-chart')).toBeInTheDocument();
  });
});
