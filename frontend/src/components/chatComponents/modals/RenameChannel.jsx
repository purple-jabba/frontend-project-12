import { Modal, Button, Form } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  useModal, useAuth, useChannels, useSelectedChannel,
} from '../../../hooks/hooks';
import { selectCurrentChannel } from '../../../slices/selectChannelSlice.js';
import { closeModal } from '../../../slices/modalSlice.js';
import { useEditChannelMutation, useGetChannelsQuery } from '../../../services/channelsApi.js';
import { clearChannelHistory } from '../../../slices/channelsSlice.js';

const RenameChannelComponent = () => {
  const modal = useModal();
  const auth = useAuth();
  const selectedChannel = useSelectedChannel();
  const newChannels = useChannels();
  const dispatch = useDispatch();
  const addChannelRef = useRef();

  useEffect(() => {
    addChannelRef.current.focus();
  }, []);

  const { data, refetch } = useGetChannelsQuery(auth.token);

  const [editChannel] = useEditChannelMutation();

  const channelsNames = data.map((channel) => channel.name);
  const newChannelsNames = newChannels.data.map((channel) => channel.name);
  const newChannelsIds = newChannels.data.map((channel) => channel.id);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: yup.object({
      channelName: yup.string()
        .trim()
        .required('Обязательное поле')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .notOneOf([...channelsNames, ...newChannelsNames], 'Должно быть уникальным'),
    }),
    onSubmit: async (values) => {
      try {
        const newChannel = {
          id: modal.id,
          body: { name: values.channelName },
          token: auth.token,
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
        if (!newChannelsIds.includes(modal.id)) {
          dispatch(clearChannelHistory());
          refetch();
        }
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  });

  return (
    <Modal centered show={modal.isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title h4="true">Переименовать канал</Modal.Title>
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
            <Form.Label htmlFor="channelName" className="visually-hidden">Переименовать канал</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.channelName}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button className="me-2" variant="secondary" type="button" onClick={() => dispatch(closeModal())}>Отменить</Button>
              <Button variant="primary" type="submit" onClick={formik.handleSubmit}>Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default RenameChannelComponent;
