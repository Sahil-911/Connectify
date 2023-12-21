'use client';

import React, { useState } from 'react';
import { List, ListItemButton, ListItemIcon, Typography, Popper, Paper } from '@mui/material';
import { Person, PersonAdd, Chat, Logout, Settings, GroupAdd, Forum, Diversity3 } from '@mui/icons-material';
import { useAuth } from '@/context/session';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const router = useRouter();
    const { logout } = useAuth();

    const handleItemClick = (text: string) => {
        console.log(text);
        if (text === 'Logout') {
            logout().then(() => {
                console.log('Logged out successfully!');
                router.push('/');
            });
        } else {
            // Handle navigation for other items if needed
            // For example, navigate to '/chats' when 'Chats' is clicked
            router.push(`/${text.toLowerCase()}`); // Assuming the route for 'Chats' is '/chats'
        }
    };

    const sidebarItemsTops = [
        { icon: <Forum style={{ color: 'white' }} />, text: 'Chats' },
        { icon: <Diversity3 style={{ color: 'white' }} />, text: 'Groups' },
        { icon: <PersonAdd style={{ color: 'white' }} />, text: 'Add Friend' },
        { icon: <GroupAdd style={{ color: 'white' }} />, text: 'Create Group' },
    ];

    const sidebarItemsBottoms = [
        { icon: <Person style={{ color: 'white' }} />, text: 'Profile' },
        { icon: <Settings style={{ color: 'white' }} />, text: 'Settings' },
        { icon: <Logout style={{ color: 'white' }} />, text: 'Logout' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <List sx={{ minWidth: '30px' }}>
                {sidebarItemsTops.map((item, index) => (
                    <ListItemButton
                        key={index}
                        onClick={() => handleItemClick(item.text)}
                        sx={{
                            m: 1,
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '3px',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Change background color on hover
                            },
                        }}
                    >
                        <ListItemIcon sx={{ m: 'auto' }}>{item.icon}</ListItemIcon>
                    </ListItemButton>
                ))}
            </List>
            <List sx={{ minWidth: '30px' }}>
                {sidebarItemsBottoms.map((item, index) => (
                    <ListItemButton
                        key={index}
                        onClick={() => handleItemClick(item.text)}
                        sx={{
                            m: 1,
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '5px',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Change background color on hover
                            },
                        }}
                    >
                        <ListItemIcon sx={{ m: 'auto' }}>{item.icon}</ListItemIcon>
                    </ListItemButton>
                ))}
            </List>
        </div>
    );
};

export default Sidebar;