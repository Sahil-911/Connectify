'use client';

import React from 'react';
import Contacts from '@/components/contacts';
import Chats from '@/components/chats';

export default function CC() {
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ backgroundColor: '#1f1f1f', color: '#e0e0e0', height: '100%', minWidth: '300px', flex: '1 0 0' }}>
                <Contacts />
            </div>
            <div style={{ display: 'flex', flex: '3 0 0' }}>
                <Chats />
            </div>
        </div>
    );
}