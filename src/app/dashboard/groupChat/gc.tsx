'use client';

import React, { useEffect, useState } from 'react';
import { FetchProfile } from './action';
import { useAuth } from '@/context/session';
import { UserInputWithId } from '@/types/User.interface';
import Groups from './groups';
import GroupChats from './chats';

export default function GC() {

    const { session } = useAuth();

    const [selectedGroup, setSelectedGroup] = useState<{ _id: string, name: string } | undefined>();
    const [profile, setProfile] = useState<UserInputWithId | null>(null);

    // Function to handle contact selection
    const handleGroupSelection = (groupDetails: { _id: string, name: string }) => {
        setSelectedGroup(groupDetails);
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
            <div style={{ backgroundColor: '#1f1f1f', color: '#e0e0e0', height: '100%', minWidth: '280px', flex: '1 0 0', width: '100%' }}>
                <Groups onSelectGroup={handleGroupSelection} />
            </div>
            <div style={{ display: 'flex', flex: '3 0 0', minWidth: '300px', width: '100%' }}>
                <GroupChats selectedGroup={selectedGroup || { _id: '', name: '' }} profile={profile || { _id: '', name: '', username: '', email: '', password: '', gender: '' }} />
            </div>
        </div>
    );
}