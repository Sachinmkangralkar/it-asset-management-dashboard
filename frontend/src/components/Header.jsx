import React from 'react';

const Header = ({ handleLogout, isLoggedIn }) => {
    const headerStyle = {
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: '1rem 2rem',
        boxSizing: 'border-box',
        borderBottom: '1px solid #E0E0E0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1001,
    };

    const logoContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
    };

    const companyNameStyle = {
        fontSize: '24px',
        fontWeight: '700',
    };
    
    const cirrusStyle = { color: '#2C4B84' };
    const labsStyle = { color: '#D5292B' };
    const subtitleStyle = { color: '#6C727F', fontSize: '11px', marginTop: '-4px' };

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
            <div style={logoContainerStyle}>
                <div style={companyNameStyle}>
                    <span style={cirrusStyle}>cirrus</span><span style={labsStyle}>labs</span>
                </div>
                <div style={subtitleStyle}>IT Asset Management Dashboard</div>
            </div>
            {isLoggedIn && (
                 <div style={buttonContainerStyle}>
                    <button style={helpButtonStyle} onClick={() => alert('Help clicked!')}>Help</button>
                    <button style={logoutButtonStyle} onClick={handleLogout}>Logout</button>
                </div>
            )}
        </header>
    );
};

export default Header;