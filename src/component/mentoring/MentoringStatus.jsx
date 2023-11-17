import { React, useState } from 'react';
import { IconButton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { apiNoToken } from "../../network/api"


const MentoringStatus = ({ menteeId, onReject, onAccept }) => {
    const [isAccepted, setIsAccepted] = useState(false);

    const handleAccept = async (e) => {
        e.preventDefault();
        try {
            const response = await apiNoToken("http://localhost:8080/api/v1/mentoring/accept", "POST", { menteeId });
            console.log(`Mentoring acceptance: ${menteeId}`);
            setIsAccepted(true);
            onAccept(menteeId);
        } catch (error) {
            console.error('Error occurred during mentoring acceptance:', error);
        }
    };

    const handleReject = async (e) => {
        e.preventDefault();
        try {
            const response = await apiNoToken("http://localhost:8080/api/v1/mentoring/reject", "POST", { menteeId });
            console.log(`Mentoring rejection: ${menteeId}`);
            setIsAccepted(false);
            onReject(menteeId);
        } catch (error) {
            console.error('Error occurred during mentoring rejection:', error);
        }
    };

    return (
        <>
            <IconButton onClick={handleAccept}>
                <CheckIcon />
            </IconButton>
            <IconButton onClick={handleReject}>
                <ClearIcon />
            </IconButton>
        </>
    );
}

export default MentoringStatus;