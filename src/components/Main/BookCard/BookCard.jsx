import { useContext } from "react";
import { Button, Col } from "react-bootstrap";
import "./BookCard.css";
import { ThemeContext } from "../../../context/ThemeContext";
import cartImg from "../../../assets/cart.svg";
import { useNavigate } from "react-router-dom";

export const BookCard = ({ price, category, title, img, _id }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const navigate = useNavigate();
  const navigateToDetailPage = () => {
    navigate(`/book/details/${_id}`);
  };

  return (
    <>
      <Col
        className="col-4 col-md-3 col-lg-2"
        onClick={navigateToDetailPage}
        style={{ cursor: "pointer" }}
      >
        <div
          className={`${isDarkMode ? "dark-card" : "light-card"} book-card rounded-4 overflow-hidden`}
          data-testid="book-card"
        >
          <h6 className="category">{category}</h6>
          <div className="top d-flex justify-content-center">
            <img className="w-100 object-fit-cover" src={img} alt="img" />
          </div>
          <div className="bottom pt-3 p-2 d-flex flex-column">
            <h5 className="text-truncate">{title}</h5>
            <h6 className="primary">{`€ ${price}`}</h6>
            <div className="d-flex gap-2 justify-content-between">
              <Button
                onClick={navigateToDetailPage}
                className="button filled-primary flex-grow-1"
                alt="dettagli"
              >
                Dettagli
              </Button>
              <Button className="button icon-button filled-primary d-flex align-items-center">
                <img src={cartImg} alt="" width={20} />
              </Button>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};
