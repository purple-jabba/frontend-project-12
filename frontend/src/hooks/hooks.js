import { useSelector } from 'react-redux';

export const useAuth = () => useSelector((state) => state.auth);

export const useSelectedChannel = () => useSelector((state) => state.selectedChannel);

export const useModal = () => useSelector((state) => state.modal);
