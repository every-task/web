import React from 'react';
import MentorList from '../component/mentoring/MentorList';
import MenteeList from '../component/mentoring/MenteeList';

const Mentoring = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        justifyContent: 'space-between',
        borderBottom: '2px solid #ccc',
        paddingBottom: '10px'
    };

    return (
        <div style={containerStyle}>
            <MentorList />
            <div style={{ height: '2px', background: '#ccc' }} />
            <MenteeList />
        </div>
    );
};

export default Mentoring;