import AddChannelComponent from './AddChannel.jsx';
import RemoveChannelComponent from './RemoveChannel.jsx';
import RenameChannelComponent from './RenameChannel.jsx';

const mapping = {
  addChannel: AddChannelComponent,
  removeChannel: RemoveChannelComponent,
  renameChannel: RenameChannelComponent,
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
