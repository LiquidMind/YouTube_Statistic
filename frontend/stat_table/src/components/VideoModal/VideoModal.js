import React, { useState } from "react";
import Modal from "react-modal";
import { FaPlayCircle, FaTimesCircle } from "react-icons/fa";
import "./VideoModal.css";

Modal.setAppElement("#root");

const VideoModal = ({ videoUrl }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <button className="openPlayerBtn" onClick={openModal}>
        <FaPlayCircle />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="react-modal-overlay"
        className="Modal"
      >
        <button className="closePlayerBtn" onClick={closeModal}>
          <FaTimesCircle />
        </button>
        <iframe
          title="YouTube Video Player"
          width="560"
          height="315"
          src={videoUrl.replace("watch?v=", "embed/")}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal>
    </>
  );
};

export default VideoModal;
