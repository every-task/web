import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { apiNoToken } from '../../network/api'
import SendIcon from '@mui/icons-material/Send';

const MessageSendMentor = ({ receiverNickname, onSend }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setMessage('');
    };

    const handleSend = async () => {
        try {
            await apiNoToken('http://localhost:8080/api/v1/mentoring/message/sendmentor', 'POST', {
                message: message,
                receiverNickname: receiverNickname
            });
            onSend();
            handleClose();
        } catch (error) {
            console.error('Error occurred while sending a message:', error);
        }
    };

    return (
        <div style={{ marginRight: '10px' }}>
            <SendIcon onClick={handleOpen} variant="outlined" color="primary" >
                쪽지 보내기
            </SendIcon>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>쪽지 보내기</DialogTitle>
                <DialogContent style={{ width: '400px' }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="내용"
                        type="text"
                        fullWidth
                        multiline
                        rows={10}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        취소
                    </Button>
                    <Button onClick={handleSend} color="primary">
                        보내기
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
};

export default MessageSendMentor;