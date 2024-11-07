import "./Hero.css";
import { CustomButton } from "../CustomButton/CustomButton";
import { Col, Container, Row } from "react-bootstrap";

export const Hero = () => {
  return (
    <Container
      fluid
      className="hero d-flex justify-content-center align-items-center"
    >
      <Row>
        <Col className="col-md-8 d-flex flex-column align-items-start gap-4">
          <h2 className="w-medium white">
            Thousands of books. Unlimited potential.
          </h2>
          <h4 className="w-light white">
            Inspire a lifetime of reading and discovery with our award-winning
            digital library.
          </h4>
        </Col>
      </Row>
    </Container>
  );
};
