import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
// import Products from './components/Products';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Auth from './components/Auth';
import Contact from './components/Contact';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import CategoryProductList from './components/CategoryProductList';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

const ProtectedRoute = ({ element }) => {
  const { state } = useAuth();
  return state.isAuthenticated ? element : <Navigate to="/auth" />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/category/:category" element={<CategoryProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/contact" element={<Contact />} /> {/* Add the contact route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  </AuthProvider>
);

export default App;