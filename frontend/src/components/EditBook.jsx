import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../index.css';

const EditBook = ({ onBookUpdated }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5050/books/${id}`)
      .then(response => {
        const book = response.data;
        setName(book.name);
        setImg(book.img);
        setSummary(book.summary);
      })
      .catch(error => console.error('Error fetching book:', error));
  }, [id]);

  const isValidURL = (url) => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!urlPattern.test(url);
  };

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

    const updatedBook = { name, img, summary };

    axios.put(`http://localhost:5050/books/${id}`, updatedBook)
      .then(response => {
        console.log('Book updated:', response.data);
        setError('');
        if (onBookUpdated) onBookUpdated();
        navigate('/');
      })
      .catch(error => console.error('Error updating book:', error));
  };

  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
      <h2>Edit Book</h2>
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
      <button type="submit">Update Book</button>
    </form>
  );
};

export default EditBook;
