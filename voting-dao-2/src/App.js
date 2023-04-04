import React from 'react';
import './App.css';
import Routes from './routes';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './app/store';
import CircularStdBook from './asset/font/circularstd/CircularStd-Book.ttf';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: 'CircularStd',
      fontSize: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'CircularStd';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('CircularStd'), local('CircularStd-Book'), url(${CircularStdBook}) format('ttf');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
  });
  return (
    // <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <Routes />
        </Provider>
      </BrowserRouter>
  );
}

export default App;
