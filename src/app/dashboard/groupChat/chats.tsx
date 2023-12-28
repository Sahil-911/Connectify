'use client';

import { Divider, TextField, Typography, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import styles from '@/components/scroll.module.css';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Image from 'next/image';
import { useAuth } from '@/context/session';
import { UserInputWithId } from '@/types/User.interface';
import { MessageInputWithId } from '@/types/Message.interface';
import { GetGroupMemberDetails, GetMessagesGC, StoreNewMessageInGroup } from './action';
import StarPurple500RoundedIcon from '@mui/icons-material/StarPurple500Rounded';

function GroupChats({ selectedGroup, profile }: { selectedGroup: { _id: string, name: string }, profile: UserInputWithId }) {

    const { session } = useAuth();

    console.log(selectedGroup);

    const [messages, setMessages] = useState<MessageInputWithId[]>([]);
    const [newMessageContent, setNewMessageContent] = useState<string>('');
    const [members, setMembers] = useState<{ id: string, username: string }[]>([]);
    const [admin, setAdmin] = useState<{ id: string; username: string | undefined }>();

    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        GetGroupMemberDetails(session, selectedGroup._id).then((response) => {
            console.log(response);

            console.log('member details fetched', response);
            const fetchedMembers = response.group?.members;
            const fetchedAdmin = response.group?.admin;
            setMembers(fetchedMembers || []);
            setAdmin(fetchedAdmin || { id: '', username: '' });
        })
    }, [session, selectedGroup]);

    useEffect(() => {
        GetMessagesGC(session, selectedGroup._id).then((response) => {
            console.log(response);

            console.log('chats fetched', response);
            const fetchedMessages = response.messages;
            setMessages(fetchedMessages || []);
        })
    }, [session, selectedGroup]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessageContent(event.target.value); // Update the state with the content of the input field
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        console.log('submitting message', newMessageContent);

        try {
            await StoreNewMessageInGroup(session, selectedGroup._id, newMessageContent);
            console.log('message sent');

            // Clear input field after sending the message
            setNewMessageContent('');

            // Add the new message to the messages list
            const newMessage: MessageInputWithId = {
                _id: 'temp_id',
                content: newMessageContent,
                sender: profile._id,
                timestamp: new Date(),
            };

            setMessages(prevMessages => [...prevMessages, newMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle errors accordingly
        }
    };

    const handleShowProfile = (profileId:string) => {
        
    }


    console.log(selectedGroup._id, 's');
    console.log(profile, 'p');
    return (
        <div style={{
            backgroundColor: '#262626',
            borderTop: '1px solid #1f1f1f',
            borderRight: '1px solid #1f1f1f',
            borderRadius: '0 6px 0 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',

        }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', height: '64px' }}>
                {selectedGroup._id !== '' && (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginLeft: '10px' }}>
                    <Image
                        src='/profile_pic.png' // Use the avatar property from contact
                        alt={selectedGroup?.name}
                        width={45}
                        height={45}
                        style={{ borderRadius: '50%' }}
                    />
                </div>)}
                <div style={{ padding: '4px', width: '100%', minHeight: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="body1" sx={{ ml: 1.5, mt: 0, color: '#fff' }}>
                        {selectedGroup?.name}
                    </Typography>
                    <Typography variant="caption" sx={{ ml: 1.5, mt: 0, color: '#007bff' }}>
                        {members.map((member, index) => (
                            <span key={member.id} style={{cursor:'pointer'}} onClick={() => handleShowProfile(member.id)} >
                                {member.username}
                                {admin && member.username && admin.username &&
                                    member.username.toString() === admin.username && (
                                        <React.Fragment>
                                            <StarPurple500RoundedIcon fontSize='small' sx={{ pt: 1, color: 'yellow' }} />
                                        </React.Fragment>
                                    )}
                                {index !== members.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </Typography>
                </div>
            </div>
            <Divider />
            <div ref={chatContainerRef}
                className={styles['custom-scroll-container']}
                style={{ overflowY: 'auto', height: '100%', backgroundImage: `url(/patternpad.svg)`, backgroundRepeat: 'repeat' }}>
                {messages && messages.map((message, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex', flexDirection: 'column',
                            alignItems: message.sender === `${profile._id}` ? 'flex-end' : 'flex-start',
                            padding: '10px 15px',
                            width: '100%',
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ color: '#007bff' }}>
                            {members.find(member => member.id === message.sender)?.username || 'Unknown User'}
                        </Typography>
                        <div style={{
                            backgroundColor: message.sender.toString() !== `${profile._id}` ? '#333' : '#007bff',
                            color: 'white',
                            borderRadius: '10px',
                            padding: '8px 12px',
                            marginTop: '5px',
                            maxWidth: '90%',
                        }}>
                            <Typography variant="body1">{message.content}</Typography>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Typography variant="caption" sx={{ color: 'lightgray', textAlign: 'right', fontStyle: 'italic' }}>{new Date(message.timestamp).toLocaleString()}</Typography>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    backgroundColor: '#262626'
                }}>
                    <div style={{ width: '98%', marginBottom: '10px', display: 'flex' }}>
                        {/* Emoji icon */}
                        <IconButton sx={{ color: 'white', backgroundColor: '#333', borderRadius: '4px 0 0 4px', marginTop: '8px', height: '39px', mt: 1.1 }}>
                            <EmojiEmotionsIcon fontSize='small' />
                        </IconButton>
                        <TextField
                            fullWidth
                            placeholder="Type your message"
                            variant="outlined"
                            size="small"
                            value={newMessageContent} // Set the value of the TextField to the state variable
                            onChange={handleInputChange} // Handle changes in the TextField 
                            required
                            InputProps={{
                                style: {
                                    backgroundColor: '#333',
                                    color: 'white',
                                    borderRadius: '0',
                                    marginTop: '8px',
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: '#fff',
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#fff',
                                },
                            }}
                        />
                        <IconButton type="submit" sx={{ color: 'white', backgroundColor: '#333', borderRadius: '0 4px 4px 0', height: '39px', mt: 1.1 }}>
                            <SendIcon fontSize='small' />
                        </IconButton>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default GroupChats;