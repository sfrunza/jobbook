import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterMoment';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@mui/material/styles';
import getTheme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={getTheme('light')}>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <App />
            <Toaster
              toastOptions={{
                style: {
                  fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
                },
              }}
            />
          </LocalizationProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
