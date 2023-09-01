// Allows users to filter and sort card data

import React from 'react';
import '../App.css';
import CustomDropdown from './CustomDropdown';
import MultiDropdown from './MultiDropdown';
import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import { cardData } from './Data';
import Slider from '@mui/material/Slider';

function FilterSortPopup({ close, filterOptions, setFilterOptions }) {
    // Get unique service names from card data
    const uniqueServiceNames = Array.from(
        new Set(
            cardData
                .flatMap(item => item.services)
                .filter(service => service.ServiceName)
                .map(service => service.ServiceName)
        )
    );

    // Handle change in filter options
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            [name]: value,
        }));
    };

    // Handle reset filters button
    const handleResetFilters = () => {
        // Reset filter options
        setFilterOptions({
            distance: 'All',
            priceFrom: 0,
            priceTo: 1000,
            ratings: 'All',
            services: 'All',
            sort: 'None',
            sortOrder: 'asc',
            combos: false,
            time: '9:00 AM',
            selectedDate: '',
        });
    };

    const handleDateChange = (selectedDate) => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            selectedDate: selectedDate, // Modify 'selectedDate' with the appropriate property name
        }));
    };

    // Handle change in sort option
    const handleSortChange = (e) => {
        const { value } = e.target;
        const newSort = filterOptions.sort === value ? 'None' : value;
        let defaultSortOrder;
        switch (newSort) {
            case 'distance':
            case 'price':
                defaultSortOrder = 'asc';
                break;
            case 'popularity':
            case 'ratings':
                defaultSortOrder = 'desc';
                break;
            default:
                defaultSortOrder = 'asc';
                break;
        }

        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            sort: newSort,
            sortOrder: defaultSortOrder,
        }));
    };

    // Handle change in sort order
    const handleSortOrderChange = () => {
        // If the current sort order is 'asc', set it to 'desc', and vice versa
        const newSortOrder = filterOptions.sortOrder === 'asc' ? 'desc' : 'asc';
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            sortOrder: newSortOrder,
        }));
    };

    // Handle change in price slider
    const handlePriceSliderChange = (priceFrom, priceTo) => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            priceFrom: priceFrom,
            priceTo: priceTo,
        }));
    };

    // Handle change in distance filter
    const handleDistanceFilterChange = (value) => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            distance: value,
        }));
    };

    // Handle change in service filter
    const handleFilterServiceChange = (value) => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            services: value,
        }));
    };


    const distances = ['All', '0-1 KM', '1-2 KM', '2-3 KM'];

    return (
        <div className='filter-sort-popup'>
            <div className="filter-popup-content">
                <div style={{ position: "absolute", right: "2vw", fontSize: "30px", cursor: "pointer", color: "#FF6548", fontWeight: "bold" }} onClick={close}>&times;</div>

                <div className="filter-section">
                    <p><u>Filter</u></p>
                    <div style={{ display: "flex", flexDirection: "row" }}>Date:
                        <span style={{ marginLeft: "37px" }}>
                            <DatePicker color={"#0F0F0F"} />
                        </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <label style={{ marginRight: "20px" }}>Time:</label>
                        <TimePicker />
                    </div>
                    <div>
                        <CustomDropdown
                            label="Distance"
                            Label={true}
                            value={filterOptions.distance}
                            options={distances}
                            onChange={(value) => handleDistanceFilterChange(value)}
                            searchFilter={false}
                            width={"90px"}
                        />
                    </div>
                    <div>
                        <MultiDropdown
                            label="Services"
                            Label={true}
                            value={filterOptions.service}
                            options={uniqueServiceNames}
                            onChange={(value) => handleFilterServiceChange(value)}
                            searchFilter={true}
                        />
                    </div>
                    <div className='price'>
                        <label style={{ marginRight: "25px" }} htmlFor="priceFrom">Price:</label>
                        <input
                            type="number"
                            id="priceFrom"
                            name="priceFrom"
                            value={filterOptions.priceFrom}
                            onChange={handleFilterChange}
                            placeholder="From"
                        />
                        To
                        <input
                            type="number"
                            id="priceTo"
                            name="priceTo"
                            value={filterOptions.priceTo}
                            onChange={handleFilterChange}
                            placeholder="To"
                        />

                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "15px", alignItems: "center" }}>
                        <small>Min</small>
                        <div style={{ marginTop: '3px', width: "100%" }}>
                            <Slider
                                value={[filterOptions.priceFrom, filterOptions.priceTo]}
                                onChange={(event, newValue) => {
                                    handlePriceSliderChange(newValue[0], newValue[1]);
                                }}
                                valueLabelDisplay='auto'
                                min={0}
                                max={1000}
                                sx={{
                                    color: '#FFF',
                                    '& .MuiSlider-thumb': {
                                        backgroundColor: '#FF6548',
                                    },
                                }}
                            />
                        </div>
                        <small>Max</small>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
                        <label htmlFor="ratings">Ratings:</label>
                        <div>
                            <Rating
                                name="ratings"
                                value={parseFloat(filterOptions.ratings)}
                                precision={0.125}
                                onChange={(event, newValue) => {
                                    handleFilterChange({
                                        target: {
                                            name: 'ratings',
                                            value: newValue.toString(),
                                        },
                                    });
                                }}
                                sx={{ '& .MuiRating-iconFilled': { color: '#fff' } }} emptyIcon={<StarBorderIcon style={{ color: 'white' }} />}
                            />
                        </div>
                    </div>
                </div>
                <div className="sort-section">
                    <p><u>Sort</u></p>
                    <div className="sort-buttons">
                        <button
                            className={`sort-button ${filterOptions.sort === 'distance' ? 'active' : ''}`}
                            onClick={() => handleSortChange({ target: { value: 'distance' } })}
                        >
                            Sort&nbsp;by&nbsp;distance
                        </button>
                        <button
                            className={`sort-button ${filterOptions.sort === 'price' ? 'active' : ''}`}
                            onClick={() => handleSortChange({ target: { value: 'price' } })}
                        >
                            Sort&nbsp;by&nbsp;price
                        </button>
                        <button
                            className={`sort-button ${filterOptions.sort === 'popularity' ? 'active' : ''}`}
                            onClick={() => handleSortChange({ target: { value: 'popularity' } })}
                        >
                            Sort&nbsp;by&nbsp;popularity
                        </button>
                        <button
                            className={`sort-button ${filterOptions.sort === 'ratings' ? 'active' : ''}`}
                            onClick={() => handleSortChange({ target: { value: 'ratings' } })}
                        >
                            Sort&nbsp;by&nbsp;ratings
                        </button>
                    </div>
                    <div>
                        <p><u>Order:</u></p>
                        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                            Low
                            <button className="sort-order" onClick={handleSortOrderChange}>
                                {filterOptions.sortOrder === 'asc' ? (
                                    <>
                                        <EastIcon fontSize="small" />
                                    </>
                                ) : (
                                    <>
                                        <WestIcon fontSize="small" />
                                    </>
                                )}
                            </button>
                            High
                        </div>
                    </div>
                </div>
            </div>
            <div className="actions">
                <button onClick={handleResetFilters}>Reset</button>

            </div>
        </div>
    );
}

export default FilterSortPopup;
