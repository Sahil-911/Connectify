'use client';

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { SessionProvider } from '@/context/session';
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
    <html>
      <head>
        <title>Connectify</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/CycloneIcon.svg" type="image/x-icon" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SessionProvider>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '6px 0 0 0' }}>
              <div style={{ flex: 1, backgroundColor: '#1f1f1f', borderRadius: '6px 0 0 0' }}>
                {children}
              </div>
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
