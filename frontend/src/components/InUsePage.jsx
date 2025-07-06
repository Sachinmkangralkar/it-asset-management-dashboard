/*
================================================================================
File: frontend/src/components/InUsePage.jsx
Instructions: This is the complete code for your "In Use" page.
Create this new file in your 'frontend/src/components/' folder.
================================================================================
*/
import React, { useState, useEffect, useMemo } from 'react';
import PageShell from './PageShell';
import AddAssetModal from './AddAssetModal';
import FilterPanel from './FilterPanel';

// Helper icons...
const SearchIcon = () => <svg height="16" width="16" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>;
const FilterIcon = () => <svg height="16" width="16" viewBox="0 0 24 24"><path fill="currentColor" d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></svg>;
const DownloadIcon = () => <svg height="16" width="16" viewBox="0 0 24 24"><path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></svg>;
const AddIcon = () => <svg height="16" width="16" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>;
const DeleteIcon = () => <svg height="16" width="16" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>;

const InUsePage = ({ navigate }) => {
    const collectionName = 'inuse';
    // Define the fields specific to the In Use form
    const modalFields = ['Assignee Name', 'Postion', 'Employee Email', 'Department', 'Model', 'Serial Number', 'Location', 'Status'];
    
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    // Define the filters relevant to this page
    const [filters, setFilters] = useState({ Model: '', Location: '', Department: '' });

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:4000/api/assets/${collectionName}`, { headers: { 'x-auth-token': token } });
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            setAssets(data);
        } catch (err) { setError(err.message); } finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    const filterOptions = useMemo(() => {
        const options = { Model: new Set(), Location: new Set(), Department: new Set() };
        assets.forEach(asset => {
            Object.keys(options).forEach(key => {
                if (asset[key]) options[key].add(asset[key]);
            });
        });
        return { Model: [...options.Model], Location: [...options.Location], Department: [...options.Department] };
    }, [assets]);

    const displayedHeaders = useMemo(() => {
        if (assets.length === 0) return [];
        const allKeys = new Set();
        assets.forEach(asset => Object.keys(asset).forEach(key => {
            if (key !== '_id' && key !== '__v' && key !== '') allKeys.add(key);
        }));
        return Array.from(allKeys);
    }, [assets]);

    const filteredAndSortedAssets = useMemo(() => {
        let processedAssets = [...assets];
        if (searchTerm) {
            processedAssets = processedAssets.filter(asset => Object.values(asset).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase())));
        }
        processedAssets = processedAssets.filter(asset => Object.keys(filters).every(key => filters[key] === '' || asset[key] === filters[key]));
        if (sortConfig.key) {
            processedAssets.sort((a, b) => {
                const valA = String(a[sortConfig.key] || '').toLowerCase();
                const valB = String(b[sortConfig.key] || '').toLowerCase();
                if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return processedAssets;
    }, [assets, searchTerm, sortConfig, filters]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
        setSortConfig({ key, direction });
    };
    
    const handleFilterChange = (e) => setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const clearFilters = () => {
        setFilters({ Model: '', Location: '', Department: '' });
    };

    const handleDelete = async (assetId) => {
        if (confirm('Are you sure you want to delete this asset?')) {
            try {
                const token = localStorage.getItem('token');
                await fetch(`http://localhost:4000/api/assets/${collectionName}/${assetId}`, { method: 'DELETE', headers: { 'x-auth-token': token } });
                fetchData();
            } catch (err) { alert('Failed to delete asset.'); }
        }
    };

    const handleDownload = () => {
        const headers = ["S.No.", ...displayedHeaders];
        const rows = filteredAndSortedAssets.map((asset, index) => {
            const rowData = displayedHeaders.map(header => `"${String(asset[header] || '').replace(/"/g, '""')}"`);
            return [index + 1, ...rowData].join(',');
        });
        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.href) URL.revokeObjectURL(link.href);
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', 'inuse_assets_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <PageShell pageTitle="Assets In Use" navigate={navigate}>
            {isModalOpen && <AddAssetModal collectionName={collectionName} fields={modalFields} onClose={() => setIsModalOpen(false)} onAssetAdded={fetchData} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#FAFAFA', borderRadius: '8px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #E0E0E0', borderRadius: '6px', padding: '8px', flexGrow: 1 }}>
                    <SearchIcon />
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ border: 'none', outline: 'none', width: '100%', backgroundColor: 'transparent', fontFamily: "'Inter', sans-serif" }} />
                </div>
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} style={{ background: 'none', border: '1px solid #E0E0E0', borderRadius: '6px', padding: '8px', cursor: 'pointer', display: 'flex' }}><FilterIcon /></button>
                <button onClick={handleDownload} style={{ background: 'none', border: '1px solid #E0E0E0', borderRadius: '6px', padding: '8px', cursor: 'pointer', display: 'flex' }}><DownloadIcon /></button>
                <button onClick={() => setIsModalOpen(true)} style={{ background: '#2C4B84', color: 'white', border: 'none', borderRadius: '6px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AddIcon /> Add New</button>
            </div>

            {isFilterOpen && <FilterPanel filters={filters} filterOptions={filterOptions} onFilterChange={handleFilterChange} onClearFilters={clearFilters} />}
            
            {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> :
            <div style={{ overflowX: 'auto', width: '100%' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif" }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '12px', borderBottom: '2px solid #E0E0E0', textAlign: 'left', fontWeight: 'bold', color: '#2C4B84' }}>S.No.</th>
                            {displayedHeaders.map(key => <th key={key} onClick={() => requestSort(key)} style={{ padding: '12px', borderBottom: '2px solid #E0E0E0', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', color: '#2C4B84' }}>{key} {sortConfig.key === key ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}</th>)}
                            <th style={{ padding: '12px', borderBottom: '2px solid #E0E0E0', textAlign: 'left', fontWeight: 'bold', color: '#2C4B84' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedAssets.map((asset, index) => (
                            <tr key={asset._id} style={{ borderBottom: '1px solid #F0F0F0' }}>
                                <td style={{ padding: '12px', whiteSpace: 'nowrap', fontSize: '14px' }}>{index + 1}</td>
                                {displayedHeaders.map(key => <td key={key} style={{ padding: '12px', whiteSpace: 'nowrap', fontSize: '14px' }}>{asset[key]}</td>)}
                                <td style={{ padding: '12px' }}><button onClick={() => handleDelete(asset._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D5292B' }}><DeleteIcon /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
        </PageShell>
    );
};
export default InUsePage;
