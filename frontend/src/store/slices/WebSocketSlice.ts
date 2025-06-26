// store/websocketSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WebSocketState {
  scoreboardData: any;
  throughputData: any;
  unitsData: any;
}

const initialState: WebSocketState = {
  scoreboardData: [],
  throughputData: [],
  unitsData: [],
};

const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setScoreboardData(state, action: PayloadAction<any>) {
      state.scoreboardData = action.payload;
    },
    setThroughputData(state, action: PayloadAction<any>) {
      state.throughputData = action.payload;
    },
    setUnitsData(state, action: PayloadAction<any>) {
      state.unitsData = action.payload;
    },
  },
});

export const {
  setScoreboardData,
  setThroughputData,
  setUnitsData,
} = websocketSlice.actions;

export default websocketSlice.reducer;
