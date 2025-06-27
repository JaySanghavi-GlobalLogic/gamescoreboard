import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Scoreboard from './containers/Scoreboard';
import { useWebSocket } from './hooks/UseWebSocket';

// ✅ WebSocketInitializer must be inside the Provider
const WebSocketInitializer = () => {
  useWebSocket(); //Initialize all Reducers
  
  return null; // This component doesn't render anything
};

const App = () => {
  return (
    <Provider store={store}>
      <WebSocketInitializer />
      <Scoreboard />
    </Provider>
  );
};

export default App;
