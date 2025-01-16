import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './OrderSummeryPage.css'

function OrderSummeryPage2() {
    return (
        <>
            <div className=" activity-details-row">
                <div className="col-md-6">
                    <div className='hide-on-mobile'>
                        <div className='activity-img-container'>
                            <img className='activity-image' src="https://s3-alpha-sig.figma.com/img/805d/1f6b/b81629c19ca3ebeb8dc7604d3083c71e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hwvGJXWfoANxMwH~BIlADVx5EXYX9w03x8wf6yE4BXnaqNKFmBA3O0t0rFxCZGih-K7spSlcNcHlB9Z5Q6jK0wSw3QkAw0uLtyLnBsYlgJ0-yoapBpG7b-enzj-3x0kaWHVpluj2u6K5CD~c3gfa9P9TbJVUDlC7-D8cnFbYPP-fes89dtRUVLy0OroGlEBaB8d19ihEMkG7p4MbG74fBfCxSweJZ8BYrokowK2aYG1G0UBW67ChIn8bbBYS1Qm8Sp54v02zSHR2FW3ttFamqNNP7NrW7dfiL8zMLOVOdcnJOloSSNDgMTZKmPvMa2fWWOkp95S7zuo57PcTi6bCuA__" alt="" />
                        </div>
                        <div className='activity-btn-container'>
                            {/* <button className='w-100 activity-button text-start rounded-4' >About This Activities</button>        */}
                            <button className='text-start activity-button' >About This Activities</button>
                            <FontAwesomeIcon className='icon-arrow' icon={faArrowRight} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className='rounded-4 right-section-signUp ' >
                        <div className='mt-5 w-100'>
                            <div className='signIn-heading fw-bold'>
                                <h2>Football Camp</h2>
                                <h6>Organised by</h6>
                            </div>
                            <div className='mt-3 mb-3  mx-5 py-3 px-2 d-flex align-items-center justify-content-between input-container border rounded-4'>
                                <img src="http://www.skipcash-portal.com/img/skipcash-logo.png" alt="" style={{ width: '90px', height: '35px' }} className='order-image' />
                                <input type="checkbox" className='order-checkbox' style={{ width: '30px', height: '30px' }} />
                            </div>
                            <div className='mt-3 mb-3 mx-5 py-3 px-2  d-flex align-items-center justify-content-between input-container border rounded-4'>
                                <img src="https://logos-world.net/wp-content/uploads/2021/03/Stripe-Logo.png" alt="" style={{ width: '60px', height: '30px' }} className='order-image' />
                                <input type="checkbox" className='order-checkbox' style={{ width: '30px', height: '30px' }} />
                            </div>



                            <div className='border rounded mt-5 p-1 map-box  '>
                                <div style={{ lineHeight: '10px' }} className='mx-3 mt-3'>
                                    <p className='fw-bold' style={{ fontSize: '18px' }}> Order Summery</p>
                                    <div className='d-flex justify-content-between'>
                                        <p>1Month Pass</p>
                                        <p>AED 157.50</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p>Tax</p>
                                        <p className='fw-bold'>AED 157.50</p>
                                    </div>

                                </div>
                            </div>

                            <div className='d-flex align-items-centre justify-content-between border rounded-3  age-box  mt-3 d-none d-md-flex '>
                                <div className=' age-box-content '>
                                    <p className='fw-bold' style={{ fontSize: '16px' }}>Total:199</p>
                                    <p style={{ fontSize: '12px' }}>Today will start</p>
                                </div>
                                <button style={{ backgroundImage: 'linear-gradient(to right,#FDD687, #F5A691)', width: '230px', height: '50px' }} className=' ctn-btn border-0  m-1 fw-bold'>Continue</button>
                            </div>
                            <div className='checkout-container'>
                                <div className='d-flex align-items-centre justify-content-between border rounded-3  age-box '>
                                    <div className=' age-box-content '>
                                        <p className='fw-bold' style={{ fontSize: '16px' }}>AED 199:</p>
                                        <p style={{ fontSize: '12px' }}>Today will start</p>
                                    </div>
                                    <button className=' rounded-4 ctn-btn border-0 w-50 m-1 fw-bold' style={{ backgroundImage: 'linear-gradient(to right,#FDD687, #F5A691)', width: '230px', height: '50px' }}>Checkout</button>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default OrderSummeryPage2