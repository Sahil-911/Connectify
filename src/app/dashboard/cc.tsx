import React, { useState } from 'react';
import Contacts from '@/components/contacts';
import Chats from '@/components/chats';

export default function CC() {
    const [selectedContact, setSelectedContact] = useState<{ _id: string, name: string, username: string } | undefined>();

    // Function to handle contact selection
    const handleContactSelection = (contactDetails: { _id: string, name: string, username: string }) => {
        setSelectedContact(contactDetails);
    };

    return (
        <div style={{ display: 'flex', height: '100%', width:'100%' }}>
            <div style={{ backgroundColor: '#1f1f1f', color: '#e0e0e0', height: '100%', minWidth: '300px', flex: '1 0 0', width:'100%' }}>
                <Contacts onSelectContact={handleContactSelection} />
            </div>
            <div style={{ display: 'flex', flex: '3 0 0', width:'100%' }}>
                <Chats selectedContact={selectedContact || { _id: '', name: '', username: '' }} />
            </div>
        </div>
    );
}