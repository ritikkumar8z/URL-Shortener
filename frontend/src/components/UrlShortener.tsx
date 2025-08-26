import { useState } from 'react';
import axios from 'axios';

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const response = await axios.post('/api/shorten', {
        originalUrl
      });
      
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || 'An error occurred');
      } else {
        setError('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="url-shortener">
      <h1>URL Shortener</h1>
      <p>Enter a long URL to get a shortened version</p>
      
      <form onSubmit={handleSubmit} className="url-form">
        <div className="input-group">
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter your long URL here..."
            required
            className="url-input"
          />
          <button type="submit" disabled={loading} className="shorten-btn">
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </div>
      </form>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="result">
          <h3>Your shortened URL:</h3>
          <div className="short-url-container">
            <input
              type="text"
              title='Shortened URL'
              value={shortUrl}
              readOnly
              className="short-url-input"
            />
            <button onClick={copyToClipboard} className="copy-btn">
              Copy
            </button>
          </div>
          <p className="hint">
            Click the URL above or the copy button to copy it to your clipboard
          </p>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;