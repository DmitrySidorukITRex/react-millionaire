import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../auth/auth.service';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const loggedIn = !!getCurrentUser();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/auth');
    }
  }, [loggedIn, navigate]);

  return loggedIn ? <>{children}</> : null;
};

export default PrivateRoute;
