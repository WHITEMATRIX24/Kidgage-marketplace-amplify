import React from "react";
import "./search.css";

const Search = () => {
  return (
    <div className="search-container">
      <div className="search-comp-text-container">
        <h5>Search</h5>
        <p>
          Looking to advertise an activity? We can help. Another set of
          illustrations I did a while ago for Looking to advertise an activity?
        </p>
      </div>
      <div className="search-comp-container">
        <div className="search-select-container">
          <div className="select-layout select-location">
            <select>
              <option disabled selected value="">
                Location
              </option>
            </select>
          </div>
          <div className="select-layout select-gender">
            <select>
              <option selected disabled value="">
                Men
              </option>
            </select>
          </div>
          <div className="select-layout select-age">
            <select>
              <option selected disabled value="">
                Age
              </option>
            </select>
          </div>
        </div>
        <div className="search-btn-container">
          <h6>Search your kid activities</h6>
          arrow
        </div>
      </div>
    </div>
  );
};

export default Search;
