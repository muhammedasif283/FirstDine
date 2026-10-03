import { Routes, Route, useLocation } from 'react-router-dom';
import Scan from './pages/Scan';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Restaurant from './pages/Restaurant';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Reservations from './pages/Reservations';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import About from './pages/About';
import Careers from './pages/Careers';
import Press from './pages/Press';
import Blog from './pages/Blog';
import Skeleton from './components/Skeleton';
import { useAppContext } from './context/AppContext';

function App() {
  const { loading } = useAppContext();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isAdmin = location.pathname === '/admin';
  const hideLayout = isDashboard || isAdmin;

  return (
    <>
      {!hideLayout && <Navbar />}
      <main id="app-container" style={{ minHeight: hideLayout ? '0' : '80vh' }}>
        {loading && !hideLayout ? (
             <Skeleton />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<Press />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        )}
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
