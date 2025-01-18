import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/FootballAcademyIcon.png'
import '../AcademyDetails/FootballAcademyDetails.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight, faArrowUp, faX } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faInstagram, faSquareFacebook, faSquareWhatsapp, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function AcademyDetails({ isVisible, onClose }) {
  const [isAcademyDetailsOpen, setIsAcademyDetailsOpen] = useState(false);
  const [position, setPosition] = useState(5); // The initial position of the div
  const [maxPosition, setMaxPosition] = useState(2)
  const [ShowownArrow, setShowDownArrow] = useState(true)

  //const maxPosition = -1200; // Maximum top position the content can reach

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

  const popupRef = useRef(null); // Reference to the popup container
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
                <img className='academyLogo ms-xx-5 ' src={logo} alt="" />
              </div>
              <div className='col-9 col-lg-10 navText'>
                <div className='row  ps-0'>
                  <h1 className='text-start'>One football</h1>
                </div>

                <div className="row d-flex w-100">
                  <div className='col-lg-6'> <h3 className='text-start '>Sports Organising LLP</h3></div>
                  <div className='socialMediaIcon col-lg-6'><div className='text-end'>
                    <button className='btn'><FontAwesomeIcon className='text-dark fs-xl' icon={faFacebook} /></button>
                    <button className='btn'><FontAwesomeIcon className='text-dark fs-xl' icon={faWhatsapp} /></button>
                    <button className='btn'><FontAwesomeIcon className='text-dark fs-xl' icon={faInstagram} /></button>

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
              height: '600px', overflowY: 'scroll'
            }}
            ref={popupRef}

          >
            <h3>Address:</h3>
            <p className=''>Sporthood Academy for Football brings the latest in coaching methodologies to take your budding football star from grassroots to greatness. AFC and FIFA licensed coaches impart age-appropriate international curriculum to the kids with the primary aim of moulding them into professional footballers.</p>
            {/* highlights section */}
            <>
              <h3 className='mb-3'>Highlights</h3>
              <div className='row mt-2'>
                <div className='col-2 '>
                  <div className="blackImage px-2 py-3">
                    <FontAwesomeIcon className='highlightIcon text-light' icon={faSquareFacebook} size="2xl" />
                  </div>
                </div>
                <div className="col-10">
                  <h4>Things to keep in mind</h4>
                  <p>The stage is open for all forms of performative arts: Singing, Comedy, Storytelling, Poetry, etc.
                    You will get 6 minutes to perform on stage.</p>
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col-2'>
                  <div className="blackImage px-2 py-3">
                    <FontAwesomeIcon className='highlightIcon text-light' icon={faSquareFacebook} size="2xl" />
                  </div>
                </div>
                <div className="col-10">
                  <h4>Things to keep in mind</h4>
                  <p>The stage is open for all forms of performative arts: Singing, Comedy, Storytelling, Poetry, etc.
                    You will get 6 minutes to perform on stage.</p>
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col-2'>
                  <div className="blackImage px-2 py-3">
                    <FontAwesomeIcon className='highlightIcon text-light' icon={faSquareFacebook} size="2xl" />
                  </div>
                </div>
                <div className="col-10">
                  <h4>Things to keep in mind</h4>
                  <p>The stage is open for all forms of performative arts: Singing, Comedy, Storytelling, Poetry, etc.
                    You will get 6 minutes to perform on stage.</p>
                </div>
              </div>
            </>
            {/* certificate section */}
            <>
              <h3 className='mt-4'>Certificates and license</h3>
              <div className='row my-3 '>
                <div className="col-md-1 m-1 certificateBoxes">
                </div>
                <div className="col-md-1 m-1 certificateBoxes"></div>
                <div className="col-md-1 m-1 certificateBoxes"></div>
                <div className="col-md-9"></div>
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
