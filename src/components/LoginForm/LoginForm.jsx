import "./LoginForm.css";
import imgLogo from "../../assets/epic-logo-blue-solid.svg";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

export const LoginForm = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "emanuele.ratti88",
    password: "123456789",
  });

  const handlerInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.token) {
          localStorage.setItem("isAuth", data.token);
          localStorage.setItem("currentUser", JSON.stringify(data));
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          alert("Login response is missing data");
        }
      } else {
        console.log("Login failed, status:", response.status);
        alert("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGitHubLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/github`;
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col sm={4} className="d-flex flex-column gap-2">
          <a className="align-self-center" href="/">
            <img src={imgLogo} width={"150px"} alt="logo" />
          </a>
          <Form onSubmit={onSubmit}>
            <FloatingLabel className="mb-2" label="Username">
              <Form.Control
                name="username"
                type="text"
                value={formData.username}
                className={`${isDarkMode ? "dark-input-bg" : "light-input-bg"} rounded-5`}
                placeholder="username"
                onChange={handlerInput}
              />
            </FloatingLabel>
            <FloatingLabel className="mb-3" label="Password">
              <Form.Control
                name="password"
                type="text"
                value={formData.password}
                className={`${isDarkMode ? "dark-input-bg" : "light-input-bg"} rounded-5`}
                placeholder="password"
                onChange={handlerInput}
              />
            </FloatingLabel>
            <Button
              className="rounded-5 w-100 button filled-primary"
              type="submit"
            >
              Login
            </Button>
          </Form>
          <button
            className="rounded-5 w-100 button filled-primary"
            onClick={handleGitHubLogin}
          >
            Login con GitHub
          </button>
        </Col>
      </Row>
    </Container>
  );
};
