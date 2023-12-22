'use client';

import { Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserCard from '../../../components/userCard';
import styles from '@/components/scroll.module.css';
import { FetchProfile, GetAllProfiles } from './action';
import { useAuth } from '@/context/session';
import { UserInput } from '@/types/User.interface';

export default function AddContact() {

    const { session } = useAuth();



    const [users, setUsers] = useState<UserInput[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<UserInput | null>(null);

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
        GetAllProfiles(session)
            .then((response) => {
                const fetchedUsers = response?.profiles?.users || [];
                console.log(fetchedUsers);
                setUsers(fetchedUsers as UserInput[]);
            })
            .catch((error) => {
                console.error('Error fetching profiles:', error);
            });
    }, [session]);

    // Filter users based on search term
    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Grid container direction="column" style={{ width: '100%' }}>
            <Grid item sx={{ bgcolor: '#333', p: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant='h4' style={{ color: '#fff', alignSelf: 'center', paddingTop:'10px' }}>Add Contact</Typography>
            </Grid>
            <Grid item className={styles['custom-scroll-container']} sx={{ bgcolor: '#333', flex: 1, overflowY: 'auto' }}>
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
                <Grid container justifyContent='center' spacing={2}>
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
