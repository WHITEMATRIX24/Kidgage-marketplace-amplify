import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Banner from "../../components/common/banner/banner";
import "./KidgageNews.css";
import { getKidgageNewsApi } from "../../services/allApis";
import demoImg2 from "../../assets/Screenshot 2024-11-10 at 10.14.51 PM 10 (1).png";
import demoImg1 from "../../assets/newsimg.png";
import { Link } from "react-router";
import { useNavigate } from "react-router";
const KidgageNews = () => {
  const [newsData, setNewsData] = useState({
    isLoading: true,
    news: [],
  });
  const navigate = useNavigate();

  // for demo pourpose
  const demoNews = [
    {
      image: demoImg1,
      title: "Kidgage News",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto cupiditate cumque modi voluptate, autem assumenda consectetur possimus atque, deleniti, vero sunt. A necessitatibus facilis odio ipsum officia amet reprehenderit voluptatibus!",
    },
    {
      image: demoImg2,
      title: "Kidgage News",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto cupiditate cumque modi voluptate, autem assumenda consectetur possimus atque, deleniti, vero sunt. A necessitatibus facilis odio ipsum officia amet reprehenderit voluptatibus!",
    },
  ];

  // Fetch initial news data
  const getNewsInitialData = async () => {
    try {
      const data = await getKidgageNewsApi();
      if (data) {
        setNewsData({ news: data, isLoading: false });
      } else {
        setNewsData({ isLoading: false, news: [...demoNews] });
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNewsData({ isLoading: false, news: [...demoNews] });
    }
  };
  const navigateToDetailedNews = (newsId) => {
    navigate(`/detailed-blog/${newsId}`);
  };

  useEffect(() => {
    getNewsInitialData();
  }, []);

  return (
    <div className="justify-content-center w-100">
      <div className="news-banner-container">
        <Banner />
      </div>

      {/* Main Content */}
      <Container className="text-left px-0 w-100">
        <h1 className="news-header">Our Blogs</h1>
        <p className="tagline mb-4">Latest for kids and parents.</p>

        {/* Check Loading State */}
        {newsData.isLoading ? (
          <p>Loading news...</p>
        ) : (
          <Row className="custom-row g-4 w-100">
            {/* Render News Cards */}
            {newsData.news.map((news, index) => (
              <Col
                key={index}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                className="d-flex justify-content-flex-start"
              >
                <Card style={{ border: "none" }}>

                  <div className="news-card-container" onClick={() => navigateToDetailedNews(news._id)}>

                    {/* Left: Image */}
                    <div className="news-img-container">

                      <img
                        src={news.image} // Dynamically use the image URL
                        alt={news.title}
                        className="news-img"
                      />
                    </div>

                    {/* Right: Text Content */}
                    <Card.Body style={{ flex: 2 }}>
                      <Card.Title className="fw-bold">
                        <h2 className="fw-bold">{news.title}</h2>{" "}
                        {/* Dynamic Title */}
                      </Card.Title>
                      <Card.Text
                        style={{
                          fontSize: "14px", textAlign: "justify", display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 5, // Change this number to adjust the number of visible lines
                          overflow: "hidden",
                        }}
                      >
                        {news.description} {/* Dynamic Description */}
                      </Card.Text>
                    </Card.Body>

                  </div>

                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default KidgageNews;
