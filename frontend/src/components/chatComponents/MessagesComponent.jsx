import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import {
  useSelectedChannel, useAuth, useModal, useMessages,
} from '../../hooks/hooks.js';
import { useGetMessagesQuery, useAddMessageMutation } from '../../services/messagesApi.js';

import Message from './Message.jsx';

const MessagesComponent = () => {
  const { t } = useTranslation();
  const selectedChannel = useSelectedChannel();
  const auth = useAuth();
  const modal = useModal();
  const newMessages = useMessages();
  const messageRef = useRef();
  const messageEnd = useRef();

  const {
    data,
    error,
    isLoading,
  } = useGetMessagesQuery(auth.token);

  const newCurrentMessages = newMessages.data
    .filter((message) => message.channelId === selectedChannel.currentChannelId.toString());

  const [addMessage] = useAddMessageMutation();

  useEffect(() => {
    if (!modal.isOpen) {
      messageRef.current.focus();
    }
  });

  useEffect(() => {
    messageEnd.current?.scrollIntoView();
  }, [data, newMessages]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object({
      body: yup.string().required(t('yup.required')),
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
        formik.resetForm();
      } catch (e) {
        toast.error(t('toastify.loadingError'));
      }
    },
  });

  if (error) {
    toast.error(t('toastify.loadingError'));
    return (
      <div className="d-flex align-items-center justify-content-center">
        <div className="spinner-border text-danger" role="status" />
      </div>
    );
  }

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${selectedChannel.currentChannelName}`}</b>
          </p>
          <span className="text-muted">
            {isLoading ? null : t('chatComponents.messages', { count: data.filter((message) => message.channelId === selectedChannel.currentChannelId.toString()).length + newCurrentMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          { isLoading ? null : data
            .filter((message) => message.channelId === selectedChannel.currentChannelId.toString())
            .map((message) => <Message key={message.id} message={message} />) }
          {newMessages.data
            .filter((message) => message.channelId === selectedChannel.currentChannelId.toString())
            .map((message) => <Message key={message.id} message={message} />) }
          <div ref={messageEnd} />
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
                placeholder={t('chatComponents.enterMessage')}
                id="body"
                required
                disabled={formik.isSubmitting || isLoading}
                aria-label={t('chatComponents.newMessage')}
                ref={messageRef}
              />
              <button
                type="submit"
                className="btn btn-group-vertical"
                disabled={formik.isSubmitting || !formik.values.body || isLoading}
              >
                <ArrowRightSquare size={20} />
                <span className="visually-hidden">{t('send')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesComponent;
