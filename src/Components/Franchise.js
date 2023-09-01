import '../App.css';
import React, { useState } from 'react';

function Franchise({ inputs, setInputs, isReadOnly }) {
    // Data for salon options (Sample data)
    const Data = [
        { SalonCode: "HYD001", SalonName: "Hairstyles" },
        { SalonCode: "HYD002", SalonName: "Hairstyles" },
        { SalonCode: "HYD003", SalonName: "Hairstyles" },
        { SalonCode: "HYD004", SalonName: "Hairstyles" },
        { SalonCode: "HYD005", SalonName: "Hairstyles" },
        { SalonCode: "HYD006", SalonName: "Hairstyles" },
    ]

    // Styles for the dropdown
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

    // Styles for the open dropdown
    const openDropdownStyles = {
        display: "block",
    };

    // State variables to manage franchise selection, salon search, and dropdown visibility
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Filtered salon options based on search term
    const filteredSalons = Data.filter(
        (salon) => salon.SalonCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to handle franchise selection change
    const handleFranchiseChange = (value) => {
        if (value === false) {
            setInputs((values) => ({ ...values, franchiseSalons: [''] }));
        }
    };

    // Function to handle franchise selection (Yes/No)
    const handleFranchiseChanges = (event) => {
        let value = event.target.value;
        if (value === "yes")
            value = true
        else
            value = false
        console.log(value);
        handleFranchiseChange(value);
        setInputs(values => ({ ...values, 'franchise': value }))
    }

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to handle deletion of a selected salon
    const handleDeleteSalon = (index) => {
        const updatedSalonCodes = [...inputs.franchiseSalons];
        updatedSalonCodes.splice(index, 1);
        setInputs((values) => ({ ...values, franchiseSalons: updatedSalonCodes }));
    };

    // Function to handle changes in salon input
    const handleSalonInputChange = (event, index) => {
        const updatedFranchiseSalons = [...inputs.franchiseSalons];
        updatedFranchiseSalons[index] = event.target.value;
        setInputs((values) => ({ ...values, franchiseSalons: updatedFranchiseSalons }));
    };

    // Function to handle salon selection/deselection
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
                Franchise salon:
            </label>
            {/* Buttons for franchise selection (Yes/No) */}
            <div className='input1'>
                <button style={{ marginRight: "20px" }}
                    type="button" name="franchise" value="yes"
                    onClick={handleFranchiseChanges}
                    className={inputs.franchise === true ? 'active' : ''}
                    disabled={isReadOnly}
                >
                    Yes
                </button>
                <button
                    type="button" name="franchise" value="no"
                    onClick={handleFranchiseChanges}
                    className={inputs.franchise === false ? 'active' : ''}
                    disabled={isReadOnly}
                >
                    No
                </button>
                {/* Dropdown for selecting franchise salons */}
                {inputs.franchise === true && <div style={{ float: "right" }}>
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
                {inputs.franchise === true && inputs.franchiseSalons.map((salonCode, index) => (
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