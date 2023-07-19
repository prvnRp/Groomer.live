import '../App.css';

function Combos({ combos, setCombos, isReadOnly, comboCount, setComboCount, comboservicecount, setComboServiceCount }) {

    const handleDeleteCombo = (index) => {
        const updatedCombos = [...combos];
        updatedCombos.splice(index, 1);
        setCombos(updatedCombos);
    };
    const handleAddCombo = () => {
        const newCombo = {
            services: Array.from({ length: comboservicecount }, () => ''),
            price: '',
        };
        setCombos([...combos, newCombo]);
        setComboCount(comboCount + 1);
    };

    const handleServiceChangeCombo = (event, comboIndex, serviceIndex) => {
        const updatedCombos = [...combos];
        updatedCombos[comboIndex].services[serviceIndex] = event.target.value;
        setCombos(updatedCombos);
    };

    const handleComboPriceChange = (event, comboIndex) => {
        const updatedCombos = [...combos];
        updatedCombos[comboIndex].price = event.target.value;
        setCombos(updatedCombos);
    };

    const handleAddServiceCombo = (comboIndex) => {
        const updatedCombos = [...combos];
        updatedCombos[comboIndex].services.push('');
        setCombos(updatedCombos);
        setComboServiceCount(comboservicecount + 1);
    };

    const handleDeleteServiceCombo = (comboIndex, serviceIndex) => {
        const updatedCombos = [...combos];
        updatedCombos[comboIndex].services.splice(serviceIndex, 1);
        setCombos(updatedCombos);
    };

    return (
        <>
            <div className="form-group">
                <label className="label">Combo Services:</label>
                <div className='input'>
                    {combos.map((combo, comboIndex) => (
                        <div key={comboIndex} className='combo' style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "10px" }}>
                            Combo {comboIndex + 1}:
                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", width: "70vw" }}>
                                <span style={{ marginRight: "3vw" }}>Services:</span>
                                <div>
                                    {combo.services.map((service, serviceIndex) => (
                                        // <div key={serviceIndex}>
                                        <label key={serviceIndex} className='combo-service' style={{ marginLeft: "19px", position: "relative" }}>
                                            <input style={{ marginTop: "3px" }}
                                                type="text"
                                                value={service}
                                                placeholder='Service name'
                                                onChange={(event) =>
                                                    handleServiceChangeCombo(event, comboIndex, serviceIndex)
                                                }
                                                readOnly={isReadOnly}
                                            />
                                            {!isReadOnly && (
                                                <button
                                                    className="delete-button"
                                                    type="button"
                                                    onClick={() => handleDeleteServiceCombo(comboIndex, serviceIndex)}
                                                    style={{ position: "absolute", right: "5px", top: "65%", transform: "translateY(-50%)" }}
                                                >
                                                    &times;
                                                </button>
                                            )}
                                        </label>
                                        // </div>
                                    ))}

                                    <button style={{ marginLeft: "19px", marginTop: "3px" }}
                                        type="button"
                                        onClick={() => handleAddServiceCombo(comboIndex)}
                                        disabled={isReadOnly}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label>
                                    <span style={{ marginRight: "2vw" }}>Combo Price:</span>
                                    <input
                                        type="text"
                                        value={combo.price}
                                        onChange={(event) =>
                                            handleComboPriceChange(event, comboIndex)
                                        }
                                        readOnly={isReadOnly}
                                    />
                                </label>
                                {!isReadOnly && <button style={{ position: "relative", top: "4px" }}
                                    className="delete-button"
                                    type="button"
                                    onClick={() => handleDeleteCombo(comboIndex)}
                                >
                                    &times;
                                </button>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <button type="button" onClick={handleAddCombo} disabled={isReadOnly}>
                    ADD COMBO
                </button>
            </div>
        </>
    );
}

export default Combos;