/*
================================================================================
File: frontend/src/components/Dashboard.jsx (FINAL LAYOUT FIX)
Role: A professional, non-scrolling dashboard with multiple charts.
Instructions: Replace the entire content of your Dashboard.jsx file with this.
================================================================================
*/
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// A reusable component for the summary cards
const StatCard = ({ title, value, icon, color }) => {
    const cardStyle = {
        backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', display: 'flex',
        alignItems: 'center', gap: '1.5rem',
    };
    const iconContainerStyle = {
        backgroundColor: color, borderRadius: '50%', width: '50px', height: '50px',
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0,
    };
    const textContainerStyle = { textAlign: 'left' };
    const titleStyle = { margin: 0, color: '#6C727F', fontSize: '14px', fontWeight: '500' };
    const valueStyle = { margin: '0', color: '#000929', fontSize: '24px', fontWeight: '700' };

    return (
        <div style={cardStyle}>
            <div style={iconContainerStyle}><img src={icon} alt={title} style={{ width: '24px', height: '24px' }}/></div>
            <div style={textContainerStyle}><h3 style={titleStyle}>{title}</h3><p style={valueStyle}>{value}</p></div>
        </div>
    );
};

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [modelData, setModelData] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                const [statsResponse, modelResponse, departmentResponse] = await Promise.all([
                    fetch('http://localhost:4000/api/stats', { headers: { 'x-auth-token': token } }),
                    fetch('http://localhost:4000/api/stats/group/Model', { headers: { 'x-auth-token': token } }),
                    fetch('http://localhost:4000/api/stats/group/Department', { headers: { 'x-auth-token': token } })
                ]);
                
                if (!statsResponse.ok || !modelResponse.ok || !departmentResponse.ok) {
                    throw new Error('Failed to fetch all dashboard data');
                }

                const statsData = await statsResponse.json();
                const modelData = await modelResponse.json();
                const departmentData = await departmentResponse.json();

                setStats(statsData);
                setModelData(modelData);
                setDepartmentData(departmentData);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);
    
    const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
    const BAR_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#d0ed57'];

    // --- FINALIZED FLEXBOX LAYOUT STYLES ---
    const dashboardPageStyle = {
        width: '100%',
        padding: '2rem',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        // The height of the entire dashboard content area is fixed
        height: 'calc(100vh - 73px)', // 100% viewport height minus header height
        boxSizing: 'border-box',
    };
    
    const statsRowStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
    };

    const chartsRowStyle = {
        flex: 1, // This makes the chart row take up ALL remaining vertical space
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        minHeight: 0, // This is a critical fix for flexbox to prevent overflow
    };
    
    const chartContainerStyle = {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
    };


    if (loading) return <p style={{ padding: '2rem', fontFamily: "'Inter', sans-serif" }}>Loading Dashboard...</p>;

    return (
        <div style={dashboardPageStyle}>
            {/* Top row of stat cards */}
            <div style={statsRowStyle}>
                <StatCard title="Total Assets" value={stats?.totalAssets ?? 0} icon="https://img.icons8.com/fluency-systems-regular/48/ffffff/database.png" color="#0088FE" />
                <StatCard title="Assets Deployed" value={stats?.assetsDeployed ?? 0} icon="https://img.icons8.com/fluency-systems-regular/48/ffffff/share.png" color="#00C49F" />
                <StatCard title="Assets In Stock" value={stats?.assetsInStock ?? 0} icon="https://img.icons8.com/fluency-systems-regular/48/ffffff/box.png" color="#FFBB28" />
                <StatCard title="Assets Damaged" value={stats?.assetsDamaged ?? 0} icon="https://img.icons8.com/fluency-systems-regular/48/ffffff/wrench.png" color="#FF8042" />
            </div>

            {/* Two-column layout for charts */}
            <div style={chartsRowStyle}>
                {/* Left Column: Donut Chart */}
                <div style={chartContainerStyle}>
                    <h3 style={{ margin: '0 0 1rem 0', color: '#2C4B84', textAlign: 'left', flexShrink: 0 }}>Asset Distribution by Model</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={modelData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} fill="#8884d8" paddingAngle={5} dataKey="value" nameKey="name">
                                {modelData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                            <Legend iconSize={10} wrapperStyle={{fontSize: '12px', paddingTop: '20px'}}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Right Column: Bar Chart */}
                <div style={chartContainerStyle}>
                     <h3 style={{ margin: '0 0 1rem 0', color: '#2C4B84', textAlign: 'left', flexShrink: 0 }}>Assets by Department</h3>
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={departmentData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" allowDecimals={false} />
                            <YAxis type="category" dataKey="name" width={80} tick={{fontSize: 12}} />
                            <Tooltip />
                            <Bar dataKey="value" barSize={20}>
                                {departmentData.map((entry, index) => <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />)}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
