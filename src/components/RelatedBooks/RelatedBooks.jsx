import React, { useContext, useEffect, useState } from "react";
import { BookCard } from "../Main/BookCard/BookCard.jsx";
import { BooksContext } from "../../context/BooksContext.jsx";

export const RelatedBooks = ({ category }) => {
  const [relatedBooks, setRelatedBooks] = useState([]);
  const { loading, setLoading, setError } = useContext(BooksContext);

  const getRelatedBooks = async () => {
    if (!category) {
      setError("Category is not defined");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/books?category=${category}&limit=5`
      );
      const data = await response.json();
      if (response.ok) {
        setRelatedBooks(data.books);
      } else {
        setError(data.message);
        setRelatedBooks([]);
      }
    } catch (error) {
      setError("Ops something went wrong");
      setRelatedBooks([]);
    }
  };

  useEffect(() => {
    if (category) {
      getRelatedBooks();
    }
  }, [category]);

  return (
    <>
      {loading ? (
        <p>Loading related books...</p>
      ) : relatedBooks.length > 0 ? (
        relatedBooks.map((book, idx) => (
          <BookCard
            key={`relatedBook+${idx}`}
            title={book.title}
            price={book.price.$numberDecimal}
            img={book.img}
            category={book.category}
            asin={book.asin}
            _id={book._id}
          />
        ))
      ) : (
        <p>No related books found</p>
      )}
    </>
  );
};
