'use client';

import React from 'react';
import Sidebar from '@/components/sidebar';
import Contacts from '@/components/contacts';
import Chats from '@/components/chats';
import CC from '@/components/cc';
import Profile from '@/components/profile';

export default function MainPage() {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ backgroundColor: '#1f1f1f', color: '#e0e0e0', height: '100%', maxWidth: '60px', flex: 'none' }}>
        <Sidebar />
      </div>
      <div style={{ display: 'flex', backgroundColor: '#1f1f1f', width: '100%', height: '100%' }}>
        {/* <CC /> */}
        <Profile />
      </div>
    </div>
  );
}
