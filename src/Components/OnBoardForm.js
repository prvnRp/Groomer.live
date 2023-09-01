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
import { useLocation } from 'react-router-dom';

function OnBoardForm(props) {
  const [isReadOnly, setIsReadOnly] = useState(props.isReadOnly);
  const location = useLocation();
  const DataSalon = location.state?.Salondata;
  console.log(location.state?.servicesRev);
  const SalonLocation = DataSalon?.["salon_location"]?.['coordinates'].join(', ');
  console.log(location.state?.Salondata);

  // State to manage form inputs
  const [inputs, setInputs] = useState({
    // Initialize input fields with data from DataSalon or default values
    username: DataSalon?.["salon_username"] || "name",
    password: DataSalon?.["salon_password"] || "***",
    code: DataSalon?.["salon_code"] || "HYD001",
    name: DataSalon?.["salon_name"] || "",
    address: DataSalon?.["salon_address"] || "",
    location: SalonLocation || "",
    franchise: DataSalon?.["salon_franchise"] || false,
    // area: "",
    city: DataSalon?.["salon_city"] || "",
    state: DataSalon?.["salon_state"] || "",
    franchiseSalons: DataSalon?.["salon_franchise_list"] || [''],
    slots_number: parseInt(DataSalon?.["salon_slots"]) || 0,
    opening_time: DataSalon?.["salon_opening_time"] || "09:00 AM",
    closing_time: DataSalon?.["salon_closing_time"] || "06:00 PM",
    lunch_time: DataSalon?.["salon_lunch_time"] || "01:00 PM",
    features: { "wifi": DataSalon?.["salon_features"]?.["feature_wifi"] || false, "parking": DataSalon?.["salon_features"]?.["feature_parking"] || false, "AC": DataSalon?.["salon_features"]?.["feature_AC"] || false },
    languages: { "hindi": DataSalon?.["salon_languages"]?.["language_hindi"] || false, "english": DataSalon?.["salon_languages"]?.["language_english"] || false, "telugu": DataSalon?.["salon_languages"]?.["language_telugu"] || false },
    owner_name: DataSalon?.["salon_owner_name"] || "sumanth vartha",
    owner_mobile: DataSalon?.["salon_owner_mobile"] || "9876543210",
    owner_pancard_number: DataSalon?.["salon_owner_pancard_number"] || "234WERT092",
    bank_name: DataSalon?.["salon_bank_name"] || "##### bak",
    bank_account_number: DataSalon?.["salon_bank_account_number"] || "3221655498746623",
    bank_IFSC_code: DataSalon?.["salon_bank_IFSC_code"] || "IFSC00123",
  });

  console.log(inputs);

  // Other state variables
  const [serviceCount, setServiceCount] = useState(DataSalon?.["salon_services"]?.length || 3);
  const [services, setServices] = useState(location.state?.servicesRev || []);
  const [comboCount, setComboCount] = useState(1);
  const [comboservicecount, setComboServiceCount] = useState(2);
  const [combos, setCombos] = useState(location.state?.combosRev || []);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  console.log(combos, "combos");

  useState(() => {
    if (!DataSalon) {
      const initialServices = Array.from({ length: serviceCount }, () => ({
        name: '',
        discount: '',
        price: '',
        duration: '',
      }));
      setServices(initialServices);
    }
  }, [serviceCount]);

  useState(() => {
    if (!DataSalon) {
      const initialCombos = Array.from({ length: comboCount }, () => ({
        combo_name: `Combo ${comboCount}`,
        services: Array.from({ length: comboservicecount }, () => ''),
        combo_price: '',
        duration: '',
      }));
      setCombos(initialCombos);
    }
  }, [comboCount]);

  // Handle changes in form input fields
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const allFieldsFilled = services.filter(
      (service) =>
        service.name !== '' &&
        service.discount !== '' &&
        service.price !== '' &&
        service.duration !== ''
    );
    setInputs((prevInputs) => {
      return { ...prevInputs, 'features': JSON.stringify(prevInputs.features), 'languages': JSON.stringify(prevInputs.languages) }
    })
    console.log(inputs);

    // Prepare form data for submission
    var formdata = new FormData();
    for (let arr in inputs) {
      formdata.append(arr, inputs[arr]);
    }
    formdata.append('service', JSON.stringify(allFieldsFilled));
    formdata.append('combo_service', JSON.stringify(combos));
    uploadedPhotos.forEach((image, index) => {
      formdata.append(`photos`, image);
    });
    if (DataSalon) {
      formdata.append('uuid', DataSalon['salon_uuid']);
    }
    let headersList = {
      "Accept": "*/*",
      // "Content-Type": "multipart/form-data",
      // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhaGl0aHkiLCJlbWFpbCI6InR1bW1hc2FoaXRoeUBnbWFpbC5jb20iLCJpYXQiOjE2OTMyOTAwMDUsImV4cCI6MTY5Mzg5NDgwNX0.N8TibEMKHDAvix7DGWofyzAVARfd5ucGqhfkeCoSl0s"
    }

    if (DataSalon) {
      let response = await fetch("http://127.0.0.1:8000/admin/salon/update", {
        method: "PATCH",
        body: formdata,
        headers: headersList
      });

      let data = await response.text();
      console.log(data);
    }
    else {
      let response = await fetch("http://127.0.0.1:8000/admin/add-new-salon", {
        method: "POST",
        body: formdata,
        headers: headersList
      });

      let data = await response.text();
      console.log(data);
    }

    console.log(combos.length);

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
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          {/* Render various form components */}
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
          <NumSlots number={inputs.slots_number} inputs={inputs} setInputs={setInputs} handleChange={handleChange} isReadOnly={isReadOnly} />
          <SalonTimings inputs={inputs} setInputs={setInputs} isReadOnly={isReadOnly} />
          <LunchTimings inputs={inputs} setInputs={setInputs} isReadOnly={isReadOnly} />
          <Photos uploadedPhotos={uploadedPhotos} setUploadedPhotos={setUploadedPhotos} isReadOnly={isReadOnly} />
          <Services SalonServices={DataSalon?.["salon_services"]} services={services} setServices={setServices} isReadOnly={isReadOnly} serviceCount={serviceCount} setServiceCount={setServiceCount} />
          <Combos ComboServices={DataSalon?.["salon_combo_services"]} combos={combos} setCombos={setCombos} isReadOnly={isReadOnly} comboCount={comboCount} setComboCount={setComboCount} comboservicecount={comboservicecount} setComboServiceCount={setComboServiceCount} />
          <Features inputs={inputs} setInputs={setInputs} isReadOnly={isReadOnly} />
          <Languages inputs={inputs} setInputs={setInputs} isReadOnly={isReadOnly} />
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