import React, { useEffect, useState } from "react";
import "./news.css";
import { Link } from "react-router";
import { getlandingNewsApi } from "../../services/allApis";

const News = () => {
  const [landingNewsData, setLandingNewsData] = useState([]);

  // initial data fetching
  const initialLandingNewsData = async () => {
    const data = await getlandingNewsApi();
    if (data) {
      setLandingNewsData(data);
    }
  };
  useEffect(() => {
    initialLandingNewsData();
  }, []);

  return (
    <div className="landing-news-container">
      <div className="landing-news-header-container">
        <div className="landing-news-headings">
          <h5 className="m-0">Our Blogs</h5>
          <h6 className="m-0">The Latest for Kids and Parents</h6>
        </div>
        <div className="landing-news-header-btn">
          <Link to="/kidgage-news">MORE</Link>
        </div>
      </div>
      <div className="landing-news-content-container">
        {/* 1st */}
        {landingNewsData[0] && (
          <div className="landing-news-card">
            <div className="artical-image-container">
              <img src={landingNewsData[0].image} alt="image" />
            </div>
            <div className="artical-container">
              <div className="artical-header">
                <h5 className="m-0">{landingNewsData[0].title}</h5>
                {/* <h6 className="m-0">Fun that shapes the future.</h6> */}
              </div>
              <div className="artical-content">
                <p>{landingNewsData[0].description}</p>
              </div>
            </div>
          </div>
        )}
        {/* 2nd */}
        {landingNewsData[1] && (
          <div className="landing-news-card">
            <div className="artical-image-container">
              <img src={landingNewsData[1].image} alt="image" />
            </div>
            <div className="artical-container">
              <div className="artical-header">
                <h5 className="m-0">{landingNewsData[1].title}</h5>
                {/* <h6 className="m-0">Fun that shapes the future.</h6> */}
              </div>
              <div className="artical-content">
                <p>{landingNewsData[1].description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
