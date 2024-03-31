import { useDispatch } from 'react-redux';
import useAuth from '../hooks/useAuth.js';
import { logOut } from '../slices/authSlice.js';
import getPath from '../routes.js';

const LogOutButton = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  return (
    !auth.token ? null : <button onClick={() => dispatch(logOut())} className="btn btn-primary" type="button">Выйти</button>
  );
};

const Navbar = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <a className="navbar-brand" href={getPath.chatPage()}>Project Chat</a>
      <LogOutButton />
    </div>
  </nav>
);

export default Navbar;
