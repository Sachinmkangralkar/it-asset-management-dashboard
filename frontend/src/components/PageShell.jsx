import React from 'react';

const PageShell = ({ pageTitle, navigate, children }) => {
    const BackArrowIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" style={{height: '24px', width: '24px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
    );

    const pageContainerStyle = {
        width: '100%',
        padding: '2rem',
        fontFamily: "'Inter', sans-serif",
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.5rem',
    };
    
    const backButtonStyle = {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#2C4B84',
    };

    const titleStyle = {
        color: '#2C4B84',
        fontSize: '14px',
        fontWeight: '700',
        marginLeft: '1rem',
    };

    const contentBoxStyle = {
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    };

    return (
        <div style={pageContainerStyle}>
            <div style={headerStyle}>
                <button style={backButtonStyle} onClick={() => navigate('dashboard')}>
                    <BackArrowIcon />
                </button>
                <h1 style={titleStyle}>{pageTitle}</h1>
            </div>
            <div style={contentBoxStyle}>
                {children}
            </div>
        </div>
    );
};

export default PageShell;