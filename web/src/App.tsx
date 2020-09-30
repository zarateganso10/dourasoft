import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import Routes from './routes'
import AppProvider from './hooks'

import GlobalStyle from './styles/global'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
