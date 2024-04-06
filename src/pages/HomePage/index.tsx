import { useState } from 'react';
import Modal from 'react-modal';

function HomePage() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const Rest_api_key = '5818289447397369d006bcd7145c25d6';
  const redirect_uri = 'http://localhost:3000/login/callback';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  function openModal() {
    setIsOpen(true);
  }
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

  function afterOpenModal() {
    console.log('open');
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      Home
      <button onClick={handleLogin}>카카오 로그인</button>
      <button className="bg-red-600 text-red-600" onClick={openModal}>
        팝업 날리기
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
}

export default HomePage;
