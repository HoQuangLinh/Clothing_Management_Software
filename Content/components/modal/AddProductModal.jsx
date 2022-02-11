import React, { useState, useEffect, useRef } from 'react';
import useFormProduct from './useFormProduct'
import validateProduct from './validateProduct'

const AddProductModal = ({ handleClose, show }) => {
    const inputProductImage = useRef(null);
    const [productId, setProductId] = useState();
    const [categoryId, setCategoryId] = useState();
    const [categories, setCategories] = useState([])
    const [productImage, setProductImage] = useState();
    const [qrImage, setQrImage] = useState(
        "https://res.cloudinary.com/hoquanglinh/image/upload/v1639458680/Linh/cwq6qhmybgzhvpp58ytp.png"
    );
    const [product, setProduct] = useState({
        name: "",
        category: "",
        costPrice: 0,
        salePrice: 0,
        originPrice: 0,
        discount: 0,
        size: "",
        quantity: 0,
    });

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setProductImage(event.target.files[0]);
        }
    };

    const submitForm = () => {

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
                    <h2>Thêm sản phẩm</h2>
                    <i class='bx bx-x' onClick={handleClose}></i>
                </div>
                <div className="modal__body">
                    <div className="add-product__row">
                        <div className="add-product__field">
                            <span>Mã sản phẩm</span>
                            <input type="text" placeholder="Mã tự động" readOnly value={productId}/>
                        </div>
                        <div className="add-product__field">
                            <span>Giá vốn (vnđ)</span>
                            <input type="number" pattern="[0-9]*" name="costPrice" 
                            value={product.costPrice} onChange={handleChange}/>
                            <p className="add-product__field-error">{errors.costPrice}</p>
                        </div>
                    </div>
                    <div className="add-product__row">
                        <div className="add-product__field">
                            <span>Loại sản phẩm</span>
                            <select
                                name="category"
                                onChange={(e) => {setCategoryId(e.target.value)}}
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
                            <input type="number" pattern="[0-9]*" name="discount" 
                            value={product.discount} onChange={handleChange}/>
                            <p className="add-product__field-error">{errors.countInStock}</p>
                        </div>
                    </div>
                    <div className="add-product__row">
                        <div className="add-product__field">
                            <span>Tên sản phẩm</span>
                            <input type="text" name="name" 
                            value={product.name} onChange={handleChange}/>
                            <p className="add-product__field-error">{errors.name}</p>
                        </div>
                        <div className="add-product__field">
                            <span>Giá bán (vnđ)</span>
                            <input type="number" pattern="[0-9]*" name="salePrice" 
                            value={product.salePrice} onChange={handleChange}/>
                            <p className="add-product__field-error">{errors.salePrice}</p>
                        </div>
                    </div>
                    <div className="add-product__row">
                        <div className="add-product__field">
                            <span>Size</span>
                            <input type="text" name="size" value={product.size} onChange={handleChange}/>
                            <p className="add-product__field-error">{errors.size}</p>
                        </div>
                        <div className="add-product__field">
                            <span>Giá nhập hàng (vnđ)</span>
                            <input type="number" pattern="[0-9]*" name="originPrice" 
                            value={product.originPrice} onChange={handleChange}/>
                            <p className="add-product__field-error">{errors.originPrice}</p>
                        </div>
                    </div>
                    <div className="add-product__row">
                        <div className="add-product__field">
                            <span>Số lượng</span>
                            <input type="text" name="quantity" value={product.quantity} onChange={handleChange}/>
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
                                    : "https://res.cloudinary.com/hoquanglinh/image/upload/v1639458680/Linh/cwq6qhmybgzhvpp58ytp.png"
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

export default AddProductModal