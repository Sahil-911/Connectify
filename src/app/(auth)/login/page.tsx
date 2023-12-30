'use client';

import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';
import CycloneIcon from '@mui/icons-material/Cyclone';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useRouter } from "next/navigation";
import * as yup from 'yup';
import { useAuth } from '@/context/session';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const { login } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    const validationSchema = yup.object({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true); // Set loading to true during login attempt
            login(values).then((res) => {
                setLoading(false); // Reset loading state after login attempt
                if (!res.session) {
                    console.log(res.message);
                    toast.error(res.message);
                    return;
                } else {
                    console.log('Logged in successfully!')
                    // Display success message and navigate to another page
                    toast.success('Logged in successfully!');
                    router.push('/dashboard');
                }
            });
        },
    });

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        formik.handleSubmit();
    };

    return (
        <>
            <ToastContainer />
            <Grid container style={{ height: '100%' }} sx={{ bgcolor: '#1f1f1f' }}>
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
                </Grid>

                <Grid item xs={12} md={6} lg={4.5} component={Paper} elevation={0} sx={{ bgcolor: '#1f1f1f', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ ...heading, mb: 4 }} variant="h4" gutterBottom>
                            Log in
                        </Typography>
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
                                onChange={(e) => formik.handleChange(e)}
                                onBlur={formik.handleBlur}
                                required
                                InputProps={{
                                    style: {
                                        color: '#fff',
                                        borderRadius: '20px',
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
                                onChange={(e) => formik.handleChange(e)}
                                onBlur={formik.handleBlur}
                                required
                                InputProps={{
                                    style: {
                                        color: '#fff',
                                        borderRadius: '20px',
                                    }
                                }}
                                style={inputStyles}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Button
                                    type="submit"
                                    variant='outlined'
                                    fullWidth
                                    disabled={loading} // Disable button when loading
                                    style={{
                                        marginBottom: '10px',
                                        marginTop: '15px',
                                        backgroundColor: '#007bff',
                                        color: '#1f1f1f',
                                        borderRadius: '20px',
                                        height: '40px',
                                        position: 'relative'
                                    }}
                                >
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            style={{
                                                position: 'absolute',
                                                left: '50%',
                                                top: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                color: '#1f1f1f' // Set color of CircularProgress
                                            }}
                                        />
                                    )}
                                    <span style={{ visibility: loading ? 'hidden' : 'visible' }}>{loading ? 'Logging in...' : 'Log in'}</span>
                                </Button>
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
        </>
    );
};

export default LoginPage;
