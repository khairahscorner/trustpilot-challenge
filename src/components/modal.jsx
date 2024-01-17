import Modal from "react-modal";
import PropTypes from "prop-types";
import Button from "./button";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  content: {
    background: "#ffffff",
    border: "1px solid transparent",
    borderRadius: "4px",
    padding: "20px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "500px",
    width: "100%",
    height: "fit-content",
  },
};

// Modal component
const AlertModal = ({ isOpen, action, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={action}
      shouldCloseOnOverlayClick={false}
      style={customStyles}
      appElement={document.getElementById("root")}
    >
      <h2 className="text-2xl md:text-3xl text-center font-bold mb-3">{message}</h2>
      <div className="border-b border-neutral-200 my-8"></div>
      <div className="text-center">
        <Button
          click={() => action()}
          extraClasses="w-auto mb-4"
          size="small"
          text="Start New Game"
        />
      </div>
    </Modal>
  );
};

AlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default AlertModal;
