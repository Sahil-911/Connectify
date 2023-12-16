'use client';

import React from 'react';
import { Grid } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import Sidebar from '@/components/sidebar';
import Contacts from '@/components/contacts';
import Chats from '@/components/chats';

export default function MainPage() {
  // const theme = useTheme();

  return (
    <Grid container style={{ display: 'flex', height: '100%' }}>
      <Grid item xs={false} md={0.5} sx={{ bgcolor: 'primary.main', color: '#e0e0e0', height: '100%', width: '40px' }}>
        <Sidebar />
      </Grid>
      <Grid item xs={false} md={3} sx={{ bgcolor: 'primary.main', color: '#e0e0e0', height: '100%', margin: 0, padding: 0 }}>
        <Contacts />
      </Grid>
      <Grid item xs={9} md={8.5} sx={{ bgcolor: 'primary.main', height: '100%' }}>
        <Chats />
      </Grid>
    </Grid>
  );
}
