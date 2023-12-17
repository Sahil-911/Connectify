'use client';

import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Paper, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Image from 'next/image';
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

const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };


    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value);
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Your form submission logic here
    };

    return (
        <Grid container style={{ height: '100%' }} sx={{ bgcolor: '#1f1f1f', color: '#fff' }}>
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

            {/* Right 40% - Registration Form */}
            <Grid item xs={12} md={6} lg={4.5} component={Paper} sx={{ bgcolor: '#1f1f1f', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                    padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                }}>
                    <Typography sx={heading} variant="h4" gutterBottom>
                        Sign up
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }} gutterBottom>
                        Enter your information to get started
                    </Typography>
                    {/* Registration form */}
                    <form onSubmit={submitHandler}>
                        <Typography variant='caption'>
                            Full Name
                        </Typography>
                        <TextField
                            placeholder="Full Name"
                            id="fullName"
                            name="fullName"
                            type="text"
                            variant='outlined'
                            size='small'
                            //margin='normal'
                            fullWidth
                            onChange={(e) => setFullName(e.target.value)}
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
                            Username
                        </Typography>
                        <TextField
                            placeholder="Username"
                            id="username"
                            name="username"
                            type="text"
                            variant="outlined"
                            //margin='normal'
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
                            email
                        </Typography>
                        <TextField
                            placeholder="Email"
                            id="email"
                            name="email"
                            type="email"
                            variant="outlined"
                            size='small'
                            //margin='normal'
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
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
                            password
                        </Typography>
                        <TextField
                            placeholder="Password"
                            id="password"
                            name="password"
                            type="password"
                            variant="outlined"
                            size='small'
                            //margin='normal'
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputProps={{
                                style: {
                                    color: '#fff', // Set text color to white
                                    borderRadius: '20px', // Set border radius
                                },
                            }}
                            style={inputStyles}
                        />
                        <Typography variant='caption'>
                            confirm password
                        </Typography>
                        <TextField
                            placeholder="Confirm Password"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            variant="outlined"
                            size='small'
                            //margin='normal'
                            fullWidth
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            Gender
                        </Typography>
                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={handleGenderChange}
                                    style={{ marginRight: '5px', transform: 'scale(1.5)' }} // Adjust size of radio button
                                />
                                <label htmlFor="male" style={{ fontSize: '16px' }}>Male</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={handleGenderChange}
                                    style={{ marginRight: '5px', transform: 'scale(1.5)' }} // Adjust size of radio button
                                />
                                <label htmlFor="female" style={{ fontSize: '16px' }}>Female</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="radio"
                                    id="other"
                                    name="gender"
                                    value="other"
                                    checked={gender === 'other'}
                                    onChange={handleGenderChange}
                                    style={{ marginRight: '5px', transform: 'scale(1.5)' }} // Adjust size of radio button
                                />
                                <label htmlFor="other" style={{ fontSize: '16px' }}>Other</label>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* Submit button */}
                            <Button type="submit" variant='outlined' fullWidth style={{ marginBottom: '10px', marginTop: '15px', backgroundColor: '#007bff', color: '#1f1f1f', borderRadius: '20px', height: '40px' }}>
                                Sign up
                            </Button>
                            {/* Login link */}
                            <a href="/login"
                                style={{
                                    textDecoration: isHovered ? 'underline' : 'none',
                                    color: '#007bff',
                                }}
                                onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
                            >
                                Already have an account? Log in
                            </a>
                            {/* <a href="/login" style={{ textDecoration: 'none', color: 'blue', fontSize: '12px' }}>Alredy have an account? Log in</a> */}
                        </div>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default RegisterPage;
