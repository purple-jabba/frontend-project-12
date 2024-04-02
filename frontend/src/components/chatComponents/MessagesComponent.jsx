import { useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useSelectedChannel, useAuth } from '../../hooks/hooks.js';
import { useGetMessagesQuery, useAddMessageMutation } from '../../services/messagesApi.js';

import Message from './Message.jsx';

const MessagesComponent = () => {
  const selectedChannel = useSelectedChannel();
  const auth = useAuth();
  const messageRef = useRef();

  const {
    data,
    //  error,
    isLoading,
    refetch,
  } = useGetMessagesQuery(auth.token);

  console.log(data);

  const [addMessage] = useAddMessageMutation();

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object({
      body: yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        const newMessagePost = {
          message: {
            body: values.body,
            channelId: selectedChannel.currentChannelId.toString(),
            username: auth.username,
          },
          token: auth.token,
        };
        addMessage(newMessagePost);
        refetch();
        formik.resetForm();
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  });

  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  //  if (!isLoading) {
  //    messageRef.current.focus();
  //  }

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${selectedChannel.currentChannelName}`}</b>
          </p>
          <span className="text-muted">Cообщения</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          { data
            .filter((message) => message.channelId === selectedChannel.currentChannelId.toString())
            .map((message) => <Message key={message.id} message={message} />) }
        </div>
        <div className="mt-auto px-5 py-3">
          <form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.body}
                className="border-0 p-0 ps-2 form-control"
                type="text"
                name="body"
                placeholder="Введите сообщение..."
                id="body"
                required
                disabled={formik.isSubmitting}
                aria-label="Новое сообщение"
                ref={messageRef}
              />
              <button
                type="submit"
                className="btn btn-group-vertical"
                disabled={formik.isSubmitting || !formik.values.body}
              >
                <ArrowRightSquare size={20} />
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesComponent;
