import { useDispatch } from 'react-redux';
import { useSelectedChannel } from '../../hooks/hooks.js';
import { selectCurrentChannel } from '../../slices/channelsSlice.js';

const Channel = ({ data }) => {
  const { id, name, removable } = data;
  const selectedChannel = useSelectedChannel();
  const dispatch = useDispatch();
  if (!removable) {
    return (
      <li id={id} className="nav-item w-100">
        <button onClick={() => dispatch(selectCurrentChannel(data))} type="button" className={Number(id) !== selectedChannel.currentChannelId ? 'w-100 rounded-0 text-start btn' : 'w-100 rounded-0 text-start btn btn-secondary'}>
          <span className="me-1">#</span>
          {name}
        </button>
      </li>
    );
  }

  return (
    <li id={id} className="nav-item w-100">
      <div role="group" className="w-100 rounded-0 text-start text-truncate btn">
        <button type="button" className="w-100 rounded-0 text-start text-truncate btn">
          <span className="me-1">#</span>
          {name}
        </button>
        <button type="button" className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn">
          <span className="visually-hidden">Управление каналом</span>
        </button>
      </div>
    </li>
  );
};

export default Channel;
