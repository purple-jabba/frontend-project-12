import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/hooks.js';
import { logOut } from '../slices/authSlice.js';
import { clearMessageHistory } from '../slices/messagesSlice.js';
import { clearChannelHistory } from '../slices/channelsSlice.js';
import getPath from '../routes.js';

const LogOutButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const dispatch = useDispatch();

  return (
    !auth.token ? null : (
      <button
        onClick={() => {
          dispatch(logOut());
          dispatch(clearMessageHistory());
          dispatch(clearChannelHistory());
        }}
        className="btn btn-primary"
        type="button"
      >
        {t('mainComponents.logout')}
      </button>
    )
  );
};

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href={getPath.chatPage()}>{t('chatName')}</a>
        <LogOutButton />
      </div>
    </nav>
  );
};

export default Navbar;
