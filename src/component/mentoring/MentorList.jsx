import React, { useState, useEffect } from 'react';
import { Avatar, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, Chip, Button } from "@mui/material";
import { red, grey } from "@mui/material/colors";
import { apiNoToken } from "../../network/api";
import MessageSendMentor from './MessageSendMentor';
import FaceIcon from '@mui/icons-material/Face';
import MentoringChip from '../common/MentoringChip';

const MentorList = () => {
    const [mentors, setMentors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await apiNoToken("/api/v1/mentoring/mentors", "GET")
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
            <div>
                <Stack direction="row" spacing={1}>
                    <Chip icon={<FaceIcon />} label="나의 멘토" />
                </Stack>
                <TableContainer>
                    <Table style={{ border: `2px solid ${grey[300]}`, borderRadius: '8px' }}>
                        <TableHead style={{ backgroundColor: grey[200] }}>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Profile</TableCell>
                                <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>NickName</TableCell>
                                <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Status</TableCell>
                                <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>message</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: 'center', fontSize: '20px' }}>
                                    <Typography variant="h6">멘토 요청을 해보세요!</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        );
    }
    const handleSend = async (mentorId) => {

    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = mentors.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(mentors.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Stack direction="row" spacing={1}>
                <Chip icon={<FaceIcon />} label="나의 멘토" />

            </Stack>
            <TableContainer>

                <Table style={{ border: `2px solid ${grey[300]}`, borderRadius: '8px' }}>
                    <TableHead style={{ backgroundColor: grey[200] }}>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Profile</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>NickName</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>message</TableCell>
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
                                    {mentor.status === 'BLOCKED' && '차단'}
                                </TableCell>
                                <TableCell>
                                    {mentor.status === 'ACCEPTED' && (
                                        <MessageSendMentor receiverNickname={mentor.nickname} mentorId={mentor.id} onSend={handleSend} />
                                    )}

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                {pageNumbers.map((number) => (
                    <Button key={number} onClick={() => handlePageClick(number)} style={{ margin: '5px', fontSize: '15px', color: 'black' }}>
                        {number}
                    </Button>
                ))}
            </div>
        </div >
    );
};

export default MentorList;