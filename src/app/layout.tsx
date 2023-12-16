'use client';

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
// import Header from '@/components/header';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1f1f1f',
    },
    secondary: {
      main: '#ffffff',
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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* <Header /> */}
        <div style={{ flex: 1 }}>
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
