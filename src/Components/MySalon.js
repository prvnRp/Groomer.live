import React, { useState, useEffect } from 'react';
import '../App.css';
import LeftNav from './LeftNav';
import '../styles/mySalon.css';
import BottomNav from './BottomNav';
import Display from './Display';
import Popup from 'reactjs-popup';

function MySalon() {
    const data = ['Slot 1', 'Slot 2'];
    const [mainToggle, setMainToggle] = useState(false);
    const [toggleStatuses, setToggleStatuses] = useState(data.map(() => mainToggle));

    useEffect(() => {
    if (toggleStatuses.every((status) => !status)) {
        setMainToggle(false);
    }
    }, [toggleStatuses]);


    const handleToggleDisplay = () => {
        const updatedMainToggle = !mainToggle;
        setMainToggle(updatedMainToggle);
        setToggleStatuses(data.map(() => updatedMainToggle));
    };

    const handleToggleItem = (index) => {
        const updatedToggleStatuses = [...toggleStatuses];
        updatedToggleStatuses[index] = !updatedToggleStatuses[index];
        setToggleStatuses(updatedToggleStatuses);
    };

    return (
        <div className="flex-containerr">
            <LeftNav />
            <div className="containerr">
                <div className="flex22">
                    <table id="mysalontable">
                        <thead>
                            <tr>
                                <th className="salon-name">
                                    <div>Guru salons and franchise</div>
                                </th>
                                <th className="status right">
                                    <div>
                                        <label className="switch">
                                            <Popup
                                                trigger={
                                                    <input
                                                        type="checkbox"
                                                        onChange={handleToggleDisplay}
                                                        checked={mainToggle}
                                                    />
                                                }
                                            >
                                                <Display displayOpen={mainToggle} />
                                            </Popup>
                                            <span className="slider"></span>
                                        </label>
                                        <span
                                            style={{
                                                color: mainToggle
                                                    ? 'rgba(0, 255, 71, 0.80)'
                                                    : 'rgba(255, 33, 33, 0.80)',
                                            }}
                                            className="sepe"
                                        >
                                            {mainToggle ? 'OPEN' : 'CLOSED'}
                                        </span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item}>
                                    <td
                                        className="column1"
                                        style={{
                                            color: mainToggle ? '#FFF' : 'rgba(255, 255, 255, 0.25)',
                                        }}
                                    >
                                        {item}
                                    </td>
                                    <td className="column2 right">
                                        <label className="switch1">
                                            <input
                                                type="checkbox"
                                                checked={toggleStatuses[index]}
                                                disabled={!mainToggle}
                                                onChange={() => handleToggleItem(index)}
                                            />
                                            <span className="slider1"></span>
                                        </label>
                                        <span
                                            style={{
                                                paddingLeft: '20px',
                                                color: mainToggle ? '#FFF' : 'rgba(255, 255, 255, 0.25)',
                                            }}
                                        >
                                            Active
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <BottomNav />
        </div>
    );
}

export default MySalon;
