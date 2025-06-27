import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LineUnitsPage from '../../containers/LineUnitsPage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import websocketLineUnitsPageSlice from '../../store/slices/WebSocketLineUnitsPageSlice';

const mockUnitsData = {
  unitsManHourData: [
    { time: '08:00', value: 10 },
    { time: '09:00', value: 15 },
  ],
  xBarData: {
    xBarRData: [
      { time: '08:00', mean: 10, range: 2 },
      { time: '09:00', mean: 12, range: 3 },
    ],
    xBarStats: { USL: 15, LSL: 5, mean: 10, sigma: 1 },
  },
  rChartData: {
    Stats: { UCL: 5, LCL: 1, mean: 3 },
  },
  navItems: ['Units/Man Hour', 'X-Bar R', 'Not Implemented'],
};

const renderWithRedux = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      websocketLineUnitsPage: websocketLineUnitsPageSlice,
    },
    preloadedState: {
      websocketLineUnitsPage: {
        scoreboardData: [],
        unitsData: mockUnitsData,
        throughputData: [],
      },
    },
  });

  return render(<Provider store={store}>{component}</Provider>);
};

describe('LineUnitsPage', () => {
  const onBack = jest.fn();

  test('renders default Units/Man Hour graph', () => {
    renderWithRedux(<LineUnitsPage lineName="Line A" onBack={onBack} />);
    expect(screen.getByTestId('line-title')).toHaveTextContent('Line A - Units/Man Hour');
    expect(screen.getByTestId('graph-units-man-hour')).toBeInTheDocument();
  });

  test('switches to X-Bar R graph', () => {
    renderWithRedux(<LineUnitsPage lineName="Line A" onBack={onBack} />);
    fireEvent.click(screen.getByTestId('tab-x-bar-r'));
    expect(screen.getByTestId('graph-xbar-r')).toBeInTheDocument();
  });

  test('shows not implemented message for unknown view', () => {
    renderWithRedux(<LineUnitsPage lineName="Line A" onBack={onBack} />);
    fireEvent.click(screen.getByTestId('tab-not-implemented'));
    expect(screen.getByTestId('graph-not-implemented')).toHaveTextContent('Not Implemented view not implemented yet.');
  });

  test('calls onBack when back button is clicked', () => {
    renderWithRedux(<LineUnitsPage lineName="Line A" onBack={onBack} />);
    fireEvent.click(screen.getByTestId('back-button'));
    expect(onBack).toHaveBeenCalled();
  });
});
