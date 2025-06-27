import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

import ThroughputDashboard from './ThroughputDashboard';
import LineUnitsPage from './LineUnitsPage';
import { getDateTime } from '../utils/DisplayDateTime';

import LocationCell from '../components/ScoreTableComponents/LocationCell';
import StartCell from '../components/ScoreTableComponents/StartCell';
import RampUpCell from '../components/ScoreTableComponents/RampUpCell';
import PowerHourCell from '../components/ScoreTableComponents/PowerHourCell';
import CountsGraphCell from '../components/ScoreTableComponents/CountsGraphCell';
import TextCell from '../components/ScoreTableComponents/TextCell';
import HelmetPointsCell from '../components/ScoreTableComponents/HelmetPointsCell';

const Scoreboard = ({ defaultTab = 'Score' }) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const [lineName, setLineName] = useState('');
  const { formattedDate, currentTime } = getDateTime();

  const scoreboardData = useSelector((state: RootState) => state?.websocketScoreboard?.scoreboardData);

  const handleLineClick = (line: string) => setLineName(line);

  return (
    <>
      {lineName === '' ? (
        <div className="flex h-screen bg-gray-100">
          <aside className="w-40 bg-gray-200 p-4">
            <h1 className="text-xl font-bold mb-4">Scoreboard</h1>
            {scoreboardData?.scoreBoardOptions?.map((item: any) => (
              <button
                data-testid={`tab-button-${item.toLowerCase()}`}
                key={item}
                onClick={() => setSelectedTab(item)}
                className={`block w-full text-center px-5 py-5 my-1 rounded text-sm font-medium ${
                  selectedTab === item ? 'bg-white text-black' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              >
                {item}
              </button>
            ))}
          </aside>

          <main className="flex-1 p-4 overflow-auto">
            <div className="flex justify-between mb-4">
              <div></div>
              <div className="text-right text-gray-700 font-medium">
                {formattedDate} - {currentTime}
              </div>
            </div>

            {selectedTab === 'Score' && (
              <div className="bg-white p-4 rounded shadow overflow-x-auto" data-testid="tab-score">
                <table className="min-w-full table-auto text-center bg-white" data-testid="score-table">
                  <thead>
                    <tr>
                      {scoreboardData?.headers?.map((header: any) => (
                        <th key={header} className="px-2 py-1 text-sm text-gray-600">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {scoreboardData?.rows?.map((row: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-100"  data-testid={`score-row-${index}`}>
                        <td><LocationCell location={row.location} oee={row.oee} /></td>
                        <td><StartCell start={row.start} /></td>
                        <td><RampUpCell rampUp={row.rampUp} /></td>
                        <td><PowerHourCell pwrHr={row.pwrHr} /></td>
                        <td><CountsGraphCell counts={row.counts} /></td>
                        <td><TextCell value={row.huddles} /></td>
                        <td><TextCell value={row.skus} /></td>
                        <td><TextCell value={row.avgCO} /></td>
                        <td><HelmetPointsCell points={row.points} pwrHr={row.pwrHr} oee={row.oee} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedTab === 'Units' && (
              <div data-testid="units-dashboard">
                <ThroughputDashboard
                  onLineClick={handleLineClick}
                />
              </div>
            )}
          </main>
        </div>
      ) : (
        <div className="h-screen w-screen bg-gray-100"  data-testid="tab-units">
          <LineUnitsPage
            lineName={lineName}
            onBack={() => setLineName('')}
          />
        </div>
      )}
    </>
  );
};

export default Scoreboard;
