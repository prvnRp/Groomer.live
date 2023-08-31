import '../App.css';

function Languages({ inputs, setInputs, isReadOnly }) {
    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        const updatedLanguages = {
            ...inputs.languages,
            [selectedLanguage]: !inputs.languages[selectedLanguage]
        };

        setInputs(prevInputs => ({
            ...prevInputs,
            languages: updatedLanguages
        }));
    };
    console.log(inputs.languages, "languages");
    return (
        <div className="form-group" style={{ display: "flex", flexDirection: "row" }}>
            <label className="label">Languages:</label>
            <div className="languages-container">
                <div className="checkbox-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="telugu"
                            checked={inputs.languages['telugu']}
                            onChange={handleLanguageChange}
                            disabled={isReadOnly}
                        />
                        <span className="checkbox-custom"></span>
                        Telugu
                    </label>
                </div>
                <div className="checkbox-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="hindi"
                            checked={inputs.languages['hindi']}
                            onChange={handleLanguageChange}
                            disabled={isReadOnly}
                        />
                        <span className="checkbox-custom"></span>
                        Hindi
                    </label>
                </div>
                <div className="checkbox-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="english"
                            checked={inputs.languages['english']}
                            onChange={handleLanguageChange}
                            disabled={isReadOnly}
                        />
                        <span className="checkbox-custom"></span>
                        English
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Languages;
