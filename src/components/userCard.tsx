'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Avatar, Grid, Divider } from '@mui/material';
import UserDetailsModal from './UserDetailsModal';
import { UserInput } from '@/types/User.interface';
import { ConnectById, DisconnectById } from './action';
import { useAuth } from '@/context/session';

const UserCard = ({ profileDetails, currentUser }: { profileDetails: UserInput , currentUser: UserInput | null }) => {

    const { session } = useAuth();

    // console.log(currentUser);

    const [openModal, setOpenModal] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<'Connect' | 'Requested'>('Connect');

    useEffect(() => {
        // Check if profileDetails._id is present in the currentUser's connectionRequests
        if (currentUser && currentUser.connectionRequests?.includes(profileDetails._id)) {
            console.log('req')
            setConnectionStatus('Requested');
        } else {
            console.log('con')
            setConnectionStatus('Connect');
        }
    }, [currentUser, profileDetails._id]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleConnect = async () => {
        try {
            if (connectionStatus === 'Connect') {
                // Make API call to connect
                console.log('Connecting to:', profileDetails._id);
                if (currentUser) {
                    const response = await ConnectById(session, profileDetails._id);
                    console.log(response);
                    if (response.message.message === 'Connected successfully') {
                        setConnectionStatus('Requested');
                    }
                }
            } else if (connectionStatus === 'Requested') {
                // Make API call to disconnect
                console.log('Disconnecting from:', profileDetails._id);
                if (currentUser) {
                    const response = await DisconnectById(session, profileDetails._id);
                    console.log(response);
                    if (response.message.message === 'Withdrawal Completed') {
                        setConnectionStatus('Connect');
                    }
                }
            }
        } catch (error) {
            console.error('Error:', error as any);
        }
    };

    return (
        <>
            <Card elevation={2} style={{ margin: '30px', backgroundColor: '#232323', color: 'white', width: '300px' }}>
                <CardContent style={{ textAlign: 'center' }}>
                    <Avatar alt="Profile Picture" src='/profile_pic.png' style={{ width: '100px', height: '100px', margin: 'auto' }} />
                    <Typography sx={{ mt: 2 }} variant="subtitle1" color="#007bff">
                        @{profileDetails.username}
                    </Typography>
                    <Divider style={{ margin: '10px 0', backgroundColor: 'grey' }} />

                    <Button variant="contained" sx={{ bgcolor: '#007bff', mt: 1 }} onClick={handleOpenModal}>
                        More Info
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ bgcolor: connectionStatus === 'Requested' ? 'orange' : '#007bff', mt: 1, ml: 2 }}
                        onClick={handleConnect}
                    >
                        {connectionStatus}
                    </Button>
                </CardContent>
            </Card>

            {openModal && (
                <UserDetailsModal profileDetails={profileDetails} onClose={handleCloseModal} />
            )}
        </>
    );
};

export default UserCard;