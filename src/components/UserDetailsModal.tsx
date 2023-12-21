'use client';

import React, { useState } from 'react';
import { Modal, Paper, Typography, Button, Divider, Grid, Avatar } from '@mui/material';
import styles from './scroll.module.css'; // Import the CSS module
import { UserInput } from '@/types/User.interface';

const UserDetailsModal = ({ profileDetails, onClose }: { profileDetails: UserInput, onClose: () => void }) => {
    return (
        <Modal open onClose={onClose}>
            <Paper className={styles['custom-scroll-container']}
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#1f1f1f', padding: '20px', color: 'white', height: '75%', width: '75%', overflowY: 'auto' }}>
                <div>
                    <Grid container alignItems="center" spacing={3}>
                        <Grid item >
                            <Avatar style={{ width: 200, height: 200, backgroundColor: '#333', marginRight: '30px' }}>
                                <img src="/profile_pic.png" alt="Profile" style={{ width: '100%', height: '100%' }} />
                            </Avatar>
                        </Grid>
                        <Grid item xs={12} sm>
                            <div style={{}}>
                                <Typography variant="h4">{profileDetails.name}</Typography>
                                <Typography variant="subtitle1" color="#007bff">
                                    @{profileDetails.username}
                                </Typography>
                                <Typography variant="body1">Email: {profileDetails.email}</Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Divider variant='fullWidth' sx={{ backgroundColor: '#333', my: 3 }} />
                    <div style={{ maxWidth: '600px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <Typography variant="h5">Gender: </Typography>
                            <Typography variant="h5">{profileDetails?.gender}</Typography>
                        </div>
                        <Divider variant='middle' sx={{ backgroundColor: '#333', my: 1 }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <Typography variant="h5">Number of Connections: </Typography>
                            <Typography variant="h5">{profileDetails?.connections?.length || 0}</Typography>
                        </div>
                        <Divider variant='middle' sx={{ backgroundColor: '#333', my: 1 }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <Typography variant="h5">Number of Pending Requests: </Typography>
                            <Typography variant="h5">{profileDetails?.pendingConnections?.length || 0}</Typography>
                        </div>
                    </div>
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
