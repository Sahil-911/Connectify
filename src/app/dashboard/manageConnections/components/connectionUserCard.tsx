'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Avatar, Grid, Divider } from '@mui/material';
import UserDetailsModal from '@/components/UserDetailsModal';
import { UserInputWithId } from '@/types/User.interface';
import { useAuth } from '@/context/session';
import { ConnectById } from '@/components/action';
import { ConnectByIdRequest, DisconnectById, RemoveFriend } from './action';

const UserCard = ({ profileDetails, currentUser }: { profileDetails: UserInputWithId, currentUser: UserInputWithId | null }) => {

    const { session } = useAuth();

    const [openModal, setOpenModal] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<'Remove' | 'Removed' | 'Connect' | 'Requested' | 'Withdraw'>('Remove');

    useEffect(() => {
        // Check if profileDetails._id is present in the currentUser's connectionRequests array
        if (currentUser && currentUser.connections?.includes(profileDetails._id as any)) {
            console.log('req')
            setConnectionStatus('Remove');
        } else if (currentUser && currentUser.pendingConnections?.includes(profileDetails._id as any)) {
            setConnectionStatus('Withdraw');
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
            if (connectionStatus === 'Remove') {
                // Make API call to connect
                console.log('Removing:', profileDetails._id);
                if (currentUser) {
                    const response = await RemoveFriend(session, profileDetails._id);
                    console.log(response);
                    if (response.message.message === 'Friend Removed') {
                        setConnectionStatus('Removed');
                        setTimeout(() => {
                            setConnectionStatus('Connect');
                        }, 1000);
                    }
                }
            } else if (connectionStatus === 'Connect') {
                // Make API call to disconnect
                console.log('connect tooooooooo:', profileDetails._id);
                if (currentUser) {
                    const response = await ConnectByIdRequest(session, profileDetails._id);
                    console.log(response);
                    if (response.message.message === 'Connected successfully') {
                        setConnectionStatus('Requested');
                        setTimeout(() => {
                            setConnectionStatus('Withdraw');
                        }, 1000);
                    }
                }
            } else if (connectionStatus === 'Withdraw') {
                console.log('withdrawal from: ', profileDetails._id);
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
                        sx={{ bgcolor: connectionStatus === 'Remove' ? 'red' : connectionStatus === 'Connect' ? 'green' : connectionStatus === 'Withdraw' ? 'orange' : '#007bff', mt: 1, ml: 2 }}
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