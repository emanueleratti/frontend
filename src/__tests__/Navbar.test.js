import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "../components/Navbar/Navbar";
import { NavLinks } from "../components/Navbar/NavLinks/NavLinks";
import { ThemeContext } from "../context/ThemeContext";
import { SearchBook } from "../components/Navbar/SearchBook/SearchBook";
import { BooksContext } from "../context/BooksContext";
import { MemoryRouter } from "react-router-dom";

const mockBooksContext = {
  books: [{ title: "Book 1" }, { title: "Book 2" }],
  setBooks: jest.fn(),
  removeFilter: [{ title: "Book 1" }, { title: "Book 2" }],
  setError: jest.fn(),
};

describe("Navbar Component", () => {
  it("should render navbar with search input", () => {
    render(
      <ThemeContext.Provider value={{ isDarkMode: false }}>
        <BooksContext.Provider value={mockBooksContext}>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </BooksContext.Provider>
      </ThemeContext.Provider>,
    );

    const searchInput = screen.getByPlaceholderText("cerca libro");
    expect(searchInput).toBeInTheDocument();
  });

  it("should applies dark mode theme to navbar", () => {
    const { rerender } = render(
      <ThemeContext.Provider value={{ isDarkMode: false }}>
        <BooksContext.Provider value={mockBooksContext}>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </BooksContext.Provider>
      </ThemeContext.Provider>,
    );

    const navbar = screen.getByTestId("navbar");
    expect(navbar).toHaveClass("light-nav-bg");

    rerender(
      <ThemeContext.Provider value={{ isDarkMode: true }}>
        <BooksContext.Provider value={mockBooksContext}>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </BooksContext.Provider>
      </ThemeContext.Provider>,
    );

    expect(navbar).toHaveClass("dark-nav-bg");
  });
});

describe("SearchBook Component", () => {
  it("should render search input and button", () => {
    render(
      <ThemeContext.Provider value={{ isDarkMode: false }}>
        <BooksContext.Provider value={mockBooksContext}>
          <MemoryRouter>
            <SearchBook />
          </MemoryRouter>
        </BooksContext.Provider>
      </ThemeContext.Provider>,
    );

    const searchInput = screen.getByPlaceholderText("cerca libro");
    expect(searchInput).toBeInTheDocument();

    const searcButton = screen.getByText("Search");
    expect(searcButton).toBeInTheDocument();
  });

  it("should apply dark mode to search input", () => {
    const { rerender } = render(
      <ThemeContext.Provider value={{ isDarkMode: false }}>
        <BooksContext.Provider value={mockBooksContext}>
          <MemoryRouter>
            <SearchBook />
          </MemoryRouter>
        </BooksContext.Provider>
      </ThemeContext.Provider>,
    );

    const input = screen.getByPlaceholderText("cerca libro");
    expect(input).toHaveClass("light-input-bg");

    rerender(
      <ThemeContext.Provider value={{ isDarkMode: true }}>
        <BooksContext.Provider value={mockBooksContext}>
          <MemoryRouter>
            <SearchBook />
          </MemoryRouter>
        </BooksContext.Provider>
      </ThemeContext.Provider>,
    );

    expect(input).toHaveClass("dark-input-bg");
  });

  it("should filter books on search", () => {
    render(
      <ThemeContext.Provider value={{ isDarkMode: false }}>
        <BooksContext.Provider value={mockBooksContext}>
          <MemoryRouter>
            <SearchBook />
          </MemoryRouter>
        </BooksContext.Provider>
      </ThemeContext.Provider>,
    );

    const input = screen.getByPlaceholderText("cerca libro");
    fireEvent.change(input, { target: { value: "Book 1" } });

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    expect(mockBooksContext.setBooks).toHaveBeenCalledWith([
      { title: "Book 1" },
    ]);
  });
});

describe("NavLinks Component", () => {
  it("should render navigation links and have correct urls", () => {
    render(
      <ThemeContext.Provider value={{ isDarkMode: false }}>
        <BooksContext.Provider value={mockBooksContext}>
          <MemoryRouter>
            <NavLinks />
          </MemoryRouter>
        </BooksContext.Provider>
      </ThemeContext.Provider>,
    );

    const navLinks = screen.getAllByRole("link");
    expect(navLinks).toHaveLength(3);
    expect(navLinks[0]).toHaveTextContent("HOME");
    expect(navLinks[0]).toHaveAttribute("href", "/");
    expect(navLinks[1]).toHaveTextContent("CHI SIAMO");
    expect(navLinks[1]).toHaveAttribute("href", "/chi-siamo");
    expect(navLinks[2]).toHaveTextContent("CONTATTI");
    expect(navLinks[2]).toHaveAttribute("href", "/contatti");
  });
});
