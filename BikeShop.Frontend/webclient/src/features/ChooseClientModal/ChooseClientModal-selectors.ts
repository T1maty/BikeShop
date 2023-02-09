import useChooseClientModal from './ChooseClientModalStore';

export const openSelector = useChooseClientModal(s => s.chooseClientModal)
export const setOpenSelector = useChooseClientModal(s => s.setChooseClientModal)