import React from 'react';

const InfoModal = ({ asset, onClose }) => {
    const modalOverlay_Style = {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
    };
    const modalContent_Style = {
        backgroundColor: 'white', padding: '2rem', borderRadius: '16px',
        width: '100%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto'
    };
    const detailRow_Style = {
        display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem',
        padding: '8px 0', borderBottom: '1px solid #F0F0F0'
    };
    const key_Style = { fontWeight: 'bold', color: '#2C4B84' };

    return (
        <div style={modalOverlay_Style} onClick={onClose}>
            <div style={modalContent_Style} onClick={e => e.stopPropagation()}>
                <h2 style={{ color: '#2C4B84', marginBottom: '1.5rem' }}>Asset Details</h2>
                <div>
                    {Object.entries(asset).map(([key, value]) => {
                        if (key === '_id' || key === '__v') return null;
                        return (
                            <div key={key} style={detailRow_Style}>
                                <span style={key_Style}>{key}:</span>
                                <span>{String(value)}</span>
                            </div>
                        );
                    })}
                </div>
                <button onClick={onClose} style={{ marginTop: '2rem', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#E0E0E0', color: 'black' }}>Close</button>
            </div>
        </div>
    );
};
export default InfoModal;