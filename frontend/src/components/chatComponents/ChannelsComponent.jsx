import { useEffect } from 'react';
import { BsPlusSquare } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useGetChannelsQuery } from '../../services/channelsApi.js';
import { useModal, useChannels } from '../../hooks/hooks.js';
import { addChannelData } from '../../slices/channelsSlice.js';
import Channel from './Channel.jsx';
import getModalComponent from './modals/index.js';
import { openModal } from '../../slices/modalSlice.js';

const ChannelsComponent = () => {
  const { t } = useTranslation();
  const modal = useModal();
  const channels = useChannels();
  const dispatch = useDispatch();
  const {
    data,
    error,
    isLoading,
  } = useGetChannelsQuery();

  useEffect(() => {
    if (data) {
      dispatch(addChannelData(data));
    }
  }, [isLoading, data, dispatch]);

  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (error) {
    toast.error(t('toastify.loadingError'));
    return (
      <div className="d-flex align-items-center justify-content-center">
        <div className="spinner-border text-danger" role="status" />
      </div>
    );
  }

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      {getModalComponent(modal.type)}
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chatComponents.channels')}</b>
        <button type="button" onClick={() => dispatch(openModal({ type: 'addChannel' }))} className="p-0 text-primary btn btn-group-vertical">
          <BsPlusSquare size="1.25em" />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.data.map((channel) => <Channel key={channel.id} data={channel} />)}
      </ul>
    </div>
  );
};

export default ChannelsComponent;
