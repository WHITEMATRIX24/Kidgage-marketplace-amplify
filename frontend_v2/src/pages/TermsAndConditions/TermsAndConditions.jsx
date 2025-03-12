import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "../../components/common/banner/banner";
import "./TermsAndConditions.css";
import axios from 'axios';
import { getTermsAndConditionsApi } from "../../services/allApis";

const TermsAndConditions = () => {
    const [termData, setTermData] = useState([]); // Keep it as an array

    const fetchTermData = async () => {
        try {
            const result = await getTermsAndConditionsApi();
            console.log("Fetched Data:", result.data); // Debugging
            if (result.status === 200 && result.data.length > 0) {
                setTermData(result.data); // Store the entire array
            }
        } catch (error) {
            console.log(`Error fetching terms: ${error}`);
        }
    };

    useEffect(() => {
        fetchTermData();
    }, []);

    return (
        <div className="terms-container">
            <div className="tandc-banner-container text-center">
                <Banner />
            </div>

            <div className="content-container">
                <h1 className="tandc-header text-left fw-bold">Terms & Conditions</h1>
                <h6 className="tandc-text text-left">Fun that shapes the future.</h6>

                {/* Check if termData has data before accessing it */}
                {termData.length > 0 ? (
                    <div>

                        <p style={{ textAlign: 'justify', whiteSpace: 'pre-line' }}>{termData[0].terms}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default TermsAndConditions;
