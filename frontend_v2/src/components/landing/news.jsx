import React from "react";
import "./news.css";
import { Link } from "react-router";

const News = () => {
  return (
    <div className="landing-news-container">
      <div className="landing-news-header-container">
        <div className="landing-news-headings">
          <h5 className="m-0">Kidgage News</h5>
          <h6 className="m-0">Fun that shapes the future.</h6>
        </div>
        <div className="landing-news-header-btn">
          <Link to="/kidgage-news">MORE</Link>
        </div>
      </div>
      <div className="landing-news-content-container">
        <div className="landing-news-card">
          <div className="artical-image-container">
            <img
              src="https://s3-alpha-sig.figma.com/img/89db/7202/fea4688a1ca00dab3929136e12a4b588?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UnW4FYdXc6x0z78DisdF2jACOO7ZILAd1x4I88n0WSvc9TVr6N6CmJNyv4nbxFlb3sM6L5-B~XKYwcNBAGK~tbP9We46g8n7LLeIZPoCtxwRFlO9s3xKQoJ2VOVAkNn47vkJtMAGAcVvKF2B3aZ8~ruSqmUAi-jZ37x7ZPCvylNP3LiJ7OVkDbILucePrXsoAgFv9WcvL7IdfX-6bEOIAVTERdBewqq8UqCQ5WkhX6SB89SKSADthvdfz9FS6pZ28zo3WLoKblfaIQuc8p~BgQV~7rOjtw8S9ZzVTqMF6y1-~y7mBQQpq9HSREIEU8b3De87RSKlM3JYVZEbv4xkbA__"
              alt="image"
            />
          </div>
          <div className="artical-container">
            <div className="artical-header">
              <h5 className="m-0">Kidgage News</h5>
              <h6 className="m-0">Fun that shapes the future.</h6>
            </div>
            <div className="artical-content">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptatem, similique ratione eligendi iusto aliquid distinctio
                dicta? Necessitatibus eveniet laboriosam quis reiciendis, qui
                perspiciatis ab corrupti veritatis ratione aperiam, amet
                repellat.
              </p>
            </div>
          </div>
        </div>
        <div className="landing-news-card">
          <div className="artical-image-container">
            <img
              src="https://s3-alpha-sig.figma.com/img/89db/7202/fea4688a1ca00dab3929136e12a4b588?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UnW4FYdXc6x0z78DisdF2jACOO7ZILAd1x4I88n0WSvc9TVr6N6CmJNyv4nbxFlb3sM6L5-B~XKYwcNBAGK~tbP9We46g8n7LLeIZPoCtxwRFlO9s3xKQoJ2VOVAkNn47vkJtMAGAcVvKF2B3aZ8~ruSqmUAi-jZ37x7ZPCvylNP3LiJ7OVkDbILucePrXsoAgFv9WcvL7IdfX-6bEOIAVTERdBewqq8UqCQ5WkhX6SB89SKSADthvdfz9FS6pZ28zo3WLoKblfaIQuc8p~BgQV~7rOjtw8S9ZzVTqMF6y1-~y7mBQQpq9HSREIEU8b3De87RSKlM3JYVZEbv4xkbA__"
              alt="image"
            />
          </div>
          <div className="artical-container">
            <div className="artical-header">
              <h5 className="m-0">Kidgage News</h5>
              <h6 className="m-0">Fun that shapes the future.</h6>
            </div>
            <div className="artical-content">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptatem, similique ratione eligendi iusto aliquid distinctio
                dicta? Necessitatibus eveniet laboriosam quis reiciendis, qui
                perspiciatis ab corrupti veritatis ratione aperiam, amet
                repellat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
