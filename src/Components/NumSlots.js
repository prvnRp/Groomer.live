import '../App.css';
import React, { useState } from 'react';

function NumSlots({ inputs, handleChange, isReadOnly }) {
    const [numSlots, setNumSlots] = useState('');

    return (
        <div className="form-group">
            <label className="label">
                Number of slots:</label>
            <div className='input' style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                <button
                    type="button"
                    onClick={() => { inputs.numSlots = '1'; document.getElementById('numSlots').value = ''; setNumSlots('1'); }}
                    className={numSlots === '1' ? 'active' : ''}
                    disabled={isReadOnly}
                >
                    1
                </button>
                <button
                    type="button"
                    onClick={() => { inputs.numSlots = '2'; document.getElementById('numSlots').value = ''; setNumSlots('2'); }}
                    className={numSlots === '2' ? 'active' : ''}
                    disabled={isReadOnly}
                >
                    2
                </button>
                <button
                    type="button"
                    onClick={() => { inputs.numSlots = '3'; document.getElementById('numSlots').value = ''; setNumSlots('3'); }}
                    className={numSlots === '3' ? 'active' : ''}
                    disabled={isReadOnly}
                >
                    3
                </button>
                <button
                    type="button"
                    onClick={() => { inputs.numSlots = '4'; document.getElementById('numSlots').value = ''; setNumSlots('4'); }}
                    className={numSlots === '4' ? 'active' : ''}
                    disabled={isReadOnly}
                >
                    4
                </button>
                <input
                    id="numSlots"
                    type="number"
                    min="5"
                    placeholder='Enter custom number'
                    onChange={(event) => { inputs.numSlots = event.target.value; setNumSlots(event.target.value); }}
                    readOnly={isReadOnly}
                />
            </div>
        </div>
    );
}

export default NumSlots;