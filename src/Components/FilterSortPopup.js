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
    const uniqueServiceNames = Array.from(
        new Set(
            cardData
                .flatMap(item => item.services)
                .filter(service => service.ServiceName)
                .map(service => service.ServiceName)
        )
    );
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            [name]: value,
        }));
    };

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
    const handleSortByDistance = () => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            sort: prevOptions.sort === 'distance' ? 'None' : 'distance',
        }));
    };

    const handleSortByRatings = () => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            sort: prevOptions.sort === 'ratings' ? 'None' : 'ratings',
        }));
    };

    const handleSortByPopularity = () => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            sort: prevOptions.sort === 'popularity' ? 'None' : 'popularity',
        }));
    };

    const handleSortByPrice = () => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            sort: prevOptions.sort === 'price' ? 'None' : 'price',
        }));
    };

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

    const handleSortOrderChange = () => {
        // If the current sort order is 'asc', set it to 'desc', and vice versa
        const newSortOrder = filterOptions.sortOrder === 'asc' ? 'desc' : 'asc';
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            sortOrder: newSortOrder,
        }));
    };

    const handlePriceSliderChange = (priceFrom, priceTo) => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            priceFrom: priceFrom,
            priceTo: priceTo,
        }));
    };
    const handleDistanceFilterChange = (value) => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            distance: value,
        }));
    };
    const handleFilterServiceChange = (value) => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            services: value,
        }));
    };

    const handleComboServicesChange = () => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            combos: !(prevOptions.combos), // Update the combos option in filterOptions
        }));
    };
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const distances = ['All', '0-1 KM', '1-2 KM', '2-3 KM'];
    const getTimeHour = () => {
        return filterOptions.time ? filterOptions.time.split(":")[0] : "";
    };

    const getTimeMinute = () => {
        return filterOptions.time ? filterOptions.time.split(":")[1].split(" ")[0] : "";
    };

    const getTimePeriod = () => {
        return filterOptions.time ? filterOptions.time.split(":")[1].split(" ")[1] : "AM";
    };
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
                        {/* <label htmlFor="distance">Distance:</label> */}
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
