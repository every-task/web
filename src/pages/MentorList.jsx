import React, { useState, useEffect } from 'react';
import { Avatar, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { apiNoToken } from "../network/api";
import MessageReceiver from '../component/mentoring/MessageReceiver';

const MentorList = () => {
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await apiNoToken("http://localhost:8080/api/v1/mentoring/mentors", "GET")
                console.log('response:', response.status);

                const data = response.data
                console.log('response data:', data);
                setMentors(data);
            } catch (error) {
                console.error('Error occurred while loading mentor data:', error);
            }
        };

        fetchMentors();
    }, []);

    if (!mentors || mentors.length === 0) {
        return (
            <Typography variant="h6" gutterBottom>
                멘토가 없습니다
            </Typography>
        );
    }
    const handleSend = async (menteeId) => {

    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                나의 멘토 리스트
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>프로필 이미지</TableCell>
                            <TableCell>닉네임</TableCell>
                            <TableCell>상태</TableCell>
                            <TableCell>쪽지 보내기</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mentors.map((mentor) => (
                            <TableRow key={mentor.id}>
                                <TableCell>
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
                                        <img src={mentor.profileImageUrl} alt="프로필" style={{ width: '100%', height: 'auto' }} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{mentor.nickname}</TableCell>
                                <TableCell>
                                    {mentor.status === 'PENDING' && '요청중'}
                                    {mentor.status === 'ACCEPTED' && '수락'}
                                    {mentor.status === 'REJECTED' && '거절'}
                                </TableCell>
                                <TableCell>
                                    {mentor.status === 'ACCEPTED' && (
                                        <MessageReceiver status={mentor.status} mentorId={mentor.id} onSend={handleSend} />
                                    )}

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MentorList;