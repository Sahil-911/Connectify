'use client';

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Header from '../components/header';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1f1f1f',
    },
    secondary: {
      main: '#1f1f1f',
    },
  },
  // Other theme configurations...
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Header />
        {children}
      </div>
    </ThemeProvider>
  );
}
