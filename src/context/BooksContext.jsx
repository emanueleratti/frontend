import { createContext, useState } from "react";

export const BooksContext = createContext(undefined);

export const BooksContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [removeFilter, setRemoveFilter] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/books?page=${page}&pageLimit=${pageLimit}`,
      );
      const data = await response.json();
      if (response.ok) {
        setBooks(data.books);
        setTotalPages(data.totalPages);
        if (removeFilter.length === 0) {
          setRemoveFilter(data.books);
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Ops something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        getBooks,
        removeFilter,
        totalPages,
        page,
        setPage,
        pageLimit,
        setPageLimit,
        error,
        setError,
        loading,
        setLoading,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
