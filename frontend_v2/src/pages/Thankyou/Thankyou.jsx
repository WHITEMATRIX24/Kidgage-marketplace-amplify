import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import './Thankyou.css'
import tileImage1 from '../../assets/ThanksPageImage1.png'
import tileImage4 from '../../assets/ThanksPageImage2.png'
import tileImage3 from '../../assets/ThanksPageImage3.png'
import tileImage2 from '../../assets/ThanksPageImage4.png'
import FootballAcademyDetails from '../AcademyDetails/FootballAcademyDetails'
import CampDetails from '../CampDetails/CampDetails';

function Thankyou() {
    return (
        <div className='thanksContainer'>
            <div className='thankYouOuterDiv row '>
                <div className='thanksLeftDiv col-12 col-xl-6 col-xxl-6'>
                    <div className='thanksLeftOrder'>
                        <h1 className=''>Thanks for order!</h1>
                        <h6>Your order number is #1157B0</h6>
                        <h6 className='mt-3'>The pass for your order has been created.
                            Please check the <span className='myTickets'><u>‘My Tickets’</u></span> page
                            or email shortly.</h6>
                        <div className='eventAttending mt-4'>
                            <h6>You are attending</h6>
                            <h1 className='eventName'>Football camp</h1>
                            <h6>Event location</h6>
                        </div>
                        <p className='sendWhatsapp mt-4'>Send pass via WhatsApp</p>
                        <div className='row '>
                            <h6 className='inputBoxContainer col-md-7'>
                                <input className='form-control whatsAppNoInput' placeholder='Add mobile number' type="text" />
                                <button className='thanksSentButton'>Sent</button>
                            </h6>
                            <div className='col-md-5'>
                                <p className='smallText'>Your pass will be send to <span className='thanksEmail'>xxxxxxxx@gmail.com</span></p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='inputBoxContainer col-md-12 w-100'>
                                <input className='form-control calender ' placeholder="Wed, Dec 17, 2025, 3:00 PM" type="text" readOnly />
                                <button className='addToCalenderButton'>Add to Calender</button>
                            </div>
                        </div>

                    </div>
                    <div className='thanksLeftAbout  mt-4 px-5'>
                        <button className='arrowButton'><span className='ms-auto w-75'>About This Activities</span></button>
                        <FontAwesomeIcon className='arrow' icon={faArrowRight} />
                    </div>
                </div>
                <div className='thanksRightDiv col-12 col-xl-6 col-xxl-6'>
                    <div className='rightDivContent mt-4 mt-xl-0  ps-md-4 '>
                        <h1 className='tittle'>More camp</h1>
                        <h3 className='subTitle mb-3'>Organised by <u>One football</u></h3>
                        <div className='tileImageContainer'>
                            <div className='row '>
                                <div className='eventTiles col-6'>
                                    <div className='w-100'>
                                        <img className='tileImage w-100' src={tileImage1} alt="" />
                                        <div className='eventDetails'>
                                            <h4 className='EventTitle'>This camp Name</h4>
                                            <div className='eventDetailsText d-flex justify-content-between'>
                                                <p>Dubai,1 main rode</p>
                                                <p>6.2Km</p>
                                            </div>
                                            <p>Camp Days: SUD to FRI</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='eventTiles col-6'>
                                    <div className='w-100'>
                                        <img className='tileImage w-100' src={tileImage2} alt="" />
                                        <div className='eventDetails'>
                                            <h4 className='EventTitle'>This camp Name</h4>
                                            <div className='eventDetailsText d-flex justify-content-between'>
                                                <p>Dubai,1 main rode</p>
                                                <p>6.2Km</p>
                                            </div>
                                            <p>Camp Days: SUD to FRI</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='eventTiles col-6'>
                                    <div className='w-100'>
                                        <img className='tileImage w-100' src={tileImage3} alt="" />
                                        <div className='eventDetails'>
                                            <h4>This camp Name</h4>
                                            <div className='d-flex justify-content-between'>
                                                <p>Dubai,1 main rode</p>
                                                <p>6.2Km</p>
                                            </div>
                                            <p>Camp Days: SUD to FRI</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='eventTiles col-6'>
                                    <div className='w-100'>
                                        <img className='tileImage w-100' src={tileImage4} alt="" />
                                        <div className='eventDetails'>
                                            <h4>This camp Name</h4>
                                            <div className='d-flex justify-content-between'>
                                                <p>Dubai,1 main rode</p>
                                                <p>6.2Km</p>
                                            </div>
                                            <p>Camp Days: SUD to FRI</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* <CampDetails /> */}

        </div>
    )
}

export default Thankyou
