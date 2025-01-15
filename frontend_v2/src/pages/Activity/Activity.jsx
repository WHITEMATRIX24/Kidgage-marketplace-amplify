import React from "react";
import Banner from "../../components/common/banner/banner";
import Search from "../../components/common/search/search";
import AcitivityImage1 from '../../assets/Activity1.png';
import AcitivityImage4 from '../../assets/Activity4.png';
import AcitivityImage2 from '../../assets/Activity2.png';
import AcitivityImage3 from '../../assets/Activity3.png';
import { Link } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import './Activity.css'
function ActivityPage() {
    return (
        <div className="d-flex flex-column gap-5 pb-5">

            <Search />
            <Banner />
            <div className="activitypage-container w-100">
                <h1 className="text-align-left fw-bold"> Football</h1>
                <h5 className="pb-3">Fun That Shapes The Future</h5>
                <div className="activity-grid-container">
                    <div className="activity-tile">
                        <Link to={'/activity-details'}>
                            <img src={AcitivityImage1} className="img-fluid" alt="Image 1" />
                        </Link>
                        <h6 className="fw-bold pt-3 text-align-left">Football Camp Name</h6>
                        <p className="text-align-left" style={{ marginBottom: "0" }}>Location: City, Country</p>
                        <p>Available Dates: Jan 15 - Jan 20</p>
                    </div>
                    <div className="activity-tile">
                        <Link to={'/activity-details'}>
                            <img src={AcitivityImage2} className="img-fluid" alt="Image 2" />
                        </Link >
                        <h6 className="fw-bold pt-3 text-align-left">Football Camp Name</h6>
                        <p className="text-align-left" style={{ marginBottom: "0" }}>Location: City, Country</p>
                        <p>Available Dates: Feb 5 - Feb 10</p>
                    </div>
                    <div className="activity-tile">
                        <img src={AcitivityImage3} className="img-fluid" alt="Image 3" />
                        <h6 className="fw-bold pt-3 text-align-left">Football Camp Name</h6>
                        <p className="text-align-left" style={{ marginBottom: "0" }}>Location: City, Country</p>
                        <p>Available Dates: Mar 12 - Mar 18</p>
                    </div>
                    <div className="activity-tile">
                        <img src={AcitivityImage4} className="img-fluid" alt="Image 4" />
                        <h6 className="fw-bold pt-3 text-align-left">Football Camp Name</h6>
                        <p className="text-align-left" style={{ marginBottom: "0" }}>Location: City, Country</p>
                        <p>Available Dates: Apr 10 - Apr 15</p>
                    </div>
                    <div className="activity-tile">
                        <img src={AcitivityImage1} className="img-fluid" alt="Image 5" />
                        <h6 className="fw-bold pt-3 text-align-left">Football Camp Name</h6>
                        <p className="text-align-left pb-0" style={{ marginBottom: "0" }}>Location: City, Country</p>
                        <p>Available Dates: May 2 - May 7</p>
                    </div>
                    <div className="activity-tile">
                        <img src={AcitivityImage1} className="img-fluid" alt="Image 1" />
                        <h6 className="fw-bold pt-3 text-align-left">Football Camp Name</h6>
                        <p className="text-align-left" style={{ marginBottom: "0" }}>Location: City, Country</p>
                        <p>Available Dates: Jan 15 - Jan 20</p>
                    </div>
                    <div className="activity-tile">
                        <img src={AcitivityImage3} className="img-fluid" alt="Image 3" />
                        <h6 className="fw-bold pt-3 text-align-left">Football Camp Name</h6>
                        <p className="text-align-left" style={{ marginBottom: "0" }}>Location: City, Country</p>
                        <p>Available Dates: Mar 12 - Mar 18</p>
                    </div>
                </div>


            </div >


        </div >
    )
}
export default ActivityPage;