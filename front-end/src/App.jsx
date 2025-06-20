import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import Login from "./components/login";
import "./App.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/books" element={<BookList />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/edit-book/:id" element={<EditBook />} />
    </Routes>
  );
}

export default App;
