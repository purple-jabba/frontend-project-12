import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelectedChannel, useModal } from '../../hooks/hooks.js';
import { selectCurrentChannel } from '../../slices/selectChannelSlice.js';
import getModalComponent from './modals/index.js';
import { openModal } from '../../slices/modalSlice.js';

const Channel = ({ data }) => {
  const { id, name, removable } = data;
  const modal = useModal();
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
      {getModalComponent(modal.type)}
      <Dropdown className="d-flex btn-group" as={ButtonGroup}>
        <button onClick={() => dispatch(selectCurrentChannel(data))} className={Number(id) !== selectedChannel.currentChannelId ? 'w-100 rounded-0 text-start text-truncate btn' : 'w-100 rounded-0 text-start text-truncate btn btn-secondary'} type="button">
          <span className="me-1">#</span>
          {name}
        </button>
        <Dropdown.Toggle variant={Number(id) !== selectedChannel.currentChannelId ? 'light' : 'secondary'} className="flex-grow-0 dropdown-toggle-split">
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => dispatch(openModal({ type: 'removeChannel', id }))}>
            Удалить
          </Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(openModal({ type: 'renameChannel', id }))}>
            Переименовать
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default Channel;
