'use client';

import React from 'react';
import Header from '@/components/header';
import Sidebar from '@/app/dashboard/sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ flex: 1, overflowY: 'hidden' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ backgroundColor: '#1f1f1f', color: '#e0e0e0', height: '100%', maxWidth: '60px', flex: 'none' }}>
            <Sidebar />
          </div>
          <div style={{ display: 'flex', backgroundColor: '#1f1f1f', width: '100%', height: '100%', borderRadius: '6px 0 0 0' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}