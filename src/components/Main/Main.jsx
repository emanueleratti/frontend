import "./Main.css";
import "react-responsive-pagination/themes/bootstrap.css";
import { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BookCard } from "./BookCard/BookCard";
import { BooksContext } from "../../context/BooksContext";
import { ThemeContext } from "../../context/ThemeContext";
import { Loader } from "../Loader/Loader";
import ResponsivePagination from "react-responsive-pagination";

export const Main = () => {
  const {
    books,
    getBooks,
    page,
    setPage,
    pageLimit,
    totalPages,
    loading,
    error,
  } = useContext(BooksContext);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    getBooks();
  }, [page, pageLimit]);

  return (
    <Container
      fluid
      className={`
      ${
        isDarkMode ? "dark-main-bg" : "light-main-bg"
      } main d-flex justify-content-center py-5`}
      data-testid="main"
    >
      <Row>
        <Col>
          <Container className="d-flex flex-column gap-5">
            <Row>
              <Col>
                <h3
                  className={`${isDarkMode ? "lg-grey" : "black"} text-center`}
                >
                  Explore over 40,000 books, audiobooks & learning videos.
                </h3>
              </Col>
            </Row>
            <Row className="g-4 pb-3">
              {loading && <Loader data-testid="loader" />}
              {!loading && error && <p className="text-center">{`${error}`}</p>}
              {!loading &&
                !error &&
                books &&
                books.map((book, index) => (
                  <BookCard
                    key={`book+${index}`}
                    title={book.title}
                    price={book.price.$numberDecimal || book.price}
                    img={book.img}
                    category={book.category}
                    asin={book.asin}
                    _id={book._id}
                  />
                ))}
            </Row>
            <Row className="g-4 pb-3">
              <ResponsivePagination
                current={page}
                total={totalPages}
                onPageChange={setPage}
              />
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
