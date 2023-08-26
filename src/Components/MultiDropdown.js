import React, { useState, useEffect, useRef } from 'react';

const MultiDropdown = ({ label, Label, values, options, onChange, width, fontSize }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(values || []);
    const [searchInput, setSearchInput] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const toggleOption = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setSearchInput(inputValue);
    };

    const filteredOptions = options.filter(option => option.toLowerCase().includes(searchInput.toLowerCase()));
    const sortedOptions = [...selectedOptions, ...filteredOptions.filter(option => !selectedOptions.includes(option))];

    return (
        <div className='locationdropdown multiDropdown' ref={dropdownRef}>
            <div style={{ position: "absolute" }}>
                <input
                    style={{ position: "relative", top: "-30px", left: "70px", display: isOpen ? 'block' : 'none', width: "70px", color: "#FFF" }}
                    disabled={!isOpen}
                    type="text"
                    value={searchInput}
                    onChange={handleInputChange}
                    placeholder="Search"
                />
            </div>
            <div className='location-conatiner'>
                {Label && <span style={{ color: "#FFF" }}>{label}:</span>}
                <div className="custom-dropdown" style={{ minWidth: "100px" }}>
                    <div style={{ opacity: isOpen ? '0' : '1' }} className="dropdown-selected">
                        {selectedOptions.length === 0 ? "Select Services" : selectedOptions[0]}
                    </div>
                    {isOpen && (
                        <div style={{ fontSize: fontSize }} className="dropdown-options">
                            {sortedOptions.map((option) => (
                                <label key={option} className="dropdown-option">
                                    <div className="checkbox-group">
                                        <label style={{ paddingLeft: "20px" }} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                value={option}
                                                checked={selectedOptions.includes(option)}
                                                onChange={() => toggleOption(option)}
                                            />
                                            <span className="checkbox-custom"></span>
                                            {option}
                                        </label>
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
                <span style={{ marginLeft: "5px" }} onClick={() => setIsOpen(!isOpen)}>
                    <i className={isOpen ? 'arrow down' : 'arrow up'}></i>
                </span>
            </div>
        </div>
    );
};

export default MultiDropdown;
