'use client';

import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Paper, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material';
import CycloneIcon from '@mui/icons-material/Cyclone';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { postUser } from './action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const imageStyles = {
    width: '100%',
    height: '100%',
};

const heading = {
    fontWeight: 'bold',
    textAlign: 'center',
};

const inputStyles = {
    marginBottom: '1rem',
    backgroundColor: '#333',
    borderRadius: '20px',
    color: '#fff'
};

const RegisterPage = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const formSchema = yup.object().shape({
        fullName: yup.string().required('Full name is required'),
        username: yup.string().required('Username is required'),
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().required('Password is required'),
        confirmPassword: yup.string().required('Confirm password is required'),
        gender: yup.string().oneOf(['m', 'f', 'o'], 'Invalid gender').required('Gender is required')
    });

    const formik = useFormik({
        initialValues: {
            fullName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            gender: ''
        },
        validationSchema: formSchema,
        onSubmit: (values, { setFieldError }) => {
            setLoading(true); // Set loading to true during registration attempt
            postUser({
                user_input: {
                    name: values.fullName,
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    gender: values.gender,
                }
            })
                .then((res) => {
                    setLoading(false); // Reset loading state after registration attempt
                    if (res.user) {
                        router.push("/login");
                        toast.success('Account created successfully');
                    } else {
                        setFieldError('gender', res.message);
                        toast.error(res.message);
                    }
                })
                .catch((error) => {
                    console.error('Submission error:', error);
                });
        },
    });

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue('gender', event.target.value);
        console.log(formik.values.gender)
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        formik.handleSubmit(event);
    };

    return (
        <Grid container style={{ height: '100%' }} sx={{ bgcolor: '#1f1f1f', color: '#fff' }}>
            <Grid item xs={12} md={6} lg={7.5} style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                backgroundImage: `url(/patternpad1.svg)`,
                backgroundRepeat: 'repeat'
            }} sx={{ bgcolor: '#1f1f1f', color: '#fff' }}>
                <CycloneIcon sx={{ fontSize: '2500%' }} />
            </Grid>

            <Grid item xs={12} md={6} lg={4.5} component={Paper} elevation={0} sx={{ bgcolor: '#1f1f1f', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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
                    <form onSubmit={handleSubmit}>
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
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.fullName}
                            error={
                                formik.touched.fullName && Boolean(formik.errors.fullName)
                            }
                            helperText={formik.touched.fullName && formik.errors.fullName}
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
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            error={
                                formik.touched.username && Boolean(formik.errors.username)
                            }
                            helperText={formik.touched.username && formik.errors.username}
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
                            email
                        </Typography>
                        <TextField
                            placeholder="Email"
                            id="email"
                            name="email"
                            type="email"
                            variant="outlined"
                            size='small'
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            error={
                                formik.touched.email && Boolean(formik.errors.email)
                            }
                            helperText={formik.touched.email && formik.errors.email}
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
                            password
                        </Typography>
                        <TextField
                            placeholder="Password"
                            id="password"
                            name="password"
                            type="password"
                            variant="outlined"
                            size='small'
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={
                                formik.touched.password && Boolean(formik.errors.password)
                            }
                            helperText={formik.touched.password && formik.errors.password}
                            required
                            InputProps={{
                                style: {
                                    color: '#fff',
                                    borderRadius: '20px',
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
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            error={
                                formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                            }
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                            Gender
                        </Typography>
                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="m"
                                    checked={formik.values.gender === 'm'}
                                    onChange={handleGenderChange}
                                    style={{ marginRight: '5px', transform: 'scale(1.5)' }}
                                />
                                <label htmlFor="male" style={{ fontSize: '16px' }}>Male</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="f"
                                    checked={formik.values.gender === 'f'}
                                    onChange={handleGenderChange}
                                    style={{ marginRight: '5px', transform: 'scale(1.5)' }}
                                />
                                <label htmlFor="female" style={{ fontSize: '16px' }}>Female</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="radio"
                                    id="other"
                                    name="gender"
                                    value="o"
                                    checked={formik.values.gender === 'o'}
                                    onChange={handleGenderChange}
                                    style={{ marginRight: '5px', transform: 'scale(1.5)' }}
                                />
                                <label htmlFor="other" style={{ fontSize: '16px' }}>Other</label>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* Submit button */}
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
                                    position: 'relative',
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
                                            color: '#1f1f1f', // Set color of CircularProgress
                                        }}
                                    />
                                )}
                                <span style={{ visibility: loading ? 'hidden' : 'visible' }}>Sign up</span>
                            </Button>
                            <Link href="/login" style={{ textDecoration: 'none', color: '#007bff', fontSize: '12px' }}>
                                Already have an account? Log in
                            </Link>
                        </div>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default RegisterPage;
