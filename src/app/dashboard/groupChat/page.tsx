'use client'

import React from 'react';
import GC from './gc';

const MainPage = () => {

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '6px 0 0 0' }}>
      <div style={{ display: 'flex', backgroundColor: '#1f1f1f', width: '100%', height: '100%' }}>
        <GC />
      </div>
    </div>
  );
};

export default MainPage;