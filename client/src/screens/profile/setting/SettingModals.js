import { Modal } from "native-base";
import { Text } from "react-native";
export const SettingsModal = ({ showModal, setShowModal, title, para }) => {
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{para}</Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
