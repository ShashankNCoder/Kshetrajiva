import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <h2>Krushisev</h2>
        </Link>
      </div>
      
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/team">Team</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login" className="login-btn">Login</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar