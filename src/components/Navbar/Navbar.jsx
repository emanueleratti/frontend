import "./Navbar.css";
import { useContext } from "react";
import { Logo } from "./Logo/Logo.jsx";
import { NavLinks } from "./NavLinks/NavLinks.jsx";
import { Button, Container } from "react-bootstrap";
import { SearchBook } from "./SearchBook/SearchBook.jsx";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../../middlewares/ProtectedRoutes";

export const Navbar = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const currentUser = useSession();

  const handleButton = () => {
    if (currentUser) {
      navigate(`/myaccount`);
    } else {
      navigate(`/login`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <Container
      fluid
      className={`
      ${
        isDarkMode ? "dark-nav-bg" : "light-nav-bg"
      } navbar container-fluid d-flex justify-content-between align-items-center py-3 px-5 gap-5`}
      data-testid="navbar"
    >
      <Logo />
      <SearchBook />
      <NavLinks />
      <div className="d-flex gap-2">
        <Button className="button filled-secondary" onClick={handleButton}>
          {currentUser ? "MyAccount" : "Login"}
        </Button>{" "}
        {currentUser && (
          <Button className="button filled-secondary" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </Container>
  );
};
