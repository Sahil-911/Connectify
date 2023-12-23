'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Avatar, Grid, Divider } from '@mui/material';
import UserDetailsModal from '@/components/UserDetailsModal';
import { UserInputWithId } from '@/types/User.interface';
import { useAuth } from '@/context/session';
import { ConnectById } from '@/components/action';
import { ConnectByIdRequest, WithdrawPendingConnection } from './action';

const UserCard = ({ profileDetails, currentUser }: { profileDetails: UserInputWithId, currentUser: UserInputWithId }) => {

    const { session } = useAuth();

    const [openModal, setOpenModal] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<'Withdraw' | 'Requested' | 'Connect'>('Withdraw');

    useEffect(() => {
        console.log(profileDetails._id, 'a');
        console.log(currentUser?.pendingConnections, 'b');
        // Check if profileDetails._id is present in the currentUser's connectionRequests array
        if (currentUser && currentUser.pendingConnections?.includes(profileDetails._id as any)) {
            console.log('req')
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
            if (connectionStatus === 'Withdraw') {
                // Make API call to connect
                console.log('withdrawal from: ', profileDetails._id);
                if (currentUser) {
                    const response = await WithdrawPendingConnection(session, profileDetails._id);
                    console.log(response);
                    if (response.message.message === 'Withdrawal Completed') {
                        setConnectionStatus('Connect');
                    }
                }
            } else if (connectionStatus === 'Connect') {
                // Make API call to disconnect
                console.log('Connecting to:', profileDetails._id);
                if (currentUser) {
                    const response = await ConnectByIdRequest(session, profileDetails._id);
                    console.log(response);
                    if (response.message.message === 'Connected successfully') {
                        setConnectionStatus('Requested');
                        setTimeout(() => {
                            setConnectionStatus('Withdraw');
                        }, 1000)
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
                        sx={{ bgcolor: connectionStatus === 'Withdraw' ? 'orange' : connectionStatus === 'Connect' ? 'green' : '#007bff', mt: 1, ml: 2 }}
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