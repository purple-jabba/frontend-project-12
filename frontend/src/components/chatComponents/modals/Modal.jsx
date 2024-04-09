import { useDispatch, useSelector } from 'react-redux';
import getModal from './index.js';
import { closeModal } from '../../../slices/modalSlice.js';

const Modal = () => {
  const { isOpen, type } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeModal());

  const ModalComponent = getModal(type);

  return (
    ModalComponent ? <ModalComponent isOpen={isOpen} close={handleClose} /> : null
  );
};

export default Modal;
