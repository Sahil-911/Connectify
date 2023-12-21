'use client';

import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Avatar, Grid, Divider } from '@mui/material';
import UserDetailsModal from './UserDetailsModal';
import { UserInput } from '@/types/User.interface';

const UserCard = ({ profileDetails }: { profileDetails: UserInput }) => {

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <Card style={{ margin: '30px', backgroundColor: '#232323', color: 'white', width: '300px' }}>
                <CardContent style={{ textAlign: 'center' }}>
                    {/* Profile Picture */}
                    <Avatar alt="Profile Picture" src='/profile_pic.png' style={{ width: '100px', height: '100px', margin: 'auto' }} />
                    <Typography sx={{ mt: 2 }} variant="subtitle1" color="#007bff">
                        @{profileDetails.username}
                    </Typography>
                    <Divider style={{ margin: '10px 0', backgroundColor: 'grey' }} />

                    <Button variant="contained" sx={{ bgcolor: '#007bff', mt: 1 }} onClick={handleOpenModal}>
                        More Info
                    </Button>
                    <Button variant="contained" sx={{ bgcolor: '#007bff', ml: 2, mt: 1 }}>
                        Connect
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
