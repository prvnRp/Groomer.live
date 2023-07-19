import '../App.css';
import React, { useState } from 'react';

function Franchise({ inputs, setInputs, handleChange, isReadOnly, franchise }) {
    const Data = [
        { SalonCode: "HYD001", SalonName: "Hairstyles" },
        { SalonCode: "HYD002", SalonName: "Hairstyles" },
        { SalonCode: "HYD003", SalonName: "Hairstyles" },
        { SalonCode: "HYD004", SalonName: "Hairstyles" },
        { SalonCode: "HYD005", SalonName: "Hairstyles" },
        { SalonCode: "HYD006", SalonName: "Hairstyles" },
    ]
    const dropdownStyles = {
        position: "absolute",
        marginTop: "5px",
        padding: "20px",
        background: "#323030",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: "1",
        display: "none",
        borderRadius: "20px",
    };

    const openDropdownStyles = {
        display: "block",
    };
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSalons = Data.filter(
        (salon) => salon.SalonCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDeleteSalon = (index) => {
        const updatedSalonCodes = [...inputs.franchiseSalons];
        updatedSalonCodes.splice(index, 1);
        setInputs((values) => ({ ...values, franchiseSalons: updatedSalonCodes }));
    };

    const handleSalonInputChange = (event, index) => {
        const updatedFranchiseSalons = [...inputs.franchiseSalons];
        updatedFranchiseSalons[index] = event.target.value;
        setInputs((values) => ({ ...values, franchiseSalons: updatedFranchiseSalons }));
    };

    const handleSalonSelection = (salonCode) => {
        const isSelected = inputs.franchiseSalons.includes(salonCode);
        let updatedFranchiseSalons = [...inputs.franchiseSalons];

        if (isSelected) {
            updatedFranchiseSalons = updatedFranchiseSalons.filter((code) => code !== salonCode);
        } else {
            const emptyIndex = updatedFranchiseSalons.findIndex((code) => code === '');
            if (emptyIndex !== -1) {
                updatedFranchiseSalons[emptyIndex] = salonCode;
            } else {
                updatedFranchiseSalons.push(salonCode);
            }
        }

        setInputs((values) => ({ ...values, franchiseSalons: updatedFranchiseSalons }));
    };

    return (
        <div className="form-group">
            <label className="label">
                Franchise salon:</label>
            <div className='input1'>
                <button style={{ marginRight: "20px" }}
                    type="button" name="franchise" value="yes"
                    onClick={handleChange}
                    className={franchise === 'yes' ? 'active' : ''}
                    disabled={isReadOnly}
                >
                    Yes
                </button>
                <button
                    type="button" name="franchise" value="no"
                    onClick={handleChange}
                    className={franchise === 'no' ? 'active' : ''}
                    disabled={isReadOnly}
                >
                    No
                </button>
                {franchise === "yes" && <div style={{ float: "right" }}>
                    <div style={{ flex: 1 }}>
                        <button
                            type="button"
                            className="dropdown-button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            ADD SALON
                        </button>
                        <div
                            className="dropdown"
                            style={dropdownOpen ? { ...dropdownStyles, ...openDropdownStyles } : dropdownStyles}
                        >
                            <div className="dropdown-search">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    placeholder="Search salonCode..."
                                />
                            </div>
                            <div className="dropdown-options">
                                {filteredSalons.map((salon) => (
                                    <div
                                        key={salon.SalonCode}
                                        className={`dropdown-option ${inputs.franchiseSalons.includes(salon.SalonCode) ? "selected" : ""}`}
                                        onClick={() => handleSalonSelection(salon.SalonCode)}
                                    >
                                        <div>{salon.SalonCode}</div>
                                        <div>{salon.SalonName}</div>
                                        {inputs.franchiseSalons.includes(salon.SalonCode) && (
                                            <div className="tick-mark">&#10003;</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>}
                {franchise === "yes" && inputs.franchiseSalons.map((salonCode, index) => (
                    <div className='fsalon' key={index} style={{ paddingTop: "10px" }}>
                        <label>
                            {`Salon ${index + 1}`}:
                            <input
                                style={{ marginLeft: "7vw" }}
                                type="text"
                                name="franchiseSalons"
                                value={salonCode || ""}
                                onChange={(event) => handleSalonInputChange(event, index)}
                                readOnly={isReadOnly}
                            />
                            {!isReadOnly && <button className="delete-button" type="button" onClick={() => handleDeleteSalon(index)}>
                                &times;
                            </button>}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Franchise;