import React from "react";
import Slider from "@mui/material/Slider";

function PriceRange({ handlePriceSliderChange, priceFrom, priceTo }) {
    const [range, setRange] = React.useState([priceFrom, priceTo]);
    function handleChanges(event, newValue) {
        setRange(newValue);
        handlePriceSliderChange(range[0], range[1]);
    }
    return (
        <div style={{ width: "32rem", padding: "20px" }}>
            <Slider value={range} onChange={handleChanges} valueLabelDisplay="auto" />
            The selected range is {range[0]} - {range[1]}
        </div>
    );
}
export default PriceRange;