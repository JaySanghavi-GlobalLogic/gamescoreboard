// store/websocketSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WebSocketState {
  unitsData: any;
}

const initialState: WebSocketState = {
  unitsData: [],
};

const websocketLineUnitsPageSlice = createSlice({
  name: 'websocketLineUnitsPageSlice',
  initialState,
  reducers: {
    setUnitsData(state, action: PayloadAction<any>) {
      state.unitsData = action.payload;
    },
  },
});

export const {
  setUnitsData,
} = websocketLineUnitsPageSlice.actions;

export default websocketLineUnitsPageSlice.reducer;
