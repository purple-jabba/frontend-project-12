import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NotFound from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';

const App = () => (
  <div className="h-100">
    <div className="d-flex flex-column h-100">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  </div>
);

export default App;
