import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const paginationContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem 0 0 0',
        marginTop: 'auto',
        flexShrink: 0,
    };
    const buttonStyle = (isActive = false) => ({
        border: '1px solid #E0E0E0', padding: '8px 12px', margin: '0 4px',
        cursor: 'pointer', borderRadius: '6px',
        backgroundColor: isActive ? '#2C4B84' : 'white',
        color: isActive ? 'white' : '#2C4B84',
        fontWeight: 'bold', fontFamily: "'Inter', sans-serif",
    });
    const disabledButtonStyle = { ...buttonStyle(), cursor: 'not-allowed', opacity: 0.5 };

    return (
        <div style={paginationContainerStyle}>
            <button style={currentPage === 1 ? disabledButtonStyle : buttonStyle()} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <span style={{ margin: '0 1rem', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>Page {currentPage} of {totalPages}</span>
            <button style={currentPage === totalPages ? disabledButtonStyle : buttonStyle()} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
};
export default Pagination;