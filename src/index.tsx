import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './router';
import '@styles/fonts/iconfont.css';
import './index.less';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
