import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookCard } from "../components/Main/BookCard/BookCard";
import { ThemeContext } from "../context/ThemeContext";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("BookCard Component", () => {
  const mockProps = {
    price: 0.0,
    category: "category",
    title: "title",
    img: "src",
    asin: "1234567890",
  };

  it("should renders book card", () => {
    render(
      <ThemeContext.Provider value={{ isDarkMode: false }}>
        <MemoryRouter>
          <BookCard {...mockProps} />
        </MemoryRouter>
      </ThemeContext.Provider>,
    );

    const category = screen.getByText(mockProps.category);
    expect(category).toBeInTheDocument();
    const title = screen.getByText(mockProps.title);
    expect(title).toBeInTheDocument();
    const price = screen.getByText(`€ ${mockProps.price}`);
    expect(price).toBeInTheDocument();

    const image = screen.getByAltText("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProps.img);

    const detailButton = screen.getByText("Dettagli");
    expect(detailButton).toBeInTheDocument();
  });

  it("should navigates to detail page when card or button 'Dettagli' is clicked", () => {
    render(
      <ThemeContext.Provider value={{ isDarkMode: false }}>
        <MemoryRouter>
          <BookCard {...mockProps} />
        </MemoryRouter>
      </ThemeContext.Provider>,
    );

    const card = screen.getByTestId("book-card");
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith(`/book/${mockProps.asin}`);

    fireEvent.click(screen.getByText("Dettagli"));
    expect(mockNavigate).toHaveBeenCalledWith(`/book/${mockProps.asin}`);
  });

  it("should applies dark mode theme to bookcard", () => {
    const { rerender } = render(
      <ThemeContext.Provider value={{ isDarkMode: false }}>
        <MemoryRouter>
          <BookCard {...mockProps} />
        </MemoryRouter>
      </ThemeContext.Provider>,
    );

    const card = screen.getByTestId("book-card");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("light-card");

    rerender(
      <ThemeContext.Provider value={{ isDarkMode: true }}>
        <MemoryRouter>
          <BookCard {...mockProps} />
        </MemoryRouter>
      </ThemeContext.Provider>,
    );

    expect(card).toHaveClass("dark-card");
  });
});
