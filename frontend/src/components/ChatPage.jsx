import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchChannels } from '../slices/channelsSlice.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChannels());
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row" />
    </div>
  );
};

export default ChatPage;
