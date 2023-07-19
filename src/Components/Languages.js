import '../App.css';

function Languages({ selectedLanguages, setSelectedLanguages, isReadOnly }) {

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        const updatedSelectedLanguages = [...selectedLanguages];

        if (updatedSelectedLanguages.includes(selectedLanguage)) {
            updatedSelectedLanguages.splice(updatedSelectedLanguages.indexOf(selectedLanguage), 1);
        } else {
            updatedSelectedLanguages.push(selectedLanguage);
        }

        setSelectedLanguages(updatedSelectedLanguages);
    };

    return (
        <div className="form-group" style={{ display: "flex", flexDirection: "row" }}>
            <label className="label">Languages:</label>
            <div className="languages-container">
                <div className="checkbox-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="telugu"
                            checked={selectedLanguages.includes('telugu')}
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
                            checked={selectedLanguages.includes('hindi')}
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
                            checked={selectedLanguages.includes('english')}
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