import React from 'react'
import '../ActivityDetailsInnerPage/ActivityDetailsInnerpage1.css'
import './SignInPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
// import SignInOtp from './SignInOtp'


function SignInPage() {
  return (
    <>


      <div className='mt-4 w-100'>
        <div className='activity-heading fw-bold'>
          <h2>Sign In</h2>
          <h6>Enter your email</h6>
        </div>
        <div className='mt-3 mb-2 px-4 w-100 d-flex align-items-center justify-content-center'>
          <input type='text' placeholder='example@mail.com' className='form-control fs-5 border rounded-4 ' style={{ width: '400px', height: '60px' }} ></input>
        </div>

        <div className='d-flex justify-content-center align-items-center'>
          <div className=' mx-4 border rounded-4 d-flex align-items-center justify-content-between' style={{ width: '400px', height: '60px' }}>
            <button style={{ backgroundColor: '#ACC29E', color: '#ffff', width: '150px', height: '50px', fontSize: '18px', fontWeight: '700' }} className=' btn m-1 fw-bold'>
              Sign Up
              <FontAwesomeIcon icon={faArrowRight} style={{ color: "#ffff" }} className='ms-3' />
            </button>
            <button style={{ backgroundImage: 'linear-gradient(to right,#FDD687, #F5A691)', width: '230px', height: '50px' }} className='btn w-50 m-1 fw-bold rounded-3'>Continue</button>
          </div>
        </div>

        {/* <SignInOtp/> */}
        <div className='mt-3'>
          <div className='d-flex justify-content-between align-items-center px-5 mt-5'>
            <div className='line-seperator'></div>
            <p>or Sign in with</p>
            <div className='line-seperator'></div>
          </div>
          <div className='mx-4 mt-2 d-flex align-items-center justify-content-center flex-column '>
            <button style={{ backgroundColor: '#D0D0D0' }} className='signin-btn border rounded-5 w-75  fw-bold  bg-transparent'><img src="https://img.icons8.com/?size=48&id=17949&format=png" alt="" className='me-3' />Continue with Google</button>
            <button style={{ backgroundColor: '#D0D0D0' }} className='border signin-btn rounded-5 w-75 mb-5 fw-bold bg-transparent'><img src="https://img.icons8.com/?size=50&id=30840&format=png" alt="" className='me-3' />Continue with Apple</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default SignInPage