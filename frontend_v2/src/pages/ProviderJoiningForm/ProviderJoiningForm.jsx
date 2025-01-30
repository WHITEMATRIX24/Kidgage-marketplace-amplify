import React, { useState } from 'react'
import '../ProviderJoiningForm/ProviderJoining.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router';

function ProviderJoiningForm() {
    const [formData, setFormData] = useState({
        academyName: '',
        academyBio: '',
        academyPhoneNo:"",
        academyEmail:"",
        academyWebsite:"",
        academyInstaId:"",
        academyLocation:"",
        academyAddress:"",
        academyCRNo:"",
        fullName:"",
        designation:"",
        acceptedTerms: false,
        academyFile:""
    });

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
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.academyName || formData.academyBio || formData.academyEmail || formData.academyPhoneNo || formData.academyAddress || formData.academyLocation || formData.academyCRNo || formData.academyFile || formData.fullName || formData.designation){
            if (formData.acceptedTerms ) {
            alert('Form submitted successfully!');
            console.log(formData);
            
            // You can further handle form submission here (e.g., sending data to an API)
        } else {
            alert('Please accept the terms and conditions.');
        }}
        else{
            alert('Please Fill the form Completely')
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
                                placeholder="Academy Name (As per Company Registration) "
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
                                        placeholder="+91 8726 6254 74" // Placeholder inside the input field
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
                                        placeholder="Enter website" // Placeholder inside the input field
                                    />
                                </div>

                            </div>
                            <div className="col-md-5 ps-0 pStart">
                                <div className="input-container ">
                                    <label className='providerJoiningLabel' htmlFor="academyInstaId">Instagram ID (Optional)</label>
                                    <input
                                        className='providerJoiningInput'
                                        type="text"
                                        id="academyInstaId"
                                        name="academyInstaId"
                                        value={formData.academyInstaId}
                                        onChange={handleChange}
                                        placeholder="Enter website" // Placeholder inside the input field
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="input-container">
                            <label className='providerJoiningLabel' htmlFor="academyLocation">Location</label>
                            <button className='ProviderJoiningDownArrow'><FontAwesomeIcon icon={faArrowDown} /></button>
                            <input
                                className='providerJoiningInput'
                                type="text"
                                id="academyLocation"
                                name="academyLocation"
                                value={formData.academyLocation}
                                onChange={handleChange}
                                required
                                placeholder="Academy Location " // Placeholder inside the input field
                            />
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
                                    <label className='providerJoiningFileLabel' htmlFor="academyFile">CR Doc[file size upto 1MB in pdf format]</label>
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
                        <div className="row w-100 p-2 p-lg-0 buttonDiv d-flex align-items-center justify-content-center" >
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
                                    
                                    <Link className='termsText' to={'privacy-policy'}>View Privacy Policy</Link>
                                </div>
                            </div>
                            <div className="col-md-5 px-0 d-flex " style={{height:'60px'}}>
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
