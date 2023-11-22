import React, { useState, useEffect } from 'react';
import { Avatar, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

import SendIcon from '@mui/icons-material/Send';
import { apiNoToken } from "../network/api";
import MentoringStatus from '../component/mentoring/MentoringStatus';

const MenteeList = ({ }) => {
    const [mentees, setMentees] = useState([]);
    useEffect(() => {
        const fetchMentees = async () => {
            try {
                const response = await apiNoToken("http://localhost:8080/api/v1/mentoring/mentees", "GET")
                console.log('response:', response.status);

                const data = response.data
                console.log('response data:', data);
                setMentees(data);
            } catch (error) {
                console.error('Error occurred while loading mentee data:', error);
            }
        };

        fetchMentees();
    }, []);

    if (!mentees || mentees.length === 0) {
        return (
            <Typography variant="h6" gutterBottom>
                멘티가 없습니다
            </Typography>
        );
    }
    const handleAccept = async (menteeId) => {

    };

    const handleReject = async (menteeId) => {

    };
    const handleBlock = async (menteeId) => {

    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                나의 멘티 리스트
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>프로필 이미지</TableCell>
                            <TableCell>닉네임</TableCell>
                            <TableCell>상태</TableCell>
                            <TableCell>수락/거절</TableCell>
                            <TableCell>쪽지 보내기</TableCell>
                            <TableCell>차단</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mentees.map((mentee) => (
                            <TableRow key={mentee.id}>
                                <TableCell>
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
                                        <img src={mentee.profileImageUrl} alt="프로필" style={{ width: '100%', height: 'auto' }} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{mentee.nickname}</TableCell>
                                <TableCell>
                                    {mentee.status === 'PENDING' && '요청중'}
                                    {mentee.status === 'ACCEPTED' && '수락'}
                                    {mentee.status === 'REJECTED' && '거절'}

                                </TableCell>
                                <TableCell>
                                    {mentee.status === 'PENDING' && (
                                        <MentoringStatus status={mentee.status} menteeId={mentee.id} onAccept={handleAccept} onReject={handleReject} />
                                    )}
                                    {mentee.status === 'REJECTED' && (
                                        <MentoringStatus status={mentee.status} menteeId={mentee.id} onAccept={handleAccept} />
                                    )}
                                </TableCell>

                                <TableCell>
                                    <IconButton>
                                        <SendIcon />
                                    </IconButton>

                                </TableCell>

                                <TableCell>
                                    {mentee.status === 'ACCEPTED' && (
                                        <MentoringStatus status={mentee.status} menteeId={mentee.id} onBlock={handleBlock} />
                                    )}
                                    {mentee.status === 'BLOCKED' && '차단'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MenteeList;