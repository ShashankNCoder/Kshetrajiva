import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const NotFound = () => {
  return (
    <iframe 
      src="/404-notfound/index.html" 
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
      }}
      title="404 Page Not Found"
    />
  );
};

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Products from './pages/Products'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Team from './pages/Team'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/team" element={<Team />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<ErrorBoundary />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App