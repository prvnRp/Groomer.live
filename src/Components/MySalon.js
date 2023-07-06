import React, { useState } from 'react';
import '../App.css';
import LeftNav from './LeftNav';
import '../styles/mySalon.css';
import BottomNav from './BottomNav';

function MySalon() {
    const data = ['Slot 1', 'Slot 2'];
    const [displayOpen, setDisplayOpen] = useState(false);

    const handleToggleDisplay = () => {
        setDisplayOpen(!displayOpen);
    };
    console.log("Hello");

    return (

        <div className="flex-containerr">
            <LeftNav />
            <div className='containerr'>
                <div className="flex22">
                    <table id="mysalontable">
                        <thead>
                            <tr>
                                <th className='salon-name'><div>Guru salons and franchise</div></th>
                                <th className='status right'>
                                    <div>
                                        <label className="switch">
                                            <input type="checkbox" onChange={handleToggleDisplay} checked={displayOpen} />
                                            <span className="slider"></span>
                                        </label>
                                        <span className='sepe'>{displayOpen ? "OPEN" : "CLOSED"}</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item}>
                                    <td className='column1' style={{ color: displayOpen ? "#FFF" : "rgba(255, 255, 255, 0.25)" }}>{item}</td>
                                    <td className='column2 right'>
                                        <label className="switch1">
                                            <input type="checkbox" disabled={!displayOpen} />
                                            <span className="slider1"></span>
                                        </label>
                                        <span style={{ paddingLeft: "20px", color: displayOpen ? "#FFF" : "rgba(255, 255, 255, 0.25)" }}>Active</span>
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
