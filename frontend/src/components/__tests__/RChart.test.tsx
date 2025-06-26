import React from 'react';
import { render, screen } from '@testing-library/react';
import RChart from '../RChart';
//import '@testing-library/jest-dom/extend-expect';

// Optional: Mock the GraphComponent if you want to isolate this test from Chart.js
jest.mock('../GraphComponent', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-graph-component" />,
}));

describe('RChart Component', () => {
  const mockData = [
    { time: '08:00', range: 2 },
    { time: '09:00', range: 4 },
    { time: '10:00', range: 3 },
  ];

  const mockStats = {
    UCL: 6,
    LCL: 1,
    mean: 3,
  };

  test('renders RChart with graph and statistics panel', () => {
    render(<RChart rData={mockData} stats={mockStats} />);
  
    expect(screen.getByTestId('rchart-container')).toBeInTheDocument();
    expect(screen.getByTestId('rchart-graph')).toBeInTheDocument();
    const statsPanel = screen.getByTestId('rchart-stats');
  
    // Use regex or full match depending on preference
    expect(statsPanel).toHaveTextContent('USL: 6');
    expect(statsPanel).toHaveTextContent('LSL: 1');
    expect(statsPanel).toHaveTextContent('Mean: 3');
  });
  

  test('renders legend labels correctly', () => {
    render(<RChart rData={mockData} stats={mockStats} />);
    expect(screen.getByText('Range')).toBeInTheDocument();
    expect(screen.getByText('Mean')).toBeInTheDocument();
    expect(screen.getByText('UCL / LCL')).toBeInTheDocument();
  });
});
