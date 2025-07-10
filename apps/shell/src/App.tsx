import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { microfrontends } from './config/microfrontends';
import Navigation from './components/Navigation';
import Home from './components/Home';
import MicrofrontendLoader from './components/MicrofrontendLoader';
import DebugInfo from './components/DebugInfo';
import Provider from 'provider';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* <Provider /> */}
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            {microfrontends.map((mf) => (
              <Route
                key={mf.name}
                path={`${mf.route}/*`}
                element={
                  <MicrofrontendLoader 
                    microfrontendName={mf.name} 
                    title={mf.title} 
                  />
                }
              />
            ))}
            <Route path="*" element={<div>Página no encontrada</div>} />
          </Routes>
        </main>
        <DebugInfo />
      </div>
    </Router>
  );
};

export default App;
