import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GlobalStyles, ThemeProvider } from '@mui/material';
import { MyCustomTheme } from './component/template/Palette';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={MyCustomTheme}>

    <GlobalStyles
      styles={{
        a: {
          textDecoration: "none",
          color: "inherit",
        },
      }}
    />
    <App />
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
