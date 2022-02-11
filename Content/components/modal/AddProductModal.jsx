import React, { useState, useEffect } from 'react'

const AddProductModal = ({ handleClose, show }) => {
    const [categories, setCategories] = useState([])

    const loadCategoriesFromServer = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/api/categories", true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            setCategories(data);
        };
        xhr.send();
    };

    useEffect(() => {
        loadCategoriesFromServer();
    }, []);

    return (
        <div className={show ? "modal" : "modal hide"}>
            <div className="modal__inner">
                <div className="modal__header">
                    <p>Thêm Sản phẩm</p>
                    <i class='bx bx-x' onClick={handleClose}></i>
                </div>
                <div className="modal__body">
                    <div className="add-product__field">
                        <span>Mã sản phẩm</span>
                        <input type="text" placeholder="Mã tự động" readOnly/>
                    </div>
                    <div className="add-product__field">
                        <span>Giá vốn (vnđ)</span>
                        <input type="text" pattern="[0-9]*" name="costPrice" />
                        <p className="add-product__field-error"></p>
                    </div>
                    <div className="add-product__field">
                        <span>Loại sản phẩm</span>
                        <select
                            name="category"
                            onChange={}
                            className="add_product_field-select"
                        >
                            {categories.map((category) => {
                                return (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="add-product__field">
                        <span>Giảm giá (%)</span>
                        <input type="number" pattern="[0-9]*" name="discount" />
                        <p className="add-product__field-error"></p>
                    </div>
                    <div className="add-product__field">
                        <span>Tên sản phẩm</span>
                        <input type="text" name="name" />
                        <p className="add-product__field-error"></p>
                    </div>
                    <div className="add-product__field">
                        <span>Giá bán (vnđ)</span>
                        <input type="text" pattern="[0-9]*" name="salePrice" />
                        <p className="add-product__field-error"></p>
                    </div>
                    <div className="add-product__field">
                        <span>Size</span>
                        <input type="text" name="size" />
                        <p className="add-product__field-error"></p>
                    </div>
                    <div className="add-product__field">
                        <span>Giá nhập hàng (vnđ)</span>
                        <input type="text" pattern="[0-9]*" name="salePrice" />
                        <p className="add-product__field-error"></p>
                    </div>
                    <div> </div>
                </div>
                <div className="modal__footer">
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default AddProductModal