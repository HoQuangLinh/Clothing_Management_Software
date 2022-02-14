import React from "react";

const Dialog = ({ title, content, handleCancel, handleAction }) => {
  return (
    <div className="dialog-modal">
      <div className="dialog-container">
        <div className="dialog-heading">
          <h3>{title}</h3>
          <i onClick={handleCancel} class="bx bx-x dialog-x"></i>
        </div>
        <div className="dialog-body">
          <p>{content}</p>
        </div>
        <div className="dialog-footer">
          <button
            onClick={() => {
              handleCancel();
            }}
            className="dialog-btn-cancel"
          >
            Huỷ
          </button>
          <button
            onClick={() => {
              handleAction();
            }}
            className="dialog-btn-ok"
          >
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
