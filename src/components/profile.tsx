'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Avatar, Paper, Divider, Grid, Button, TextField } from '@mui/material';
import { FetchProfile, UpdateProfile } from './action';
import { useAuth } from '@/context/session';
import { useRouter } from 'next/navigation';
import { UserInput } from '@/types/User.interface';
import styles from './scroll.module.css'; // Import the CSS module
import { useFormik } from 'formik';
import * as yup from 'yup';

const Profile = () => {
    const { session } = useAuth();
    const router = useRouter();

    const [profileDetails, setProfileDetails] = useState<UserInput | null>(null);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        FetchProfile(session).then((response) => {
            const profile = response?.profile;

            if (!profile) {
                console.log('no profile');
                // Handle the scenario when profile doesn't exist
                // router.push("/login");
            } else {
                console.log(profile);
                setProfileDetails(profile);
            }
        });
    }, []);

    const formSchema = yup.object({
        fullName: yup.string().required('Full Name is required'),
        username: yup.string().required('Username is required'),
        email: yup.string().required('Email is required'),
        bio: yup.string().required('Bio is required'),
    });

    const formik = useFormik({
        initialValues: {
            fullName: profileDetails?.name,
            username: profileDetails?.username,
            email: profileDetails?.email,
            bio: profileDetails?.bio,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values);
            UpdateProfile(session, {
                user_input: {
                    name: values.fullName,
                    username: values.username,
                    email: values.email,
                    bio: values.bio,
                }
            }).then((response) => {
                const updatedProfile = response?.updatedProfile; // Access updatedProfile instead of profile

                if (!updatedProfile) {
                    console.log('no profile');
                    // Handle the scenario when profile doesn't exist
                    // router.push("/login");
                } else {
                    console.log(updatedProfile);
                    setProfileDetails(updatedProfile);
                }
            });

        },
    });

    useEffect(() => {
        if (profileDetails) {
            formik.setValues({
                fullName: profileDetails.name || '',
                username: profileDetails.username || '',
                email: profileDetails.email || '',
                bio: profileDetails.bio || '',
            });
        }
    }, [profileDetails, formik.setValues]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('submit', profileDetails);
        console.log('submitted', formik.values);
        formik.handleSubmit();
        setUpdate(false);

        // Update the profile and then fetch the updated profile data
        UpdateProfile(session, {
            user_input: {
                name: formik.values.fullName,
                username: formik.values.username,
                email: formik.values.email,
                bio: formik.values.bio,
            }
        }).then((response) => {
            const updatedProfile = response?.updatedProfile;

            if (!updatedProfile) {
                console.log('no profile');
                // Handle the scenario when profile doesn't exist
                // router.push("/login");
            } else {
                console.log(updatedProfile);
                setProfileDetails(updatedProfile);

                // Fetch updated profile data after successful update
                FetchProfile(session).then((response) => {
                    const profile = response?.profile;

                    if (!profile) {
                        console.log('no profile');
                        // Handle the scenario when profile doesn't exist
                        // router.push("/login");
                    } else {
                        console.log(profile);
                        setProfileDetails(profile);
                    }
                });
            }
        });
    };

    return (
        <div className={styles['custom-scroll-container']} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', backgroundColor: '#333', color: '#fff', overflowY: 'auto', borderRadius: '6px 0 0 0' }}>
            <Paper elevation={0} className='container' style={{ padding: '20px', borderRadius: '8px', height: '90%', width: '90%', backgroundColor: '#333', color: '#fff', paddingTop: '20px' }}>
                {profileDetails && !update && (
                    <div>

                        <Grid container alignItems="center" spacing={3}>
                            <Grid item >
                                <Avatar style={{ width: 200, height: 200, backgroundColor: '#333', marginRight: '30px' }}>
                                    <img src="/profile_pic.png" alt="Profile" style={{ width: '100%', height: '100%' }} />
                                </Avatar>
                            </Grid>
                            <Grid item xs={12} sm>
                                <div style={{}}>
                                    <Typography variant="h3" sx={{ mx: 1, mt: 2, mb: 2 }}>{profileDetails.username}</Typography>
                                    <Divider sx={{ backgroundColor: '#333', my: 1 }} />
                                    <Typography variant="h4" sx={{ mx: 1, mb: 1 }}>{profileDetails.name}</Typography>
                                    <Divider sx={{ backgroundColor: '#333', my: 1 }} />
                                    <Typography variant="h4" sx={{ mx: 1, mb: 1 }}>{profileDetails.email}</Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <Divider variant='fullWidth' sx={{ backgroundColor: '#333', my: 3 }} />
                        <div style={{ maxWidth: '600px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <Typography variant="h5">Gender: </Typography>
                                <Typography variant="h5">{profileDetails.gender}</Typography>
                            </div>
                            <Divider variant='middle' sx={{ backgroundColor: '#333', my: 1 }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <Typography variant="h5">Number of Connections: </Typography>
                                <Typography variant="h5">{profileDetails.connections?.length || 0}</Typography>
                            </div>
                            <Divider variant='middle' sx={{ backgroundColor: '#333', my: 1 }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <Typography variant="h5">Number of Pending Requests: </Typography>
                                <Typography variant="h5">{profileDetails.pendingConnections?.length || 0}</Typography>
                            </div>
                        </div>
                        <Divider variant='fullWidth' sx={{ backgroundColor: '#333', my: 3 }} />
                        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '30px' }}>
                            <Typography variant="h5" sx={{ mb: 1 }}>Bio: </Typography>
                            <pre style={{ maxWidth: '1000px', whiteSpace: 'pre-wrap' }}>{profileDetails.bio}</pre>
                        </div>

                        <Button variant='contained' onClick={() => setUpdate(true)} sx={{ position: 'absolute', bottom: '20px', right: '20px', bgcolor: '#007bff' }}>Update Profile</Button>
                    </div>
                )}

                {profileDetails && update && (
                    <form onSubmit={handleSubmit}>
                        <div style={{ paddingBottom: '50px' }}>
                            <Grid container alignItems="center" spacing={3} sx={{}}>
                                <Grid item >
                                    <Avatar style={{ width: 200, height: 200, backgroundColor: '#333' }}>
                                        <img src="/profile_pic.png" alt="Profile" style={{ width: '100%', height: '100%' }} />
                                    </Avatar>
                                </Grid>
                                <Grid item xs={12} sm>

                                    <Typography variant='caption' sx={{ color: '#fff' }}>
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
                                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                        helperText={formik.touched.fullName && formik.errors.fullName}
                                        required
                                        InputProps={{
                                            style: {
                                                color: '#fff',
                                                borderRadius: '20px',
                                                border: '2px solid grey'
                                            }
                                        }}
                                        sx={{ mt: 1, mb: 3 }} // Add margin-top for spacing
                                    />

                                    <Typography variant='caption' sx={{ color: '#fff' }}>
                                        Username
                                    </Typography>
                                    <TextField
                                        placeholder="Username"
                                        id="username"
                                        name="username"
                                        type="text"
                                        // defaultValue={profileDetails.username}
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        onChange={formik.handleChange}
                                        value={formik.values.username}
                                        error={formik.touched.username && Boolean(formik.errors.username)}
                                        helperText={formik.touched.username && formik.errors.username}
                                        required
                                        InputProps={{
                                            style: {
                                                color: '#fff',
                                                borderRadius: '20px',
                                                border: '2px solid grey'
                                            }
                                        }}
                                        sx={{ mt: 1, mb: 3 }} // Add margin-top for spacing
                                    />

                                    {/* Email field */}
                                    <Typography variant='caption' sx={{ color: '#fff', mt: 2 }}>
                                        Email
                                    </Typography>
                                    <TextField
                                        placeholder="Email"
                                        id="email"
                                        name="email"
                                        type="text"
                                        // defaultValue={profileDetails.email}
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        required
                                        InputProps={{
                                            style: {
                                                color: '#fff',
                                                borderRadius: '20px',
                                                border: '2px solid grey'
                                            }
                                        }}
                                        sx={{ mt: 1, mb: 3 }} // Add margin-top for spacing
                                    />
                                </Grid>
                            </Grid>

                            {/* Bio field */}
                            <Typography  variant='caption' sx={{ color: '#fff', mt: 2, pt: 2 }}>
                                Bio
                            </Typography>
                            <TextField
                                className={styles['custom-scroll-container']}
                                placeholder="Bio"
                                id="bio"
                                name="bio"
                                type="text"
                                // defaultValue={profileDetails.bio}
                                variant='outlined'
                                size='small'
                                fullWidth
                                multiline
                                rows={6}
                                onChange={formik.handleChange}
                                value={formik.values.bio}
                                error={formik.touched.bio && Boolean(formik.errors.bio)}
                                helperText={formik.touched.bio && formik.errors.bio}
                                InputProps={{
                                    style: {
                                        color: '#fff',
                                        borderRadius: '20px',
                                        border: '2px solid grey'
                                    }
                                }}
                                sx={{ mt: 1, overflowY:'auto' }} // Add margin-top for spacing
                            />
                            <Button type="submit" variant='contained' sx={{ position: 'absolute', bottom: '20px', right: '20px', bgcolor: '#007bff' }}>Save Changes</Button>
                            <Button variant='contained' onClick={() => setUpdate(false)} sx={{ position: 'absolute', bottom: '20px', right: '180px', bgcolor: 'red' }}>Cancel</Button>
                        </div>
                    </form>
                )}
            </Paper>
        </div>
    );
};

export default Profile;
