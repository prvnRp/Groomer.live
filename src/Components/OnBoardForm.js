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
    username: "name",
    password: "***",
    code: "HYD001",
    name: "",
    address: "",
    location: "",
    franchise: false,
    area: "",
    city: "",
    state: "",
    franchiseSalons: [''],
    slots_number: 0,
    opening_time: "09:00 AM",
    closing_time: "06:00 PM",
    lunch_time: "01:00 PM",
    features: { "wifi": false, "parking": false, "AC": false },
    languages: { "hindi": false, "english": false, "telugu": false },
    owner_name: "sumanth vartha",
    owner_mobile: "9876543210",
    owner_pancard_number: "234WERT092",
    bank_name: "##### bak",
    bank_account_number: "3221655498746623",
    bank_IFSC_code: "IFSC00123",
  });

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
      duration: '',
    }));
    setServices(initialServices);
  }, [serviceCount]);

  useState(() => {
    const initialCombos = Array.from({ length: comboCount }, () => ({
      services: Array.from({ length: comboservicecount }, () => ''),
      price: '',
      duration: '',
    }));
    setCombos(initialCombos);
  }, [comboCount]);


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const allFieldsFilled = services.filter(
      (service) =>
        service.serviceName !== '' &&
        service.discountedPrice !== '' &&
        service.originalPrice !== '' &&
        service.duration !== ''
    );
    setInputs(current => ({ ...current, 'services': allFieldsFilled }));
    console.log(allFieldsFilled);
    console.log('Combo Services:');
    combos.forEach((combo, index) => {
      const nonEmptyServices = combo.services.filter((service) => service !== '');
      if (nonEmptyServices.length > 0) {
        const comboWithNonEmptyServices = { ...combo, services: nonEmptyServices };
        console.log(`Combo ${index + 1}:`, comboWithNonEmptyServices);
      }
    });
    // console.log('Selected Features:', selectedFeatures);
    // console.log('Selected Languages:', selectedLanguages);
    console.log(inputs);
    var formdata = new FormData();
    // for (arr of inputs) {
    //   formdata.append(arr[0], arr[1]);
    // }
    for (let i = 0; i < inputs.length; i++) {
      console.log(inputs);
      formdata.append(inputs[i][0], inputs[i][1]);
    }
    console.log(formdata);
    formdata.append("username", "aman89");
    formdata.append("password", "aman123");
    formdata.append("code", "HYD001");
    formdata.append("name", "Modern hair and spa Salon ");

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
                name="code"
                value={inputs.code || ""}
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
                name="name"
                value={inputs.name || ""}
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
            <label className="label">Area:</label>
            <div className='input1'>
              <input style={{ width: "100%" }}
                type="text"
                name="area"
                value={inputs.area || ""}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="label">City:</label>
            <div className='input1'>
              <input style={{ width: "100%" }}
                type="text"
                name="city"
                value={inputs.city || ""}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="label">State:</label>
            <div className='input1'>
              <input style={{ width: "100%" }}
                type="text"
                name="state"
                value={inputs.state || ""}
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
          <Franchise inputs={inputs} setInputs={setInputs} isReadOnly={isReadOnly} />
          <NumSlots inputs={inputs} setInputs={setInputs} handleChange={handleChange} isReadOnly={isReadOnly} />
          <SalonTimings inputs={inputs} setInputs={setInputs} isReadOnly={isReadOnly} />
          <LunchTimings inputs={inputs} setInputs={setInputs} isReadOnly={isReadOnly} />
          <Photos isReadOnly={isReadOnly} />
          <Services services={services} setServices={setServices} isReadOnly={isReadOnly} serviceCount={serviceCount} setServiceCount={setServiceCount} />
          <Combos combos={combos} setCombos={setCombos} isReadOnly={isReadOnly} comboCount={comboCount} setComboCount={setComboCount} comboservicecount={comboservicecount} setComboServiceCount={setComboServiceCount} />
          <Features selectedFeatures={selectedFeatures} setInputs={setInputs} setSelectedFeatures={setSelectedFeatures} isReadOnly={isReadOnly} />
          <Languages selectedLanguages={selectedLanguages} setInputs={setInputs} setSelectedLanguages={setSelectedLanguages} isReadOnly={isReadOnly} />
          <OwnershipDetails inputs={inputs} setInputs={setInputs} handleChange={handleChange} isReadOnly={isReadOnly} />
          {
            props.search &&
            <div className='form-group'>
              <div className='label' style={{ textDecoration: "underline", fontWeight: "bold", marginBottom: "30px", fontSize: "20px", marginTop: "20px" }}>Block Salon:</div>
              <div className='input' style={{ marginTop: "40px", marginBottom: "40px" }}><DatePicker /></div>
            </div>
          }
          <div style={{ textAlign: "center", display: "flex", flexDirection: "row", gap: "80px", justifyContent: "center", alignItems: "center", marginBottom: "10vh" }}>
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