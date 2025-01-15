import React, { useState } from 'react'
import logo from '../../assets/FootballAcademyIcon.png'
import '../LocationDetails/LocationDetails.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight, faX } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faInstagram, faSquareFacebook, faSquareWhatsapp, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function LocationDetails() {
  const [isLocationDetailsOpen, setIsLocationDetailsOpen] = useState(false);
  // Function to open the popup
  const openLocationDetailsPopup = () => {
    setIsLocationDetailsOpen(true);
  };

  // Function to close the popup
  const closeLocationDetailsPopup = () => {
    setIsLocationDetailsOpen(false);
  };
  return (
    <div>
      <div className='d-flex align-items-centre' onClick={openLocationDetailsPopup}>
        <button className='border-0 text-start py-2  w-100 map-btn' >Map View</button>
        <FontAwesomeIcon className='fs-5 map-arrow' icon={faArrowRight} style={{ marginLeft: '-31px', color: '#ffff' }} />
      </div>

      {/* Conditional rendering of the popup */}
      {isLocationDetailsOpen && (
        <div className="row w-100 mapPopup">
          <div className="col-xxl-3"></div>
          <div className="col-12 col-xxl-6 mapPopup-content w-75 w-xl-50">
            <div className='row map-close'>
              <div className='text-end'>
                <button className="map-close-button" onClick={closeLocationDetailsPopup}><FontAwesomeIcon icon={faX} /></button>
              </div>
            </div>



            {/* Content inside the popup */}

            <div className='map row w-100' >
              <div className="col-md-12 w-100 p-0 ">
                <iframe className='mapBorder w-100' src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d57677.950265607025!2d51.44753078695325!3d25.37560966510168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1slulu%20quater!5e0!3m2!1sen!2sin!4v1736492770639!5m2!1sen!2sin" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>

            </div>

          </div>
          <div className="col-xxl-3"></div>


        </div>
      )}

    </div>


  )
}

export default LocationDetails
