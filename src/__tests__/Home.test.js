import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ThemeContext } from "../context/ThemeContext";
import { BooksContext } from "../context/BooksContext";
import { MemoryRouter } from "react-router-dom";
import { Hero } from "../components/Hero/Hero";
import { Main } from "../components/Main/Main";

const mockBooksContext = {
  books: [
    {
      title: "Book 1",
      price: 10,
      img: "/book1.jpg",
      category: "Fiction",
      asin: "B001",
    },
  ],
  loading: false,
  error: null,
};

describe("Hero Component", () => {
  it("should render the heading, description and button of the hero section", () => {
    render(<Hero />);

    const heading = screen.getByText(
      "Thousands of books. Unlimited potential.",
    );
    expect(heading).toBeInTheDocument();

    const description = screen.getByText(
      "Inspire a lifetime of reading and discovery with our award-winning digital library.",
    );
    expect(description).toBeInTheDocument();

    const button = screen.getByText("Free Consultation");
    expect(button).toBeInTheDocument();
  });
});

describe("Main Component", () => {
  it("should render loading message when loading is true", () => {
    render(
      <BooksContext.Provider value={{ ...mockBooksContext, loading: true }}>
        <ThemeContext.Provider value={{ isDarkMode: false }}>
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        </ThemeContext.Provider>
      </BooksContext.Provider>,
    );

    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
  });

  it("should render error message when error exists", () => {
    render(
      <BooksContext.Provider
        value={{ ...mockBooksContext, error: "Error loading books" }}
      >
        <ThemeContext.Provider value={{ isDarkMode: false }}>
          <Main />
        </ThemeContext.Provider>
      </BooksContext.Provider>,
    );

    const errorMessage = screen.getByText("Error loading books");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should render books when there is no errors and they exist", async () => {
    render(
      <BooksContext.Provider value={mockBooksContext}>
        <ThemeContext.Provider value={{ isDarkMode: false }}>
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        </ThemeContext.Provider>
      </BooksContext.Provider>,
    );

    const title = screen.getByText("Book 1");
    expect(title).toBeInTheDocument();

    const price = screen.getByText("€ 10");
    expect(price).toBeInTheDocument();
  });

  it("should applies dark mode theme to the Main component", () => {
    const { rerender } = render(
      <BooksContext.Provider value={mockBooksContext}>
        <ThemeContext.Provider value={{ isDarkMode: false }}>
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        </ThemeContext.Provider>
      </BooksContext.Provider>,
    );

    const main = screen.getByTestId("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("light-main-bg");

    rerender(
      <BooksContext.Provider value={mockBooksContext}>
        <ThemeContext.Provider value={{ isDarkMode: true }}>
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        </ThemeContext.Provider>
      </BooksContext.Provider>,
    );

    expect(main).toHaveClass("dark-main-bg");
  });
});
