import { useTranslation } from 'react-i18next';
import img from '../assets/404.jpg';
import getPath from '../routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('mainComponents.notFound')} className="img-fluid" src={img} />
      <h1 className="h4 text-muted">{t('mainComponents.notFound')}</h1>
      <p className="text-muted">
        {t('mainComponents.but')}
        {' '}
        <a href={getPath.chatPage()}>{t('mainComponents.toMainPage')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
