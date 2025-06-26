import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LineUnitsPage from '../LineUnitsPage';
//import '@testing-library/jest-dom/extend-expect';

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

describe('LineUnitsPage', () => {
    const onBack = jest.fn();

    test('renders default Units/Man Hour graph', async () => {
        render(<LineUnitsPage lineName="Line A" onBack={onBack} unitsData={mockUnitsData} />);
        expect(screen.getByTestId('line-title')).toHaveTextContent('Line A - Units/Man Hour');
        expect(screen.getByTestId('graph-units-man-hour')).toBeInTheDocument();
    });

    test('switches to X-Bar R graph', async () => {
        render(<LineUnitsPage lineName="Line A" onBack={onBack} unitsData={mockUnitsData} />);
        fireEvent.click(screen.getByTestId('tab-x-bar-r'));
        expect(screen.getByTestId('graph-xbar-r')).toBeInTheDocument();
    });

    test('shows not implemented message for unknown view', async () => {
        render(<LineUnitsPage lineName="Line A" onBack={onBack} unitsData={mockUnitsData} />);
        fireEvent.click(screen.getByTestId('tab-not-implemented'));
        expect(screen.getByTestId('graph-not-implemented')).toHaveTextContent('Not Implemented view not implemented yet.');
    });

    test('calls onBack when back button is clicked', () => {
        render(<LineUnitsPage lineName="Line A" onBack={onBack} unitsData={mockUnitsData} />);
        fireEvent.click(screen.getByTestId('back-button'));
        expect(onBack).toHaveBeenCalled();
    });
});
