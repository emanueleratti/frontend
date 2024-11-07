import { PageLayout } from "../layouts/PageLayout";
import { Col, Container, Row } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";
import React, { useContext } from "react";

export const Contatti = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <PageLayout>
        <Container
          fluid
          className={`
      ${
        isDarkMode ? "dark-main-bg" : "light-main-bg"
      } main d-flex justify-content-center py-5 vh-100`}
        >
          <Row>
            <Col>
              <h3 className={`${isDarkMode ? "lg-grey" : "black"} text-center`}>
                Contatti
              </h3>
            </Col>
          </Row>
        </Container>
      </PageLayout>
    </>
  );
};
