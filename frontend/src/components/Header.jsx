import React from 'react';

const Header = ({ isLoggedIn, handleLogout }) => {
    // --- UPDATED HEADER STYLE ---
    const headerStyle = {
        backgroundColor: '#FFFFFF',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        position: 'fixed', // Fix the header to the viewport
        top: 0,
        left: 0,
        zIndex: 1000, // Ensure it stays on top of other content
    };

    const titleContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    };

    const companyNameStyle = {
        fontSize: '22px',
        fontWeight: '700',
    };
    
    const cirrusStyle = {
        color: '#2C4B84',
    };

    const labsStyle = {
        color: '#D5292B',
    };

    const subtitleStyle = {
        color: '#6C727F',
        fontSize: '12px',
        fontWeight: '500',
        marginTop: '-4px',
    };

    const buttonContainerStyle = {
        display: 'flex',
        gap: '1rem',
    };

    const helpButtonStyle = {
        backgroundColor: '#F1F1F1',
        border: '1px solid #D5D5D5',
        borderRadius: '8px',
        padding: '8px 16px',
        color: '#000929',
        fontSize: '12px',
        fontWeight: '700',
        cursor: 'pointer',
    };

    const logoutButtonStyle = {
        ...helpButtonStyle,
        backgroundColor: '#D5292B',
        color: '#FFFFFF',
        border: 'none',
    };

    return (
        <header style={headerStyle}>
            <div style={titleContainerStyle}>
                <div style={companyNameStyle}>
                    <span style={cirrusStyle}>cirrus</span>
                    <span style={labsStyle}>labs</span>
                </div>
                <div style={subtitleStyle}>
                    IT Asset Management Dashboard
                </div>
            </div>
            {isLoggedIn && (
                <div style={buttonContainerStyle}>
                    <button
                        style={helpButtonStyle}
                        onClick={() => alert('Help button clicked!')}
                    >
                        Help
                    </button>
                    <button
                        style={logoutButtonStyle}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;