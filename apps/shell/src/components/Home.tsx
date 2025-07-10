import React from 'react';
import { Link } from 'react-router-dom';
import { microfrontends } from '../config/microfrontends';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Bienvenido al Shell de Microfrontends</h1>
        <p>Selecciona una aplicación para comenzar</p>
      </header>
      
      <div className="microfrontends-grid">
        {microfrontends.map((mf) => (
          <Link key={mf.name} to={mf.route} className="microfrontend-card">
            <div className="card-content">
              <h3>{mf.title}</h3>
              <p>{mf.description}</p>
              <span className="card-route">{mf.route}</span>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="info-section">
        <h2>Información del Sistema</h2>
        <div className="info-grid">
          <div className="info-item">
            <h3>Arquitectura</h3>
            <p>Microfrontends con Module Federation</p>
          </div>
          <div className="info-item">
            <h3>Tecnologías</h3>
            <p>React, TypeScript, RSBuild</p>
          </div>
          <div className="info-item">
            <h3>Despliegue</h3>
            <p>Firebase Hosting</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 