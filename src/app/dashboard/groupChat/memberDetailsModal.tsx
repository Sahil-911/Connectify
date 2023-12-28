'use client';

import React, { useEffect, useState } from 'react';
import { Modal, Paper, Typography, Button, Divider, Grid, Avatar } from '@mui/material';
import styles from '@/components/scroll.module.css'; // Import the CSS module
import { UserInput, UserInputWithId } from '@/types/User.interface';
import { FetchProfileDetails } from './action';
import { useAuth } from '@/context/session';

const UserDetailsModal = ({ selectedUser, onClose }: { selectedUser: { id: string, username: string }, onClose: () => void }) => {

    const { session } = useAuth();

    const [profileDetails, setProfileDetails] = useState<{
        _id: string | undefined;
        username: string | undefined;
        name: string | undefined;
        email: string | undefined;
        bio: string | undefined;
        gender: string | undefined;
    }>();

    useEffect(() => {
        FetchProfileDetails(selectedUser.id).then((response) => {
            const profile = response?.profile;

            if (!profile) {
                console.log('no profile');
                // Handle the scenario when profile doesn't exist
                // router.push("/login");
            } else {
                console.log(profile);
                setProfileDetails(profile);
            }
        });
    }, []);

    return (
        <Modal open onClose={onClose}>
            <Paper className={styles['custom-scroll-container']}
                style={{ position: 'absolute', top: '60%', left: '60%', transform: 'translate(-50%, -50%)', backgroundColor: '#1f1f1f', padding: '20px', color: 'white', width: '70%', maxHeight:'65%', overflowY: 'auto' }}>
                <div>
                    <Grid container alignItems="center" spacing={3}>
                        <Grid item >
                            <Avatar style={{ width: 200, height: 200, backgroundColor: '#333', marginRight: '30px' }}>
                                <img src="/profile_pic.png" alt="Profile" style={{ width: '100%', height: '100%' }} />
                            </Avatar>
                        </Grid>
                        <Grid item xs={12} sm>
                            <div style={{}}>
                                <Typography variant="h4">{profileDetails?.name ?? 'No Name'}</Typography>
                                <Divider sx={{ bgcolor: '#333', my: 1 }} />
                                <Typography variant="subtitle1" color="#007bff">
                                    @{profileDetails?.username ?? ''}
                                </Typography>
                                <Divider sx={{ bgcolor: '#333', my: 1 }} />
                                <Typography variant="body1">Email: {profileDetails?.email ?? 'No Email'}</Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Divider variant='fullWidth' sx={{ backgroundColor: '#333', my: 3 }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h5" sx={{ mb: 1 }}>Bio: </Typography>
                        <pre style={{ maxWidth: '1000px', whiteSpace: 'pre-wrap' }}>{profileDetails?.bio}</pre>
                    </div>
                    <Button variant="contained" sx={{ bgcolor: '#007bff', mt: 2, }} onClick={onClose}>
                        Close
                    </Button>
                </div>
            </Paper>
        </Modal>
    );
};

export default UserDetailsModal;
