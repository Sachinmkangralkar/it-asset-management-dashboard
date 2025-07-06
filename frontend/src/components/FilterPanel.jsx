import React from 'react';

const FilterPanel = ({ filters, filterOptions, onFilterChange, onClearFilters }) => {
    const panelStyle = {
        padding: '1rem',
        backgroundColor: '#FAFAFA',
        borderRadius: '8px',
        marginBottom: '1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        alignItems: 'end',
    };

    const selectStyle = {
        width: '100%',
        padding: '8px',
        marginTop: '4px',
        borderRadius: '6px',
        border: '1px solid #E0E0E0',
        fontFamily: "'Inter', sans-serif",
    };

    const labelStyle = {
        fontWeight: 'bold',
        color: '#2C4B84',
        fontSize: '12px',
    };

    const buttonStyle = {
        background: '#E0E0E0',
        color: 'black',
        border: 'none',
        borderRadius: '6px',
        padding: '8px',
        cursor: 'pointer',
        height: '36px', // Match select height
        fontFamily: "'Inter', sans-serif",
        fontWeight: 'bold',
    };

    return (
        <div style={panelStyle}>
            {Object.keys(filters).map(key => (
                <div key={key}>
                    <label style={labelStyle}>{key}</label>
                    <select name={key} value={filters[key]} onChange={onFilterChange} style={selectStyle}>
                        <option value="">All</option>
                        {filterOptions[key] && filterOptions[key].map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            ))}
            <button onClick={onClearFilters} style={buttonStyle}>Clear Filters</button>
        </div>
    );
};

export default FilterPanel;