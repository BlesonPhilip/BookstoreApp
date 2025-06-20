import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BookList.css";

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/books", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBooks();
  };

  return (
    <div className="book-list">
      <h2>My Books</h2>
      <button className="add-button" onClick={() => navigate("/add-book")}>
        Add Book
      </button>
      {books.map((book) => (
        <div className="book-item" key={book._id}>
          <h3>{book.title}</h3>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>{book.description}</p>
          <p>
            <strong>Published:</strong> {book.published_date}
          </p>
          <button onClick={() => navigate(`/edit-book/${book._id}`)}>
            Edit
          </button>
          <button className="delete" onClick={() => handleDelete(book._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default BookList;
