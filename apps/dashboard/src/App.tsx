import './App.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Dashboard from './components/Dashboard';
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <div className="container">
          <Dashboard />
        </div>
      </BrowserRouter>
    </PrimeReactProvider>
  );
};

export default App;
