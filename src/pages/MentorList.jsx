import React, { useState, useEffect } from 'react';
import { Avatar, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import { apiNoToken } from "../network/api";

const MentorList = ({ onDelete }) => {
    const [mentors, setMentors] = useState([]);


    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await apiNoToken("http://localhost:8080/api/v1/mentoring/mentors", "GET")
                console.log('응답 상태:', response.status);

                const data = response.data
                console.log('가져온 데이터:', data);
                setMentors(data);
            } catch (error) {
                console.error('멘토 데이터를 불러오는 중 에러 발생:', error);
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
                            <TableCell>내역 삭제</TableCell>
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

                                    <IconButton onClick={() => onDelete(mentor.id)}>
                                        <DeleteIcon />
                                    </IconButton>
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