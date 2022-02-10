import React from 'react'

const AddProductModal = ({ handleClose, show }) => {

    return (
        <div className={show ? "modal" : "modal hide"}>
            <div className="modal__inner">
                <div className="modal__header">
                    <p>Thông báo!</p>
                    <i class='bx bx-x' onClick={handleClose}></i>
                </div>
                <div className="modal__body">
                    <h2>Modal</h2>
                    <p>Đây là phần body của modal</p>
                </div>
                <div className="modal__footer">
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default AddProductModal