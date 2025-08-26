import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          URL Shortener
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;