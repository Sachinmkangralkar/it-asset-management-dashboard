import React from 'react';
import { jwtDecode } from 'jwt-decode';

const DashboardCard = ({ title, icon, onClick }) => {
    const cardStyle = {
        backgroundColor: '#FFFFFF',
        padding: '1.5rem',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
    };

    const titleStyle = {
        color: '#2C4B84',
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily: "'Inter', sans-serif",
    };
    
    const iconStyle = {
        width: '64px',
        height: '64px',
        objectFit: 'contain',
    };

    return (
        <div 
            style={cardStyle}
            onClick={onClick}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0px)'}
        >
            <img src={icon} alt={`${title} icon`} style={iconStyle} />
            <h3 style={titleStyle}>{title}</h3>
        </div>
    );
};

const Dashboard = ({ navigate }) => {
    const icons = {
        master: 'https://img.icons8.com/ios/100/a9a9a9/clipboard.png',
        inUse: 'https://img.icons8.com/ios/100/a9a9a9/box.png',
        inStock: 'https://img.icons8.com/ios/100/a9a9a9/folder-invoices.png',
        damaged: 'https://img.icons8.com/ios/100/a9a9a9/wrench.png',
        eWaste: 'https://img.icons8.com/ios/100/a9a9a9/trash.png',
        headsets: 'https://img.icons8.com/ios/100/a9a9a9/headphones.png',
        userManagement: 'https://img.icons8.com/ios/100/a9a9a9/admin-settings-male.png',
    };

    let isAdmin = false;
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            isAdmin = decodedToken.user.isAdmin;
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }

    const dashboardContainerStyle = {
        padding: '2rem',
        width: '100%',
        textAlign: 'center',
        fontFamily: "'Inter', sans-serif",
    };

    const mainTitleStyle = {
        color: '#2C4B84',
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '4rem',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2.5rem',
        maxWidth: '900px',
        margin: '0 auto',
    };

    const footerStyle = {
        marginTop: '4rem',
        color: '#6C727F',
        fontSize: '12px',
    };

    return (
        <div style={dashboardContainerStyle}>
            <h1 style={mainTitleStyle}>IT ASSET MANAGEMENT TOOL</h1>
            <div style={gridStyle}>
                <DashboardCard title="Master View" icon={icons.master} onClick={() => navigate('master')} />
                <DashboardCard title="In Use" icon={icons.inUse} onClick={() => navigate('inuse')} />
                <DashboardCard title="In Stock" icon={icons.inStock} onClick={() => navigate('instock')} />
                <DashboardCard title="Damaged" icon={icons.damaged} onClick={() => navigate('damaged')} />
                <DashboardCard title="E-Waste" icon={icons.eWaste} onClick={() => navigate('ewaste')} />
                <DashboardCard title="Headsets" icon={icons.headsets} onClick={() => navigate('headsets')} />
                
                {isAdmin && (
                    <DashboardCard title="User Management" icon={icons.userManagement} onClick={() => navigate('user_management')} />
                )}
            </div>
            <footer style={footerStyle}>
                Last Sync Status / App version
            </footer>
        </div>
    );
};

export default Dashboard;