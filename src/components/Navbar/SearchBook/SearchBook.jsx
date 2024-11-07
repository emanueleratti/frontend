import "./SearchBook.css";
import { useContext, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { BooksContext } from "../../../context/BooksContext";
import { ThemeContext } from "../../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export const SearchBook = () => {
  const { setBooks, setError, removeFilter } = useContext(BooksContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [searchInput, setSearchInput] = useState("");

  const onChangeInput = (event) => {
    setSearchInput(event.target.value);
  };

  const navigate = useNavigate();
  const navigateToHomePage = () => {
    navigate(`/`);
  };

  const filteredBooks = async () => {
    navigateToHomePage();
    if (searchInput.length === 0 && removeFilter) {
      setBooks(removeFilter);
      setError("");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/books?search=${searchInput}`
      );
      if (response.ok) {
        const data = await response.json();
        setBooks(data.books);
        setError("");
      } else {
        setBooks([]);
        setError("No books found");
      }
    } catch (error) {
      setError("An error occurred while searching");
    }
  };

  return (
    <>
      <div className="d-flex gap-2 flex-grow-1">
        <FormControl
          type="text"
          placeholder="cerca libro"
          className={`${isDarkMode ? "dark-input-bg" : "light-input-bg"} rounded-5`}
          onChange={onChangeInput}
        />
        <Button className="button filled-primary" onClick={filteredBooks}>
          Search
        </Button>
      </div>
    </>
  );
};
