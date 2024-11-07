import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { BooksContext } from "../../context/BooksContext.jsx";
import { ThemeContext } from "../../context/ThemeContext.jsx";

const BooksForm = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { getBooks } = useContext(BooksContext);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "Example Title",
    author: "Example Author",
    category: "scifi",
    asin: "121831281231231",
    price: "10",
    img: null,
  });
  const token = localStorage.getItem("isAuth");

  const onChangeInput = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setFile(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const uploadImage = async (file) => {
    if (!token) {
      console.error("Token di autenticazione non trovato");
      return;
    }

    const fileData = new FormData();
    fileData.append("image", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/upload/cloud`,
        {
          method: "POST",
          headers: {
            isAuth: token,
          },
          body: fileData,
        }
      );

      if (!response.ok) {
        console.error(
          "Errore nella richiesta:",
          response.status,
          response.statusText
        );
        return null;
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!token) {
      console.error("Token di autenticazione non trovato");
      return;
    }

    if (file) {
      try {
        const uploadedFile = await uploadImage(file);
        const postFormData = {
          ...formData,
          img: uploadedFile.img,
        };

        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/books/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              isAuth: token,
            },
            body: JSON.stringify(postFormData),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Libro creato:", data.book);

          getBooks();
          setFormData({
            title: "",
            author: "",
            category: "",
            asin: "",
            price: "",
            image: null,
          });
          setFile(null);
        } else {
          console.error(
            "Errore nell'aggiunta del libro:",
            data.message || response.statusText
          );
        }
      } catch (error) {
        console.log("Errore:", error.message);
      }
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center">
        <Col sm={8} className="d-flex flex-column gap-2">
          <h3
            className={`${isDarkMode ? "lg-grey" : "black"} user-details d-flex gap-3`}
          >
            Manage Books
          </h3>
          <Form encType="multipart/form-data" onSubmit={handleSubmit}>
            <FloatingLabel className="mb-2" label="Asin">
              <Form.Control
                name="asin"
                type="text"
                value={formData.asin}
                placeholder="Asin"
                onChange={onChangeInput}
                required
              />
            </FloatingLabel>
            <FloatingLabel className="mb-2" label="Title">
              <Form.Control
                name="title"
                type="text"
                value={formData.title}
                placeholder="Title"
                onChange={onChangeInput}
                required
              />
            </FloatingLabel>
            <FloatingLabel className="mb-2" label="Author">
              <Form.Control
                name="author"
                type="text"
                value={formData.author}
                placeholder="Author"
                onChange={onChangeInput}
                required
              />
            </FloatingLabel>
            <FloatingLabel className="mb-2" label="Category">
              <Form.Control
                name="category"
                type="text"
                value={formData.category}
                placeholder="Category"
                onChange={onChangeInput}
                required
              />
            </FloatingLabel>
            <FloatingLabel className="mb-2" label="PRICE">
              <Form.Control
                name="price"
                type="number"
                value={formData.price}
                placeholder="Price"
                onChange={onChangeInput}
                required
              />
            </FloatingLabel>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Book Image</Form.Label>
              <Form.Control type="file" name="image" onChange={onChangeInput} />
            </Form.Group>
            <Button type="submit">Add Book</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BooksForm;
