// store/websocketSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WebSocketState {
  throughputData: any;
}

const initialState: WebSocketState = {
  throughputData: [],
};

const websocketThroughputSlice = createSlice({
  name: 'websocketThroughputSlice',
  initialState,
  reducers: {
    setThroughputData(state, action: PayloadAction<any>) {
      state.throughputData = action.payload;
    },
  },
});

export const {
  setThroughputData,
} = websocketThroughputSlice.actions;

export default websocketThroughputSlice.reducer;
