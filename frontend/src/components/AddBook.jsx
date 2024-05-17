import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

const AddBook = ({ onBookAdded }) => {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const isValidURL = (url) => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!urlPattern.test(url);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !img || !summary) {
      alert('Please enter all details.');
      return;
    }

    if (!isValidURL(img)) {
      alert('Please enter a valid image URL.');
      return;
    }

    const newBook = { name, img, summary };

    axios.post('http://localhost:5050/createBooks', newBook)
      .then(response => {
        console.log('Book added:', response.data);
        setName('');
        setImg('');
        setSummary('');
        setError('');
        if (onBookAdded) onBookAdded();
        alert("Succesfully Added") 
        navigate("/")
      })
      .catch(error => {
        console.error('Error adding book:', error);
        setError('Error adding book');
      });
  };

  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
      <h2>Add a New Book</h2>
      {error && <p className="error">{error}</p>}
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={error && !name ? 'input-error' : ''}
        />
      </label>
      <br />
      <label>
        Image URL:
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className={error && !img ? 'input-error' : ''}
        />
      </label>
      <br />
      <label>
        Summary:
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className={error && !summary ? 'input-error' : ''}
        ></textarea>
      </label>
      <br />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
