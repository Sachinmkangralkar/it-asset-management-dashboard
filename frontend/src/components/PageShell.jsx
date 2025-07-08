import React from 'react';

const PageShell = ({ pageTitle, children }) => {
    const pageContainerStyle = {
        width: '100%',
        height: '100%',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexShrink: 0,
    };
    
    const titleStyle = {
        color: '#2C4B84',
        fontSize: '20px',
        fontWeight: '700',
    };

    const contentBoxStyle = {
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    };
    
    return (
        <div style={pageContainerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>{pageTitle}</h1>
            </div>
            <div style={contentBoxStyle}>
                {children}
            </div>
        </div>
    );
};
export default PageShell;