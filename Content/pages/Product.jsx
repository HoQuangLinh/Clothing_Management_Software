import React, { useEffect, useState } from "react";

const Product = ({showModal}) => {
    const [products, setProducts] = useState([]);
    const [shirts, setShirts] = useState([]);
    const [trousers, setTrousers] = useState([]);

    const loadProductsFromServer = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/api/products", true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            setProducts(data);
        };
        xhr.send();
    };

    const loadCategoriesFromServer = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/api/categories", true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            data.forEach(item => {
                let arr = item.name.split(' ')
                 
                if (arr[0] === "Áo") {
                    setShirts(shirts => [...shirts, item])
                }
                if (arr[0] === "Quần") {
                    setTrousers(trousers => [...trousers, item])
                }
            })
        };
        xhr.send();
    };

    useEffect(() => {
        loadCategoriesFromServer();
        loadProductsFromServer();
        console.log(shirts)
    }, []);

    return (
        <div className="product-container">
            <div className="product-filter">
                <div className="product-filter__card">
                    <h4>Tìm kiếm</h4>
                    <input type="text" placeholder="Tìm theo mã, tên sản phẩm" />
                </div>
                <div className="product-filter__card">
                    <h4>Các loại áo</h4>
                    <select name="shirts" id="shirts">
                        <option value="all">Tất cả</option>
                        {shirts && shirts.map((shirt, index) => (
                            <option key={index} value={shirt.name}>{shirt.name}</option>
                        ))}
                    </select>
                </div>
                <div className="product-filter__card">
                    <h4>Các loại quần</h4>
                    <select name="trousers" id="trousers">
                        <option value="all">Tất cả</option>
                        {trousers && trousers.map((trouser, index) => (
                            <option key={index} value={trouser.name}>{trouser.name}</option>
                        ))}
                    </select>
                </div>
                <button className="btn-qrcode">Xem mã vạch</button>
            </div>
            <div className="product-data">
                <div className="product-list">
                    <div className="header">
                        <div className="id">Mã sản phẩm</div>
                        <div className="name">Tên sản phẩm</div>
                        <div className="origin__price">Giá vốn (vnđ)</div>
                        <div className="price">Giá bán (vnđ)</div>
                        <div className="quantity">Tồn kho</div>
                    </div>
                    <div className="product-list-item">
                        {products && products.map((product) => (
                            <div className="item">
                                <div className="id">{product.id}</div>
                                <div className="name">{product.name}</div>
                                <div className="origin__price">{product.originPrice}</div>
                                <div className="price">{product.costPrice}</div>
                                <div className="quantity">{product.quantity}</div>
                                <div className="group-btn">
                                    <button className="btn-edit">
                                        <i class="bx bx-edit"></i>
                                    </button>
                                    <button className="btn-delete">
                                        <i class="bx bx-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="product-group-btn">
                    <button className="btn-new" onClick={showModal}>
                        <i class="bx bx-plus"></i>
                        Thêm mới
                    </button>
                    <button className="btn-import">
                        <i class="bx bxs-file-import"></i>
                        Nhập file
                    </button>
                    <button className="btn-export">
                        <i class="bx bxs-file-export"></i>
                        Xuất file
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
