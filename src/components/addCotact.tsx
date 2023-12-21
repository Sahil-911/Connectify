'use client';

import { Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserCard from './userCard';
import styles from './scroll.module.css';
import { GetAllProfiles } from './action';
import { useAuth } from '@/context/session';
import { UserInput } from '@/types/User.interface';

export default function AddContact() {

    const { session } = useAuth();

    const [users, setUsers] = useState<UserInput[]>([]);

    useEffect(() => {
        GetAllProfiles(session)
            .then((response) => {
                const fetchedUsers = response?.profiles?.users || [];
                setUsers(fetchedUsers as UserInput[]);
            })
            .catch((error) => {
                console.error('Error fetching profiles:', error);
            });
    }, [session]);

    return (
        <Grid className={styles['custom-scroll-container']} container
            sx={{ borderRadius: '6px 0 0 0', pt: '1rem', bgcolor: '#333', overflowY: 'auto' }}>
            <Grid container justifyContent='center' spacing={2} sx={{ bgcolor: '#333' }}>
                {users.map((user, index) => (
                    <Grid item key={index} >
                        <UserCard profileDetails={user} />
                    </Grid>
                ))}
            </Grid>
        </Grid>

    );
}
