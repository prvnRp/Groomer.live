import '../App.css';
import React from 'react';
import Duration from './Duration';

function Services({ SalonServices, services, setServices, isReadOnly, serviceCount, setServiceCount }) {

    const handleAddService = () => {
        const newService = {
            name: '',
            discount: '',
            price: '',
            duration: '',
        };
        setServices([...services, newService]);
        setServiceCount(serviceCount + 1)
    };

    const handleServiceChange = (event, index, field) => {
        const updatedServices = [...services];
        updatedServices[index][field] = event.target.value;
        setServices(updatedServices);
    };

    const handleDeleteService = (index) => {
        const updatedServices = [...services];
        updatedServices.splice(index, 1);
        setServices(updatedServices);
        setServiceCount(serviceCount - 1)
    };
    console.log(services, "kieoknl");

    return (
        <>
            <div className="form-group" style={{ display: "flex", flexDirection: "row" }}>
                <label className="label">Services & Prices:</label>
                <div className='input'>
                    {services.map((service, index) => (
                        <div key={index} className="service-item">
                            <label>
                                Service {index + 1}:
                                <input style={{ marginLeft: "40px", paddingLeft: "8px", paddingRight: "8px" }}
                                    type="text"
                                    value={service.name}
                                    size="9"
                                    placeholder='Service name'
                                    onChange={(event) =>
                                        handleServiceChange(event, index, 'name')
                                    }
                                    readOnly={isReadOnly}
                                />
                            </label>
                            <label style={{ marginLeft: "10px" }}>
                                Original Price:
                                <input style={{ marginLeft: "40px" }}
                                    type="text"
                                    value={service.price}
                                    placeholder='Enter price'
                                    size="9"
                                    onChange={(event) =>
                                        handleServiceChange(event, index, 'price')
                                    }
                                    readOnly={isReadOnly}
                                />
                            </label>
                            <label style={{ marginLeft: "10px" }}>
                                Discounted Price:
                                <input style={{ marginLeft: "40px" }}
                                    type="text"
                                    value={service.discount}
                                    size="9"
                                    placeholder='Enter price'
                                    onChange={(event) =>
                                        handleServiceChange(event, index, 'discount')
                                    }
                                    readOnly={isReadOnly}
                                />
                            </label>
                            <label style={{ marginLeft: "10px", display: "flex", flexDirection: "row" }}>
                                Duration: <span style={{ marginLeft: "20px" }}><Duration value={service.duration} index={index} setServices={setServices} isCombos={false} /></span>
                            </label>
                            {!isReadOnly && <button className="delete-button" type="button" onClick={() => handleDeleteService(index)}>
                                &times;
                            </button>}
                        </div>
                    ))}

                </div>
            </div>
            <div style={{ textAlign: "center" }}>
                <button type="button" onClick={handleAddService} disabled={isReadOnly}>
                    ADD SERVICE
                </button>
            </div>
        </>
    );
}

export default Services;