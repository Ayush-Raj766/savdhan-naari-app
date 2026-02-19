import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-0 md:pt-16 pb-20 md:pb-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
