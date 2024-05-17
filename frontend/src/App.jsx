import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import './index.css';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:5050/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <Router>
      <div className="app">
        <h1 className='app-heading'>CRUD Application</h1>
        <nav>
          <ul>
            <li><Link to="/">Book List</Link></li>
            <li><Link to="/add">Add Book</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<BookList books={books} onBookDeleted={fetchBooks} />} />
          <Route path="/add" element={<AddBook onBookAdded={fetchBooks} />} />
          <Route path="/edit/:id" element={<EditBook onBookUpdated={fetchBooks} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
