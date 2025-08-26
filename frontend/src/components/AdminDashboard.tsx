import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the shape of each URL object
interface Url {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async (): Promise<void> => {
    try {
      const response = await axios.get<Url[]>('/api/urls');
      setUrls(response.data);
    } catch {
      setError('Failed to fetch URLs');
    } finally {
      setLoading(false);
    }
  };

  const deleteUrl = async (id: string): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      try {
        await axios.delete(`/api/urls/${id}`);
        setUrls((prevUrls) => prevUrls.filter((url) => url._id !== id));
      } catch {
        setError('Failed to delete URL');
      }
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Manage all shortened URLs</p>

      {error && <div className="error">{error}</div>}

      <div className="stats">
        <div className="stat-card">
          <h3>Total URLs</h3>
          <p>{urls.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Clicks</h3>
          <p>{urls.reduce((total, url) => total + url.clicks, 0)}</p>
        </div>
      </div>

      <div className="urls-table">
        <h2>All URLs</h2>
        {urls.length === 0 ? (
          <p>No URLs found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Original URL</th>
                <th>Short URL</th>
                <th>Clicks</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url._id}>
                  <td className="original-url">
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url.originalUrl.substring(0, 50)}
                      {url.originalUrl.length > 50 ? '...' : ''}
                    </a>
                  </td>
                  <td>
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url.shortUrl}
                    </a>
                  </td>
                  <td className="clicks">{url.clicks}</td>
                  <td>{formatDate(url.createdAt)}</td>
                  <td>
                    <button
                      onClick={() => deleteUrl(url._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
