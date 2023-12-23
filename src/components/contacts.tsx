'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Typography, Divider } from '@mui/material';
import profile_pic from '@mui/icons-material/AccountCircle';
import styles from './scroll.module.css'; // Import the CSS module

const Contacts = () => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        // get contacts 
        GetContacts(session)
            .then((response) => {
                console.log(response);
                const fetchedContacts = response?.contacts as UserInputWithId[] || [];
                setContacts(fetchedContacts as UserInputWithId[]);
            })

        return (
            <div style={{ borderRadius: '6px 0 0 0', height: '100%', backgroundColor: '#262626', border: '1px solid #1f1f1f', paddingBottom: 0, minWidth: '200px' }}>
                <Typography variant="h6" sx={{ ml: 1.5, py: 2, mt: 0 }}>
                    Contacts
                </Typography>
                <Divider />
                <div className={styles['custom-scroll-container']} style={{ height: '90%', overflowY: 'scroll' }}>
                    {contacts.map((contact, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'flex-start', padding: '10px', height: '60px' }}>
                            <div>
                                <Image
                                    src={contact.avatar} // Use the avatar property from contact
                                    alt={contact.name}
                                    width={30}
                                    height={30}
                                    style={{ borderRadius: '50%', margin: '0 auto' }}
                                />
                            </div>
                            <Typography variant="body2" sx={{ ml: 2, my: 'auto' }}>
                                {contact.name}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    export default Contacts;