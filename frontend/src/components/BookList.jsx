import React from 'react';
import axios from 'axios';
import '../index.css';

const BookList = ({ books, onBookDeleted }) => {
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/books/${id}`);
      onBookDeleted(); // Refresh the list of books
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="book-list">
      <h1>Book List</h1>
      <div className="table-container">
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Summary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id}>
                <td>{book.name}</td>
                <td><img src={book.img} alt={book.name} className="book-image" /></td>
                <td>{book.summary}</td>
                <td className="actions">
                  <button className="edit" onClick={() => alert('Edit functionality to be implemented')}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(book._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
