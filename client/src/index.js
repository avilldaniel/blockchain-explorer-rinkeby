import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Balance from './components/Balance';
import Averages from './components/Averages';
import LatestBlock from './components/LatestBlock';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <h1>Blockchain Explorer project - Rinkeby Network</h1>
    <Balance />
    <LatestBlock />
    <Averages />
  </>
);