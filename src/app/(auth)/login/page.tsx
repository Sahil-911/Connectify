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

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = () => {
        // Your form submission logic here
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
                    <Typography sx={{ ...heading, mb: 4 }} variant="h4" gutterBottom>
                        Log in
                    </Typography>
                    {/* Login form */}
                    <form onSubmit={submitHandler}>
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
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            InputProps={{
                                style: {
                                    color: '#fff', // Set text color to white
                                    borderRadius: '20px', // Set border radius
                                }
                            }}
                            style={inputStyles}
                        />
                        <Typography variant='caption'>
                            Password
                        </Typography>
                        <TextField
                            placeholder="Password"
                            id="password"
                            name="password"
                            type="password"
                            variant="outlined"
                            size='small'
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputProps={{
                                style: {
                                    color: '#fff', // Set text color to white
                                    borderRadius: '20px', // Set border radius
                                }
                            }}
                            style={inputStyles}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* Submit button */}
                            <Button type="submit" variant='outlined' fullWidth style={{ marginBottom: '10px', marginTop: '15px', backgroundColor: '#007bff', color: '#1f1f1f', borderRadius: '20px', height: '40px' }}>
                                Log in
                            </Button>
                            {/* Register and Forgot Password links */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px' }}>
                                <Link href="/register" style={{ textDecoration: 'none', color: '#007bff', marginLeft: '5px' }} passHref>
                                    Sign up
                                </Link>
                                <Link href="/forgotpass" style={{ textDecoration: 'none', color: '#007bff', marginRight: '5px' }} passHref>
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
