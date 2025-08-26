import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import UrlShortener from './components/UrlShortener';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="container">
          <Routes>
            <Route path="/" element={<UrlShortener />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;