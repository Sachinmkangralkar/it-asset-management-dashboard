import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
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

    const appContainerStyle = {
        backgroundColor: '#F1F1F1',
        fontFamily: "'Inter', sans-serif",
        minHeight: '100vh',
    };
    
    const mainAppLayout = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    };

    // --- UPDATED MAIN CONTENT STYLE ---
    const mainContentStyle = {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '2rem 0',
        paddingTop: '80px', // Add padding to push content below the fixed header
    };

    if (!token) {
        return (
            <div style={appContainerStyle}>
                <LoginPage onLoginSuccess={handleLoginSuccess} />
            </div>
        );
    }
    
    return (
        <div style={mainAppLayout}>
            <Header isLoggedIn={!!token} handleLogout={handleLogout} />
            <main style={mainContentStyle}>
                {renderPage()}
            </main>
        </div>
    );
}
