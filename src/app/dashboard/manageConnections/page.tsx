'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Connections from './connections';
import PendingConnections from './pendingConnections';
import ConnectionRequests from './connectionRequests';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '@/components/scroll.module.css';

const theme = createTheme({
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: '#007bff', // Text color of selected tab
                    },
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    borderBottom: '2px solid #007bff', // Indicator line color
                },
            },
        },
    },
});

export default function LabTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <Box
                className={styles['custom-scroll-container']}
                sx={{
                    width: '100%',
                    borderRadius: '6px 0 0 0',
                    backgroundImage: `url(/patternpad4.svg)`,
                    backgroundRepeat: 'repeat',
                    overflowY: 'auto'
                }}>
                <TabContext value={value}>
                    <ThemeProvider theme={theme}>
                        <TabList
                            centered
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                            indicatorColor="primary" // Set the indicator color to primary
                            sx={{
                                width: '100%',
                                // display: 'flex',
                                // justifyContent: 'space-between',
                                bgcolor: '#262626',
                                borderRadius: '6px 0 0 0',
                                padding: 0
                            }}
                        >
                            <Tab
                                value="1"
                                label="Connections"
                                sx={{
                                    color: value === '1' ? '#007bff' : '#fff',
                                    width:'33%'
                                }}
                            />
                            <Tab
                                value="2"
                                label="Pending Connections"
                                sx={{
                                    color: value === '2' ? '#007bff' : '#fff',
                                    width:'33%'
                                }}
                            />
                            <Tab
                                value="3"
                                label="Connection Requests"
                                sx={{
                                    color: value === '3' ? '#007bff' : '#fff',
                                    width:'33%'
                                }}
                            />
                        </TabList>
                    </ThemeProvider>
                    <TabPanel value="1"><Connections /></TabPanel>
                    <TabPanel value="2"><PendingConnections /></TabPanel>
                    <TabPanel value="3"><ConnectionRequests /></TabPanel>
                </TabContext>
            </Box>
        </>
    );
}
