import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useModal, useAuth } from '../../../hooks/hooks';
import { selectDefaultChannel } from '../../../slices/selectChannelSlice.js';
import { closeModal } from '../../../slices/modalSlice.js';
import { useRemoveChannelMutation, useGetChannelsQuery } from '../../../services/channelsApi.js';

const RemoveChannelComponent = () => {
  const modal = useModal();
  const auth = useAuth();
  const dispatch = useDispatch();

  const [removeChannel] = useRemoveChannelMutation();

  const { refetch } = useGetChannelsQuery(auth.token);

  const channel = { id: modal.id, token: auth.token };

  return (
    <Modal centered show={modal.isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" type="button" onClick={() => dispatch(closeModal())}>Отменить</Button>
          <Button
            variant="danger"
            type="button"
            onClick={() => {
              removeChannel(channel);
              refetch();
              dispatch(selectDefaultChannel());
              dispatch(closeModal());
            }}
          >
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelComponent;
