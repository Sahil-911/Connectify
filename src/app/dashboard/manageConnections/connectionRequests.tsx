'use client';

import { Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserCard from './components/connectionRequestsUserCard';
import { FetchProfile, GetAllFriends, GetAllRequests } from './action';
import { useAuth } from '@/context/session';
import { UserInputWithId } from '@/types/User.interface';

export default function ConnectionRequests() {

    const { session } = useAuth();

    const [requests, setRequests] = useState<UserInputWithId[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<UserInputWithId | null>(null);

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
        GetAllRequests(session)
            .then((response) => {
                const fetchedRequests = response.requests?.connectionRequests || [];
                console.log(fetchedRequests);
                setRequests(fetchedRequests);
            })
            .catch((error) => {
                console.error('Error fetching profiles:', error);
            });
    }, [session]);

    // Filter users based on search term
    const filteredUsers = requests.filter((user) =>
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
                            <UserCard profileDetails={user} currentUser={currentUser} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
