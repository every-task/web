import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';
import { apiNoToken } from '../network/api';

const MessageSentbox = () => {
    const [sentMessages, setSentMessages] = useState([]);

    useEffect(() => {
        const fetchSentMessages = async () => {
            try {
                const response = await apiNoToken('http://localhost:8080/api/v1/mentoring/message/list-sent', 'GET');
                console.log('Sent messages response:', response.status);

                const data = response.data;
                console.log('Sent messages data:', data);
                setSentMessages(data);
            } catch (error) {
                console.error('Error occurred while fetching sent messages:', error);
            }
        };

        fetchSentMessages();
    }, []);

    const handleDelete = async (id) => {
        try {
            await apiNoToken(`http://localhost:8080/api/v1/mentoring/message/sent/${id}`, 'DELETE');
            setSentMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
        } catch (error) {
            console.error('Error occurred while deleting the sent message:', error);
        }
    };

    if (!sentMessages || sentMessages.length === 0) {
        return (
            <Typography variant="h6" gutterBottom>
                보낸 쪽지가 없습니다
            </Typography>
        );
    }

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                보낸 쪽지함
            </Typography>
            <List>
                {sentMessages.map((message) => (
                    <ListItem key={message.id}>
                        <ListItemText
                            primary={message.message}
                            secondary={`받는이: ${message.receiverNickname}, 시간: ${message.sentAt}`}
                        />
                        <Button onClick={() => handleDelete(message.id)} variant="outlined" color="secondary">
                            삭제
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default MessageSentbox;