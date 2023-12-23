'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Avatar, Grid, Divider } from '@mui/material';
import UserDetailsModal from '@/components/UserDetailsModal';
import { UserInputWithId } from '@/types/User.interface';
import { useAuth } from '@/context/session';
import { ConnectById } from '@/components/action';
import { AcceptRequest, RejectRequest } from './action';

const UserCard = ({ profileDetails, currentUser }: { profileDetails: UserInputWithId, currentUser: UserInputWithId | null }) => {

    const { session } = useAuth();

    const [openModal, setOpenModal] = useState(false);
    const [which, setWhich] = useState('noone');

    // useEffect(() => {
    //     // Check if profileDetails._id is present in the currentUser's connectionRequests array
    //     if (currentUser && currentUser.connectionRequests?.includes(profileDetails._id as any)) {
    //         console.log('req')
    //         setConnectionStatus('Accept');
    //     } else {
    //         console.log('con')
    //         setConnectionStatus('Reject');
    //     }
    // }, [currentUser, profileDetails._id]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // const handleConnect = async () => {
    //     try {
    //         if (connectionStatus === 'Accept') {
    //             // Make API call to connect
    //             console.log('Connecting to: ', profileDetails._id);
    //             if (currentUser) {
    //                 const response = await RemoveConnection(session, profileDetails._id);
    //                 console.log(response);
    //                 if (response.message.message === 'Connected successfully') {
    //                     setWhich('Accepted');
    //                 }
    //             }
    //         } else if (connectionStatus === 'Reject') {
    //             // Make API call to disconnect
    //             console.log('Rejecting: ', profileDetails._id);
    //             if (currentUser) {
    //                 const response = await ConnectById(session, profileDetails._id);
    //                 console.log(response);
    //                 if (response.message.message === 'Withdrawal Completed') {
    //                     setWhich('Rejected');
    //                 }
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error:', error as any);
    //     }
    // };

    const handleAccept = async () => {
        try {
            console.log('Accepting: ', profileDetails._id);
            if (currentUser) {
                const response = await AcceptRequest(session, profileDetails._id);
                console.log(response);
                if (response.message.message === 'Connected successfully') {
                    setWhich('Accepted');
                }
            }
        } catch (error) {
            console.error('Error:', error as any);
        }
    }

    const handleReject = async () => {
        try {
            console.log('Rejecting: ', profileDetails._id);
            if (currentUser) {
                const response = await RejectRequest(session, profileDetails._id);
                console.log(response);
                if (response.message.message === 'Request Rejected') {
                    setWhich('Rejected');
                }
            }
        } catch (error) {
            console.error('Error:', error as any);
        }

    }

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
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        {which === 'noone' && (
                            <>
                                <Button
                                    variant="contained"
                                    sx={{ bgcolor: 'green', mt: 1, ml: 2 }}
                                    onClick={handleAccept}
                                >
                                    Accept
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{ bgcolor: 'red', mt: 1, ml: 2, mr: 2 }}
                                    onClick={handleReject}
                                >
                                    Reject
                                </Button>
                            </>
                        )}
                        {which !== 'noone' && (
                            <Typography variant='body1'>
                                {which}
                            </Typography>
                        )}
                    </div>
                </CardContent>
            </Card>

            {openModal && (
                <UserDetailsModal profileDetails={profileDetails} onClose={handleCloseModal} />
            )}
        </>
    );
};

export default UserCard;