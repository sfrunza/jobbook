import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@mui/material/styles';
import getTheme from './theme';
import { LocalizationProvider } from '@mui/x-date-pickers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={getTheme('light')}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-us">
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
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
  // </React.StrictMode>
);
