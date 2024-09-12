import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import {ContactsPage} from '../pages/ContactsPage';
import {ChartsPage} from '../pages/ChartsPage';

export const MainRoutes: React.FC = () => (

  // All the main routes, including nested routing as well for sidebar layout.
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ContactsPage/>} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="charts" element={<ChartsPage />} />
        </Route>
      </Routes>
    </Router>
  );