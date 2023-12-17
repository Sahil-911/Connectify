'use client';

import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Paper } from '@mui/material';
import CycloneIcon from '@mui/icons-material/Cyclone';
import Link from 'next/link';


const imageStyles = {
    width: '100%',
    height: '100%',
};

const heading = {
    fontWeight: 'bold',
    textAlign: 'center',
    // marginBottom: '1rem',
};

const inputStyles = {
    marginBottom: '1rem',
    backgroundColor: '#333',
    borderRadius: '20px',
    color: '#fff'
};

const ForgotPaswordPage = () => {
    const [resetOption, setResetOption] = useState('email'); // State to handle the reset option (email or username)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic for resetting password based on the selected reset option
        if (resetOption === 'email') {
            // Logic for resetting password using email
        } else {
            // Logic for resetting password using username
        }
    };

    return (
        <Grid container style={{ height: '100%' }} sx={{ bgcolor: '#1f1f1f' }}>
            {/* Left 60% - Image */}
            <Grid item xs={12} md={6} lg={7.5} style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                backgroundImage: `url(/patternpad1.svg)`,
                backgroundRepeat: 'repeat'
            }} sx={{ bgcolor: '#1f1f1f', color: '#fff' }}>
                <CycloneIcon
                    sx={{
                        fontSize: '2500%',
                        animation: 'rotate 2s linear infinite' // Apply the animation
                    }} />
                {/* <Image style={{ backgroundColor: '#1f1f1f' }} src="/logo.svg" alt="Register" width={500} height={500} /> */}
            </Grid>

            {/* Right 40% - Login Form */}
            <Grid item xs={12} md={6} lg={4.5} component={Paper} sx={{ bgcolor: '#1f1f1f', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={heading} variant="h4" gutterBottom>
                        Forgot Password
                    </Typography>
                    {/* Forgot Password form */}
                    <form onSubmit={handleSubmit}>
                        {/* Reset option selector */}
                        <Typography variant='caption'>
                            Reset using:
                        </Typography>
                        <select
                            value={resetOption}
                            onChange={(e) => setResetOption(e.target.value)}
                            style={{ marginBottom: '1rem' }}
                        >
                            <option value="email">Email</option>
                            <option value="username">Username</option>
                        </select>
                        {/* Input fields */}
                        {resetOption === 'email' ? (
                            <div>
                                <Typography variant='caption'>
                                    Email
                                </Typography>
                                <TextField
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                    size='small'
                                    fullWidth
                                // Add onChange handler to update state
                                // Add value attribute to set email value
                                // Add required attribute
                                // Add InputProps for styles
                                />
                            </div>
                        ) : (
                            <div>
                                <Typography variant='caption'>
                                    Username
                                </Typography>
                                <TextField
                                    placeholder="Username"
                                    id="username"
                                    name="username"
                                    type="text"
                                    variant="outlined"
                                    size='small'
                                    fullWidth
                                // Add onChange handler to update state
                                // Add value attribute to set username value
                                // Add required attribute
                                // Add InputProps for styles
                                />
                            </div>
                        )}
                        {/* Submit button */}
                        <Button type="submit" variant='outlined' fullWidth style={{ marginBottom: '10px', marginTop: '15px', backgroundColor: '#007bff', color: '#1f1f1f', borderRadius: '20px', height: '40px' }}>
                            Reset Password
                        </Button>
                        {/* Login link */}
                        <Link href="/login" style={{ textDecoration: 'none', color: '#007bff', fontSize: '12px' }} passHref>
                            Go back to Login
                        </Link>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default ForgotPaswordPage;
