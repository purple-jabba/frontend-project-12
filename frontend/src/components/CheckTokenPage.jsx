import { Navigate } from 'react-router-dom';
import getPath from '../routes.js';
import ChatPage from './ChatPage.jsx';

const CheckTokenPage = () => (
  !localStorage.getItem('userToken') ? <Navigate to={getPath.loginPage()} /> : <ChatPage />
);

export default CheckTokenPage;
