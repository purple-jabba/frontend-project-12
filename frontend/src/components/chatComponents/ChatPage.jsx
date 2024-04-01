import ChannelsComponent from './ChannelsComponent.jsx';
import MessagesComponent from './MessagesComponent.jsx';

const ChatPage = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <ChannelsComponent />
      <MessagesComponent />
    </div>
  </div>
);

export default ChatPage;
