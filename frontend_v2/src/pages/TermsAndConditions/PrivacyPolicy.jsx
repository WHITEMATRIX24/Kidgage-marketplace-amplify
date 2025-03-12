import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "../../components/common/banner/banner";
import "./TermsAndConditions.css";
import { getPrivacyPolicyApi } from "../../services/allApis";

const PrivacyPolicy = () => {
    const [policyData, setPolicyData] = useState([]); // Keep it as an array

    const fetchPolicyData = async () => {
        try {
            const result = await getPrivacyPolicyApi();
            console.log("Fetched Data:", result.data); // Debugging
            if (result.status === 200 && result.data.length > 0) {
                setPolicyData(result.data); // Store the entire array
            }
        } catch (error) {
            console.log(`Error fetching Policys: ${error}`);
        }
    };

    useEffect(() => {
        fetchPolicyData();
    }, []);
    return (
        <div className="terms-container">

            <div className="tandc-banner-container text-center">
                <Banner />
            </div>

            <div className="content-container ">
                <h1 className="tandc-header text-left fw-bold ">Privacy Policy</h1>
                <h6 className="tandc-text text-left">Fun that shapes the future.</h6>
                {policyData.length > 0 ? (
                    <div>

                        <p style={{ textAlign: 'justify', whiteSpace: 'pre-line' }}>{policyData[0].policy}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

        </div>
    );
};
export default PrivacyPolicy;


