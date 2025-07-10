import './App.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Dashboard from './components/Dashboard';
import { PrimeReactProvider } from 'primereact/api';

// Versión del Dashboard para ser usada como microfrontend
// No incluye BrowserRouter porque confía en el router del shell
const MicroApp = () => {
  return (
    <PrimeReactProvider>
      <div className="container">
        <Dashboard />
      </div>
    </PrimeReactProvider>
  );
};

export default MicroApp; 