import { Col, Container, Row } from "react-bootstrap";
import facebookImg from "../../assets/logo-facebook.svg";
import instagramImg from "../../assets/logo-instagram.svg";
import pinterestImg from "../../assets/logo-pinterest.svg";
import tiktokImg from "../../assets/logo-tiktok.svg";
import twitterImg from "../../assets/logo-twitter.svg";
import youTubeImg from "../../assets/logo-youtube.svg";
import "./Footer.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <Container
      fluid
      className={`${isDarkMode ? "dark-footer-bg" : "light-footer-bg"} footer d-flex justify-content-center`}
    >
      <Row>
        <Col>
          <Container>
            <Row className="d-flex flex-column align-items-center pt-5 pb-4">
              <Col className="col-8 d-flex flex-column align-items-center gap-4">
                <Container>
                  <Row className="d-flex justify-content-center">
                    <Col className="col-6 d-flex justify-content-evenly gap-2">
                      <img src={facebookImg} alt="" width={30} />
                      <img src={instagramImg} alt="" width={30} />
                      <img src={youTubeImg} alt="" width={30} />
                      <img src={twitterImg} alt="" width={30} />
                      <img src={pinterestImg} alt="" width={30} />
                      <img src={tiktokImg} alt="" width={30} />
                    </Col>
                  </Row>
                </Container>
                <p className="grey text-center m-0 p-big">
                  Epic is the leading digital reading platform — built on a
                  collection of 40,000 popular, high-quality books from 250+ of
                  the world's best publishers — that safely fuels curiosity and
                  reading confidence for kids 12 and under.
                </p>
                <div className="divider"></div>
                <Container className="py-2">
                  <Row>
                    <Col className="col-md-3 d-flex flex-column gap-1">
                      <a href="">
                        <h6 className="mb-4">EPIC</h6>
                      </a>
                      <a href="">
                        <h6>Epic Originals</h6>
                      </a>
                      <a href="">
                        <h6>Books</h6>
                      </a>
                      <a href="">
                        <h6>Gifts</h6>
                      </a>
                      <a href="">
                        <h6>Redeem Gift</h6>
                      </a>
                    </Col>
                    <Col className="col-md-3 d-flex flex-column gap-1">
                      <a href="">
                        <h6 className="mb-4">FOR EDUCATORS</h6>
                      </a>
                      <a href="">
                        <h6>Epic School</h6>
                      </a>
                      <a href="">
                        <h6>Educator Resources</h6>
                      </a>
                      <a href="">
                        <h6>School Privacy Promise</h6>
                      </a>
                    </Col>
                    <Col className="col-md-3 d-flex flex-column gap-1">
                      <a href="">
                        <h6 className="mb-4">ABOUT</h6>
                      </a>
                      <a href="">
                        <h6>About Epic</h6>
                      </a>
                      <a href="">
                        <h6>Careers</h6>
                      </a>
                      <a href="">
                        <h6>Press</h6>
                      </a>
                      <a href="">
                        <h6>Testimonials</h6>
                      </a>
                    </Col>
                    <Col className="col-md-3 d-flex flex-column gap-1">
                      <a href="">
                        <h6 className="mb-4">CONTACT US</h6>
                      </a>
                      <a href="">
                        <h6>Help & Support</h6>
                      </a>
                      <a href="">
                        <h6>Press Inquiries</h6>
                      </a>
                      <a href="">
                        <h6>Publisher Inquiries</h6>
                      </a>
                      <a href="">
                        <h6>Redeem Gift</h6>
                      </a>
                    </Col>
                  </Row>
                </Container>
                <Container>
                  <Row>
                    <Col className="d-flex justify-content-evenly gap-2">
                      <p className="m-0 grey p-small">
                        © Copyright Epic! Creations, Inc. All rights reserved.
                      </p>
                      <p className="m-0 grey p-small">Terms & Conditions</p>
                      <p className="m-0 grey p-small">Privacy Policy</p>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
