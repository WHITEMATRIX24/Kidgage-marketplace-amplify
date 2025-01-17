import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "../../components/common/banner/banner";
import "./TermsAndConditions.css";

const PrivacyPolicy = () => {
    return (
        <div className="terms-container">

            <div className="tandc-banner-container text-center">
                <Banner />
            </div>

            <div className="content-container ">
                <h1 className="tandc-header text-left fw-bold ">Privacy Policy</h1>
                <h6 className="tandc-text text-left">Fun that shapes the future.</h6>
                <p style={{ textAlign: 'justify' }}>
                    Sporthood Academy for Football brings the latest in coaching methodologies to take your budding football star from grassroots to greatness. AFC and FIFA licensed coaches impart age-appropriate international curriculum to the kids with the primary aim of moulding them into professional footballers.
                    Sporthood Academy for Football brings the latest in coaching methodologies to take your budding football star from grassroots to greatness. AFC and FIFA licensed coaches impart age-appropriate international curriculum to the kids with the primary aim of moulding them into professional footballers.
                    Sporthood Academy for Football brings the latest in coaching methodologies to take your budding football star from grassroots to greatness. AFC and FIFA licensed coaches impart age-appropriate international curriculum to the kids with the primary aim of moulding them into professional footballers.                </p>

            </div>

        </div>
    );
};
export default PrivacyPolicy;


