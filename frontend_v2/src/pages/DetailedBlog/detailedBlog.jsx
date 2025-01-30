import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { dateFormater } from "../../utils/dateFormater";
import {
  getNewsDetailsByIdApi,
  getOtherNewsDetailsApi,
} from "../../services/allApis";
import "./detailedBlog.css";
import { handleShare } from "../../utils/share";
import { useNavigate } from "react-router";
const Detailedblog = () => {
  const [newsDetails, setNewsDetails] = useState(null);
  const { newsId } = useParams();
  const [otherNews, setOtherNews] = useState([]);
  console.log("newsId:", newsId);
  const navigate = useNavigate();
  const fetchNewsDetails = async () => {
    try {
      console.log({ newsId });
      const data = await getNewsDetailsByIdApi({ newsId });
      console.log("Fetched data:", data); // Log the fetched data
      if (data) {
        setNewsDetails(data);
      } else {
        console.log("No data found for the given newsId");
      }
    } catch (error) {
      console.error("Error fetching news details:", error);
    }
  };
  const fetchOtherNews = async () => {
    try {
      const data = await getOtherNewsDetailsApi({ newsId });
      if (Array.isArray(data)) {
        setOtherNews(data); // Only set if it's an array
      } else {
        console.error("Expected an array for other news, but got", data);
        setOtherNews([]); // Set an empty array in case of unexpected data
      }
    } catch (error) {
      console.error("Error fetching other news:", error);
      setOtherNews([]); // Set empty array in case of error
    }
  };

  useEffect(() => {
    if (newsId) {
      fetchNewsDetails();
      fetchOtherNews();
    } else {
      console.log("News ID is not available!");
    }
  }, [newsId]);
  const navigateToDetailedNews = (newsId) => {
    navigate(`/detailed-blog/${newsId}`);
  };
  if (!newsDetails) return <p>Loading...</p>;
  return (
    <div className="detailedblog-layout">
      <div className="detailedblog-left-container">
        <div className="detailed-blog-image">
          <img src={newsDetails.image} alt="" />
        </div>
        {/* on small screen */}
        <div className="detailedblog-right-container-onSmallscreen">
          <div className="detailedblog-share-btn">
            <button>share</button>
          </div>
          <div className="detailedblog-content-header">
            <h3>{newsDetails.title}</h3>
            <p>{dateFormater(newsDetails.publishedOn)}</p>
          </div>
          <div className="detailedblog-content">
            {/* <h6>Surprise! We're back with</h6> */}
            {/* <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
              explicabo cumque. Fuga libero, distinctio quasi, necessitatibus
              tempora itaque, mollitia ab voluptates ex sunt odio modi
              accusantium rem non a nemo?Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Nobis soluta nemo facere, modi non officiis cum
              omnis molestias? Suscipit est dolores minima quas debitis autem
              ullam quia voluptatum, praesentium delectus. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Fugiat, explicabo cumque. Fuga
              libero, distinctio quasi, necessitatibus tempora itaque, mollitia
              ab voluptates ex sunt odio modi accusantium rem non a nemo?Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nobis soluta
              nemo facere, modi non officiis cum omnis molestias? Suscipit est
              dolores minima quas debitis autem ullam quia voluptatum,
              praesentium delectus. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fugiat, explicabo cumque. Fuga libero,
              distinctio quasi, necessitatibus tempora itaque, mollitia ab
              voluptates ex sunt odio modi accusantium rem non a nemo?Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nobis soluta
              nemo facere, modi non officiis cum omnis molestias? Suscipit est
              dolores minima quas debitis autem ullam quia voluptatum,
              praesentium delectus. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fugiat, explicabo cumque. Fuga libero,
              distinctio quasi, necessitatibus tempora itaque, mollitia ab
              voluptates ex sunt odio modi accusantium rem non a nemo?Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nobis soluta
              nemo facere, modi non officiis cum omnis molestias? Suscipit est
              dolores minima quas debitis autem ullam quia voluptatum,
              praesentium delectus. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fugiat, explicabo cumque. Fuga libero,
              distinctio quasi, necessitatibus tempora itaque, mollitia ab
              voluptates ex sunt odio modi accusantium rem non a nemo?Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nobis soluta
              nemo facere, modi non officiis cum omnis molestias? Suscipit est
              dolores minima quas debitis autem ullam quia voluptatum,
              praesentium delectus. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fugiat, explicabo cumque. Fuga libero,
              distinctio quasi, necessitatibus tempora itaque, mollitia ab
              voluptates ex sunt odio modi accusantium rem non a nemo?Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nobis soluta
              nemo facere, modi non officiis cum omnis molestias? Suscipit est
              dolores minima quas debitis autem ullam quia voluptatum,
              praesentium delectus. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fugiat, explicabo cumque. Fuga libero,
              distinctio quasi, necessitatibus tempora itaque, mollitia ab
              voluptates ex sunt odio modi accusantium rem non a nemo?Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nobis soluta
              nemo facere, modi non officiis cum omnis molestias? Suscipit est
              dolores minima quas debitis autem ullam quia voluptatum,
              praesentium delectus.
            </p> */}
            <p style={{ fontSize: "16px" }}>{newsDetails.description}</p>
          </div>
        </div>
        {/* ///// */}
        <div className="detailedblog-more-container">
          <div className="detailedblog-moreblog-header">
            <h3>More Blogs</h3>
            <p>Suggested</p>
          </div>
          <div className="detailedblog-more-card-container">
            {otherNews.map((news) => (
              <div className="detailedblog-card" key={news._id} onClick={() => navigateToDetailedNews(news._id)}>
                <div className="detailedblog-card-image">
                  <img src={news.image} alt={news.title} />
                </div>
                <div className="detailedblog-card-content">
                  <h3>{news.title}</h3>
                  <p>{dateFormater(news.publishedOn)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="detailedblog-right-container">
        <div className="detailedblog-share-btn">
          <button
            onClick={() =>
              handleShare({
                courseName: newsDetails.title,
                courseDesc: newsDetails.description,
              })
            }
          >
            share
          </button>
        </div>
        <div className="detailedblog-content-header">
          <h3>{newsDetails.title}</h3>
          <p>{dateFormater(newsDetails.publishedOn)}</p>
        </div>
        <div className="detailedblog-content">
          {/* <h6>Surprise! We're back with</h6> */}
          <p style={{ fontSize: "16px" }}>{newsDetails.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Detailedblog;
