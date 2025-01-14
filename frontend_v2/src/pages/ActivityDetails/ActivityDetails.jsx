import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './ActivityDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import ActivityDetailsInnerpage1 from '../../components/ActivityDetailsInnerPage/ActivityDetailsInnerpage1';
import SignInPage from '../../components/Signpage/SignInPage';


function ActivityDetails() {
  return (
    <>
      <div className="row">
      <div className="col-md-6 d-flex align-items-center justify-content-center flex-column">
        <div className='mt-5' >
          <img className='image1 w-100' src="https://s3-alpha-sig.figma.com/img/805d/1f6b/b81629c19ca3ebeb8dc7604d3083c71e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hwvGJXWfoANxMwH~BIlADVx5EXYX9w03x8wf6yE4BXnaqNKFmBA3O0t0rFxCZGih-K7spSlcNcHlB9Z5Q6jK0wSw3QkAw0uLtyLnBsYlgJ0-yoapBpG7b-enzj-3x0kaWHVpluj2u6K5CD~c3gfa9P9TbJVUDlC7-D8cnFbYPP-fes89dtRUVLy0OroGlEBaB8d19ihEMkG7p4MbG74fBfCxSweJZ8BYrokowK2aYG1G0UBW67ChIn8bbBYS1Qm8Sp54v02zSHR2FW3ttFamqNNP7NrW7dfiL8zMLOVOdcnJOloSSNDgMTZKmPvMa2fWWOkp95S7zuo57PcTi6bCuA__" alt="" width='500px' height='500px' />
        </div>
        <div className='m-4 d-flex align-items-center justify-content-center w-100'>
          <button className='btn py-2 border rounded w-100' style={{ backgroundColor:'#ffff'}} >About this Activities</button>
          <FontAwesomeIcon icon={faArrowRight} style={{ color: "#000000", marginLeft: '-31px'}} />
        </div>
      </div>

      <div className="col-md-6">
        <div className='border rounded mt-5'>
          <ActivityDetailsInnerpage1 />
          {/* <SignInPage/> */}
        </div>
      </div>
      </div>


    </>
  )
}

export default ActivityDetails