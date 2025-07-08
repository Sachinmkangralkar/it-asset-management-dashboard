import React, { useState, useEffect, useMemo } from 'react';
import PageShell from './PageShell';
import AddAssetModal from './AddAssetModal';
import InfoModal from './InfoModal';
import EditModal from './EditModal';
import Pagination from './Pagination';

const SearchIcon = () => <svg height="16" width="16" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>;
const AddIcon = () => <svg height="16" width="16" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>;
const InfoIcon = () => <svg height="16" width="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>;
const EditIcon = () => <svg height="16" width="16" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>;
const DeleteIcon = () => <svg height="16" width="16" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>;

const MasterPage = ({ navigate }) => {
    const collectionName = 'master';
    const primaryHeaders = ['Assignee Name', 'Model', 'Serial Number', 'Department', 'Status'];
    const addModalFields = ['Assignee Name', 'Postion', 'Employee Email', 'License Type', 'Phone Number', 'Department', 'Model', 'Serial Number', 'Comment', 'Location', 'laptop warrenty and validity', 'Lifespan of laptop', 'Status'];

    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [viewingAsset, setViewingAsset] = useState(null);
    const [editingAsset, setEditingAsset] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchData = async () => {
        if (!loading) setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:4000/api/assets/${collectionName}`, { headers: { 'x-auth-token': token } });
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            setAssets(data);
        } catch (err) { setError(err.message); } finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    const filteredAndSortedAssets = useMemo(() => {
        let sortableAssets = [...assets];
        if (searchTerm) {
            sortableAssets = sortableAssets.filter(asset => Object.values(asset).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase())));
        }
        if (sortConfig.key) {
            sortableAssets.sort((a, b) => {
                const valA = String(a[sortConfig.key] || '').toLowerCase();
                const valB = String(b[sortConfig.key] || '').toLowerCase();
                if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableAssets;
    }, [assets, searchTerm, sortConfig]);

    const totalPages = Math.ceil(filteredAndSortedAssets.length / itemsPerPage);
    const paginatedAssets = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredAndSortedAssets.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, filteredAndSortedAssets]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) setCurrentPage(page);
    };
    
    useEffect(() => { setCurrentPage(1); }, [searchTerm, assets]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
        setSortConfig({ key, direction });
    };

    const handleDelete = async (assetId) => {
        if (confirm('Are you sure?')) {
            try {
                const token = localStorage.getItem('token');
                await fetch(`http://localhost:4000/api/assets/${collectionName}/${assetId}`, { method: 'DELETE', headers: { 'x-auth-token': token } });
                fetchData();
            } catch (err) { alert('Failed to delete asset.'); }
        }
    };

    return (
        <PageShell pageTitle="Master View">
            {isAddModalOpen && <AddAssetModal collectionName={collectionName} fields={addModalFields} onClose={() => setIsAddModalOpen(false)} onAssetAdded={fetchData} />}
            {viewingAsset && <InfoModal asset={viewingAsset} onClose={() => setViewingAsset(null)} />}
            {editingAsset && <EditModal asset={editingAsset} collectionName={collectionName} onClose={() => setEditingAsset(null)} onAssetUpdated={fetchData} />}
            
            <div style={{ flexShrink: 0, paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#FAFAFA', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #E0E0E0', borderRadius: '6px', padding: '8px', flexGrow: 1 }}>
                        <SearchIcon />
                        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ border: 'none', outline: 'none', width: '100%', backgroundColor: 'transparent', fontFamily: "'Inter', sans-serif" }} />
                    </div>
                    <button onClick={() => setIsAddModalOpen(true)} style={{ background: '#2C4B84', color: 'white', border: 'none', borderRadius: '6px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AddIcon /> Add New</button>
                </div>
            </div>
            
            <div style={{ flexGrow: 1, overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif" }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '12px', borderBottom: '2px solid #E0E0E0', textAlign: 'left', fontWeight: 'bold', color: '#2C4B84', position: 'sticky', top: 0, backgroundColor: 'white' }}>S.No.</th>
                            {primaryHeaders.map(key => <th key={key} onClick={() => requestSort(key)} style={{ padding: '12px', borderBottom: '2px solid #E0E0E0', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', color: '#2C4B84', position: 'sticky', top: 0, backgroundColor: 'white' }}>{key} {sortConfig.key === key ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}</th>)}
                            <th style={{ padding: '12px', borderBottom: '2px solid #E0E0E0', textAlign: 'left', fontWeight: 'bold', color: '#2C4B84', position: 'sticky', top: 0, backgroundColor: 'white' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (<tr><td colSpan={primaryHeaders.length + 2}>Loading...</td></tr>) : 
                         error ? (<tr><td colSpan={primaryHeaders.length + 2} style={{color: 'red'}}>{error}</td></tr>) :
                         paginatedAssets.map((asset, index) => (
                            <tr key={asset._id} style={{ borderBottom: '1px solid #F0F0F0' }}>
                                <td style={{ padding: '12px', whiteSpace: 'nowrap', fontSize: '14px' }}>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                                {primaryHeaders.map(key => <td key={key} style={{ padding: '12px', whiteSpace: 'nowrap', fontSize: '14px' }}>{asset[key]}</td>)}
                                <td style={{ padding: '12px', display: 'flex', gap: '1rem' }}>
                                    <button onClick={() => setViewingAsset(asset)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2C4B84' }} title="View Details"><InfoIcon /></button>
                                    <button onClick={() => setEditingAsset(asset)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#00C49F' }} title="Edit Asset"><EditIcon /></button>
                                    <button onClick={() => handleDelete(asset._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D5292B' }} title="Delete Asset"><DeleteIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </PageShell>
    );
};
export default MasterPage;