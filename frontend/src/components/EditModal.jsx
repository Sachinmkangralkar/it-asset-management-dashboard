import React, { useState } from 'react';

const EditModal = ({ asset, collectionName, onClose, onAssetUpdated }) => {
    const [formData, setFormData] = useState(asset);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const token = localStorage.getItem('token');
            const { _id, __v, ...updateData } = formData;
            const response = await fetch(`http://localhost:4000/api/assets/${collectionName}/${asset._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify(updateData),
            });
            if (!response.ok) throw new Error('Failed to update asset');
            onAssetUpdated();
            onClose();
        } catch (err) { setError(err.message); }
    };

    const modalOverlay_Style = {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
    };
    const modalContent_Style = {
        backgroundColor: 'white', padding: '2rem', borderRadius: '16px',
        width: '100%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto'
    };
    const input_Style = { width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #E0E0E0', borderRadius: '6px', boxSizing: 'border-box' };
    const button_Style = { padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#2C4B84', color: 'white' };

    return (
        <div style={modalOverlay_Style} onClick={onClose}>
            <div style={modalContent_Style} onClick={e => e.stopPropagation()}>
                <h2 style={{ color: '#2C4B84', marginBottom: '1.5rem' }}>Edit Asset</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxHeight: '60vh', overflowY: 'auto', padding: '0 1rem' }}>
                        {Object.keys(formData).map(key => {
                            if (key === '_id' || key === '__v') return null;
                            return (
                                <div key={key}>
                                    <label>{key}</label>
                                    <input type="text" name={key} value={formData[key] || ''} onChange={handleChange} style={input_Style} />
                                </div>
                            );
                        })}
                    </div>
                    {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={onClose} style={{...button_Style, backgroundColor: '#E0E0E0', color: 'black'}}>Cancel</button>
                        <button type="submit" style={button_Style}>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default EditModal;