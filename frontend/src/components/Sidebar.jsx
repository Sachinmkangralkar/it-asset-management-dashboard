import React from 'react';
import { jwtDecode } from 'jwt-decode';

const Sidebar = ({ navigate, activePage }) => {
    // --- STYLES ---
    const sidebarStyle = {
        width: '250px',
        backgroundColor: '#FFFFFF',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        boxSizing: 'border-box',
        borderRight: '1px solid #E0E0E0',
        position: 'fixed',
        top: '73px', // Height of the header
        left: 0,
    };

    const navListStyle = {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    };

    const navItemStyle = (pageName) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        margin: '4px 0',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '500',
        color: activePage === pageName ? 'white' : '#2C4B84',
        backgroundColor: activePage === pageName ? '#2C4B84' : 'transparent',
        transition: 'background-color 0.2s, color 0.2s',
    });
    
    const iconStyle = {
        width: '20px',
        height: '20px',
    };

    // --- NAVIGATION ITEMS with ICONS ---
    const navItems = [
        { name: 'Dashboard', key: 'dashboard', icon: 'https://img.icons8.com/fluency-systems-regular/48/dashboard-layout.png' },
        { name: 'Master View', key: 'master', icon: 'https://img.icons8.com/fluency-systems-regular/48/clipboard.png' },
        { name: 'In Stock', key: 'instock', icon: 'https://img.icons8.com/fluency-systems-regular/48/box.png' },
        { name: 'In Use', key: 'inuse', icon: 'https://img.icons8.com/fluency-systems-regular/48/share.png' },
        { name: 'Damaged', key: 'damaged', icon: 'https://img.icons8.com/fluency-systems-regular/48/wrench.png' },
        { name: 'E-Waste', key: 'ewaste', icon: 'https://img.icons8.com/fluency-systems-regular/48/trash.png' },
        { name: 'Headsets', key: 'headsets', icon: 'https://img.icons8.com/fluency-systems-regular/48/headphones.png' },
    ];
    
    let isAdmin = false;
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            isAdmin = decodedToken.user.isAdmin;
        } catch (error) { console.error("Invalid token:", error); }
    }
    if (isAdmin) {
        navItems.push({ name: 'User Management', key: 'user_management', icon: 'https://img.icons8.com/fluency-systems-regular/48/admin-settings-male.png' });
    }

    return (
        <nav style={sidebarStyle}>
            <ul style={navListStyle}>
                {navItems.map(item => (
                    <li key={item.key} style={navItemStyle(item.key)} onClick={() => navigate(item.key)}>
                        <img src={item.icon} alt="" style={iconStyle} />
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;
