import React, { useState, useEffect, useRef } from 'react';

const LocationDropdown = ({ label, value, options, onChange, searchFilter, width, fontSize }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value || options[0]);
    const [inputValue, setInputValue] = useState('');
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
    const handleSelect = (option) => {
        setSelectedOption(option);
        setInputValue(option);
        onChange(option);
        setIsOpen(false);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setIsOpen(true);
        if (event.target.value === '') {
            setIsOpen(false);
        }
    };

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (selectedOption && filteredOptions.includes(selectedOption)) {
        filteredOptions.splice(filteredOptions.indexOf(selectedOption), 1);
        filteredOptions.unshift(selectedOption);
    }

    const showNotFound = searchFilter && isOpen && filteredOptions.length === 0;

    return (
        <div className='locationdropdown'>
            <div className='location-conatiner' ref={dropdownRef}>
                <span style={{ color: "#FFF", position: "relative", top: "5px" }}>{label}:</span>
                <div className="custom-dropdown">
                    <div
                        className="dropdown-selected"
                    >
                        {/* {selectedOption || "Select Location"} */}
                        {searchFilter && <input
                            // style={{ opacity: isOpen ? '1' : '0' }}
                            // disabled={!isOpen}
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Search"
                            onClick={() => setIsOpen(true)}
                        />}
                    </div>
                    {isOpen && !showNotFound && (
                        <div style={{ fontSize: fontSize }} className="location-options">
                            {filteredOptions.map((option) => (
                                <div
                                    key={option}
                                    className={`dropdown-option ${selectedOption === option ? 'selected' : 'notselected'}`}
                                    onClick={() => handleSelect(option)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                    {showNotFound && (
                        <div className="location-options">
                            <div style={{ textAlign: "center" }} className="dropdown-option notselected">{label} Not Found</div>
                        </div>
                    )}
                </div>
                <span style={{ marginLeft: "5px" }} onClick={() => setIsOpen(!isOpen)}><i className={isOpen ? 'arrow down' : 'arrow up'}></i></span>
            </div>
        </div>
    );
};

export default LocationDropdown;
