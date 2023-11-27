import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Chip } from "@mui/material";
import { red, grey } from "@mui/material/colors";
import MentoringStatus from './MentoringStatus';
import MessageSendMentee from './MessageSendMentee';
import FaceIcon from '@mui/icons-material/Face';
import { apiNoToken } from '../../network/api'

const MenteeList = () => {
    const [mentees, setMentees] = useState([]);
    const nav = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchMentees = async () => {
            try {
                const response = await apiNoToken("/api/v1/mentoring/mentees", "GET");
                console.log('response:', response.status);

                const data = response.data;
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
            <div>
                <Stack direction="row" spacing={1}>
                    <Chip icon={<FaceIcon />} label="나의 멘티" />
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
                                    <Typography variant="h6">멘티를 만들어 보세요!</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        );
    }
    const handleAccept = async (menteeId) => {
        setMentees((prevMentees) =>
            prevMentees.map((mentee) =>
                mentee.id === menteeId ? { ...mentee, status: 'ACCEPTED' } : mentee
            ));
        nav('/mentoring')

    };

    const handleReject = async (menteeId) => {
        setMentees((prevMentees) =>
            prevMentees.map((mentee) =>
                mentee.id === menteeId ? { ...mentee, status: 'REJECTED' } : mentee
            ));
        nav('/mentoring')

    };

    const handleBlock = async (menteeId) => {
        setMentees((prevMentees) =>
            prevMentees.map((mentee) =>
                mentee.id === menteeId ? { ...mentee, status: 'BLOCKED' } : mentee
            ));
        nav('/mentoring')

    };

    const handleSend = async (menteeId) => {

    };


    const indexOfLastItem = currentPage * itemsPerPage;

    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = mentees.slice(indexOfFirstItem, indexOfLastItem);


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(mentees.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Stack direction="row" spacing={1}>
                <Chip icon={<FaceIcon />} label="나의 멘티" />
            </Stack>
            <TableContainer>
                <Table style={{ border: `2px solid ${grey[300]}`, borderRadius: '8px' }}>
                    <TableHead style={{ backgroundColor: grey[200] }}>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Profile</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>NickName</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Status</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>accpet / reject</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>message</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>block</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((mentee) => (
                            <TableRow style={{ borderBottom: `1px solid ${grey[300]}` }} key={mentee.id}>
                                <TableCell>
                                    <Avatar>
                                        <img src={mentee.profileImageUrl} style={{ width: '100%', height: 'auto' }} />
                                    </Avatar>
                                </TableCell>

                                <TableCell style={{ borderBottom: `1px solid ${grey[300]}` }}>{mentee.nickname}</TableCell>
                                <TableCell style={{ borderBottom: `1px solid ${grey[300]}` }}>
                                    {mentee.status === 'PENDING' && '요청중'}
                                    {mentee.status === 'ACCEPTED' && '수락'}
                                    {mentee.status === 'REJECTED' && '거절'}
                                </TableCell>
                                <TableCell style={{ borderBottom: `1px solid ${grey[300]}` }}>
                                    {mentee.status === 'PENDING' && (
                                        <MentoringStatus status={mentee.status} menteeId={mentee.id} onAccept={handleAccept} onReject={handleReject} />
                                    )}
                                    {mentee.status === 'REJECTED' && (
                                        <MentoringStatus status={mentee.status} menteeId={mentee.id} onAccept={handleAccept} />
                                    )}
                                </TableCell>
                                <TableCell style={{ borderBottom: `1px solid ${grey[300]}` }}>
                                    {mentee.status === 'ACCEPTED' && (
                                        <MessageSendMentee receiverNickname={mentee.nickname} menteeId={mentee.id} onSend={handleSend} />
                                    )}
                                </TableCell>
                                <TableCell style={{ borderBottom: `1px solid ${grey[300]}` }}>
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

export default MenteeList;