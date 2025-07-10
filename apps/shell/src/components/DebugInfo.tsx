import React, { useState } from 'react';
import { environment } from '../config/environment';

const DebugInfo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  if (environment.production) {
    return null; // No mostrar en producción
  }

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      zIndex: 1000 
    }}>
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          backgroundColor: environment.development ? '#28a745' : '#ffc107',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          fontSize: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}
        title="Debug Info"
      >
        🐛
      </button>
      
      {isVisible && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          right: '0',
          backgroundColor: '#1e1e1e',
          color: '#fff',
          padding: '15px',
          borderRadius: '8px',
          minWidth: '300px',
          maxWidth: '400px',
          fontSize: '12px',
          fontFamily: 'monospace',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '10px',
            borderBottom: '1px solid #444',
            paddingBottom: '10px'
          }}>
            <strong>🔍 Debug Info</strong>
            <button
              onClick={() => setIsVisible(false)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ✕
            </button>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Environment:</strong>
            <div style={{ paddingLeft: '10px' }}>
              <div>Current: <span style={{ color: '#4CAF50' }}>{environment.currentEnvironment}</span></div>
              <div>Production: <span style={{ color: environment.production ? '#f44336' : '#4CAF50' }}>{environment.production ? 'Yes' : 'No'}</span></div>
              <div>Development: <span style={{ color: environment.development ? '#4CAF50' : '#f44336' }}>{environment.development ? 'Yes' : 'No'}</span></div>
              <div>Staging: <span style={{ color: environment.staging ? '#FF9800' : '#757575' }}>{environment.staging ? 'Yes' : 'No'}</span></div>
            </div>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Microfrontend URLs:</strong>
            <div style={{ paddingLeft: '10px' }}>
              <div>Dashboard: <span style={{ color: '#2196F3' }}>{environment.microfrontendUrls.dashboard}</span></div>
              <div>Auth: <span style={{ color: '#2196F3' }}>{environment.microfrontendUrls.auth}</span></div>
              <div>Calificación: <span style={{ color: '#2196F3' }}>{environment.microfrontendUrls.calificacion}</span></div>
            </div>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Firebase:</strong>
            <div style={{ paddingLeft: '10px' }}>
              <div>Project ID: <span style={{ color: '#FF5722' }}>{environment.firebase.projectId}</span></div>
            </div>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Browser Info:</strong>
            <div style={{ paddingLeft: '10px' }}>
              <div>Host: <span style={{ color: '#9C27B0' }}>{window.location.host}</span></div>
              <div>Port: <span style={{ color: '#9C27B0' }}>{window.location.port}</span></div>
              <div>Protocol: <span style={{ color: '#9C27B0' }}>{window.location.protocol}</span></div>
            </div>
          </div>
          
          <div style={{ 
            marginTop: '10px', 
            paddingTop: '10px', 
            borderTop: '1px solid #444',
            fontSize: '10px',
            color: '#888'
          }}>
            Timestamp: {new Date().toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugInfo; 