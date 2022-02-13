import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import useFormProduct from './useFormProduct'
import validateProduct from './validateProduct'

const UpdateProductModal = ({ handleClose, show, product, setProduct }) => {
    const inputProductImage = useRef(null);
    const [categoryId, setCategoryId] = useState(0);
    const [size, setSize] = useState(product.size);
    const [categories, setCategories] = useState([])
    const [productImage, setProductImage] = useState();
    const [qrImage, setQrImage] = useState(
        "https://res.cloudinary.com/hoquanglinh/image/upload/v1639458680/Linh/cwq6qhmybgzhvpp58ytp.png"
    );
    let options = null
    const sizeList = [
        "3XL", "XXL", "XL", "L", "M", "S"
    ]

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setProductImage(event.target.files[0]);
        }
    };

    const submitForm = () => {
        console.log(product)
    }

    const { handleChange, handleSubmit, errors } = useFormProduct(
        submitForm,
        product,
        setProduct,
        validateProduct
    );

    const loadCategoriesFromServer = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/api/categories", true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            setCategories(data);
            setCategoryId(data[0].id)
        };
        xhr.send();
    };

    useEffect(() => {
        loadCategoriesFromServer();
    }, []);

    if (product) {
        options = sizeList.map((el) => <option key={el} value={el} selected={el === product.size}>{el}</option>);
    }
    return (
        <div className={show ? "modal" : "modal hide"}>
            <div className="modal__inner">
                <div className="modal__header">
                    <h2>Thêm sản phẩm</h2>
                    <i class='bx bx-x' onClick={handleClose}></i>
                </div>
                <div className="modal__body">
                    <div className="add-product__row">
                        <div className="add-product__field">
                            <span>Mã sản phẩm</span>
                            <input type="text" placeholder="Mã tự động" readOnly value={product.id} />
                        </div>
                        <div className="add-product__field">
                            <span>Giá vốn (vnđ)</span>
                            <input type="text" pattern="[0-9]*" name="costPrice"
                                value={product.costPrice} onChange={handleChange} />
                            <p className="add-product__field-error">{errors.costPrice}</p>
                        </div>
                    </div>
                    <div className="add-product__row">
                        <div className="add-product__field">
                            <span>Loại sản phẩm</span>
                            <select
                                name="category"
                                onChange={(e) => { setCategoryId(e.target.value) }}
                                className="add_product_field-select"
                            >
                                {product && categories.map((category, index) => {
                                    return (
                                        <option key={index} value={category.id} 
                                        selected={product.categoriesId === category.id}>
                                            {category.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="add-product__field">
                            <span>Giảm giá (%)</span>
                            <input type="number" pattern="[0-9]*" name="discount"
                                value={product.discount} onChange={handleChange} />
                            <p className="add-product__field-error">{errors.countInStock}</p>
                        </div>
                    </div>
                    <div className="add-product__row">
                        <div className="add-product__field">
                            <span>Tên sản phẩm</span>
                            <input type="text" name="name"
                                value={product.name} onChange={handleChange} />
                            <p className="add-product__field-error">{errors.name}</p>
                        </div>
                        <div className="add-product__field">
                            <span>Giá bán (vnđ)</span>
                            <input type="text" pattern="[0-9]*" name="salePrice"
                                value={product.salePrice} onChange={handleChange} />
                            <p className="add-product__field-error">{errors.salePrice}</p>
                        </div>
                    </div>
                    <div className="add-product__row">
                        <div className="add-product__field">
                            <span>Size</span>
                            <select
                                name="size"
                                onChange={(e) => { setSize(e.target.value) }}
                                className="add_product_field-select"
                            >
                                {options}
                            </select>
                        </div>
                        <div className="add-product__field">
                            <span>Giá nhập hàng (vnđ)</span>
                            <input type="text" pattern="[0-9]*" name="originPrice"
                                value={product.originPrice} onChange={handleChange} />
                            <p className="add-product__field-error">{errors.originPrice}</p>
                        </div>
                    </div>
                    <div className="add-product__row">
                        <div className="add-product__field">
                            <span>Số lượng</span>
                            <input type="text" pattern="[0-9]*" name="quantity"
                                value={product.quantity} onChange={handleChange} />
                            <p className="add-product__field-error">{errors.quantity}</p>
                        </div>
                    </div>
                    <div className="add-product__row">
                        <div className="add-product__field">
                            <input type="file" style={{ display: "none" }} ref={inputProductImage} onChange={onImageChange} />
                            <span>Hình ảnh sản phẩm</span>
                            <img onClick={() => {
                                inputProductImage.current.click();
                            }} src={
                                productImage
                                    ? URL.createObjectURL(productImage)
                                    : product.imageDisplay
                            } alt="" />
                        </div>
                        <div className="add-product__field">
                            <span>Mã vạch</span>
                            <img src={qrImage} alt="" />
                        </div>
                    </div>
                </div>
                <div className="modal__footer">
                    <button onClick={handleSubmit}>Lưu</button>
                    <button onClick={handleClose}>Bỏ qua</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProductModal