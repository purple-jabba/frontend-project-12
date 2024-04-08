const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  loginPage: () => '/login',
  signUpPage: () => '/signup',
  chatPage: () => '/',
  notFoundPage: () => '*',
};
