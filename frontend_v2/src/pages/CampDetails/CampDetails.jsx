import { faArrowDown, faArrowRight, faArrowUp, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import '../CampDetails/CampDetails.css'


function CampDetails({activityData}) {
    const [isCampDetailsOpen, setIsCampDetailsOpen] = useState(false);
    const [position, setPosition] = useState(5); // The initial position of the div





    const items = [' The stage is open for all forms of performative arts: Singing, Comedy, Storytelling, Poetry, etc.', ' You will get 6 minutes to perform on stage', ' You will get 6 minutes to perform on stage', 'You own all rights to your work and performance; Kasa Kai Mumbai holds the right to photograph or shoot the performance for global sharing via social media sites, blog posts and video sharing platforms', 'You are required to reach the event 20 minutes before the event starts and check-in with the organizer at the venue.'];

    // Function to open the popup
    const openCampDetailsPopup = () => {
        setIsCampDetailsOpen(true);
    };

    // Function to close the popup
    const closeCampDetailsPopup = () => {
        setIsCampDetailsOpen(false);
    };

    const [startAge, setStartAge] = useState(0)
    const [endAge, setendAge] = useState(0)

    //function to calucuate age limit
    const calculateAge = () => {
        const satrtDate = new Date(activityData.ageGroup[0].ageStart);
        const endDate = new Date(activityData.ageGroup[0].ageEnd);
        console.log(satrtDate);
        

        const currentDate = new Date();
    
        let calculatedAge1 = currentDate.getFullYear() - satrtDate.getFullYear();
        let calculatedAge2 = currentDate.getFullYear() - endDate.getFullYear();
        setStartAge(calculatedAge2)
        setendAge(calculatedAge1)
        console.log(calculatedAge1);
        
      };
      useEffect(()=>{
        calculateAge();
        console.log(activityData);
        
      })
    




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






    return (
        <div>
            <div className="activity-btn-container-1" onClick={openCampDetailsPopup} style={{ cursor: "pointer" }}>
                <button className="activity-button-1" >About This Activity</button>
                <FontAwesomeIcon className="icon-arrow-1" icon={faArrowRight} />
            </div>



            {/* Conditional rendering of the popup */}
            {isCampDetailsOpen && (
                <div className="row w-100 popup m-0">
                    <div className="col-sm-0 col-md-0 col-lg-1 col-xxl-3"></div>
                    <div className="col-sm-12 col-md-12 col-lg-10  col-xxl-6 popup-content pt-0">
                        <div className='row w-100 ' style={{ background: 'white', zIndex: '5000' }}>
                            <div className='text-end'>
                                <button className="close-button" onClick={closeCampDetailsPopup}><FontAwesomeIcon icon={faX} /></button>
                            </div>
                        </div>
                        <div className="navbar pt-4">
                            <div className='row w-100 ms-2'>

                                <div className='col-12 navText'>
                                    <div className='row  ps-0'>
                                        <h1 className='text-start' style={{ color: "black" }}>{activityData.name}</h1>
                                    </div>
                                    <div className="row d-flex w-100">
                                        <div > <h3 className='text-start ' style={{ color: "black" }}>Agre Limt: {startAge} to {endAge}</h3></div>
                                    </div>
                                </div>

                            </div>
                        </div>


                        {/* Content inside the popup */}
                        <div className="content"
                            style={{
                                marginTop: `${position}px`,
                                transition: 'margin-top 0.3s ease',
                                height: '600px', overflowY: 'scroll'
                            }}
                            ref={popupRef}
                        >
                            <h4 style={{ color: "black" }}>"Surprise! We’re back with a new location in Dubai</h4>
                            <p className='' style={{ color: "black" }}>{activityData.description}</p>
                            {/* <p style={{ color: "black" }}>Sporthood Academy for Football brings the latest in coaching methodologies to take your budding football star from grassroots to greatness. AFC and FIFA licensed coaches impart age-appropriate international curriculum to the kids with the primary aim of moulding them into professional footballers.
                                Working in association with BFC Soccer Schools, our coaching philosophy targets the holistic development of the child while incorporating a true lifelong passion for the game. Our best players even get a chance win scholarships and scouted by the famous Bengaluru Football Club.</p> */}
                            {/* things to keep in mind section */}
                            <>
                                <h5 className='mb-3' style={{ color: "black" }}>Things to keep in mind:</h5>
                                <div className='listWithHiphen '>
                                    <ul className='ps-0'>
                                        {items.map((item, index) => (
                                            <li key={index}>- {item}</li>
                                        ))}
                                    </ul>
                                </div>

                            </>
                            {/* FAQ's section */}
                            <div className='FAQ'>
                                <h3 className='mt-2' style={{ color: "black" }}>FAQs</h3>
                                <div className='row  '>
                                {activityData.faq?.map((item)=>(<div className="col-md-6 mt-3">
                                        <p style={{ color: "black" }}>{item.question}</p>
                                        <h6 style={{ color: "black" }}>{item.answer} </h6>
                                    </div>))}
                                    
                                </div>
                                {/* <div className='row  '>
                                    <div className="col-md-6 mt-3">
                                        <p style={{ color: "black" }}>Does the registration guarantee my spot?</p>
                                        <h6 style={{ color: "black" }}>Yes, whoever is registering will be given a spot. </h6>
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <p style={{ color: "black" }}>Does the registration guarantee my spot?</p>
                                        <h6 style={{ color: "black" }}>Yes, whoever is registering will be given a spot. </h6>
                                    </div>
                                </div> */}
                            </div>
                            {/* Maps section */}
                            <div className='map row w-100 mt-5' >
                                <div className="col-md-12">
                                    <iframe className='mapBorder' src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d57677.950265607025!2d51.44753078695325!3d25.37560966510168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1slulu%20quater!5e0!3m2!1sen!2sin!4v1736492770639!5m2!1sen!2sin" width="100%" height="100%" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>

                            </div>
                        </div>

                        {downArrow && <div className='row w-100 d-flex align-items-center justify-content-center mt-3 '>
                            <button onClick={scrollToBottom} className='btn d-flex align-items-center justify-content-center downArrowButton'><FontAwesomeIcon className='fs-5' icon={faArrowDown} /></button>
                        </div>}
                        {upArrow && <div className='row w-100 d-flex align-items-center justify-content-center mt-3 '>
                            <button onClick={scrollToTop} className='btn d-flex align-items-center justify-content-center downArrowButton'><FontAwesomeIcon className='fs-5' icon={faArrowUp} /></button>
                        </div>}

                    </div>
                    <div className="col-md-0 col-lg-1  col-xxl-3"></div>

                </div>
            )}

        </div>
    )
}

export default CampDetails
