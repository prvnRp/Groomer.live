import '../App.css';
import { useState } from "react";
import DatePicker from './DatePicker';
import Logo from './Logo';
import NavBar from './NavBar';
import Logout from './Logout';
import Credentials from './Credentials';
import Franchise from './Franchise';
import SalonTimings from './SalonTimings';
import LunchTimings from './LunchTimings';
import NumSlots from './NumSlots';
import Photos from './Photos';
import Services from './Services';
import Combos from './Combos';
import Features from './Features';
import Languages from './Languages';
import OwnershipDetails from './OwnershipDetails';

function OnBoardForm(props) {
  const [isReadOnly, setIsReadOnly] = useState(props.isReadOnly);

  const [inputs, setInputs] = useState({
    franchiseSalons: [''],
    username: "name",
    password: "***",
    salonCode: "HYD001",
    ownerName: "sumanth vartha",
    mobileNumber: "9876543210",
    bankName: "##### bak",
    accountNumber: "3221655498746623",
    ifscCode: "IFSC00123",
    panCardNumber: "234WERT092",
    openingTimeHour: "10",
    openingTimeMinute: "0",
    openingTimePeriod: "AM",
    closingTimeHour: "6",
    closingTimeMinute: "0",
    closingTimePeriod: "PM",
  });

  const [franchise, setFranchise] = useState('no');
  const [serviceCount, setServiceCount] = useState(3);
  const [services, setServices] = useState([]);
  const [comboCount, setComboCount] = useState(1);
  const [comboservicecount, setComboServiceCount] = useState(2);
  const [combos, setCombos] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  useState(() => {
    const initialServices = Array.from({ length: serviceCount }, () => ({
      serviceName: '',
      discountedPrice: '',
      originalPrice: '',
    }));
    setServices(initialServices);
  }, [serviceCount]);

  useState(() => {
    const initialCombos = Array.from({ length: comboCount }, () => ({
      services: Array.from({ length: comboservicecount }, () => ''),
      price: '',
    }));
    setCombos(initialCombos);
  }, [comboCount]);


  const handleFranchiseChange = (value) => {
    if (value === 'no') {
      setInputs((values) => ({ ...values, franchiseSalons: [''] }));
    }
    setFranchise(value);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'franchise') {
      handleFranchiseChange(value);
    }
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);

    const allFieldsFilled = services.filter(
      (service) =>
        service.serviceName !== '' &&
        service.discountedPrice !== '' &&
        service.originalPrice !== ''
    );
    console.log(allFieldsFilled);
    console.log('Combo Services:');
    combos.forEach((combo, index) => {
      const nonEmptyServices = combo.services.filter((service) => service !== '');
      if (nonEmptyServices.length > 0) {
        const comboWithNonEmptyServices = { ...combo, services: nonEmptyServices };
        console.log(`Combo ${index + 1}:`, comboWithNonEmptyServices);
      }
    });
    console.log('Selected Features:', selectedFeatures);
    console.log('Selected Languages:', selectedLanguages);
    setIsReadOnly(true);

  }

  return (
    <div className='container'>
      {!props.search &&
        <>
          <div>
            <Logo />
            <Logout />
          </div>
          <NavBar />
        </>
      }
      <div>
        <div className='form-group'>
          <div className='label' style={{ textDecoration: "underline", fontWeight: "bold", marginBottom: "30px", fontSize: "20px" }}>Salon details</div>
          {isReadOnly && <button onClick={() => setIsReadOnly(false)} className='label' style={{ textAlign: "center", background: "#FF6548", fontWeight: "bold", marginBottom: "30px", fontSize: "17px" }}>Enable Edit</button>
          }
        </div>
        <form onSubmit={handleSubmit}>
          <Credentials inputs={inputs} handleChange={handleChange} isReadOnly={isReadOnly} />
          <div className="form-group">
            <label className="label">Salon Code:</label>
            <div className="input">
              <input
                type="text"
                name="salonCode"
                value={inputs.salonCode || ""}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="label">Salon Name:</label>
            <div className="input1">
              <input style={{ width: "100%" }}
                type="text"
                name="salonName"
                value={inputs.salonName || ""}
                onChange={handleChange}
                size="50"
                readOnly={isReadOnly}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="label">Salon Address:</label>
            <div className='input1'>
              <textarea style={{ width: "100%" }}
                type="text"
                name="address"
                value={inputs.address || ""}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="label">Location:</label>
            <div className='input1'>
              <input style={{ width: "100%" }}
                type="text"
                name="location"
                value={inputs.location || ""}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
          </div>
          <Franchise inputs={inputs} setInputs={setInputs} handleChange={handleChange} isReadOnly={isReadOnly} franchise={franchise} />
          <NumSlots inputs={inputs} setInputs={setInputs} handleChange={handleChange} isReadOnly={isReadOnly} />
          <SalonTimings inputs={inputs} setInputs={setInputs} isReadOnly={isReadOnly} />
          <LunchTimings inputs={inputs} setInputs={setInputs} isReadOnly={isReadOnly} />
          <Photos isReadOnly={isReadOnly} />
          <Services services={services} setServices={setServices} isReadOnly={isReadOnly} serviceCount={serviceCount} setServiceCount={setServiceCount} />
          <Combos combos={combos} setCombos={setCombos} isReadOnly={isReadOnly} comboCount={comboCount} setComboCount={setComboCount} comboservicecount={comboservicecount} setComboServiceCount={setComboServiceCount} />
          <Features selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures} isReadOnly={isReadOnly} />
          <Languages selectedLanguages={selectedLanguages} setSelectedLanguages={setSelectedLanguages} isReadOnly={isReadOnly} />
          <OwnershipDetails inputs={inputs} setInputs={setInputs} handleChange={handleChange} isReadOnly={isReadOnly} />
          {
            props.search &&
            <div className='form-group'>
              <div className='label' style={{ textDecoration: "underline", fontWeight: "bold", marginBottom: "30px", fontSize: "20px", marginTop: "20px" }}>Block Salon:</div>
              <div className='input' style={{ marginTop: "40px", marginBottom: "40px" }}><DatePicker /></div>
            </div>
          }
          <div style={{ textAlign: "center", display: "flex", flexDirection: "row", gap: "80px", justifyContent: "center", alignItems: "center" }}>
            {!isReadOnly && <button className='submit' type="submit" disabled={isReadOnly} >{!props.search ? "Save" : "Save Changes"}</button>
            }
            {!isReadOnly && props.search &&
              <button style={{ paddingLeft: "50px", paddingRight: "50px", borderRadius: "20px" }} onClick={() => setIsReadOnly(true)}>Cancel Changes</button>
            }
          </div>
        </form >
      </div >
    </div>

  )
}

export default OnBoardForm;