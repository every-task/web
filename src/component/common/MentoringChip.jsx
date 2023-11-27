import React, { useEffect, useState } from 'react';
import { Avatar, Chip, Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { apiNoToken } from '../../network/api';


const MentoringChip = ({ memberId, mentors, member, status, onRequest }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleRequest = async () => {
        try {
            const response = await apiNoToken('http://localhost:8080/api/v1/mentoring/request', 'POST', {
                mentorId: memberId,
            });
            if (response.data === "PENDING") {
                setErrorMessage('이미 멘토링 요청중입니다.');
            } else if (response.data === "ACCEPTED") {
                setErrorMessage('이미 당신의 멘토입니다.');
            } else if (response.data === "REJECTED") {
                setErrorMessage('멘토링 거절이력이 있습니다.');
            } else if (response.data === "BLOCKED") {
                setErrorMessage('멘토링 요청 불가합니다.');
            } else {
                console.log(`Mentoring Request: ${memberId}`);
                onRequest(memberId);
            }
        } catch (error) {
            console.error('Error occurred during mentoring request:', error);
        } finally {
            handleMenuClose();
        }

    };

    const handleMenuOpen = (event) => {
        setMenuOpen(true);
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuOpen(false);
    };

    const memberStatus = member && member.status;


    return (
        <>

            <IconButton onClick={handleMenuOpen} size="small">
                <MoreVertIcon />
            </IconButton>

            <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
                <MenuItem onClick={handleRequest} mentorId={memberId}>
                    {memberStatus === 'PENDING' && (
                        alert("이미 멘토링 요청을 하였습니다.")
                    )}
                    {memberStatus === 'REJECTED' && (
                        alert("해당 멘토에게 거절 이력이 있습니다.")
                    )}
                    <span>멘토링 신청</span>
                </MenuItem>
                {errorMessage && (
                    <div style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</div>
                )}
            </Menu>

        </>
    );
};

export default MentoringChip;