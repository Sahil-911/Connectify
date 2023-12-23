'use client';

import { Divider, TextField, Typography, IconButton } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import styles from './scroll.module.css';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Image from 'next/image';

function Chats({ selectedContact }: { selectedContact: { _id: string, name: string, username: string } }) {

  console.log(selectedContact, 'le');

  const handleSubmit = () => {
    // e.preventDefault();
    // Handle form submission here
    console.log('Message sent!');
    // You can add logic to send the message to a backend or perform other actions
  };

  const messages = [
    {
      id: 1,
      text: 'Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? ',
      sender: 'John Doe',
      timestamp: '2021-10-10T12:00:00.000Z',
    },
    {
      id: 2,
      text: 'I am doing well, thanks for asking!',
      sender: 'Jane Smith',
      timestamp: '2021-10-10T12:00:00.000Z',
    },
    // {
    //   id: 3,
    //   text: 'I am doing well, thanks for asking! I am doing well, thanks for asking! I am doing well, thanks for asking! I am doing well, thanks for asking! I am doing well, thanks for asking! I am doing well, thanks for asking! I am doing well, thanks for asking! ',
    //   sender: 'Jane Smith',
    //   timestamp: '2021-10-10T12:00:00.000Z',
    // },
    // {
    //   id: 4,
    //   text: 'That is good to hear!',
    //   sender: 'John Doe',
    //   timestamp: '2021-10-10T12:00:00.000Z',
    // },
    // {
    //   id: 1,
    //   text: 'Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? ',
    //   sender: 'John Doe',
    //   timestamp: '2021-10-10T12:00:00.000Z',
    // },
    // {
    //   id: 2,
    //   text: 'I am doing well, thanks for asking!',
    //   sender: 'Jane Smith',
    //   timestamp: '2021-10-10T12:00:00.000Z',
    // },
    // {
    //   id: 3,
    //   text: 'I am doing well, thanks for asking! I am doing well, thanks for asking! I am doing well, thanks for asking! I am doing well, thanks for asking! I am doing well, thanks for asking! I am doing well, thanks for asking! I am doing well, thanks for asking! ',
    //   sender: 'Jane Smith',
    //   timestamp: '2021-10-10T12:00:00.000Z',
    // },
    // {
    //   id: 4,
    //   text: 'That is good to hear!',
    //   sender: 'John Doe',
    //   timestamp: '2021-10-10T12:00:00.000Z',
    // },
  ];

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
      <div style={{ display: 'flex', alignItems: 'flex-start', height: '64px'}}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100%', marginLeft:'10px' }}>
          <Image
            src='/profile_pic.png' // Use the avatar property from contact
            alt={selectedContact?.name}
            width={45}
            height={45}
            style={{ borderRadius: '50%' }}
          />
        </div>
        <div style={{ padding: '4px', width: '100%', minHeight: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="body1" sx={{ ml: 1.5, mt: 0, color: '#fff' }}>
            {selectedContact?.name}
          </Typography>
          <Typography variant="caption" sx={{ ml: 1.5, mt: 0, color: '#007bff' }}>
            {selectedContact.username !== '' && `@${selectedContact.username}`}
          </Typography>
        </div>
      </div>
      <Divider />
      <div className={styles['custom-scroll-container']} style={{ overflowY: 'auto', height: '100%', backgroundImage: `url(/patternpad.svg)`, backgroundRepeat: 'repeat' }}>
        {messages && messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: message.sender === 'John Doe' ? 'flex-end' : 'flex-start',
              padding: '10px 15px',
              width: '100%',
            }}
          >
            <Typography variant="subtitle2" sx={{ color: '#fff' }}>{message.sender}</Typography>
            <div style={{
              backgroundColor: message.sender === 'John Doe' ? '#007bff' : '#333',
              color: 'white',
              borderRadius: '10px',
              padding: '8px 12px',
              marginTop: '5px',
              maxWidth: '90%',
            }}>
              <Typography variant="body1">{message.text}</Typography>
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

export default Chats;