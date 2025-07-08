import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MasterPage from './components/MasterPage';
import InStockPage from './components/InStockPage';
import InUsePage from './components/InUsePage';
import DamagedPage from './components/DamagedPage';
import EWastePage from './components/EWastePage';
import HeadsetPage from './components/HeadsetPage';
import UserManagementPage from './components/UserManagementPage';

export default function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [page, setPage] = useState('dashboard');

    const handleLoginSuccess = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setPage('dashboard');
    };

    const navigate = (newPage) => {
        setPage(newPage);
    };

    const renderPage = () => {
        switch (page) {
            case 'master': return <MasterPage navigate={navigate} />;
            case 'instock': return <InStockPage navigate={navigate} />;
            case 'inuse': return <InUsePage navigate={navigate} />;
            case 'damaged': return <DamagedPage navigate={navigate} />;
            case 'ewaste': return <EWastePage navigate={navigate} />;
            case 'headsets': return <HeadsetPage navigate={navigate} />;
            case 'user_management': return <UserManagementPage navigate={navigate} />;
            case 'dashboard':
            default:
                return <Dashboard navigate={navigate} />;
        }
    };

    const appStyle = {
        fontFamily: "'Inter', sans-serif",
        backgroundColor: '#F1F1F1',
    };

    const mainAppLayoutStyle = {
        display: 'flex',
        height: '100vh', // Full viewport height
        overflow: 'hidden', // Prevent the main container from scrolling
    };

    const sidebarContainerStyle = {
        width: '250px',
        flexShrink: 0, // Prevent sidebar from shrinking
    };

    const mainContentContainerStyle = {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // Prevent this container from scrolling
    };
    
    const headerContainerStyle = {
        height: '73px', // Fixed height for the header
        flexShrink: 0,
    };

    const pageContentStyle = {
        flexGrow: 1,
        overflowY: 'auto', // Allow ONLY this area to scroll if content is too long
        padding: '2rem',
    };

    if (!token) {
        return (
            <div style={appStyle}>
                <LoginPage onLoginSuccess={handleLoginSuccess} />
            </div>
        );
    }
    
    return (
        <div style={appStyle}>
            <div style={mainAppLayoutStyle}>
                <div style={sidebarContainerStyle}>
                    <Sidebar navigate={navigate} activePage={page} />
                </div>
                
                <div style={mainContentContainerStyle}>
                    <div style={headerContainerStyle}>
                        <Header isLoggedIn={!!token} handleLogout={handleLogout} />
                    </div>
                    <main style={pageContentStyle}>
                        {renderPage()}
                    </main>
                </div>
            </div>
        </div>
    );
}
