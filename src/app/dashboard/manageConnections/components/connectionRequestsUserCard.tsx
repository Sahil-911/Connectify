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

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

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
                            <Typography variant='body1' sx={{ my: 1.1 }}>
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