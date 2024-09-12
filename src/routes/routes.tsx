import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import { Layout } from '../components/Layout';
import {ContactsPage} from '../pages/ContactsPage';
import {ChartsPage} from '../pages/ChartsPage';

export const MainRoutes: React.FC = () => (
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