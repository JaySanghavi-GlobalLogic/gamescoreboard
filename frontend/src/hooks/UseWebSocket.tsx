import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import {
  setScoreboardData,
  setThroughputData,
  setUnitsData,
} from '../store/slices/WebSocketSlice';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

export const useWebSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('✅ Connected to WebSocket');
      socket.emit('client_event', { message: 'Hello from React client' });
    });

    socket.on('scoreboard_update', (data) => {
      dispatch(setScoreboardData(data));
    });

    socket.on('throughput_update', (data) => {
      dispatch(setThroughputData(data));
    });

    socket.on('units_update', (data) => {
      dispatch(setUnitsData(data));
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from WebSocket');
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
};
