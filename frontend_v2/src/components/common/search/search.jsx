import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
            <select defaultValue="default">
              <option disabled value="default">
                Location
              </option>
            </select>
          </div>
          <div className="select-layout select-gender">
            <select defaultValue="default">
              <option disabled value="default">
                Men
              </option>
            </select>
          </div>
          <div className="select-layout select-age">
            <select defaultValue="default">
              <option disabled value="default">
                Age
              </option>
            </select>
          </div>
        </div>
        <div className="search-btn-container">
          <h6>Search your kid activities</h6>
          <FontAwesomeIcon icon={faArrowRight} size="xl" />
        </div>
      </div>
    </div>
  );
};

export default Search;
