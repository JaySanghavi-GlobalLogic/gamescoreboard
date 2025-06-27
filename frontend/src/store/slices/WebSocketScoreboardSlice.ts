// store/websocketSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WebSocketState {
  scoreboardData: any;
}

const initialState: WebSocketState = {
  scoreboardData: [],
};

const websocketScoreboardSlice = createSlice({
  name: 'websocketScoreboardSlice',
  initialState,
  reducers: {
    setScoreboardData(state, action: PayloadAction<any>) {
      console.log("Inside reducer",action.payload);
      state.scoreboardData = action.payload;
    },
  },
});

export const {
  setScoreboardData,
} = websocketScoreboardSlice.actions;

export default websocketScoreboardSlice.reducer;
