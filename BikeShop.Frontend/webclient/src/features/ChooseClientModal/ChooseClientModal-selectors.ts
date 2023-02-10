import useChooseClientModal from './ChooseClientModalStore';

export const chooseClientModal = useChooseClientModal(s => s.chooseClientModal)
export const setChooseClientModal = useChooseClientModal(s => s.setChooseClientModal)