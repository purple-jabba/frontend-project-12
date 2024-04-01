import { useSelectedChannel, useAuth } from '../../hooks/hooks.js';
import { useGetMessagesQuery } from '../../services/messagesApi.js';

const MessagesComponent = () => {
  const selectedChannel = useSelectedChannel();
  const auth = useAuth();
  const {
    data, error, isLoading, refetch,
  } = useGetMessagesQuery(auth.token);
  console.log(data);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${selectedChannel.currentChannelName}`}</b>
          </p>
          <span className="text-muted">Cообщения</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5" />
      </div>
    </div>
  );
};

export default MessagesComponent;
