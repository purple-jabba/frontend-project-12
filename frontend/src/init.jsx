import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import App from './components/App';
import resources from './locales/index.js';
import { socket, WebSocketContext } from './context/webSocketContext.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <WebSocketContext.Provider value={socket}>
          <App />
        </WebSocketContext.Provider>
      </Provider>
    </I18nextProvider>
  );
};

export default init;
