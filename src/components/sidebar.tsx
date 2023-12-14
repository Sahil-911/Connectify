'use client';

import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Inbox, Mail, Settings } from '@mui/icons-material';

const Sidebar = () => {
    const icons = [
        { icon: <Home style={{ color: 'white' }} />, text: 'Home' },
        { icon: <Inbox style={{ color: 'white' }} />, text: 'Inbox' },
        { icon: <Mail style={{ color: 'white' }} />, text: 'Mail' },
        { icon: <Settings style={{ color: 'white' }} />, text: 'Settings' },
    ];

    return (
        <List sx={{ minWidth: '30px' }}>
            {icons.map((item, index) => (
                <ListItem button key={index}>
                    <ListItemIcon sx={{ mb: 0.5 }}>{item.icon}</ListItemIcon>
                </ListItem>
            ))}
        </List>
    );
};

export default Sidebar;