import React, {useState, useEffect} from 'react';
import axios from 'axios';

const DeleteProductDialog = ({handleClose, show, product, reloadProduct}) => {

    const handleDeleteProduct = () => {
        if (product) {
            var data = new FormData()
            data.append("Id", product.id)

            //post data
            axios.post("/api/products/delete", data).then((res) => {
                console.log(res.data);
                handleClose();
                reloadProduct();
            });
        }
    }

    return (
        <div className={show ? "modal" : "modal hide"}>
            <div className="dialog__inner">
                <div className="dialog__header">
                    <h2>Xóa sản phẩm</h2>
                    <i class='bx bx-x' onClick={handleClose}></i>
                </div>
                <div className="dialog__body">
                    <p>Bạn chắc chắn xóa sản phẩm này chứ?</p>
                </div>
                <div className="dialog__footer">
                    <button onClick={handleDeleteProduct}>
                        Xác nhận
                    </button>
                    <button onClick={handleClose}>Hủy bỏ</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteProductDialog