import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><Link to="/delivery-info">Delivery Information</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/profile">My Account</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>Email: info@krushisev.com</p>
          <p>Phone: +1 234 567 8900</p>
          <p>Address: 123 Agriculture Street</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2023 Krushisev. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer