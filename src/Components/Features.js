import '../App.css';

function Features({ selectedFeatures, setInputs, setSelectedFeatures, isReadOnly }) {

    const handleFeatureChange = (event) => {
        const selectedFeature = event.target.value;
        console.log(selectedFeature);
        const updatedSelectedFeatures = [...selectedFeatures];

        if (updatedSelectedFeatures.includes(selectedFeature)) {
            updatedSelectedFeatures.splice(updatedSelectedFeatures.indexOf(selectedFeature), 1);
            setInputs(prevInputs => ({
                ...prevInputs,
                features: { ...prevInputs.features, [selectedFeature]: false }
            }));
        } else {
            updatedSelectedFeatures.push(selectedFeature);
            setInputs(prevInputs => ({
                ...prevInputs,
                features: { ...prevInputs.features, [selectedFeature]: true }
            }));
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
                            value="wifi"
                            checked={selectedFeatures.includes('wifi')}
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
                            value="parking"
                            checked={selectedFeatures.includes('parking')}
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
                            value="AC"
                            checked={selectedFeatures.includes('AC')}
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