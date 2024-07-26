// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
//import Products from './components/Products';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Auth from './components/Auth';
import Contact from './components/Contact';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import CategoryProductList from './components/CategoryProductList';
import { useAuth } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import UserAccount from './components/UserAccount';
import Cart from './pages/CartPage';
import Checkout from './pages/CheckoutPage';
import LandingPage from './components/LandingPage';
import './App.css';

const ProtectedRoute = ({ element }) => {
  const { state } = useAuth();
  return state.isAuthenticated ? element : <Navigate to="/signup" />;
};

const App = () => (
  <UserProvider>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/category/:category" element={<CategoryProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/account" element={<ProtectedRoute element={<UserAccount />} />} />
          { /*<Route path="/account" element={<UserAccountPage />} /> */}
          <Route path="/contact" element={<Contact />} /> {/* Add the contact route */}
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  </UserProvider>
);

export default App;