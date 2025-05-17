import React from 'react';
import { useRouteError, isRouteErrorResponse, Navigate } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div>
      <h1>Oops! Something went wrong</h1>
      <p>Please try again later</p>
    </div>
  );
};

export default ErrorBoundary;