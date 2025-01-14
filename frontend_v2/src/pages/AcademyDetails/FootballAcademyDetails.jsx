import React, { useEffect, useState } from 'react'
import logo from '../../assets/FootballAcademyIcon.png'
import '../AcademyDetails/FootballAcademyDetails.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight, faX } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faInstagram, faSquareFacebook, faSquareWhatsapp, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function FootballAcademyDetails() {
  const [isAcademyDetailsOpen, setIsAcademyDetailsOpen] = useState(false);
  const [position, setPosition] = useState(5); // The initial position of the div
  const [maxPosition, setMaxPosition] = useState(5)

  //const maxPosition = -1200; // Maximum top position the content can reach

  useEffect(() => {

    if (window.innerHeight < 701) {
      setMaxPosition(-800)

    }
    else if (window.innerHeight < 741) {
      setMaxPosition(-600)

    }

    else if (window.innerHeight < 950) {
      setMaxPosition(-500)
    }
    else {
      setMaxPosition(-350)
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

  };


  const moveUp = () => {
    if (position > maxPosition) {
      setPosition((prevPosition) => prevPosition - 30); // Decrease the position (move upward)
    }
  };
  return (
    <div>
      <button onClick={openAcademyDetailsPopup}>Show Popup</button>

      {/* Conditional rendering of the popup */}
      {isAcademyDetailsOpen && (
        <div className="row w-100 popup">
          <div className="col-xl-1 col-xxl-2"></div>
          <div className="col-xl-10  col-xxl-8 academeyPopup-content p-xxl-3">
            <div className='row'>
              <div className='text-end'>
                <button className="close-button" onClick={closeAcademyDetailsPopup}><FontAwesomeIcon icon={faX} /></button>
              </div>
            </div>
            <div className="navbar">
              <div className='row w-100'>
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
            <div className="content"
              style={{
                marginTop: `${position}px`,
                transition: 'margin-top 0.3s ease'
              }}

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
              <div className='row w-100 d-flex align-items-center justify-content-center mt-3 '>
                <button onClick={moveUp} className='btn d-flex align-items-center justify-content-center academyDownArrowButton'><FontAwesomeIcon className='fs-5' icon={faArrowDown} /></button>
              </div>
            </div>
          </div>
          <div className="col-xl-1  col-xxl-2"></div>

        </div>
      )}

    </div>
  )
}

export default FootballAcademyDetails
