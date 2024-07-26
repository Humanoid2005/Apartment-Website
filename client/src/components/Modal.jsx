import React, { useState } from "react";
import "./Modal.css";

function Modal(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal delete-account-button">
        Delete Account
      </button>

      {modal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure about deleting your account ?</h3>
            <p>Please note that these changes cannot be reversed.</p>
            <form className="confirm-delete-form" action="/delete-account" method="POST">
                    <button className="delete-account-button">Delete Account</button>
            </form>
            <img className="close-image close-modal" src="/images/close.png" height={20} onClick={toggleModal}/>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;