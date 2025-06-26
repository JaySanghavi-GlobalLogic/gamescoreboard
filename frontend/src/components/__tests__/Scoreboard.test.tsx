import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Scoreboard from '../ScoreTableComponents/Scoreboard';

jest.mock('socket.io-client', () => {
  return {
    io: () => ({
      on: jest.fn((event, callback) => {
        if (event === 'scoreboard_update') {
          callback({
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
          });
        }

        if (event === 'throughput_update') {
          callback([{ line: 'Line A', data: [5, 6, 7] }]);
        }

        if (event === 'units_update') {
          callback([{ line: 'Line A', data: [1, 2, 3] }]);
        }
      }),
      emit: jest.fn(),
      disconnect: jest.fn(),
    }),
  };
});

describe('Scoreboard Component', () => {
  test('renders Score tab by default', async () => {
    render(<Scoreboard defaultTab="Score" />);
    expect(await screen.findByTestId('score-table')).toBeInTheDocument();
    expect(screen.getByTestId('tab-score')).toBeInTheDocument();
  });

  test('renders Units tab when defaultTab is Units', async () => {
    render(<Scoreboard defaultTab="Units" />);
    expect(await screen.findByTestId('units-dashboard')).toBeInTheDocument();
  });

  test('switches to Units tab on click', async () => {
    render(<Scoreboard />);
    const unitsTab = await screen.findByTestId('tab-button-units');
    fireEvent.click(unitsTab);
    expect(await screen.findByTestId('units-dashboard')).toBeInTheDocument();
  });

  test('switches back to Score tab on click', async () => {
    render(<Scoreboard defaultTab="Units" />);
    const scoreTab = await screen.findByTestId('tab-button-score');
    fireEvent.click(scoreTab);
    expect(await screen.findByTestId('score-table')).toBeInTheDocument();
  });

  test('renders score table row content', async () => {
    render(<Scoreboard defaultTab="Score" />);
    const row = await screen.findByTestId('score-row-0');
    expect(row).toHaveTextContent('Line A');
    expect(row).toHaveTextContent('Zone 1');
    expect(row).toHaveTextContent('⭐ 75%');
  });
});
