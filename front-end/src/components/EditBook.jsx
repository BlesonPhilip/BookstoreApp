import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditBook.css";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [published_date, setPublishedDate] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const book = res.data.find((b) => b._id === id);
      if (book) {
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);
        setPublishedDate(book.published_date);
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:5000/api/books/${id}`,
      {
        title,
        author,
        description,
        published_date,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    navigate("/books");
  };

  return (
    <div className="book-form-container">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={author}
          placeholder="Author"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          value={published_date}
          placeholder="Published Date"
          onChange={(e) => setPublishedDate(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditBook;
