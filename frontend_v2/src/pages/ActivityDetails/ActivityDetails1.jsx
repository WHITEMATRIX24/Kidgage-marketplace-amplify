import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import ActivityDetailsInnerpage1 from '../../components/ActivityDetailsInnerPage/ActivityDetailsInnerpage1';
import './ActivityDetails.css'
import SignInPage from '../../components/Signpage/SignInPage';

function ActivityDetails1() {
    return (
        <>
            {/* <Row className='w-100 mt-5'>
                <Col sm={12} md={6} lg={6}>
                <div className='activity-img-container d-flex align-items-center justify-content-center'>
                        <img className='image1' src="https://s3-alpha-sig.figma.com/img/805d/1f6b/b81629c19ca3ebeb8dc7604d3083c71e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hwvGJXWfoANxMwH~BIlADVx5EXYX9w03x8wf6yE4BXnaqNKFmBA3O0t0rFxCZGih-K7spSlcNcHlB9Z5Q6jK0wSw3QkAw0uLtyLnBsYlgJ0-yoapBpG7b-enzj-3x0kaWHVpluj2u6K5CD~c3gfa9P9TbJVUDlC7-D8cnFbYPP-fes89dtRUVLy0OroGlEBaB8d19ihEMkG7p4MbG74fBfCxSweJZ8BYrokowK2aYG1G0UBW67ChIn8bbBYS1Qm8Sp54v02zSHR2FW3ttFamqNNP7NrW7dfiL8zMLOVOdcnJOloSSNDgMTZKmPvMa2fWWOkp95S7zuo57PcTi6bCuA__" alt="" />
                    </div>
                    <div className='activity-btn-container d-flex align-items-center justify-content-center'>
                        <button className='activity-button text-start rounded-4' >About This Activities</button>
                        <FontAwesomeIcon className='icon-arrow' icon={faArrowRight} />
                    </div>
                </Col>
                <Col sm={12} md={6} lg={6}>
                <div className='rounded-4 rigtht-section' > 
                        <ActivityDetailsInnerpage1 />
                        
                        
                    </div>
                </Col>
            </Row> */}

            <div className="row">
                <div className="col-md-6 col-sm-12 col-lg-6 ">
                    <div className='activity-img-container  d-flex align-items-center justify-content-center'>
                        <img className='image1' src="https://s3-alpha-sig.figma.com/img/805d/1f6b/b81629c19ca3ebeb8dc7604d3083c71e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hwvGJXWfoANxMwH~BIlADVx5EXYX9w03x8wf6yE4BXnaqNKFmBA3O0t0rFxCZGih-K7spSlcNcHlB9Z5Q6jK0wSw3QkAw0uLtyLnBsYlgJ0-yoapBpG7b-enzj-3x0kaWHVpluj2u6K5CD~c3gfa9P9TbJVUDlC7-D8cnFbYPP-fes89dtRUVLy0OroGlEBaB8d19ihEMkG7p4MbG74fBfCxSweJZ8BYrokowK2aYG1G0UBW67ChIn8bbBYS1Qm8Sp54v02zSHR2FW3ttFamqNNP7NrW7dfiL8zMLOVOdcnJOloSSNDgMTZKmPvMa2fWWOkp95S7zuo57PcTi6bCuA__" alt="" />
                    </div>
                    <div className='activity-btn-container d-flex align-items-center justify-content-center'>
                        {/* <button className='w-100 activity-button text-start rounded-4' >About This Activities</button>        */}
                        <button className='text-start  rounded-3 w-100 py-3 activity-button' >About This Activities</button>
                        <FontAwesomeIcon className='icon-arrow' icon={faArrowRight} />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 col-lg-6 ">
                    <div className='rounded-4 right-section  d-flex align-items-center justify-content-center' >
                        {/* <ActivityDetailsInnerpage1 /> */}
                        <SignInPage />
                    </div>
                </div>
            </div>



        </>
    )
}

export default ActivityDetails1