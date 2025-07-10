import React, { Suspense, Component, ErrorInfo, ReactNode } from 'react';

interface MicrofrontendLoaderProps {
  microfrontendName: string;
  title: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Error Boundary para microfrontends
class MicrofrontendErrorBoundary extends Component<
  { children: ReactNode; microfrontendName: string },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; microfrontendName: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error loading microfrontend "${this.props.microfrontendName}":`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          border: '1px solid #ff6b6b', 
          borderRadius: '4px', 
          backgroundColor: '#ffe0e0',
          color: '#d63031' 
        }}>
          <h3>Error al cargar {this.props.microfrontendName}</h3>
          <p>Ha ocurrido un error al cargar este microfrontend.</p>
          <details style={{ marginTop: '10px' }}>
            <summary>Detalles del error</summary>
            <pre style={{ fontSize: '12px', marginTop: '5px' }}>
              {this.state.error?.message || 'Error desconocido'}
            </pre>
          </details>
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{ 
              marginTop: '10px', 
              padding: '8px 16px',
              backgroundColor: '#d63031',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Intentar de nuevo
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Componente de loading mejorado
const LoadingSpinner: React.FC<{ title: string }> = ({ title }) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: '40px',
    minHeight: '200px'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '16px'
    }}></div>
    <p>Cargando {title}...</p>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Importar los microfrontends con mejor manejo de errores
const DashboardMicroApp = React.lazy(() => 
  import('dashboard/MicroApp').catch(error => {
    console.error('Error loading dashboard microfrontend:', error);
    // Fallback component
    return {
      default: () => (
        <div style={{ 
          padding: '20px', 
          border: '1px solid #ffa500', 
          borderRadius: '4px', 
          backgroundColor: '#fff3cd',
          color: '#856404' 
        }}>
          <h3>Dashboard no disponible</h3>
          <p>El microfrontend del dashboard no está disponible en este momento.</p>
          <p>Asegúrate de que el servidor del dashboard esté ejecutándose en el puerto 3001.</p>
        </div>
      )
    };
  })
);

const EvaluacionMicroApp = React.lazy(() => 
  import('evaluacion/MicroApp').catch(error => {
    console.error('Error loading evaluacion microfrontend:', error);
    // Fallback component
    return {
      default: () => (
        <div style={{ 
          padding: '20px', 
          border: '1px solid #ffa500', 
          borderRadius: '4px', 
          backgroundColor: '#fff3cd',
          color: '#856404' 
        }}>
          <h3>Evaluación no disponible</h3>
          <p>El microfrontend de evaluación no está disponible en este momento.</p>
          <p>Asegúrate de que el servidor de evaluación esté ejecutándose en el puerto 3003.</p>
        </div>
      )
    };
  })
);

const MicrofrontendLoader: React.FC<MicrofrontendLoaderProps> = ({ 
  microfrontendName, 
  title 
}) => {
  const renderMicrofrontend = () => {
    switch (microfrontendName) {
      case 'dashboard':
        return <DashboardMicroApp />;
      case 'evaluacion':
        return <EvaluacionMicroApp />;
      default:
        return (
          <div style={{ 
            padding: '20px', 
            border: '1px solid #6c757d', 
            borderRadius: '4px', 
            backgroundColor: '#f8f9fa',
            color: '#6c757d',
            textAlign: 'center'
          }}>
            <h3>Microfrontend "{microfrontendName}" no encontrado</h3>
            <p>Este microfrontend aún no está implementado.</p>
          </div>
        );
    }
  };

  return (
    <MicrofrontendErrorBoundary microfrontendName={microfrontendName}>
      <Suspense fallback={<LoadingSpinner title={title} />}>
        {renderMicrofrontend()}
      </Suspense>
    </MicrofrontendErrorBoundary>
  );
};

export default MicrofrontendLoader; 