import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import getPath from '../routes.js';

import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import CheckTokenPage from './CheckTokenPage.jsx';
import Navbar from './Navbar.jsx';
import SignUpPage from './SignUpPage.jsx';

const App = () => (
  <div className="h-100">
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar />
        <Routes>
          <Route path={getPath.chatPage()} element={<CheckTokenPage />} />
          <Route path={getPath.loginPage()} element={<LoginPage />} />
          <Route path={getPath.signUpPage()} element={<SignUpPage />} />
          <Route path={getPath.notFoundPage()} element={<NotFoundPage />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  </div>
);

export default App;
