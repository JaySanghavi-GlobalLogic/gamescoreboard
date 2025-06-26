import React from 'react';
import { render, screen } from '@testing-library/react';
import XBarChart from '../XBar';
//import '@testing-library/jest-dom';

// Mock GraphComponent
jest.mock('../GraphComponent', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-graph-component" />,
}));

describe('XBarChart Component', () => {
  const mockData = [
    { time: '08:00', mean: 12, range: 2 },
    { time: '09:00', mean: 15, range: 4 },
    { time: '10:00', mean: 13, range: 3 },
  ];

  const mockStats = {
    USL: 18,
    LSL: 8,
    mean: 13,
    sigma: 1.5,
  };

  const mockRStats = {
    UCL: 3.5,
    LCL: 0.5,
    mean: 2,
  };

  test('renders XBarChart with graph and statistics', () => {
    render(<XBarChart xBarRData={mockData} xBarStats={mockStats} rChartStats={mockRStats} />);

    expect(screen.getByTestId('xbar-container')).toBeInTheDocument();
    expect(screen.getByTestId('xbar-graph')).toBeInTheDocument();
    expect(screen.getByTestId('xbar-stats')).toBeInTheDocument();

    expect(screen.getByTestId('xbar-usl')).toHaveTextContent('USL: 18');
    expect(screen.getByTestId('xbar-lsl')).toHaveTextContent('LSL: 8');
    expect(screen.getByTestId('xbar-mean')).toHaveTextContent('Mean: 13');
    expect(screen.getByTestId('xbar-sigma')).toHaveTextContent('σ: 1.5');
  });

  test('renders legend labels', () => {
    render(<XBarChart xBarRData={mockData} xBarStats={mockStats} rChartStats={mockRStats} />);

    expect(screen.getByText('X̄')).toBeInTheDocument();
    expect(screen.getByText('Mean')).toBeInTheDocument();
    expect(screen.getByText('USL / LSL')).toBeInTheDocument();
  });
});
