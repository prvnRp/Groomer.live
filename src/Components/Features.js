import '../App.css';

function Features({ selectedFeatures, setSelectedFeatures, isReadOnly }) {

    const handleFeatureChange = (event) => {
        const selectedFeature = event.target.value;
        const updatedSelectedFeatures = [...selectedFeatures];

        if (updatedSelectedFeatures.includes(selectedFeature)) {
            updatedSelectedFeatures.splice(updatedSelectedFeatures.indexOf(selectedFeature), 1);
        } else {
            updatedSelectedFeatures.push(selectedFeature);
        }

        setSelectedFeatures(updatedSelectedFeatures);
    };

    return (
        <div className="form-group">
            <label className="label">Features:</label>
            <div className='input'>
                <div className="checkbox-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="wi-fi"
                            checked={selectedFeatures.includes('wi-fi')}
                            onChange={handleFeatureChange}
                            disabled={isReadOnly}
                        />
                        <span className="checkbox-custom"></span>
                        Wi-Fi
                    </label>
                </div>
                <div className="checkbox-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="car-parking"
                            checked={selectedFeatures.includes('car-parking')}
                            onChange={handleFeatureChange}
                            disabled={isReadOnly}
                        />
                        <span className="checkbox-custom"></span>
                        Car Parking
                    </label>
                </div>
                <div className="checkbox-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="ac"
                            checked={selectedFeatures.includes('ac')}
                            onChange={handleFeatureChange}
                            disabled={isReadOnly}
                        />
                        <span className="checkbox-custom"></span>
                        AC
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Features;