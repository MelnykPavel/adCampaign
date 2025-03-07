import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/dashboard';
import Campaigns from './pages/campaigns';
import Error404 from './pages/404';
import ErrorBoundary from './providers/ErrorBoundary';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="campaigns" element={<Campaigns />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
