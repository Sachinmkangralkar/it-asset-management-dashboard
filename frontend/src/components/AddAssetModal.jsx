import React, { useState } from 'react';

const AddAssetModal = ({ collectionName, fields, onClose, onAssetAdded }) => {
    // Create the initial state for the form dynamically from the fields prop
    const initialFormState = fields.reduce((acc, field) => {
        acc[field] = '';
        return acc;
    }, {});
    
    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:4000/api/assets/${collectionName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Failed to add asset');
            }
            onAssetAdded(); // This will trigger a data refetch on the parent page
            onClose(); // Close the modal
        } catch (err) {
            setError(err.message);
        }
    };

    // --- STYLES ---
    const modalOverlay_Style = {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
    };
    const modalContent_Style = {
        backgroundColor: 'white', padding: '2rem', borderRadius: '16px',
        width: '100%', maxWidth: '600px', // Made modal wider
    };
    const input_Style = {
        width: '100%', padding: '10px', marginTop: '5px',
        border: '1px solid #E0E0E0', borderRadius: '6px', boxSizing: 'border-box',
    };
    const button_Style = {
        padding: '10px 20px', border: 'none', borderRadius: '6px',
        cursor: 'pointer', backgroundColor: '#2C4B84', color: 'white',
    };

    return (
        <div style={modalOverlay_Style} onClick={onClose}>
            <div style={modalContent_Style} onClick={e => e.stopPropagation()}>
                <h2 style={{ color: '#2C4B84', marginBottom: '1.5rem' }}>Add New Asset</h2>
                <form onSubmit={handleSubmit}>
                    {/* The form now renders inputs based on the 'fields' prop */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {fields.map(field => (
                            <div key={field}>
                                <label>{field}</label>
                                <input
                                    type="text"
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    style={input_Style}
                                />
                            </div>
                        ))}
                    </div>
                    {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={onClose} style={{...button_Style, backgroundColor: '#E0E0E0', color: 'black'}}>Cancel</button>
                        <button type="submit" style={button_Style}>Add Asset</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAssetModal;