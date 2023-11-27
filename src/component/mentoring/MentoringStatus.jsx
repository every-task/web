import { React, useState } from 'react';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";

import { IconButton } from "@mui/material";
import { apiNoToken } from "../../network/api"
import { async } from 'q';


const MentoringStatus = ({ menteeId, onReject, onAccept, onBlock, status }) => {
    const [isAccepted, setIsAccepted] = useState(false);


    const handleAccept = async (e) => {
        e.preventDefault();
        if (window.confirm("멘토링 요청을 수락하시겠습니까?")) {
            try {
                const response = await apiNoToken("http://localhost:8080/api/v1/mentoring/accept", "POST", { menteeId });
                console.log(`Mentoring acceptance: ${menteeId}`);
                setIsAccepted(true);
                onAccept(menteeId);
            } catch (error) {
                console.error('Error occurred during mentoring acceptance:', error);
            }
        }
    };

    const handleReject = async (e) => {
        e.preventDefault();
        if (window.confirm("멘토링 요청을 거절하시겠습니까?")) {
            try {
                const response = await apiNoToken("http://localhost:8080/api/v1/mentoring/reject", "POST", { menteeId });
                console.log(`Mentoring rejection: ${menteeId}`);
                setIsAccepted(false);
                onReject(menteeId);
            } catch (error) {
                console.error('Error occurred during mentoring rejection:', error);
            }
        }

    };
    const handleBlock = async (e) => {
        e.preventDefault();
        if (window.confirm("멘토링 차단하시겠습니까?")) {
            try {
                const response = await apiNoToken("http://localhost:8080/api/v1/mentoring/block", "POST", { menteeId });
                console.log(`Mentee blocked: ${menteeId}`);
                setIsAccepted(true);
                onBlock(menteeId);
            } catch (error) {
                console.error('Error occurred during mentoring block:', error);
            }
        }
    };

    return (
        <>
            {status === "ACCEPTED" && (
                <IconButton onClick={handleBlock}>
                    <BlockOutlinedIcon />
                </IconButton>
            )}
            {status === "PENDING" && (
                <>
                    <IconButton onClick={handleAccept}>
                        <PersonAddAlt1Icon />
                    </IconButton>
                    <IconButton onClick={handleReject}>
                        <PersonRemoveAlt1Icon />
                    </IconButton>
                </>
            )}
            {status === "REJECTED" && (
                <IconButton onClick={handleAccept}>
                    <PersonAddAlt1Icon />
                </IconButton>
            )}
        </>
    );
}

export default MentoringStatus;