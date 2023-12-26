'use client';

import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, Paper, TextField, Typography } from '@mui/material';
import { useAuth } from '@/context/session';
import { CreateNewGroup, GetAllFriends } from './action';

export default function CreateGroup({ handleModalClose }: { handleModalClose: () => void }) {
    const { session } = useAuth();

    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupMembers, setGroupMembers] = useState<{ _id: string; username: string; name: string }[]>([]);
    const [connections, setConnections] = useState<{ _id: string; username: string; name: string }[]>([]);


    useEffect(() => {
        GetAllFriends(session)
            .then((response) => {
                const fetchedFriends = response?.friends?.connections || [];
                setConnections(fetchedFriends as { _id: string; username: string; name: string }[]);
            })
            .catch((error) => {
                console.error('Error fetching profiles:', error);
            });
    }, [session]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('submitting')
        try {
            if (groupMembers.length > 0) {
                const ids = groupMembers.map((member) => member._id);
                const response = await CreateNewGroup(session, {
                    groupInput: {
                        name: groupName,
                        description: groupDescription,
                        memberIds: ids,
                    },
                });
                console.log('testing');

                console.log(response.group);

                if (response.message === 'Group created successfully') {
                    console.log(response.group);
                    console.log('Group created successfully');
                } else {
                    console.log('Group not created');
                }
                handleModalClose();
            } else {
                alert('Please select at least one group member.');
            }
        } catch (error) {
            // console.error('Error creating group:', error);
        }
    };


    return (
        <div>
            <Typography variant="h4" sx={{ py: 2, mt: 0, color: '#fff' }}>
                Create Group
            </Typography>
            <form onSubmit={handleSubmit} >

                <TextField
                    placeholder="Group Name"
                    value={groupName}
                    required
                    onChange={(e) => setGroupName(e.target.value)}
                    sx={{
                        mb: 2,
                        width: '100%',
                        backgroundColor: '#333',
                        color: '#fff',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#fff',
                            },
                            '&:hover fieldset': {
                                borderColor: '#fff',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#fff',
                            },
                            '& input': {
                                color: '#fff',
                            },
                        },
                    }}
                />
                <TextField
                    placeholder="Group Description"
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    multiline
                    maxRows={4}
                    sx={{
                        mb: 2,
                        width: '100%',
                        backgroundColor: '#333',
                        color: '#fff',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#fff',
                            },
                            '&:hover fieldset': {
                                borderColor: '#fff',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#fff',
                            },
                            '& textarea': {
                                color: '#fff',
                            },
                        },
                    }}
                />
                <Autocomplete
                    multiple
                    id="group-members"
                    options={connections}
                    value={groupMembers}
                    onChange={(event, newValue) => {
                        setGroupMembers(newValue);
                    }}
                    getOptionLabel={(option) => option.username}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Group Members" // Placeholder here
                        />
                    )}
                    PaperComponent={({ children }) => (
                        <Paper
                            sx={{
                                backgroundColor: '#333',
                                color: '#fff',
                                border: '1px solid #fff',
                                borderRadius: '0 0 4px 4px',
                            }}
                        >
                            {children}
                        </Paper>
                    )}
                    ChipProps={{
                        sx: {
                            backgroundColor: '#1f1f1f',
                            border: '1px solid #fff',
                            color: '#fff',
                            borderRadius: '4px',
                            '& .MuiChip-deleteIcon': {
                                color: '#fff',
                            },
                        },
                    }}
                    sx={{
                        mb: 2,
                        width: '100%',
                        '& .MuiAutocomplete-inputRoot': {
                            backgroundColor: '#333',
                            color: '#fff',
                            border: '1px solid #fff',
                            borderRadius: '4px',
                        },
                    }}
                />
                <Button type='submit' variant="contained" color="success">
                    Create Group
                </Button>
            </form>
        </div>
    );
}
