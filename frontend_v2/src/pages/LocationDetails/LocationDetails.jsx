import React, { useState, useEffect } from 'react'
import logo from '../../assets/FootballAcademyIcon.png'
import '../LocationDetails/LocationDetails.css'
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight, faX } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faInstagram, faSquareFacebook, faSquareWhatsapp, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { getProviderDetailsApi } from '../../services/allApis';

function LocationDetails({ providerId }) {
  const [isLocationDetailsOpen, setIsLocationDetailsOpen] = useState(false);
  const [provider, setProvider] = useState(null);
  // Function to open the popup
  console.log({ providerId })
  const openLocationDetailsPopup = () => {
    setIsLocationDetailsOpen(true);
    if (providerId) {
      getProviderInitialData();;
    }
  };
  useEffect(() => {
    if (isLocationDetailsOpen && provider?.locations?.length > 0) {
      const lat = provider.locations[0].latitude;
      const lon = provider.locations[0].longitude;

      setTimeout(() => {
        const map = L.map("map").setView([lat, lon], 14);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        // Custom marker icon
        const customIcon = L.icon({
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          iconSize: [25, 41], // size of the icon
          iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
          popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
        });

        L.marker([lat, lon], { icon: customIcon })
          .addTo(map)
          .bindPopup(`<b>${provider.fullName}</b>`)
          .openPopup();
      }, 200);
    }
  }, [isLocationDetailsOpen, provider]);


  const getProviderInitialData = async () => {
    console.log("Fetching provider details..."); // Debug log
    try {
      const data = await getProviderDetailsApi({ providerId });
      console.log("privider response:", data);
      if (data) {
        setProvider(data);
      }
    } catch (error) {
      console.error("Error fetching provider data:", error);
    }
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
          <div className="col-12 col-xxl-6 mapPopup-content w-xl-50">
            <div className='row map-close'>
              <div className='text-end'>
                <button className="map-close-button" onClick={closeLocationDetailsPopup}><FontAwesomeIcon icon={faX} /></button>
              </div>
            </div>



            {/* Content inside the popup */}

            <div className='mapView row w-100' >
              <div className="col-md-12 w-100 p-0 ">
                {/* <iframe className='mapViewBorder w-100' src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d57677.950265607025!2d51.44753078695325!3d25.37560966510168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1slulu%20quater!5e0!3m2!1sen!2sin!4v1736492770639!5m2!1sen!2sin" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}

                <div id="map" className="mapViewBorder w-100"></div>
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
