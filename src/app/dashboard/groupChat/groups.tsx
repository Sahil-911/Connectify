'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Typography, Divider, Paper, Button, Modal, Box, TextField, LinearProgress } from '@mui/material';
import styles from '@/components/scroll.module.css'; // Import the CSS module
import { GetNameOfGroups } from './action';
import { useAuth } from '@/context/session';
import { Add } from '@mui/icons-material';
import CreateGroup from './createGroup';

const Groups = ({ onSelectGroup }: { onSelectGroup: (group: { _id: string, name: string }) => void }) => {

    const { session } = useAuth();

    const [groups, setGroups] = useState<({
        _id: string;
        name: string;
    } | undefined)[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        // get groups 
        GetNameOfGroups(session)
            .then((response) => {
                console.log(response);
                const fetchedGroups = response.groupNames || [];
                setGroups(fetchedGroups);
                setLoading(false); // Set loading to false once groups are fetched
            })
            .catch((error) => {
                console.error('Error fetching groups:', error);
                setLoading(false); // Set loading to false in case of an error
            });
    }, [session]);

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleGroupCreated = () => {
        // Close the modal by setting openModal to false
        setOpenModal(false);
    };

    return (
        <div style={{ borderRadius: '6px 0 0 0', height: '100%', backgroundColor: '#262626', border: '1px solid #1f1f1f', paddingBottom: 0, minWidth: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ ml: 1.5, py: 2, mt: 0 }}>
                    Groups
                </Typography>
                <Button disableElevation variant="contained" sx={{ mx: 1.5 }} startIcon={<Add />} onClick={handleModalOpen}>
                    Create Group
                </Button>
                <Modal open={openModal} onClose={handleModalClose} >
                    <Box sx={{ width: "90%", maxWidth: '450px', bgcolor: '#1f1f1f', color: '#fff', p: 2, borderRadius: '8px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <CreateGroup onGroupCreated={handleGroupCreated} setGroups={setGroups} />
                    </Box>
                </Modal>
            </div>
            <Divider />
            {loading ? (
                <LinearProgress style={{ backgroundColor: '#007bff' }} />
            ) : groups.length === 0 ? (
                <div style={{ height: '80%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ p: 2, color: '#fff' }}>
                        No groups to display
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleModalOpen} sx={{ bgcolor: '#007bff' }}>
                        Create Group
                    </Button>
                </div>
            ) : (
                <div className={styles['custom-scroll-container']} style={{ height: '90%', overflowY: 'scroll' }}>
                    {groups.map((group, index) => (
                        <Paper key={index} elevation={0}
                            onClick={() => {
                                if (group)
                                    onSelectGroup(group)
                            }}
                            sx={{
                                bgcolor: '#262626',
                                color: '#fff',
                                mx: 0.5,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', padding: '10px', minHeight: '70px', margin: '5px 0 5px 0' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        src='/profile_pic.png' // Use the avatar property from group
                                        alt={group?.name || ''}
                                        width={50}
                                        height={50}
                                        style={{ borderRadius: '50%', margin: '0 auto' }}
                                    />
                                </div>
                                <div>
                                    <Typography variant="body1" sx={{ ml: 2, my: 'auto' }}>
                                        {group?.name}
                                    </Typography>
                                    <Typography variant="caption" sx={{ ml: 2, my: 'auto', color: '#007bff' }}>
                                        @{group?.name}
                                    </Typography>
                                </div>
                            </div>
                        </Paper>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Groups;