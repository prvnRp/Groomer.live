import React, { useState, useEffect, useRef } from 'react';

const LocationDropdown = ({ label, values, options, onChange, searchFilter, width, fontSize }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(values || []);
    const [searchInput, setSearchInput] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                if (selectedOptions.length > 0) {
                    setSearchInput(selectedOptions[0]);
                }
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [selectedOptions]);

    const toggleOption = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const DropdownToggle = () => {
        setIsOpen(!isOpen);
        if (selectedOptions.length > 0) {
            setSearchInput(selectedOptions[0]);
        }
    }

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
        setIsOpen(true);
        if (event.target.value === '') {
            setIsOpen(false);
        }
    };

    const filteredOptions = options.filter(option => option.toLowerCase().includes(searchInput.toLowerCase()));
    // const sortedOptions = [...selectedOptions, ...filteredOptions.filter(option => !selectedOptions.includes(option))];

    const showNotFound = searchFilter && isOpen && filteredOptions.length === 0;

    return (
        <div className='locationdropdown'>
            <div className='location-conatiner' ref={dropdownRef}>
                <span style={{ color: "#FFF" }}>Services:</span>
                <div className="custom-dropdown" style={{ minWidth: "100px" }}>
                    <div
                        className="dropdown-selected"
                    >
                        {searchFilter && <input
                            // style={{ opacity: isOpen ? '1' : '0' }}
                            style={{ backgroundColor: "#2C2C2C", color: "#FFF", position: "relative", top: "-2px" }}
                            // disabled={!isOpen}
                            type="text"
                            value={searchInput}
                            onChange={handleInputChange}
                            placeholder="Search"
                            onClick={() => setIsOpen(true)}
                        />}
                    </div>
                    {isOpen && !showNotFound && (
                        <div style={{ fontSize: fontSize }} className="location-options">
                            {filteredOptions.map((option) => (
                                <label key={option} className="dropdown-option checkbox-group">
                                    <div>
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
                    {showNotFound && (
                        <div className="location-options">
                            <div style={{ textAlign: "center" }} className="dropdown-option notselected">Service Not Found</div>
                        </div>
                    )}
                </div>
                <span style={{ marginLeft: "5px" }} onClick={DropdownToggle}>
                    <i className={isOpen ? 'arrow down' : 'arrow up'}></i>
                </span>
            </div>
        </div >
    );
};

export default LocationDropdown;
