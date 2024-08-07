import React, { useState } from "react";
import "./Modal.css";

function DeleteBill(props) {
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
      <div className="delete-bill-modal" style={{backgroundColor:props.bgcolor}}>
        <button onClick={toggleModal} className="btn-modal delete-bill-modal-1" style={{backgroundColor:props.bgcolor}}>
            <img src="/images/close.png" height={30} style={{backgroundColor:props.bgcolor}}/>
        </button>
      </div>

      {modal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure about deleting this bill ?</h3>
            <p>Please note that these changes cannot be reversed.</p>
            <form className="confirm-delete-form" action={"/api/delete-bill/"+props.bill_id} method="POST">
                    <button className="delete-account-button">Delete Bill</button>
            </form>
            <img className="close-image close-modal" src="/images/close.png" height={20} onClick={toggleModal}/>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteBill;