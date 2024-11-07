import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { PageLayout } from "../layouts/PageLayout";
import { CustomButton } from "../components/CustomButton/CustomButton";
import "../components/Main/BookCard/BookCard.css";
import { ThemeContext } from "../context/ThemeContext";
import { ReviewArea } from "../components/ReviewArea/ReviewArea";
import { Loader } from "../components/Loader/Loader";
import { BooksContext } from "../context/BooksContext.jsx";
import { RelatedBooks } from "../components/RelatedBooks/RelatedBooks.jsx";

export const BookDetails = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { loading, setLoading, setError } = useContext(BooksContext);
  const [bookDetail, setBookDetail] = useState({});
  const { _id } = useParams();

  // GET BOOK DETAIL
  const getBook = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/books?id=${_id}`
      );
      if (response.ok) {
        const data = await response.json();
        setBookDetail(data.books[0]);
        console.log(data.books[0]);
        setError("");
      } else {
        setBookDetail([]);
        setError("No books found");
      }
    } catch (error) {
      setError("An error occurred while searching");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBook();
  }, [_id]);

  return (
    <>
      <PageLayout>
        <Container
          fluid
          className={`
      ${
        isDarkMode ? "dark-main-bg" : "light-main-bg"
      } main d-flex justify-content-center py-5`}
        >
          <Row>
            <Col>
              <Container className="d-flex flex-column gap-5">
                <Row>
                  <Col>
                    <h3
                      className={`${isDarkMode ? "lg-grey" : "black"} text-center`}
                    >
                      Pagina Dettaglio Libro
                    </h3>
                  </Col>
                </Row>
                {loading && <Loader data-testid="loader" />}
                {!loading && (
                  <Row>
                    <Col className="position-relative col-4">
                      <div
                        className={`${isDarkMode ? "dark-card" : "light-card"} book-card detail rounded-5 overflow-hidden`}
                      >
                        <h6 className="category">{bookDetail.category}</h6>
                        <div className="top d-flex justify-content-center">
                          <img
                            className="w-100 object-fit-cover"
                            src={bookDetail.img}
                            alt=""
                          />
                        </div>
                        <div className="bottom pt-3 p-3 d-flex flex-column gap-1">
                          <h4 className="">{bookDetail.title}</h4>
                          <h5 className="primary pb-1">
                            {bookDetail.price
                              ? `€ ${bookDetail.price.$numberDecimal}`
                              : "Prezzo non disponibile"}
                          </h5>
                          <CustomButton
                            title={"Acquista"}
                            style={"filled-primary"}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col className="offset-1 col-7">
                      <ReviewArea
                        id={bookDetail._id}
                        bookDetail={bookDetail}
                        loading={loading}
                        setLoading={setLoading}
                      />
                    </Col>
                  </Row>
                )}

                <Row className="g-4 py-4">
                  <h4
                    className={`${isDarkMode ? "lg-grey" : "black"} secondary`}
                  >
                    Potrebbero interessarti anche
                  </h4>
                  <RelatedBooks category={bookDetail.category} />
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </PageLayout>
    </>
  );
};
