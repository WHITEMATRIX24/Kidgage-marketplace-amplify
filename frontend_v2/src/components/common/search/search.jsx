import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router";
import "./search.css";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialLocationvalue = searchParams.get("location");
  const initialGenderValue = searchParams.get("gender");
  const initialAgeValue = searchParams.get("age");
  const [searchQueries, setSearchQueries] = useState({
    location: initialLocationvalue ? initialLocationvalue : "",
    gender: initialGenderValue ? initialGenderValue : "",
    age: initialAgeValue ? initialAgeValue : "",
  });

  const locationSearchData = [
    "Doha",
    "Al Wakrah",
    "Al Khor",
    "Al Rayyan",
    "Al Shamal",
    "Al Daayen",
    "Al Shahaniya",
    "Umm Salal",
    "Dukhan",
    "Mesaieed",
  ];
  const ageRangesData = [
    {
      title: "0-2 years",
      value: {
        startAge: 0,
        endAge: 2,
      },
    },
    {
      title: "3-5 years",
      value: {
        startAge: 3,
        endAge: 5,
      },
    },
    {
      title: "6-8 years",
      value: {
        startAge: 6,
        endAge: 8,
      },
    },
    {
      title: "9-12 years",
      value: {
        startAge: 9,
        endAge: 12,
      },
    },
    {
      title: "13-17 years",
      value: {
        startAge: 13,
        endAge: 17,
      },
    },
  ];

  // handle search query changes
  const locationChangeHandler = (e) => {
    setSearchQueries({ ...searchQueries, location: e.target.value });
  };
  const genderChangeHandler = (e) => {
    setSearchQueries({ ...searchQueries, gender: e.target.value });
  };
  const ageChangeHandler = (e) => {
    setSearchQueries({ ...searchQueries, age: e.target.value });
  };

  // search Handler
  const handleSearch = () => {
    const { age, gender, location } = searchQueries;

    if (!age && !location && !gender) return;
    let searchQuery = ``;
    if (location) searchQuery += `location=${encodeURIComponent(location)}&`;
    if (gender) searchQuery += `gender=${encodeURIComponent(gender)}&`;
    if (age) searchQuery += `age=${encodeURIComponent(age)}`;
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="search-container" id="search-component">
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
            <select
              value={searchQueries.location}
              onChange={locationChangeHandler}
            >
              <option disabled value="">
                Location
              </option>
              {locationSearchData.map((location, index) => (
                <option value={location} key={index}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="select-layout select-gender">
            <select value={searchQueries.gender} onChange={genderChangeHandler}>
              <option disabled value="">
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Any">Any</option>
            </select>
          </div>
          <div className="select-layout select-age">
            <select value={searchQueries.age} onChange={ageChangeHandler}>
              <option disabled value="">
                Age
              </option>
              {ageRangesData.map((age, index) => (
                <option value={JSON.stringify(age.value)} key={index}>
                  {age.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="search-btn-container" onClick={handleSearch}>
          <h6>Search your kid activities</h6>
          <FontAwesomeIcon icon={faArrowRight} size="xl" />
        </button>
      </div>
    </div>
  );
};

export default Search;
