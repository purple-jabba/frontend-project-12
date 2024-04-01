import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/hooks.js';
import getPath from '../routes.js';
import ChatPage from './chatComponents/ChatPage.jsx';

const CheckTokenPage = () => {
  const auth = useAuth();

  return (
    !auth.token ? <Navigate to={getPath.loginPage()} /> : <ChatPage />
  );
};

export default CheckTokenPage;
