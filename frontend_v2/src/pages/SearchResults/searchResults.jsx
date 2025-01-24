import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { getSearchedActivitesApi } from "../../services/allApis";
import Search from "../../components/common/search/search";
import "./searchResults.css";
import { fromAndToDateFormatter } from "../../utils/dateFormater";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const locationData = searchParams.get("location");
  const genderData = searchParams.get("gender");
  const ageData = searchParams.get("age");

  const [searchData, setSearchData] = useState({ isLoading: true, data: [] });

  //   search data fetching
  const fetchSearchData = async () => {
    const data = await getSearchedActivitesApi({
      location: locationData ? locationData : "",
      gender: genderData ? genderData : "",
      age: ageData ? ageData : "",
    });
    if (data) setSearchData({ isLoading: false, data });
  };
  useEffect(() => {
    if (locationData || genderData || ageData) fetchSearchData();
  }, [locationData, genderData, ageData]);

  return (
    <>
      <Search />
      <div className="search-results-container">
        {searchData.isLoading === true ? (
          <p>loading....</p>
        ) : searchData.data.length <= 0 ? (
          <p>No data found</p>
        ) : (
          searchData.data.map((data) => (
            <Link
              to={`/activity-detail/${data._id}`}
              className="search-tile text-decoration-none text-black"
              key={data._id}
            >
              <img src={data.images[0]} className="img-fluid" alt="Image 1" />
              <h6 className="fw-bold pt-3 text-align-left">{data.name}</h6>
              <p className="text-align-left" style={{ marginBottom: "0" }}>
                Location: City, Country
              </p>
              <p>{fromAndToDateFormatter(data.startDate, data.endDate)}</p>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default SearchResults;
