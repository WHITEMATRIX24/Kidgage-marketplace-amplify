import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/FootballAcademyIcon.png'
import '../AcademyDetails/FootballAcademyDetails.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight, faArrowUp, faGlobe, faX } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faInstagram, faSquareFacebook, faSquareWhatsapp, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { getProviderDetailsApi } from '../../services/allApis';
import wifiIcon from '../../assets/icon/wifiIcon.png';
import parkingIcon from '../../assets/icon/parkingIcon.png';
import gymIcon from '../../assets/icon/gymIcon.png';
import lockerIcon from '../../assets/icon/locker-icon.png';
function AcademyDetails({ isVisible, onClose, providerId }) {
  const [isAcademyDetailsOpen, setIsAcademyDetailsOpen] = useState(false);
  const [position, setPosition] = useState(5); // The initial position of the div
  const [maxPosition, setMaxPosition] = useState(2)
  const popupRef = useRef(null);
  const [ShowownArrow, setShowDownArrow] = useState(true)
  const [provider, setProvider] = useState(null);
  //const maxPosition = -1200; // Maximum top position the content can reach
  const getProviderInitialData = async () => {
    console.log("Fetching provider details..."); // Debug log
    try {
      const data = await getProviderDetailsApi({ providerId });
      console.log("API response:", data);
      if (data) {
        setProvider(data);
      }
    } catch (error) {
      console.error("Error fetching provider data:", error);
    }
  };

  useEffect(() => {

    if (window.innerHeight < 701) {
      setMaxPosition(-400)

    }
    else if (window.innerHeight < 741) {
      setMaxPosition(-200)

    }

    else if (window.innerHeight < 950) {
      setMaxPosition(-100)
    }
    else {
      setMaxPosition(-10)
    }

  })

  // Function to open the popup
  const openAcademyDetailsPopup = () => {
    setIsAcademyDetailsOpen(true);
  };

  // Function to close the popup
  const closeAcademyDetailsPopup = () => {
    setIsAcademyDetailsOpen(false);
    setPosition(5)
    setShowDownArrow(true)

  };
  useEffect(() => {
    if (providerId) {
      getProviderInitialData();
    }
  }, [isVisible, providerId]);

  const moveUp = () => {
    if (position > maxPosition) {
      setPosition((prevPosition) => prevPosition - 40); // Decrease the position (move upward)
    }
    if (position <= maxPosition) {
      setShowDownArrow(false)

    }
  };
  const minPosition = 5
  const moveDown = () => {
    if (position < minPosition) {
      setPosition((prevPosition) => prevPosition + 40); // Decrease the position (move upward)
    }
    if (position >= minPosition) {
      setShowDownArrow(true)

    }
  };

  // Reference to the popup container
  const [downArrow, setDownArrow] = useState(true)
  const [upArrow, setUpArrow] = useState(false)




  const scrollToTop = () => {
    if (popupRef.current) {
      popupRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      setDownArrow(true)
      setUpArrow(false)
    }
  };
  const scrollToBottom = () => {
    if (popupRef.current) {
      popupRef.current.scrollTo({ top: 2000, behavior: 'smooth' });
      setDownArrow(false)
      setUpArrow(true)
    }
  };


  return isVisible ? (
    <div>
      <div className="row  popup">
        <div className="col-sm-0 col-md-0 col-lg-1 col-xxl-3"></div>
        <div className="col-sm-12 col-md-12 col-lg-10  col-xxl-6 academeyPopup-content pt-0">
          <div className='row w-100' style={{ background: 'white', zIndex: '5000' }}>
            <div className='text-end'>
              <button className="close-button" onClick={onClose}><FontAwesomeIcon icon={faX} /></button>
            </div>
          </div>
          <div className="navbar ">

            <div className='row w-100 m-3'>
              <div className='col-3 col-lg-2  pe-md-0  '>
                <img className='academyLogo ms-xx-5 ' src={provider?.logo || logo} alt="" />
              </div>
              <div className='col-9 col-lg-10 navText'>
                <div className='row  ps-0'>
                  <h1 className='text-start'>{provider?.fullName}</h1>
                </div>

                <div className="row d-flex w-100">
                  <div className='col-lg-6'> <h3 className='text-start '></h3></div>
                  <div className='socialMediaIcon col-lg-6'><div className='text-end'>
                    <a
                      href={provider?.website}
                      target="_blank"
                      className="btn"
                    >
                      <FontAwesomeIcon
                        className="text-dark fs-xl"
                        icon={faGlobe}
                      />
                    </a>
                    <a
                      href={provider?.instaId}
                      target="_blank"
                      className="btn"
                    >
                      <FontAwesomeIcon
                        className="text-dark fs-xl"
                        icon={faInstagram}
                      />
                    </a>
                    <button className="btn">
                      <FontAwesomeIcon
                        className="text-dark fs-xl"
                        icon={faWhatsapp}
                      />
                    </button>

                  </div></div>
                </div>
              </div>

            </div>
          </div>


          {/* Content inside the popup */}
          <div className="content "
            style={{
              marginTop: `${position}px`,
              transition: 'margin-top 0.3s ease',
              height: '440px', overflowY: 'scroll'
            }}
            ref={popupRef}

          >
            <h3>About:</h3>
            <p className=''>{provider?.description}</p>
            {/* highlights section */}
            <>
              <h3 className='mb-3'>Amenities</h3>
              {provider?.amenities && provider.amenities.length > 0 ? (
                provider.amenities.map((amenity, index) => (
                  <div className='aminities-row' key={index}>
                    <div className='aminities ' >
                      <div className="blackImage">
                        <img
                          className="highlightIcon"
                          src={
                            amenity === "Parking" ? parkingIcon :
                              amenity === "FreeWifi" ? wifiIcon :
                                amenity === "LockerRooms" ? lockerIcon :
                                  amenity === "FitnessCenter" ? gymIcon :
                                    wifiIcon // Default icon if amenity is unknown
                          }
                          alt={amenity}
                          width="20"
                          height="20"
                        />
                      </div>

                    </div>
                    <div className="aminities-desc">
                      < h4 style={{ marginTop: "10px" }}>{amenity}</h4>
                      {/* <p>{amenity.description}</p> */}
                    </div>
                  </div>
                ))
              ) : (
                <p>No amenities available</p>
              )}
              <div className='row mt-2'>


              </div>

            </>
            {/* certificate section */}
            <>
              <h3 className='mt-4'>Certificates and Awards</h3>
              <div className='row my-3'>
                {provider?.awards && provider.awards.length > 0 ? (
                  provider.awards.map((award, index) => (
                    <div className="col-md-3 m-1 certificateBoxes" key={index}>
                      <img src={award} alt={award.name} className="certificateImage" />
                      <p className="text-center mt-2">{award.name}</p>
                    </div>
                  ))
                ) : (
                  <p>No certificates available</p>
                )}
              </div>
            </>

          </div>
          {downArrow && <div className='row w-100 d-flex align-items-center justify-content-center mt-3 '>
            <button onClick={scrollToBottom} className='btn d-flex align-items-center justify-content-center academyDownArrowButton'><FontAwesomeIcon className='fs-5' icon={faArrowDown} /></button>
          </div>}
          {upArrow && <div className='row w-100 d-flex align-items-center justify-content-center mt-3 '>
            <button onClick={scrollToTop} className='btn d-flex align-items-center justify-content-center academyDownArrowButton'><FontAwesomeIcon className='fs-5' icon={faArrowUp} /></button>
          </div>
          }
        </div>
        <div className="col-md-0 col-lg-1  col-xxl-3"></div>


      </div>

    </div>
  ) : null;
}

export default AcademyDetails
