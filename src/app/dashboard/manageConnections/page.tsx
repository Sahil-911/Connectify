'use client';

import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from '@/components/scroll.module.css';
import Connections from './connections';
import PendingConnections from './pendingConnections';
import ConnectionRequests from './connectionRequests';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <Box sx={{ bgcolor: '#333', width: '100%', height: '100%', borderRadius: '6px 0 0 0' }}>
            <AppBar position="static" sx={{ borderRadius: '6px 0 0 0' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    sx={{ bgcolor: '#262626', borderRadius: '6px 0 0 0' }}
                >
                    <Tab label="Connenctions" {...a11yProps(0)} />
                    <Tab label="Pending Connections" {...a11yProps(1)} />
                    <Tab label="Connection Requests" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                className={styles['custom-scroll-container']}
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
                style={{ color: '#fff', height: '100%', width: '100%', overflowY: 'auto' }}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Connections />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <PendingConnections />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <ConnectionRequests />
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}
