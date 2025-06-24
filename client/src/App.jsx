import React from 'react';
import HomePage from './pages/HomePage';
import MouseLightEffect from './components/MouseLightEffect';

const App = () => (
  <>
    <MouseLightEffect>
      <HomePage />
    </MouseLightEffect>
  </>
);

export default App;