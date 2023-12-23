'use client';

import { Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserCard from './components/pendingConnectionUserCard';
import { FetchProfile, GetAllPendings } from './action';
import { useAuth } from '@/context/session';
import { UserInputWithId } from '@/types/User.interface';

export default function PendingConnections() {

    const { session } = useAuth();

    const [pendings, setPendings] = useState<UserInputWithId[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<UserInputWithId>();

    useEffect(() => {
        FetchProfile(session).then((response) => {
            const profile = response?.profile;

            if (!profile) {
                console.log('no profile');
            } else {
                console.log(profile, 'pro');
                setCurrentUser(profile as any);
            }
        });
    }, [session]);

    useEffect(() => {
        GetAllPendings(session)
            .then((response) => {
                const fetchedPendings = response.pendings?.pendingConnections || [];
                console.log(fetchedPendings);
                setPendings(fetchedPendings);
            })
            .catch((error) => {
                console.error('Error fetching profiles:', error);
            });
    }, [session]);

    // Filter users based on search term
    const filteredUsers = pendings.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Grid container direction="column" style={{ width: '100%', height: '100%' }}>
            <Grid item sx={{ bgcolor: '#333', p: '1rem', pt: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {/* <Typography variant='h4' style={{ color: '#fff', alignSelf: 'center', paddingTop: '10px' }}>Connections</Typography> */}
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by username, name, or email"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        style: {
                            color: '#fff',
                            borderRadius: '20px',
                            border: '2px solid grey'
                        }
                    }}
                    sx={{ pt: 3, pb: 3, maxWidth: '1050px', margin: 'auto', justifyContent: 'center', display: 'flex' }}
                />
            </Grid>
            <Grid item sx={{ bgcolor: '#333', flex: 1, height: '100%', width: '100%' }}>
                <Grid container justifyContent='center' sx={{ height: '100%' }} spacing={2}>
                    {filteredUsers.map((user, index) => (
                        <Grid item key={index}>
                            {currentUser && <UserCard profileDetails={user} currentUser={currentUser} />}
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
