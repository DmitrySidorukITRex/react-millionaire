import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoggedIn } from '../../store/slices/auth/selectors';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const loggedIn = useLoggedIn();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/auth');
    }
  }, [loggedIn, navigate]);

  return loggedIn ? <>{children}</> : null;
};

export default PrivateRoute;
