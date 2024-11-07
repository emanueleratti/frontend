import { ListGroup, Button, FloatingLabel, Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import editImg from "../../assets/create.svg";
import editImgWhite from "../../assets/create_white.svg";
import deleteImg from "../../assets/trash.svg";
import deleteImgWhite from "../../assets/trash_white.svg";
import { ThemeContext } from "../../context/ThemeContext";
import { BooksContext } from "../../context/BooksContext.jsx";

export const ReviewArea = ({ bookDetail, id }) => {
  const { setError } = useContext(BooksContext);
  const [reviews, setReviews] = useState([]);
  const [inputValue, setInputValue] = useState({ review: "", rate: "" });
  const { isDarkMode } = useContext(ThemeContext);
  const [editReview, setEditReview] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);
  const [user, setUser] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const getUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/username/${currentUser.username}`
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.user._id);
      } else {
        console.error("Errore nel recupero dell'utente");
      }
    } catch (error) {
      console.error("Errore nel recupero dell'utente:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleEditReview = (index) => {
    setEditReview(true);
    setEditReviewId(reviews[index]._id);
    const selectedReview = reviews[index];
    setInputValue({
      review: selectedReview.review,
      rate: selectedReview.rate,
    });
  };

  const handleCancelEdit = () => {
    setEditReview(false);
    setInputValue({ review: "", rate: "" });
  };

  const onChangeInput = (event) => {
    const parseRate =
      event.target.name === "rate"
        ? Number(event.target.value)
        : event.target.value;
    setInputValue({
      ...inputValue,
      [event.target.name]: parseRate,
    });
  };

  // GET REVIEW
  const getReview = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/books?id=${id}`
      );

      if (response.ok) {
        const result = await response.json();

        if (result.books && result.books[0].reviews) {
          const reviewsWithUsernames = result.books[0].reviews.map(
            (review) => ({
              ...review,
              username: review.user.username,
            })
          );

          setReviews(reviewsWithUsernames);
        } else {
          setReviews([]);
          setError("No reviews found");
        }
        setEditReview(false);
      } else {
        setError("Error fetching reviews");
      }
    } catch (error) {
      setError("An error occurred while searching");
    }
  };

  // POST REVIEW
  const postReview = async (event) => {
    event.preventDefault();

    if (!currentUser) {
      alert("You must be logged in to send a review");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/reviews/create`,
        {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify({
            ...inputValue,
            user: user,
            book: id,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert("Review sent successfully");
        getReview();
        setInputValue({ review: "", rate: "" });
        return result;
      } else {
        alert("Error publishing review");
      }
    } catch (error) {
      console.log("Error publishing review:", error);
    }
  };

  // EDIT REVIEW
  const updateReview = async (reviewId, updatedData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/reviews/${reviewId}`,
        {
          method: `PATCH`,
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert("Review updated successfully");
        getReview(); // Refresh the reviews list
        setInputValue({ review: "", rate: "" }); // Reset input fields
        setEditReview(false); // Exit edit mode
        return result;
      } else {
        alert("Error updating review");
      }
    } catch (error) {
      console.log("Error updating review:", error);
    }
  };

  // DELETE REVIEW
  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/reviews/${reviewId}`,
        {
          method: `DELETE`,
        }
      );

      if (response.ok) {
        alert("Review deleted successfully");
        getReview(); // Refresh the reviews list
      } else {
        alert("Error deleting review");
      }
    } catch (error) {
      console.log("Error deleting review:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getReview();
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editReview) {
      updateReview(editReviewId, inputValue);
    } else {
      postReview(event);
    }
  };

  return (
    <>
      <h5 className="mb-0">Recensioni di</h5>
      <h4 className="primary">"{bookDetail.title}"</h4>
      <ListGroup variant="flush">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ListGroup.Item
              key={`review-${index}`}
              className={`${isDarkMode ? "dark-background" : "light-background"} px-0 py-3`}
            >
              <div className="d-flex gap-1 justify-content-between">
                <div
                  className={`${isDarkMode ? "lg-grey" : "black"} d-flex flex-column`}
                >
                  <div>
                    <strong>Author:</strong> {review.user}
                  </div>
                  <div>
                    <strong>Review:</strong> {review.review}
                  </div>
                  <div>
                    <strong>Rate:</strong> {review.rate}
                  </div>
                </div>
                <div className="d-flex gap-2 flex-column justify-content-center">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditReview(index)}
                  >
                    {isDarkMode === true ? (
                      <img src={editImgWhite} alt="" width={25} />
                    ) : (
                      <img src={editImg} alt="" width={25} />
                    )}{" "}
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteReview(review._id)}
                  >
                    {isDarkMode === true ? (
                      <img src={deleteImgWhite} alt="" width={25} />
                    ) : (
                      <img src={deleteImg} alt="" width={25} />
                    )}
                  </a>
                </div>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item
            className={`${isDarkMode ? "dark-background" : "light-background"} px-0 py-3`}
          >
            <span className={`${isDarkMode ? "lg-grey" : "black"}`}>
              Non ci sono recensioni per questo libro
            </span>
          </ListGroup.Item>
        )}
      </ListGroup>
      <Form className="w-100" onSubmit={handleSubmit}>
        <FloatingLabel className="mb-2" label="Lascia una recensione">
          <Form.Control
            type="textarea"
            name="review"
            required={true}
            value={inputValue.review}
            placeholder="Lascia una recensione"
            onChange={onChangeInput}
          />
        </FloatingLabel>
        <FloatingLabel className="mb-3" label="Lascia il tuo voto">
          <Form.Control
            type="number"
            name="rate"
            required={true}
            value={inputValue.rate}
            placeholder="Lascia il tuo voto"
            onChange={onChangeInput}
            min={1}
            max={5}
          />
        </FloatingLabel>
        {editReview ? (
          <div className="d-flex gap-2">
            <Button variant="warning" className="rounded-5" type="Submit">
              Aggiorna
            </Button>
            <Button
              onClick={handleCancelEdit}
              variant="danger"
              className="rounded-5"
              type="button"
            >
              Annulla
            </Button>
          </div>
        ) : (
          <Button variant="success" className="rounded-5" type="Submit">
            Invia
          </Button>
        )}
      </Form>
    </>
  );
};
