import React, { useState, useEffect } from 'react';
import ThroughputDashboard from '../ThroughputDashboard';
import LineUnitsPage from '../LineUnitsPage';
import { getDateTime } from '../../utils/DisplayDateTime';
import { io } from 'socket.io-client';

import LocationCell from './LocationCell';
import StartCell from './StartCell';
import RampUpCell from './RampUpCell';
import PowerHourCell from './PowerHourCell';
import CountsGraphCell from './CountsGraphCell';
import TextCell from './TextCell';
import HelmetPointsCell from './HelmetPointsCell';

const socket = io('http://localhost:5000');

const Scoreboard = ({ defaultTab = 'Score' }) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const [lineName, setLineName] = useState('');
  const { formattedDate, currentTime } = getDateTime();
  const [scoreboardData, setScoreboardData] = useState<any>([]);
  const [throughputData, setThroughputData] = useState<any>([]);
  const [unitsData, setUnitsData] = useState<any>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Connected to WebSocket');
      socket.emit('client_event', { message: 'Hello from React client' });
    });

    socket.on('scoreboard_update', (data) => setScoreboardData(data));
    socket.on('throughput_update', (data) => setThroughputData(data));
    socket.on('units_update', (data) => setUnitsData(data));

    socket.on('disconnect', () => console.log('❌ Disconnected from server'));

    return () => { socket.disconnect(); }
  }, []);

  const handleLineClick = (lineName: string) => {
    setLineName(lineName);
  };

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
                className={`block w-full text-center px-5 py-5 my-1 rounded text-sm font-medium ${selectedTab === item ? 'bg-white text-black' : 'bg-gray-300 hover:bg-gray-400'
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
                        <th key={header} className="px-2 py-1 text-sm text-gray-600">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {scoreboardData?.rows?.map((row: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-100" data-testid={`score-row-${index}`}>
                        <td className="px-2 py-1">
                          <LocationCell location={row.location} oee={row.oee} />
                        </td>
                        <td className="px-2 py-1">
                          <StartCell start={row.start} />
                        </td>
                        <td className="px-2 py-1">
                          <RampUpCell rampUp={row.rampUp} />
                        </td>
                        <td className="px-2 py-1">
                          <PowerHourCell pwrHr={row.pwrHr} />
                        </td>
                        <td className="px-2 py-1">
                          <CountsGraphCell counts={row.counts} />
                        </td>
                        <td className="px-2 py-1">
                          <TextCell value={row.huddles} />
                        </td>
                        <td className="px-2 py-1">
                          <TextCell value={row.skus} />
                        </td>
                        <td className="px-2 py-1">
                          <TextCell value={row.avgCO} />
                        </td>
                        <td className="px-2 py-1">
                          <HelmetPointsCell points={row.points} pwrHr={row.pwrHr} oee={row.oee} />
                        </td>
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
                throughputData={throughputData}
              />
              </div>
            )}
          </main>
        </div>
      ) : (
        <div className="h-screen w-screen bg-gray-100" data-testid="tab-units">
          <LineUnitsPage
            lineName={lineName}
            onBack={() => setLineName('')}
            unitsData={unitsData}
          />
        </div>
      )}
    </>
  );
};

export default Scoreboard;
