import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThroughputDashboard from '../../containers/ThroughputDashboard';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import websocketThroughputSlice from '../../store/slices/WebSocketThroughputSlice';

jest.mock('../../components/GraphComponent', () => {
  return () => <div data-testid="mock-graph-component" />;
});

const mockData = [
  {
    name: 'Line 1',
    hourlyData: [
      { hour: '08:00', value: 10, sign: 'Up' },
      { hour: '09:00', value: 12, sign: 'Down' },
      { hour: '10:00', value: 15, sign: 'Star' },
    ],
    total: 37,
    diff: 5,
    unit: 'units',
    color: 'bg-green-500',
    people: '5',
  },
];

const renderWithRedux = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      websocketThroughput: websocketThroughputSlice,
    },
    preloadedState: {
      websocketThroughput: {
        scoreboardData: [],
        throughputData: mockData,
        unitsData: [],
      },
    },
  });

  return render(<Provider store={store}>{component}</Provider>);
};

describe('ThroughputDashboard (Redux version)', () => {
  const onLineClickMock = jest.fn();

  it('renders the dashboard and chart for each line', () => {
    renderWithRedux(<ThroughputDashboard onLineClick={onLineClickMock} />);
    expect(screen.getByTestId('throughput-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('line-name-0')).toHaveTextContent('Line 1');
    expect(screen.getByTestId('line-people-0')).toHaveTextContent('👥 5');
    expect(screen.getByTestId('line-total-0')).toHaveTextContent('37');
    expect(screen.getByTestId('line-diff-0')).toHaveTextContent('+5 units');
  });

  it('calls onLineClick when a line card is clicked', () => {
    renderWithRedux(<ThroughputDashboard onLineClick={onLineClickMock} />);
    fireEvent.click(screen.getByTestId('line-card-0'));
    expect(onLineClickMock).toHaveBeenCalledWith('Line 1');
  });

  it('handles empty hourlyData safely', () => {
    const store = configureStore({
      reducer: {
        websocketThroughput: websocketThroughputSlice,
      },
      preloadedState: {
        websocketThroughput: {
          scoreboardData: [],
          throughputData: [{
            name: 'Line X',
            hourlyData: [],
            total: 0,
            diff: 0,
            unit: 'units',
            color: 'bg-gray-500',
            people: '0',
          }],
          unitsData: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <ThroughputDashboard onLineClick={onLineClickMock} />
      </Provider>
    );

    expect(screen.getByTestId('line-card-0')).toBeInTheDocument();
  });
});
