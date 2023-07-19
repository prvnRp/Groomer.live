import '../App.css';
import React from 'react';

function Services({ services, setServices, isReadOnly, serviceCount, setServiceCount }) {

    const handleAddService = () => {
        const newService = {
            serviceName: '',
            discountedPrice: '',
            originalPrice: '',
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
                                    value={service.serviceName}
                                    size="9"
                                    placeholder='Service name'
                                    onChange={(event) =>
                                        handleServiceChange(event, index, 'serviceName')
                                    }
                                    readOnly={isReadOnly}
                                />
                            </label>
                            <label style={{ marginLeft: "10px" }}>
                                Discounted Price:
                                <input style={{ marginLeft: "40px" }}
                                    type="text"
                                    value={service.discountedPrice}
                                    size="9"
                                    placeholder='Enter price'
                                    onChange={(event) =>
                                        handleServiceChange(event, index, 'discountedPrice')
                                    }
                                    readOnly={isReadOnly}
                                />
                            </label>
                            <label style={{ marginLeft: "10px" }}>
                                Original Price:
                                <input style={{ marginLeft: "40px" }}
                                    type="text"
                                    value={service.originalPrice}
                                    placeholder='Enter price'
                                    size="9"
                                    onChange={(event) =>
                                        handleServiceChange(event, index, 'originalPrice')
                                    }
                                    readOnly={isReadOnly}
                                />
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