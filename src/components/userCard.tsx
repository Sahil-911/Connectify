'use client';

import React from 'react';
import { Card, CardContent, Typography, Button, Avatar, Grid, Divider } from '@mui/material';

const UserCard = ({ profileDetails }: { profileDetails: { name: string, username: string, email: string } }) => {
    return (
        <Card style={{ margin: '30px', backgroundColor: '#232323', color: 'white', width: '300px' }}>
            <CardContent style={{ textAlign: 'center' }}>
                {/* Profile Picture */}
                <Avatar alt="Profile Picture" src='/profile_pic.png' style={{ width: '100px', height: '100px', margin: 'auto' }} />

                {/* User Information */}
                <Typography variant="h5" sx={{mt:2}} gutterBottom>
                    {profileDetails.name}
                </Typography>
                <Typography variant="subtitle1" color="#007bff">
                    @{profileDetails.username}
                </Typography>
                <Divider style={{ margin: '10px 0', backgroundColor:'grey' }} />
                <Typography variant="body1" sx={{mb:2}} gutterBottom>
                    Email: {profileDetails.email}
                </Typography>

                {/* Example of Contact Button */}
                <Button variant="contained" sx={{bgcolor:'#007bff'}}>
                    More Info
                </Button>
            </CardContent>
        </Card>
    );
};

export default UserCard;
