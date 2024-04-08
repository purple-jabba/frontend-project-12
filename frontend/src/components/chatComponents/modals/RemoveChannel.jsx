import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useModal, useAuth, useSelectedChannel } from '../../../hooks/hooks';
import { selectDefaultChannel } from '../../../slices/selectChannelSlice.js';
import { closeModal } from '../../../slices/modalSlice.js';
import { useRemoveChannelMutation, useGetChannelsQuery } from '../../../services/channelsApi.js';

const RemoveChannelComponent = () => {
  const { t } = useTranslation();
  const modal = useModal();
  const auth = useAuth();
  const selectedChannel = useSelectedChannel();
  const dispatch = useDispatch();

  const [removeChannel] = useRemoveChannelMutation();

  const { refetch } = useGetChannelsQuery(auth.token);

  const channel = { id: modal.id, token: auth.token };

  return (
    <Modal centered show={modal.isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" type="button" onClick={() => dispatch(closeModal())}>{t('modals.cancel')}</Button>
          <Button
            variant="danger"
            type="button"
            onClick={() => {
              removeChannel(channel);
              refetch();
              if (selectedChannel.currentChannelId.toString() === modal.id) {
                dispatch(selectDefaultChannel());
              }
              dispatch(closeModal());
            }}
          >
            {t('modals.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelComponent;
