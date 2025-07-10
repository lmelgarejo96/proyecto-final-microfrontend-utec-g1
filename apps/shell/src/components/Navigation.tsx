import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { microfrontends } from '../config/microfrontends';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <h1>Microfrontend Shell</h1>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Inicio
            </Link>
          </li>
          {microfrontends.map((mf) => (
            <li key={mf.name} className="nav-item">
              <Link 
                to={mf.route} 
                className={`nav-link ${location.pathname.startsWith(mf.route) ? 'active' : ''}`}
              >
                {mf.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 