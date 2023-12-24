'use client';

import React, { useEffect, useState } from 'react';
import Contacts from '@/components/contacts';
import Chats from '@/components/chats';
import { FetchProfile } from './action';
import { useAuth } from '@/context/session';
import { UserInputWithId } from '@/types/User.interface';

export default function CC() {

    const { session } = useAuth();

    const [selectedContact, setSelectedContact] = useState<{ _id: string, name: string, username: string } | undefined>();
    const [profile, setProfile] = useState<UserInputWithId | null>(null);

    // Function to handle contact selection
    const handleContactSelection = (contactDetails: { _id: string, name: string, username: string }) => {
        setSelectedContact(contactDetails);
    };

    useEffect(() => {
        FetchProfile(session).then((response) => {
            const profile = response?.profile;

            if (!profile) {
                console.log('no profile');
                // Handle the scenario when profile doesn't exist
                // router.push("/login");
            } else {
                console.log(profile);
                setProfile(profile as any);
            }
        });
    }, []);

    return (
        <div style={{ display: 'flex', height: '100%', width: '100%' }}>
            <div style={{ backgroundColor: '#1f1f1f', color: '#e0e0e0', height: '100%', minWidth: '200px', flex: '1 0 0', width: '100%' }}>
                <Contacts onSelectContact={handleContactSelection} />
            </div>
            <div style={{ display: 'flex', flex: '3 0 0', minWidth: '300px', width: '100%' }}>
                <Chats selectedContact={selectedContact || { _id: '', name: '', username: '' }} profile={profile || { _id: '', name: '', username: '', email: '', password: '', gender: '' }} />
            </div>
        </div>
    );
}