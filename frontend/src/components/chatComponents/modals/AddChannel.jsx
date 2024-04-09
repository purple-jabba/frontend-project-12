import { Modal, Button, Form } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useModal, useAuth, useChannels } from '../../../hooks/hooks';
import { closeModal } from '../../../slices/modalSlice.js';
import { useAddChannelMutation, useGetChannelsQuery } from '../../../services/channelsApi.js';
import { selectCurrentChannel } from '../../../slices/selectChannelSlice.js';

const AddChannelComponent = () => {
  const { t } = useTranslation();
  const modal = useModal();
  const auth = useAuth();
  const newChannels = useChannels();
  const dispatch = useDispatch();
  const addChannelRef = useRef();

  useEffect(() => {
    addChannelRef.current.focus();
  }, []);

  const { data } = useGetChannelsQuery(auth.token);

  const [AddChannel] = useAddChannelMutation();

  const channelsNames = data.map((channel) => channel.name);
  const newChannelsNames = newChannels.data.map((channel) => channel.name);

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
        .notOneOf([...channelsNames, ...newChannelsNames], t('yup.notOneOf')),
    }),
    onSubmit: async (values) => {
      try {
        const newChannel = {
          body: { name: values.channelName },
          token: auth.token,
        };
        const response = await AddChannel(newChannel);
        dispatch(closeModal());
        dispatch(selectCurrentChannel({ id: response.data.id, name: response.data.name }));
        toast.success(t('toastify.addChannel'));
      } catch (e) {
        toast.error(t('toastify.loadingError'));
      }
    },
  });

  return (
    <Modal centered show={modal.isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title h4="true">{t('modals.addChannel')}</Modal.Title>
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
            <Form.Label htmlFor="channelName" className="visually-hidden">{t('modals.addChannel')}</Form.Label>
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

export default AddChannelComponent;
