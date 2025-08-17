import { Navigate } from 'react-router-dom';

function PrivateRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;
