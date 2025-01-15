import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import banner from '../../assets/banner.png';
import Banner from '../../components/common/banner/banner';
import newsimg from '../../assets/Screenshot 2024-11-10 at 10.14.51 PM 10 (1).png';
import './KidgageNews.css';

const KidgageNews = () => {
    return (
        <div className="justify-content-center w-100">
            <div>
                <Banner />
            </div>

            {/* Main Content */}
            <Container className="text-left px-0 w-100">
                <h1 className="news-header">Kidgage News</h1>

                <p className="tagline mb-4">Fun that shapes the future.</p>

                {/* News Cards */}
                <Row className="custom-row g-4  w-100">

                    {[1, 2, 3, 4].map((item, index) => (
                        <Col key={index} sm={12} md={12} lg={6} xl={6} className="d-flex justify-content-center">
                            <Card
                            >
                                <div className="news-card-container">
                                    {/* Left: Image */}
                                    <div className="news-img-container">
                                        <img
                                            src={newsimg} // Replace with the actual path to your image
                                            alt="Kidgage News"
                                            className="news-img"
                                        />
                                    </div>

                                    {/* Right: Text Content */}
                                    <Card.Body style={{ flex: 2 }}>
                                        <Card.Title className="fw-bold">
                                            <h2 className='fw-bold'>Kidgage News</h2> {/* Bold text */}
                                        </Card.Title>
                                        <Card.Subtitle
                                            style={{ paddingTop: '5px', paddingBottom: '10px' }}
                                            className="mb-2"
                                        >
                                            Fun that shapes the future.
                                        </Card.Subtitle>
                                        <Card.Text style={{ fontSize: '14px', textAlign: "justify" }}>
                                            Partner with us to connect with families who value growth and health.
                                            Together, let’s inspire progress and create brighter futures for the next
                                            generation! A smarter way to nurture your child’s growth and well-being.
                                        </Card.Text>
                                    </Card.Body>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default KidgageNews;
