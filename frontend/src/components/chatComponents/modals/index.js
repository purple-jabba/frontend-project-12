import AddChannelComponent from './AddChannel.jsx';

const mapping = {
  addChannel: AddChannelComponent,
};

const getModal = (type) => mapping[type];

const getModalComponent = (type) => {
  if (!type) {
    return null;
  }

  const ModalComponent = getModal(type);
  return <ModalComponent />;
};

export default getModalComponent;
