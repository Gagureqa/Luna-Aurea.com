import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductPage from './pages/ProductPage';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import PrivacyPolicy from './pages/PrivacyPolicy';
import About from './pages/About';
import Contacts from './pages/Contacts';
import AuthPage from './components/AuthPage'; 
import { ModalProvider } from './context/ModalContext'; 
import ProductModal from './components/ProductModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import Collections from './pages/Collections';
import CollectionDetail from './components/CollectionDetail';

function App() {
  return (
     <ModalProvider>
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
           <ProductModal />
           <OrderSuccessModal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:id" element={<CollectionDetail />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/Contacts" element={<Contacts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/About" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/auth" element={<AuthPage />} /> {/* ✅ Добавляем маршрут авторизации */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
    </ModalProvider>
  );
}

export default App;