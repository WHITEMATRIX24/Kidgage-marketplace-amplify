import React, { useState } from 'react'
import '../ProviderJoiningForm/ProviderJoining.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router';
import axios from 'axios';
import { server_Url } from '../../services/constants.js';
function ProviderJoiningForm() {
    const [formData, setFormData] = useState({
        academyName: '',
        academyBio: '',
        academyPhoneNo: "",
        academyEmail: "",
        academyWebsite: "",
        academyInstaId: "",
        academyLocation: "",
        academyLatitude: "",
        academyLongitude: "",
        academyAddress: "",
        academyCRNo: "",
        fullName: "",
        designation: "",
        acceptedTerms: false,
        academyFile: ""
    });
    const [suggestions, setSuggestions] = useState([]);
    const fetchLocationSuggestions = async (query) => {
        if (!query) return setSuggestions([]);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error("Error fetching location suggestions:", error);
        }
    };

    const handleLocationChange = (e) => {
        const value = e.target.value;
        setFormData((prevData) => ({ ...prevData, academyLocation: value }));
        fetchLocationSuggestions(value);
    };

    const handleLocationSelect = (location) => {
        setFormData((prevData) => ({
            ...prevData,
            academyLocation: location.display_name,
            academyLatitude: location.lat,
            academyLongitude: location.lon
        }));
        setSuggestions([]);
    };
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {


            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0], // Store the file object
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.academyName === "" || formData.academyBio === "" || formData.academyEmail === "" || formData.academyPhoneNo === "" || formData.academyAddress === "" || formData.academyLocation === "" || formData.academyCRNo === "" || formData.academyFile === "" || formData.fullName === "" || formData.designation === "") {
            alert('Please Fill the form Completely')
        }
        else {
            if (formData.acceptedTerms) {
                console.log(formData);
                //handle uploaded content
                //1) create an object for formdata class
                const reqBody = new FormData()
                const locationsArray = [{
                    locationName: formData.academyLocation,
                    latitude: formData.academyLatitude,
                    longitude: formData.academyLongitude
                }];
                reqBody.append("locations", JSON.stringify(locationsArray));

                //2) append method is used to add data to the body
                reqBody.append("username", formData.fullName)
                reqBody.append("email", formData.academyEmail)
                reqBody.append("phoneNumber", formData.academyPhoneNo)
                reqBody.append("fullName", formData.academyName)
                reqBody.append("designation", formData.designation)
                reqBody.append("description", formData.academyBio)
                reqBody.append("website", formData.academyWebsite)
                reqBody.append("instaId", formData.academyInstaId)
                reqBody.append("licenseNo", formData.academyCRNo)
                reqBody.append("address", formData.academyAddress)
                reqBody.append("agreeTerms", formData.acceptedTerms)
                reqBody.append("crFile", formData.academyFile)


                try {
                    const response = await axios.post(`${server_Url}/users/signup`, reqBody, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });

                    console.log(response.data.message);
                    alert(response.data.message)
                }
                catch (err) {
                    console.log(err);
                    alert(err.response.data.message);

                }

            }

            else {
                alert('Please accept the terms and conditions.');
            }
        }

    };
    return (
        <div className='d-flex align-items-center justify-content-center mt-5'>
            <div className='ProviderJoingFormContainer p-2  p-md-5'>
                <h2 className='ProviderJoiningTitle px-3'>Join our provider list, it's free</h2>
                <p className='ProviderJoiningText px-3'>Please note that currently we are onboarding companies registered in Qatar</p>
                <div className='row mt-1 mt-lg-5'>
                    <div className="col-lg-6">
                        <div className="input-container">
                            <label className='providerJoiningLabel' htmlFor="academyName">Academy Name</label>
                            <input
                                className='providerJoiningInput'
                                type="text"
                                id="academyName"
                                name="academyName"
                                value={formData.academyName}
                                onChange={handleChange}
                                required
                                placeholder="Academy Name (As per Company Registration)" // Placeholder inside the input field
                            />
                        </div>
                        <div className="input-container">
                            <textarea
                                className='providerJoiningTextArea'
                                id="academyBio"
                                name="academyBio"
                                rows={7}
                                value={formData.academyBio}
                                onChange={handleChange}
                                required
                                placeholder="About your academy "
                            />
                            <label className='providerJoiningTextAreaLabel' htmlFor="academyBio">Academy Bio</label>
                        </div>
                        <div className="row">
                            <div className="col-md-5 pEnd pe-0">
                                <div className="input-container">
                                    <label className='providerJoiningLabel' htmlFor="academyPhoneNo">Phone number</label>
                                    <input
                                        className='providerJoiningInput'
                                        type="text"
                                        id="academyPhoneNo"
                                        name="academyPhoneNo"
                                        value={formData.academyPhoneNo}
                                        onChange={handleChange}
                                        required
                                        placeholder="+974 025 6254" // Placeholder inside the input field
                                    />
                                </div>
                            </div>
                            <div className="col-md-7 ps-0 pStart">
                                <div className="input-container">
                                    <label className='providerJoiningLabel' htmlFor="academyEmail">Email</label>
                                    <input
                                        className='providerJoiningInput'
                                        type="text"
                                        id="academyEmail"
                                        name="academyEmail"
                                        value={formData.academyEmail}
                                        onChange={handleChange}
                                        required
                                        placeholder="ExEmail@gmail.com" // Placeholder inside the input field
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-7 pe-0 pEnd">
                                <div className="input-container">
                                    <label className='providerJoiningLabel' htmlFor="academyWebsite">Website (Optional)</label>
                                    <input
                                        className='providerJoiningInput'
                                        type="text"
                                        id="academyWebsite"
                                        name="academyWebsite"
                                        value={formData.academyWebsite}
                                        onChange={handleChange}
                                        placeholder="https://www.websitelink.com" // Placeholder inside the input field
                                    />
                                </div>

                            </div>
                            <div className="col-md-5 ps-0 pStart">
                                <div className="input-container ">
                                    <label className='providerJoiningLabel' htmlFor="academyInstaId">Instagram Link(Optional)</label>
                                    <input
                                        className='providerJoiningInput'
                                        type="text"
                                        id="academyInstaId"
                                        name="academyInstaId"
                                        value={formData.academyInstaId}
                                        onChange={handleChange}
                                        placeholder="instagram.com/username" // Placeholder inside the input field
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="input-container">
                            <label className='providerJoiningLabelLocation' htmlFor="academyLocation">Location</label>

                            <input
                                className='providerJoiningInput'
                                type='text'
                                id='academyLocation'
                                name='academyLocation'
                                value={formData.academyLocation}
                                onChange={handleLocationChange}
                                placeholder='Academy Location'
                                required
                            />
                            {suggestions.length > 0 && (
                                <ul className='providerJoiningDropDown'>
                                    {suggestions.slice(0, 5).map((location, index) => (
                                        <li key={index} onClick={() => handleLocationSelect(location)}>
                                            {location.display_name}
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </div>
                        <div className="input-container">
                            <textarea
                                className='providerJoiningTextArea'
                                id="academyAddress"
                                name="academyAddress"
                                value={formData.academyAddress}
                                onChange={handleChange}
                                required
                                rows={3}
                                placeholder="Academy Address (As per Company Registration) "
                            />
                            <label className='providerJoiningTextAreaLabel' htmlFor="academyAddress">Address</label>
                        </div>
                        <div className="row ">
                            <div className="col-md-5 pe-0 pEnd">
                                <div className="input-container">
                                    <label className='providerJoiningLabel' htmlFor="academyCRNo">CR Number</label>
                                    <input
                                        className='providerJoiningInput'
                                        type="text"
                                        id="academyCRNo"
                                        name="academyCRNo"
                                        value={formData.academyCRNo}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter CR Number" // Placeholder inside the input field
                                    />
                                </div>

                            </div>
                            <div className="col-md-7 ps-0 pStart ">
                                <div className="input-container ">
                                    <label className='providerJoiningFileLabel' htmlFor="academyFile">CR Doc[pdf format]</label>
                                    <input
                                        className='providerJoiningInputFile'
                                        type="file"
                                        id="academyFile"
                                        name="academyFile"
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        className='providerJoiningInput'
                                        type="text"
                                        id="academyFile"
                                        name="academyFile"
                                        value={formData.academyFile}
                                        onChange={handleChange}
                                        readOnly
                                        placeholder="ChooseFile" // Placeholder inside the input field
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-7 pe-0 pEnd">
                                <div className="input-container">
                                    <label className='providerJoiningLabel' htmlFor="fullName">Full Name</label>
                                    <input
                                        className='providerJoiningInput'
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Full Name" // Placeholder inside the input field
                                    />
                                </div>

                            </div>
                            <div className="col-md-5 ps-0 pStart ">
                                <div className="input-container ">
                                    <label className='providerJoiningLabel' htmlFor="designation">Designation</label>
                                    <input
                                        className='providerJoiningInput'
                                        type="text"
                                        id="designation"
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleChange}
                                        required
                                        placeholder="Designation" // Placeholder inside the input field
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="row w-100 buttonDiv d-flex align-items-center justify-content-center" >
                            <div className="col-md-7 d-flex align-items-center justify-content-center">
                                <div className="checkbox-container  d-flex align-items-center justify-content-center flex-column">
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            name="acceptedTerms"
                                            checked={formData.acceptedTerms}
                                            onChange={handleChange}
                                        />
                                        <label className='ms-2 termsText' htmlFor="terms">I agree that all provided information is correct for administrators' verification.</label>
                                    </div>

                                    {/* <Link className='termsText' to={'privacy-policy'}>View Privacy Policy</Link> */}
                                </div>
                            </div>
                            <div className="col-md-5 px-0 d-flex " style={{ height: '60px' }}>
                                <button onClick={handleSubmit} className='continueButton mb-1'>Continue</button>
                            </div>

                        </div>


                    </div>

                </div>
            </div>
        </div>
    );

}

export default ProviderJoiningForm
