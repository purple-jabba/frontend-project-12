import img from '../assets/404.jpg';
import getPath from '../routes.js';

const NotFound = () => (
  <div className="text-center">
    <img alt="Страница не найдена" className="img-fluid" src={img} />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      {' '}
      <a href={getPath.chatPage()}>на главную страницу</a>
    </p>
  </div>
);

export default NotFound;
