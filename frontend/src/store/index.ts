// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import websocketScoreboardSlice from './slices/WebSocketScoreboardSlice';
import websocketLineUnitsPageSlice from './slices/WebSocketLineUnitsPageSlice';
import websocketThroughputSlice from './slices/WebSocketThroughputSlice';

export const store = configureStore({
  reducer: {
    websocketScoreboard: websocketScoreboardSlice,
    websocketLineUnitsPage: websocketLineUnitsPageSlice,
    websocketThroughput: websocketThroughputSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
