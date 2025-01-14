import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './ActivityDetailsInnerpage1.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLocationDot, faShareAlt, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';



function ActivityDetailsInnerpage1() {
  return (
    <>

    <Row>
        <Col sm={12} md={6} lg={4} className='w-100'>
        <div
          className="share-container float-end px-4"
          style={{
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '15px',
            borderTopRightRadius: '15px',
            borderBottomRightRadius: '0px',

          }}
        >
          <span className="share-text">share</span>
          <FontAwesomeIcon className="share-icon" icon={faShareNodes} />
        </div>
          <div className='activity-heading fw-bold mt-4'>
            <h2>Football Camp</h2>
            <h6>Organised by Aspire</h6>
          </div>
        </Col>
    </Row>
    <div className=''>
      <Row className='card-container g-1'>
      <Col xs={6} sm={6} md={6} lg={4} className='d-flex align-items-center justify-content-end mt-2'>
          <Card className='d-flex card1 rounded-4'>
            <Card.Body className='d-flex align-items-center justify-content-center flex-column'>
              <Card.Title>1 Month</Card.Title>
              <Card.Text className='text-center card-fnt-wt' style={{ fontSize: '12px'}}>
                Seat Details and More options
              </Card.Text>
              <button className='border-0 mb-1 card-btn rounded-3' >Select</button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} sm={6} md={6} lg={4} className='d-flex align-items-center justify-content-center mt-2'>
          <Card className='d-flex card2 rounded-4 '>
            <Card.Body className='d-flex align-items-center justify-content-center flex-column'>
              <Card.Title>6 Month</Card.Title>
              <Card.Text className='text-center card-fnt-wt' style={{ fontSize: '12px'}}>
                Seat Details and More options
              </Card.Text>
              <button className='border-0 mb-1 card-btn rounded-3' >Select</button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={6} lg={4} className='d-flex align-items-center justify-content-start mt-2'>
          <Card className='d-flex card3 rounded-4'>
            <Card.Body className=' d-flex align-items-center justify-content-center flex-column border rounded-4 px-3  m-1 custom-btn' style={{ backgroundImage: 'linear-gradient(to bottom,#FDD687, #F5A691)' }}>
             <div className='custom-btn'>
            <div className=' d-flex-coloum'>
            <Card.Title>Custom</Card.Title>
              <Card.Text className='text-center card-fnt-wt' style={{ fontSize: '10px' }}>
                Seat Details and More options
              </Card.Text>
            </div>
              <FontAwesomeIcon  icon={faArrowRight} style={{ color: "#000000" }} className='fs-5 ms-4 cutom-arrow' /></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className=''>
        <Col sm={12} md={6} lg={4} className='w-100'>
          <div className='border rounded my-3 p-1 rounded-3 map-box '>
            <div className='d-flex'>
              <FontAwesomeIcon icon={faLocationDot} style={{ color: "#00040a",fontSize:'24px' }} className='mx-3 mt-2' />
             <div style={{lineHeight:'1px'}} className='flex-column mt-3'>
             <p className='fw-bold' style={{fontSize:'18px'}}> One Football</p>
             <p style={{fontSize:'12px'}}>Dubai,United Arab Emirates</p>
             </div>
            </div>
           
            <div className='d-flex align-items-centre'>
            <button className='border-0 text-start py-2 border rounded-3 w-100 map-btn' >Map View</button>
              <FontAwesomeIcon className='fs-5 map-arrow' icon={faArrowRight} style={{ marginLeft: '-31px',color:'#ffff' }} />
            </div>
          </div>
        </Col>
      </Row>

      <div className='age-container'>
      <Row className=''>
        <Col sm={12} md={6} lg={4} className='w-100'>
          <div className='d-flex align-items-centre justify-content-between border rounded-3  age-box '>
            <div className=' age-box-content '>
            <p className='fw-bold'style={{fontSize:'16px'}}>Age Limit:</p>
            <p style={{fontSize:'12px'}}>06 to 10</p>
            </div>
            <button  className=' rounded-4 ctn-btn border-0 w-50 m-1 fw-bold'>Continue</button>
          </div>
        </Col>
      </Row>
      </div>
    </div>
     



    </>
  )
}

export default ActivityDetailsInnerpage1