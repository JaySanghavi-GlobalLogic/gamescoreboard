import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThroughputDashboard from '../ThroughputDashboard';

jest.mock('../GraphComponent', () => {
  return () => <div data-testid="mock-graph-component" />;
});
const mockData = [
  {
    name: 'Line 1',
    hourlyData: [
      { hour: '08:00', value: 10, sign: 'Up' },
      { hour: '09:00', value: 12, sign: 'Down' },
      { hour: '10:00', value: 15, sign: 'Star' }, // ✅ now covers the third path
    ],
    total: 37,
    diff: 5,
    unit: 'units',
    color: 'bg-green-500',
    people: '5',
  },
];

describe('ThroughputDashboard Component', () => {
  const mockData = [
    {
      name: 'Line 1',
      hourlyData: [
        { hour: '08:00', value: 10, sign: 'Up' },
        { hour: '09:00', value: 12, sign: 'Down' }
      ],
      total: 22,
      diff: 2,
      unit: 'units',
      color: 'bg-green-500',
      people: '5'
    },
  ];

  const onLineClickMock = jest.fn();

  it('renders the dashboard and chart for each line', () => {
    render(<ThroughputDashboard throughputData={mockData} onLineClick={onLineClickMock} />);

    expect(screen.getByTestId('throughput-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('line-card-0')).toBeInTheDocument();
    expect(screen.getByTestId('line-name-0')).toHaveTextContent('Line 1');
    expect(screen.getByTestId('line-people-0')).toHaveTextContent('👥 5');
    expect(screen.getByTestId('line-total-0')).toHaveTextContent('22');
    expect(screen.getByTestId('line-diff-0')).toHaveTextContent('+2 units');
  });

  it('renders chart container for each line card', () => {
    render(<ThroughputDashboard throughputData={mockData} onLineClick={onLineClickMock} />);
    expect(screen.getByTestId('line-chart-container-0')).toBeInTheDocument();
  });

  it('calls onLineClick when a line card is clicked', () => {
    render(<ThroughputDashboard throughputData={mockData} onLineClick={onLineClickMock} />);

    const card = screen.getByTestId('line-card-0');
    fireEvent.click(card);

    expect(onLineClickMock).toHaveBeenCalledWith('Line 1');
  });
  it('renders multiple line cards when multiple data entries are provided', () => {
    const multiData = [
      ...mockData,
      {
        name: 'Line 2',
        hourlyData: [
          { hour: '08:00', value: 15, sign: 'Star' },
          { hour: '09:00', value: 20, sign: 'Up' }
        ],
        total: 35,
        diff: -5,
        unit: 'units',
        color: 'bg-red-500',
        people: '7'
      }
    ];

    render(<ThroughputDashboard throughputData={multiData} onLineClick={onLineClickMock} />);

    expect(screen.getByTestId('line-card-0')).toHaveTextContent('Line 1');
    expect(screen.getByTestId('line-card-1')).toHaveTextContent('Line 2');
  });

  it('renders with empty throughputData without crashing', () => {
    render(<ThroughputDashboard throughputData={[]} onLineClick={onLineClickMock} />);
    expect(screen.getByTestId('throughput-dashboard')).toBeInTheDocument();
  });

  it('handles empty hourlyData safely', () => {
    const dataWithEmptyHourly = [
      {
        name: 'Line X',
        hourlyData: [], // ✅ empty array
        total: 0,
        diff: 0,
        unit: 'units',
        color: 'bg-gray-500',
        people: '0',
      },
    ];
    render(<ThroughputDashboard throughputData={dataWithEmptyHourly} onLineClick={onLineClickMock} />);
    expect(screen.getByTestId('line-card-0')).toBeInTheDocument();
  });

  it('handles zero diff value', () => {
    const dataWithZeroDiff = [
      {
        name: 'Line Z',
        hourlyData: [{ hour: '08:00', value: 0, sign: 'Up' }],
        total: 0,
        diff: 0,
        unit: 'units',
        color: 'bg-yellow-500',
        people: '1',
      },
    ];
    render(<ThroughputDashboard throughputData={dataWithZeroDiff} onLineClick={onLineClickMock} />);
    expect(screen.getByTestId('line-diff-0')).toHaveTextContent('-0 units'); // negative sign branch triggered
  });

});
