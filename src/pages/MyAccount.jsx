import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";
import { PageLayout } from "../layouts/PageLayout";
import { Loader } from "../components/Loader/Loader";
import BookForm from "../components/BookForm/BookForm.jsx";

export const MyAccount = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/username/${currentUser.username}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
      } else {
        console.error("Failed to fetch user data, status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return <Loader data-testid="loader" />;
  }

  if (!userData) {
    return <div>User data not available</div>;
  }

  return (
    <>
      <PageLayout>
        <Container
          fluid
          className={`
      ${isDarkMode ? "dark-main-bg" : "light-main-bg"} main  py-5 vh-100`}
        >
          <Row>
            <Col>
              <Container fluid className="d-flex flex-column gap-5">
                <Row>
                  <Col>
                    <h3
                      className={`${isDarkMode ? "lg-grey" : "black"} text-center`}
                    >
                      My Account
                    </h3>
                  </Col>
                </Row>
                <Row className="user-dashboard">
                  <Col className="col-12">
                    <h4 className="text-center secondary">
                      Welcome, {userData.name}!
                    </h4>
                    <div
                      className={`${isDarkMode ? "lg-grey" : "black"} user-details justify-content-center d-flex gap-3`}
                    >
                      <p>
                        <strong>Email:</strong> {userData.email}
                      </p>
                      <p>
                        <strong>Username:</strong> {userData.username}
                      </p>
                      <p>
                        <strong>Date of Birth:</strong>{" "}
                        {new Date(userData.dob).toLocaleDateString()}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-12">
                    <BookForm />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </PageLayout>
    </>
  );
};
