'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Typography, Divider, Paper } from '@mui/material';
import styles from './scroll.module.css'; // Import the CSS module
import { GetNameOfConnections } from './action';
import { useAuth } from '@/context/session';

const Contacts = ({ onSelectContact }: { onSelectContact: (contact: { _id: string, name: string, username: string }) => void }) => {

    const { session } = useAuth();

    const [contacts, setContacts] = useState<{ _id: string, name: string, username: string }[]>([]);

    useEffect(() => {
        // get contacts 
        GetNameOfConnections(session)
            .then((response) => {
                console.log(response);
                const fetchedContacts = response.contacts as { _id: string, name: string, username: string }[] || [];
                setContacts(fetchedContacts);
            })
            .catch((error) => {
                console.error('Error fetching contacts:', error);
            });
    }, [session]);

    return (
        <div style={{ borderRadius: '6px 0 0 0', height: '100%', backgroundColor: '#262626', border: '1px solid #1f1f1f', paddingBottom: 0, minWidth: '200px' }}>
            <Typography variant="h6" sx={{ ml: 1.5, py: 2, mt: 0 }}>
                Contacts
            </Typography>
            <Divider />
            <div className={styles['custom-scroll-container']} style={{ height: '90%', overflowY: 'scroll' }}>
                {contacts.map((contact, index) => (
                    <Paper key={index} elevation={0}
                        onClick={() => onSelectContact(contact)}
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
                                    src='/profile_pic.png' // Use the avatar property from contact
                                    alt={contact.name}
                                    width={50}
                                    height={50}
                                    style={{ borderRadius: '50%', margin: '0 auto' }}
                                />
                            </div>
                            <div>
                                <Typography variant="body1" sx={{ ml: 2, my: 'auto' }}>
                                    {contact.name}
                                </Typography>
                                <Typography variant="caption" sx={{ ml: 2, my: 'auto', color: '#007bff' }}>
                                    @{contact.username}
                                </Typography>
                            </div>
                        </div>
                    </Paper>
                ))}
            </div>
        </div>
    );
};

export default Contacts;