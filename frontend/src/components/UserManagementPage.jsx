import React, { useState, useEffect } from 'react';
import PageShell from './PageShell';

const DeleteIcon = () => <svg height="16" width="16" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>;

const UserManagementPage = ({ navigate }) => {
    const [users, setUsers] = useState([]);
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Function to fetch all users from the backend
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/api/users', {
                headers: { 'x-auth-token': token },
            });
            if (!response.ok) {
                throw new Error('Could not fetch users. You may not be an admin.');
            }
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // Fetch users when the component loads
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ email: newUserEmail, password: newUserPassword }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.msg || 'Failed to add user');
            }
            setMessage(`Successfully registered user: ${newUserEmail}`);
            setNewUserEmail('');
            setNewUserPassword('');
            fetchUsers(); // Refresh the user list
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (confirm('Are you sure you want to delete this user? This cannot be undone.')) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
                    method: 'DELETE',
                    headers: { 'x-auth-token': token },
                });
                 const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.msg || 'Failed to delete user');
                }
                setMessage(data.msg);
                fetchUsers(); // Refresh the user list
            } catch (err) {
                setError(err.message);
            }
        }
    };

    // --- STYLES ---
    const layoutStyle = { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' };
    const formContainerStyle = { padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: '8px' };
    const listContainerStyle = { padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: '8px' };
    const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #E0E0E0', borderRadius: '6px' };
    const buttonStyle = { padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#2C4B84', color: 'white' };

    return (
        <PageShell pageTitle="User Management" navigate={navigate}>
            <div style={layoutStyle}>
                {/* Add User Form */}
                <div style={formContainerStyle}>
                    <h3 style={{ color: '#2C4B84', marginTop: 0 }}>Add New User</h3>
                    <form onSubmit={handleAddUser}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>New User's Email</label>
                            <input type="email" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} style={inputStyle} required />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label>Temporary Password</label>
                            <input type="password" value={newUserPassword} onChange={e => setNewUserPassword(e.target.value)} style={inputStyle} required />
                        </div>
                        <button type="submit" style={buttonStyle}>Add User</button>
                    </form>
                </div>

                {/* Existing Users List */}
                <div style={listContainerStyle}>
                    <h3 style={{ color: '#2C4B84', marginTop: 0 }}>Existing Users</h3>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Email</th>
                                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Admin</th>
                                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{user.email}</td>
                                    <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{user.isAdmin ? 'Yes' : 'No'}</td>
                                    <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                                        <button onClick={() => handleDeleteUser(user._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D5292B' }}>
                                            <DeleteIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </PageShell>
    );
};

export default UserManagementPage;
