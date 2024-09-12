
import   {Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';


export const Layout: React.FC = () => (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-14 overflow-auto">
        <Outlet />
      </main>
    </div>
  );