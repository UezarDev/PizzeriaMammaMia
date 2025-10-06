import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container py-5">
    <h2>404 — Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <Link to="/PizzeriaMammaMia/" className="btn btn-primary">
      Go to Home
    </Link>
  </div>
);

export default NotFound;
