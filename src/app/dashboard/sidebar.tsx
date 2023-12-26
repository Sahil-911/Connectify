'use client';

import React, { useState } from 'react';
import {
    List,
    ListItemButton,
    ListItemIcon,
    Tooltip,
    Zoom
} from '@mui/material';
import {
    Person,
    PersonAdd,
    Chat,
    Logout,
    Settings,
    GroupAdd,
    Forum,
    Diversity3,
    PendingActions,
} from '@mui/icons-material';
import { useAuth } from '@/context/session';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const router = useRouter();
    const { logout } = useAuth();

    const [tooltipOpen, setTooltipOpen] = useState<string | null>(null);

    const [selectedItem, setSelectedItem] = useState('');

    const handleItemClick = (route: string) => {
        if (route === 'Logout') {
            logout();
            return;
        }
        setSelectedItem(route);
        router.push(`/dashboard/${route}`);
    };

    const handleMouseEnter = (text: string) => {
        setTooltipOpen(text);
    };

    const handleMouseLeave = () => {
        setTooltipOpen(null);
    };

    const sidebarItemsTops = [
        { icon: <Forum style={{ color: 'white' }} />, text: 'Chats', route: '' },
        { icon: <Diversity3 style={{ color: 'white' }} />, text: 'Groups', route: 'groupChat' },
        { icon: <PendingActions style={{ color: 'white' }} />, text: 'Manage Connections', route: 'manageConnections' },
        { icon: <PersonAdd style={{ color: 'white' }} />, text: 'Add Connection', route: 'addContact' },
        // { icon: <GroupAdd style={{ color: 'white' }} />, text: 'Create Group', route: 'createGroup' },
    ];

    const sidebarItemsBottoms = [
        { icon: <Person style={{ color: 'white' }} />, text: 'Profile', route: 'profile' },
        // { icon: <Settings style={{ color: 'white' }} />, text: 'Settings', route: 'settings' },
        { icon: <Logout style={{ color: 'white' }} />, text: 'Logout', route: 'Logout' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <List sx={{ minWidth: '30px' }}>
                {sidebarItemsTops.map((item, index) => (
                    <ListItemButton
                        key={index}
                        onClick={() => handleItemClick(item.route)}
                        onMouseEnter={() => handleMouseEnter(item.text)}
                        onMouseLeave={handleMouseLeave}
                        sx={{
                            m: 1,
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '3px',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            },
                        }}
                    >
                        <Tooltip TransitionComponent={Zoom} arrow placement='right' title={tooltipOpen === item.text ? item.text : ''} open={tooltipOpen === item.text}>
                            <ListItemIcon sx={{ m: 'auto' }}>{item.icon}</ListItemIcon>
                        </Tooltip>
                    </ListItemButton>
                ))}
            </List>
            <List sx={{ minWidth: '30px' }}>
                {sidebarItemsBottoms.map((item, index) => (
                    <ListItemButton
                        key={index}
                        onClick={() => handleItemClick(item.route)}
                        onMouseEnter={() => handleMouseEnter(item.text)}
                        onMouseLeave={handleMouseLeave}
                        sx={{
                            m: 1,
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '5px',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            },
                        }}
                    >

                        <Tooltip TransitionComponent={Zoom} arrow placement='right' title={tooltipOpen === item.text ? item.text : ''} open={tooltipOpen === item.text}>
                            <ListItemIcon sx={{ m: 'auto' }}>{item.icon}</ListItemIcon>
                        </Tooltip>
                    </ListItemButton>
                ))}
            </List>
        </div>
    );
};

export default Sidebar;