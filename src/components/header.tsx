'use client';

import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import CycloneIcon from '@mui/icons-material/Cyclone';

const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <CycloneIcon sx={{ marginRight: '10px', marginLeft:'0',paddingLeft:'0' }} />
                <Typography variant="h6">chat-app</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
