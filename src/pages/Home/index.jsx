import React from 'react'
import './styles.css'

function Home() {
  return (
    <div className="home">
      <div className="parallax-1">
        <div className="parallax-inner">
          <h1>Welcome to Krushisev</h1>
          <p>Your Trusted Partner in Agriculture</p>
        </div>
      </div>

      <section className="content-section">
        <h2>Our Mission</h2>
        <p>Empowering farmers with innovative solutions and sustainable practices</p>
      </section>

      <div className="parallax-2">
        <div className="parallax-inner">
          <h2>Quality Products</h2>
          <p>For a Better Farming Future</p>
        </div>
      </div>

      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"Best agricultural products I've ever used. Highly recommended!"</p>
            <h4>John Doe</h4>
          </div>
          <div className="testimonial-card">
            <p>"Great service and expert advice. Thank you Krushisev!"</p>
            <h4>Jane Smith</h4>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home