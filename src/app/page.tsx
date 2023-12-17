'use client';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { Grid, Button, Typography, Box } from '@mui/material';
import { Cyclone } from '@mui/icons-material';

const LandingPage = () => {
    // import { useRouter } from 'next/router';

    // const LandingPage = () => {
    // const router = useRouter();

    //     // Rest of your code...

    //     return (
    //         // Your JSX code...
    //     );
    // };

    // export default LandingPage;

    return (
        <div style={{
            minHeight: '100vh', // Set minimum height to cover the viewport
            backgroundImage: `url(/patternpad3.svg)`,
            backgroundRepeat: 'repeat',
            display: 'flex', // Add flex to fill the entire viewport
            alignItems: 'center', // Center items vertically
            justifyContent: 'center', // Center items horizontally
            color: '#fff',
            // paddingTop:'100px',
            // paddingBottom:'100px'
        }}>
            <Grid
                container
                spacing={3}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item>
                    <Typography variant="h2" align="center" gutterBottom>
                        Welcome to my <span style={{ color: '#007bff' }}>Chat-App!</span>
                    </Typography>
                </Grid>
                <Grid item>
                    <Cyclone style={{ fontSize: '300px' }} />
                </Grid>
                <Grid item>
                    <Typography variant="h5" align="center" gutterBottom>
                        Join our community and start chatting now.
                    </Typography>
                </Grid>
                <Grid item container spacing={2} justifyContent="center">
                    <Grid item>
                        <Link href='/login'>
                            <Button variant="contained" color="primary"
                                sx={{ bgcolor: 'blue' }}
                            //  onClick={() => router.push('/login')}
                            >
                                Login
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href='/register'>
                            <Button variant="contained" color="secondary"
                            //  onClick={() => router.push('/register')}
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item>
                    <Box mt={3}>
                        <Typography variant="body2" align="center">
                            Forgot Password? <Link href="/forgotpass" style={{ textDecoration: 'none', color: '#007bff' }}> Click here </Link>.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default LandingPage;
