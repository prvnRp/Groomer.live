import '../App.css';
import React from 'react';

function NumSlots({ number, inputs, setInputs, handleChange, isReadOnly }) {
    // const [slots_number, setNumSlots] = useState('');

    const handleNumberSlots = (event) => {
        const selectedValue = parseInt(event.target.value, 10);
        if (inputs.slots_number === selectedValue) {
            setInputs((prevState) => ({ ...prevState, slots_number: 0 }));
        }
        else
            setInputs((prevState) => ({ ...prevState, slots_number: selectedValue }));
        document.getElementById('slots_number').value = '';
    }

    return (
        <div className="form-group">
            <label className="label">
                Number of slots:</label>
            <div className='input' style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                <button
                    type="button"
                    value={1}
                    onClick={handleNumberSlots}
                    className={inputs.slots_number === 1 ? 'active' : ''}
                    disabled={isReadOnly}
                >
                    1
                </button>
                <button
                    type="button"
                    value={2}
                    onClick={handleNumberSlots}
                    className={inputs.slots_number === 2 ? 'active' : ''}
                    disabled={isReadOnly}
                >
                    2
                </button>
                <button
                    type="button"
                    value={3}
                    onClick={handleNumberSlots}
                    className={inputs.slots_number === 3 ? 'active' : ''}
                    disabled={isReadOnly}
                >
                    3
                </button>
                <button
                    type="button"
                    value={4}
                    onClick={handleNumberSlots}
                    className={inputs.slots_number === 4 ? 'active' : ''}
                    disabled={isReadOnly}
                >
                    4
                </button>
                <input
                    id="slots_number"
                    type="number"
                    min="5"
                    placeholder='Enter custom number'
                    onChange={(event) => { setInputs((prevState) => ({ ...prevState, slots_number: parseInt(event.target.value) })); }}
                    readOnly={isReadOnly}
                />
            </div>
        </div>
    );
}

export default NumSlots;