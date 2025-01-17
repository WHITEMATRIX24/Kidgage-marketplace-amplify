import React, { useEffect, useState } from "react";
import "./topBrands.css";
import { getAllTopBrandsApi } from "../../services/allApis";

const TopBarands = () => {
  const [topBrands, setTopBrands] = useState([]);

  // initial data fetching
  const getTopBrandsInitialData = async () => {
    const data = await getAllTopBrandsApi();
    if (data) {
      setTopBrands(data);
    }
  };
  useEffect(() => {
    getTopBrandsInitialData();
  }, []);

  return (
    <div className="topBrands-container">
      <div className="topBrands-header">
        <h5 className="m-0 top-brands-heading">Top Brands</h5>
        <h6 className="m-0 top-brands-subheading">
          Fun that shapes the future
        </h6>
      </div>
      <div className="topBarands-content-container">
        {topBrands.length > 0 ? (
          topBrands.map((brand) => (
            <div className="topBrands-brand" key={brand._id}>
              <img src={brand.logo} alt="brand-logo" />
            </div>
          ))
        ) : (
          <p>No top brands</p>
        )}
      </div>
    </div>
  );
};

export default TopBarands;
