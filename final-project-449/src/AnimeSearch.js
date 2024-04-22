import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function AnimeSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const [quote, setQuote] = useState(null);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('https://api.trace.moe/search', formData);
      setResults(response.data.result.slice(0, 2));
    } catch (error) {
      console.error(error);
      setError('An error occurred while searching for the anime.');
    }
    setLoading(false);
  };

  const handleQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data.content);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching the quote.');
    }
  };

  return (
    <div className="anime-search">
      <form onSubmit={handleSubmit} className="anime-search-form">
        <input type="file" onChange={handleImageUpload} className="anime-search-input" />
        <button type="submit" className="anime-search-button">Search</button>
      </form>
  
      {loading && <div className="anime-search-loading">Loading...</div>}
  
      {error && <div className="anime-search-error">{error}</div>}
  
      {results && (
        <div className="anime-search-results">
          {results.map((result, index) => (
            <div key={index} className="anime-search-result">
              <h2>{result.filename}</h2>
              <p>Time: {result.from} - {result.to}</p>
              <p>Similarity: {result.similarity}</p>
              <video src={result.video} controls />
            </div>
          ))}
        </div>
      )}
    
    <div className="quote-section">
        <p>This button will generate a random inspirational quote:</p>
        <button onClick={handleQuote} className="anime-search-button quote-button">Get Random Quote</button>

        {quote && (
          <div className="anime-search-quote">
            <p>{quote}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnimeSearch;
