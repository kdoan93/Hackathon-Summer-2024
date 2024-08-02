import React from "react";
import Modal from "react-modal";
import SignupForm from "../Forms/SignupForm";
import styles from "../../../styles/modal.module.css";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

const SignupModal: React.FC<Props> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Sign Up Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <SignupForm />
    </Modal>
  );
};

export default SignupModal;
