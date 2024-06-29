'use client';

import { Button, Grid, LinearProgress, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserCard from '../../../components/userCard';
import styles from '@/components/scroll.module.css';
import { FetchProfile, GetAllProfiles } from './action';
import { useAuth } from '@/context/session';
import { UserInputWithId } from '@/types/User.interface';
import { useRouter } from 'next/navigation';

export default function AddContact() {

    const { session } = useAuth();

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserInputWithId[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<UserInputWithId | null>(null);

    useEffect(() => {
        setLoading(true); // Set loading to true when fetching profiles
        GetAllProfiles(session)
            .then((response) => {
                setLoading(false); // Set loading to false after fetching profiles
                console.log('res...', response);
                const fetchedUsers = response?.profiles as UserInputWithId[] || [];
                setUsers(fetchedUsers as UserInputWithId[]);
            })
            .catch((error) => {
                setLoading(false); // Set loading to false in case of an error
                console.error('Error fetching profiles:', error);
            });
            FetchProfile(session)
            .then((response) => {
                console.log('res', response);
                const profile = response?.profile;
                if (!profile) {
                    console.log('no profile');
                } else {
                    console.log(profile, 'pro');
                    setCurrentUser(profile as any);
                }
            });
    }, [session]);

    // Filter users based on search term
    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log('filteredUsers', filteredUsers);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Grid container direction="column" style={{
            width: '100%', height: '100%', backgroundImage: `url(/patternpad4.svg)`,
            backgroundRepeat: 'repeat', borderRadius: '6px 0 0 0 '
        }}>
            {loading && (
                <Grid item sx={{ height: '4px', width: '100%' }}>
                    <LinearProgress style={{ backgroundColor: '#007bff' }} />
                </Grid>
            )}
            <Grid item sx={{ bgcolor: 'transparent', p: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: '6px 0 0 0' }}>
                <Typography variant='h4' style={{ color: '#fff', alignSelf: 'center', paddingTop: '10px' }}>Add Contact</Typography>
            </Grid>
            <Grid item className={styles['custom-scroll-container']} sx={{ bgcolor: 'transparent', flex: 1, overflowY: 'auto' }}>
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
                            border: '2px solid grey',
                            backgroundColor: '#333',
                        }
                    }}
                    sx={{ pt: 3, pb: 3, maxWidth: '1050px', margin: 'auto', justifyContent: 'center', display: 'flex' }}
                />
                <Grid container justifyContent='center' spacing={2}>
                    {filteredUsers.length === 0 ? (
                        <Grid item style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', color: '#fff', marginTop: '100px' }}>
                            <Typography variant="body1">No new account to display</Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 1, bgcolor: '#007bff' }} onClick={() => { router.push('/dashboard/manageConnections') }}>Manage Connections</Button>
                        </Grid>
                    ) : (
                        filteredUsers.map((user, index) => (
                            <Grid item key={index}>
                                <UserCard profileDetails={user} currentUser={currentUser} />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
}
