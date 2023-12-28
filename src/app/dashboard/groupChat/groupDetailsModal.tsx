'use client';

import React, { useEffect, useState } from 'react';
import { Modal, Paper, Typography, Button, Divider, Grid, Avatar } from '@mui/material';
import styles from '@/components/scroll.module.css'; // Import the CSS module
import { UserInput } from '@/types/User.interface';
import { GetGroupDescription } from './action';
import { useAuth } from '@/context/session';
import StarPurple500RoundedIcon from '@mui/icons-material/StarPurple500Rounded';
import UserDetailsModal from './memberDetailsModal';

const GroupDetailsModal = ({ admin, members, selectedGroup, onClose }: { admin: { id: string; username: string | undefined; } | undefined, members: { id: string, username: string }[], selectedGroup: { _id: string, name: string }, onClose: () => void }) => {

    const [description, setDescription] = useState<string>('');

    const { session } = useAuth();

    useEffect(() => {
        // get group description
        GetGroupDescription(session, selectedGroup._id)
            .then((response) => {
                console.log(response);
                const fetchedDescription = response.group?.description || '';
                setDescription(fetchedDescription);
            })
            .catch((error) => {
                console.error('Error fetching group description:', error);
            });
    }, [selectedGroup, session]);

    const [selectedUser, setSelectedUser] = useState<{ id: string; username: string } | null>(null);

    const handleProfileClick = (user: { id: string; username: string }) => {
        setSelectedUser(user);
    }

    const handleCloseUserDetails = () => {
        setSelectedUser(null);
    };

    return (
        <Modal open onClose={onClose}>
            <Paper className={styles['custom-scroll-container']}
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#1f1f1f', padding: '20px', color: 'white', height: '75%', width: '75%', overflowY: 'auto' }}>
                <div>
                    <Grid container alignItems="center" spacing={3}>
                        <Grid item >
                            <Avatar style={{ width: 200, height: 200, backgroundColor: '#333', marginRight: '30px' }}>
                                <img src="/profile_pic.png" alt="Profile" style={{ width: '100%', height: '100%' }} />
                            </Avatar>
                        </Grid>
                        <Grid item xs={12} sm>
                            <Typography variant="h4">{selectedGroup.name}</Typography>
                            <Divider variant='fullWidth' sx={{ backgroundColor: '#333', my: 1 }} />
                            <Typography variant="h5">Admin: <span style={{ color: '#007bff' }}>@{admin?.username}</span></Typography>
                            <Divider variant='fullWidth' sx={{ backgroundColor: '#333', my: 1 }} />
                            <Typography variant="h5">Descrption: </Typography>
                            <pre style={{ maxWidth: '1000px', whiteSpace: 'pre-wrap' }}>{description}</pre>
                        </Grid>
                    </Grid>
                    <Divider variant='fullWidth' sx={{ backgroundColor: '#333', my: 3 }} />
                    <Typography variant="h5">Members: </Typography>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {members.map((member, index) => (
                            <div
                                key={index}
                                onClick={() => handleProfileClick(member)}
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    margin: '10px'
                                }}>
                                <Avatar style={{ width: 100, height: 100, backgroundColor: '#333' }}>
                                    <img src="/profile_pic.png" alt="Profile" style={{ width: '100%', height: '100%' }} />
                                </Avatar>
                                <Typography variant="h6" sx={{ mt: 1 }}>{member.username === admin?.username && (
                                    <React.Fragment>
                                        <StarPurple500RoundedIcon sx={{ color: 'yellow' }} />
                                    </React.Fragment>
                                )}{member.username}</Typography>
                            </div>
                        ))}
                    </div>
                    <Button variant="contained" sx={{ bgcolor: '#007bff', mt: 2, }} onClick={onClose}>
                        Close
                    </Button>
                </div>
                {selectedUser && (
                    <UserDetailsModal selectedUser={selectedUser} onClose={handleCloseUserDetails} />
                )}
            </Paper>
        </Modal>
    );
};

export default GroupDetailsModal;