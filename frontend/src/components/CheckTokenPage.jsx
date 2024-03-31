import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import getPath from '../routes.js';
import ChatPage from './ChatPage.jsx';

const CheckTokenPage = () => {
  const auth = useAuth();

  return (
    !auth.token ? <Navigate to={getPath.loginPage()} /> : <ChatPage />
  );
};

export default CheckTokenPage;
