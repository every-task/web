import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';
import { apiNoToken } from '../network/api';

const MessageInbox = () => {
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        const fetchReceivedMessages = async () => {
            try {
                const response = await apiNoToken('http://localhost:8080/api/v1/mentoring/message/list-received', 'GET');
                console.log('Received messages response:', response.status);

                const data = response.data;
                console.log('Received messages data:', data);
                setReceivedMessages(data);
            } catch (error) {
                console.error('Error occurred while loading received messages:', error);
            }
        };

        fetchReceivedMessages();
    }, []);

    const handleDelete = async (id) => {
        try {
            await apiNoToken(`http://localhost:8080/api/v1/mentoring/message/received/${id}`, 'DELETE');
            setReceivedMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
        } catch (error) {
            console.error('Error occurred while deleting received message:', error);
        }
    };

    if (!receivedMessages || receivedMessages.length === 0) {
        return (
            <Typography variant="h6" gutterBottom>
                받은 쪽지가 없습니다
            </Typography>
        );
    }

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                받은 쪽지함
            </Typography>
            <List>
                {receivedMessages.map((message) => (
                    <ListItem key={message.id}>
                        <ListItemText
                            primary={message.message}
                            secondary={`보낸이: ${message.senderNickname}, 시간: ${message.sentAt}`}
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

export default MessageInbox;