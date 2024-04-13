import i18next from 'i18next';
import leoProfanity from 'leo-profanity';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollBar, ErrorBoundary } from '@rollbar/react';
import store from './slices/index.js';
import App from './components/App';
import resources from './locales/index.js';
import socket from './socket.js';
import Modal from './components/chatComponents/modals/Modal.jsx';
import { addNewMesage } from './slices/messagesSlice';
import {
  addNewChannel, deleteChannel, renameChannel, selectCurrentChannel, selectDefaultChannel,
} from './slices/channelsSlice.js';

const init = async () => {
  const i18n = i18next.createInstance();
  const { dispatch } = store;

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  socket.on('newMessage', (payload) => {
    dispatch(addNewMesage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(addNewChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    const { channels } = store.getState();
    if (channels.selectedChannel.currentChannelId.toString() === payload.id) {
      dispatch(selectDefaultChannel());
    }
    dispatch(deleteChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    const { channels } = store.getState();
    if (channels.selectedChannel.currentChannelId.toString() === payload.id) {
      dispatch(
        selectCurrentChannel({ id: channels.selectedChannel.currentChannelId, name: payload.name }),
      );
    }
    dispatch(renameChannel(payload));
  });

  const russianDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(russianDictionary);

  const rollbarConfiguration = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
  };

  return (
    <RollBar config={rollbarConfiguration}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <App />
            <Modal />
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollBar>
  );
};

export default init;
