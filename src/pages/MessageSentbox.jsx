import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Typography, Paper, Divider, Box, Chip } from '@mui/material';
import { format } from 'date-fns';
import { apiNoToken } from '../network/api';

const MessageSentbox = () => {
    const [sentMessages, setSentMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 10;
    const totalPages = Math.ceil(sentMessages.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    useEffect(() => {
        const fetchSentMessages = async () => {
            try {
                const response = await apiNoToken('/api/v1/mentoring/message/list-sent', 'GET');
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
            await apiNoToken(`/api/v1/mentoring/message/sent/${id}`, 'DELETE');
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
        <Box>
            <Chip label="보낸 쪽지함" variant="outlined" style={{ marginBottom: '16px', fontSize: '2em', color: 'black' }} />
            <Paper elevation={3} style={{ padding: '16px' }}>
                <List>
                    {sentMessages.slice(startIndex, endIndex).map((message, index) => (
                        <React.Fragment key={message.id}>
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <Typography variant="h6">
                                            <strong>{message.message}</strong>
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                                받는이: {message.receiverNickname}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                시간: {format(new Date(message.sentAt), 'yyyy-MM-dd HH:mm')}
                                            </Typography>
                                        </>
                                    }
                                />
                                <Button onClick={() => handleDelete(message.id)} variant="outlined" color="secondary">
                                    삭제
                                </Button>
                            </ListItem>
                            {index < sentMessages.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
                <div>
                    <Button
                        onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        이전 페이지
                    </Button>
                    <span>{`페이지 ${currentPage} / ${totalPages}`}</span>
                    <Button
                        onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        다음 페이지
                    </Button>
                </div>
            </Paper>
        </Box>
    );
};

export default MessageSentbox;