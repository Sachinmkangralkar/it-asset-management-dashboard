import React, { useState } from 'react';
import PageShell from './PageShell';

const UserManagementPage = ({ navigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleAddUser = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token, // The backend register route is not protected, but it's good practice
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.msg || 'Failed to add user');
            }
            setMessage(`Successfully registered user: ${email}`);
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err.message);
        }
    };

    // --- STYLES ---
    const formContainerStyle = { maxWidth: '500px', margin: '0 auto' };
    const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #E0E0E0', borderRadius: '6px' };
    const buttonStyle = { padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#2C4B84', color: 'white' };

    return (
        <PageShell pageTitle="User Management" navigate={navigate}>
            <div style={formContainerStyle}>
                <h3 style={{ color: '#2C4B84' }}>Add New User</h3>
                <p style={{ fontSize: '14px', color: '#6C727F', marginBottom: '1.5rem' }}>
                    Create a new login account for an IT department member.
                </p>
                <form onSubmit={handleAddUser}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>New User's Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} required />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label>Temporary Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} required />
                    </div>
                    <button type="submit" style={buttonStyle}>Add User</button>
                    {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
                    {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
                </form>
            </div>
        </PageShell>
    );
};

export default UserManagementPage;