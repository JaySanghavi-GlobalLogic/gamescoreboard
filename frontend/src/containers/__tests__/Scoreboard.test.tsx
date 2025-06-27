import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Scoreboard from '../../containers/Scoreboard';

import {
  setScoreboardData,
} from '../../store/slices/WebSocketScoreboardSlice'; // Adjust import path as needed

import {
  setThroughputData,
} from '../../store/slices/WebSocketThroughputSlice'; // Adjust import path as needed


import {
  setUnitsData,
} from '../../store/slices/WebSocketLineUnitsPageSlice'; // Adjust import path as needed


describe('Scoreboard Component', () => {
  beforeEach(() => {
    store.dispatch(
      setScoreboardData({
        scoreBoardOptions: ['Score', 'Units'],
        headers: ['Line', 'Start'],
        rows: [
          {
            location: ['Line A', 'Zone 1'],
            oee: 75,
            start: 1,
            rampUp: 0,
            pwrHr: 80,
            counts: [10, 20, 30],
            huddles: 2,
            skus: 4,
            avgCO: 3,
            points: 5,
          },
        ],
      })
    );

    store.dispatch(
      setThroughputData([{ line: 'Line A', data: [5, 6, 7] }])
    );

    store.dispatch(
      setUnitsData([{ line: 'Line A', data: [1, 2, 3] }])
    );
  });

  const renderWithProvider = (ui: React.ReactElement) =>
    render(<Provider store={store}>{ui}</Provider>);

  test('renders Score tab by default', async () => {
    renderWithProvider(<Scoreboard defaultTab="Score" />);
    expect(await screen.findByTestId('score-table')).toBeInTheDocument();
    expect(screen.getByTestId('tab-score')).toBeInTheDocument();
  });

  test('renders Units tab when defaultTab is Units', async () => {
    renderWithProvider(<Scoreboard defaultTab="Units" />);
    expect(await screen.findByTestId('units-dashboard')).toBeInTheDocument();
  });

  test('switches to Units tab on click', async () => {
    renderWithProvider(<Scoreboard />);
    const unitsTab = await screen.findByTestId('tab-button-units');
    fireEvent.click(unitsTab);
    expect(await screen.findByTestId('units-dashboard')).toBeInTheDocument();
  });

  test('switches back to Score tab on click', async () => {
    renderWithProvider(<Scoreboard defaultTab="Units" />);
    const scoreTab = await screen.findByTestId('tab-button-score');
    fireEvent.click(scoreTab);
    expect(await screen.findByTestId('score-table')).toBeInTheDocument();
  });

  test('renders score table row content', async () => {
    renderWithProvider(<Scoreboard defaultTab="Score" />);
    const row = await screen.findByTestId('score-row-0');
    expect(row).toHaveTextContent('Line A');
    expect(row).toHaveTextContent('Zone 1');
    expect(row).toHaveTextContent('⭐ 75%');
  });
});
