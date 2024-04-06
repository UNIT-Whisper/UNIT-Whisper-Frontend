import Modal from 'react-modal';
import { usePopStore } from '../../../store/popup';

const SocialLoginPopup = () => {
  const [open, setIsOpen] = usePopStore((state) => [state.open, state.setIsOpen]);
  console.log(open);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <button onClick={() => setIsOpen(false)}>close</button>
    </Modal>
  );
};

export default SocialLoginPopup;
