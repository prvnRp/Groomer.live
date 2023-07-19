import '../App.css';

function OwnershipDetails({ inputs, setInputs, handleChange, isReadOnly }) {

    return (
        <>
            <div className='form-group'>
                <div className='label' style={{ textDecoration: "underline", fontWeight: "bold", marginBottom: "30px", fontSize: "20px", marginTop: "20px" }}>Ownership details</div>
            </div>
            <div className='ownerdetails'>
                <div className='form-group'>
                    <div className='label'>Owner name:</div>
                    <div className='input'><input
                        type="text"
                        name="ownerName"
                        value={inputs.ownerName || ""}
                        onChange={handleChange}
                        readOnly={isReadOnly}
                    /></div>
                </div>
                <div className='form-group'>
                    <div className='label'>Mobile number:</div>
                    <div className='input'><input
                        type="text"
                        name="mobileNumber"
                        value={inputs.mobileNumber || ""}
                        onChange={handleChange}
                        readOnly={isReadOnly}
                    /></div>
                </div>
                <div className='form-group'>
                    <div className='label'>Bank name:</div>
                    <div className='input'><input
                        type="text"
                        name="bankName"
                        value={inputs.bankName || ""}
                        onChange={handleChange}
                        readOnly={isReadOnly}
                    /></div>
                </div>
                <div className='form-group'>
                    <div className='label'>Account number:</div>
                    <div className='input'><input
                        type="text"
                        name="accountNumber"
                        value={inputs.accountNumber || ""}
                        onChange={handleChange}
                        readOnly={isReadOnly}
                    /></div>
                </div>
                <div className='form-group'>
                    <div className='label'>IFSC code:</div>
                    <div className='input'><input
                        type="text"
                        name="ifscCode"
                        value={inputs.ifscCode || ""}
                        onChange={handleChange}
                        readOnly={isReadOnly}
                    /></div>
                </div>
                <div className='form-group'>
                    <div className='label'>PAN Card number:</div>
                    <div className='input'><input
                        type="text"
                        name="panCardNumber"
                        value={inputs.panCardNumber || ""}
                        onChange={handleChange}
                        readOnly={isReadOnly}
                    /></div>
                </div>
            </div>
        </>
    );
}

export default OwnershipDetails;