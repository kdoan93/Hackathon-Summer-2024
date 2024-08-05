import React from "react";
import Modal from "react-modal";
import LoginForm from "../Forms/LoginForm";
import styles from "../../../styles/modal.module.css";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

const LoginModal: React.FC<Props> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <LoginForm />
    </Modal>
  );
};

export default LoginModal;
