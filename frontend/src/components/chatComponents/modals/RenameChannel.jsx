import { Modal, Button, Form } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import {
  useModal, useChannels, useSelectedChannel,
} from '../../../hooks/hooks';
import { selectCurrentChannel } from '../../../slices/channelsSlice.js';
import { closeModal } from '../../../slices/modalSlice.js';
import { useEditChannelMutation } from '../../../services/channelsApi.js';

const RenameChannelComponent = () => {
  const { t } = useTranslation();
  const modal = useModal();
  const selectedChannel = useSelectedChannel();
  const channels = useChannels();
  const dispatch = useDispatch();
  const addChannelRef = useRef();

  useEffect(() => {
    addChannelRef.current.focus();
  }, []);

  const [editChannel] = useEditChannelMutation();

  const channelsNames = channels.data.map((channel) => channel.name);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: yup.object({
      channelName: yup.string()
        .trim()
        .required(t('yup.required'))
        .min(3, t('yup.minAndMax'))
        .max(20, t('yup.minAndMax'))
        .notOneOf([...channelsNames], t('yup.notOneOf')),
    }),
    onSubmit: async (values) => {
      try {
        const clearedName = leoProfanity.clean(values.channelName);
        const newChannel = {
          id: modal.id,
          body: { name: clearedName },
        };
        editChannel(newChannel);
        dispatch(closeModal());
        if (selectedChannel.currentChannelId.toString() === modal.id) {
          dispatch(
            selectCurrentChannel(
              { id: selectedChannel.currentChannelId, name: values.channelName },
            ),
          );
        }
        toast.success(t('toastify.renameChannel'));
      } catch (e) {
        toast.error(t('toastify.loadingError'));
      }
    },
  });

  return (
    <Modal centered show={modal.isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title h4="true">{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              id="channelName"
              name="channelName"
              required=""
              onChange={formik.handleChange}
              value={formik.values.channelName}
              isInvalid={!!formik.errors.channelName}
              ref={addChannelRef}
            />
            <Form.Label htmlFor="channelName" className="visually-hidden">{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.channelName}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button className="me-2" variant="secondary" type="button" onClick={() => dispatch(closeModal())}>{t('cancel')}</Button>
              <Button variant="primary" type="submit" onClick={formik.handleSubmit}>{t('send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default RenameChannelComponent;
