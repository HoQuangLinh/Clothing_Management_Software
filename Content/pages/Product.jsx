import React, { useEffect, useState } from "react";


const Product = (props) => {
    const [products, setProducts] = useState([])

    const loadProductsFromServer = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', "/products", true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            setProducts(data)
        };
        xhr.send();
    }

    useEffect(() => {
        loadProductsFromServer()
        //console.log(products)
    }, [])

    return (
        <div className="product-container">
            <div className="product-filter">
                <div className="product-filter__card">
                    <h4>Tìm kiếm</h4>
                    <input type="text" placeholder="Tìm theo mã, tên sản phẩm"/>
                </div>
                <div className="product-filter__card">
                    <h4>Các loại áo</h4>
                    <select name="shirts" id="shirts">
                        <option value="all">Tất cả</option>
                    </select>
                </div>
                <div className="product-filter__card">
                    <h4>Các loại áo</h4>
                    <select name="trousers" id="trousers">
                        <option value="all">Tất cả</option>
                    </select>
                </div>
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
                    <div className="item">
                        <div className="id">9583846</div>
                        <div className="name">Áo sweater - TINOWEAR</div>
                        <div className="origin__price">10,000</div>
                        <div className="price">9,600</div>
                        <div className="quantity">20</div>
                        <button className="btn-edit">
                            <i class='bx bx-edit'></i>
                        </button>
                        <button className="btn-delete">
                            <i class='bx bx-trash' ></i>
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Product;
