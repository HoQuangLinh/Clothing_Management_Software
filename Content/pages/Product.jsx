import React, { useEffect, useState } from "react";
import axios from 'axios';
import AddProductModal from '../components/modal/AddProductModal.jsx'
import UpdateProductModal from '../components/modal/UpdateProductModal.jsx'
import DeleteProductDialog from "../components/dialog/DeleteProductDialog.jsx";

const Product = () => {
    const [productSelected, setProductSelected] = useState({
        "id": 0,
        "name": "",
        "originPrice": 0,
        "costPrice": 0,
        "discount": 0,
        "salePrice": 0,
        "imageDisplay": "",
        "qrCodeUrl": "",
        "size": "",
        "quantity": 0,
        "categoriesId": 0,
    })
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [trousers, setTrousers] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const handleShowAddModal = () => {
        setShowAddModal(true)
    }

    const handleCloseAddModal = () => {
        setShowAddModal(false)
    }

    const handleShowUpdateModal = () => {
        setShowUpdateModal(true)
    }

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false)
    }

    const handleShowDialog = () => {
        setShowDialog(true)
    }

    const handleCloseDialog = () => {
        setShowDialog(false)
    }

    const loadProductsFromServer = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/api/products", true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            setProducts(data);
        };
        xhr.send();
    };

    function filterProductsByCategory(value) {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/api/products", true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            setProducts([])
            data.map((product) => {
                //console.log('value', value)
                //console.log('category id', product.categoriesId)
                if (value === product.categoriesId.toString()) {
                    setProducts(products => [...products, product])
                    console.log('product', product.id)
                }
            })
            if (value === "0") {
                setProducts(data)
            }
        };
        xhr.send();
    };

    function searchProduct(value) {
        //post data
        axios.post("/api/products/search", JSON.stringify(value),
        {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => {
            console.log(res.data);
            if (res.data === "Failed") {
                return;
            }
            if (res.data === "All") {
                loadProductsFromServer()
            } else {
                setProducts([])
                res.data.map((product) => {
                    setProducts(products => [...products, product])
                })
            }

        });
    };

    const handleSearchProduct = (event) => {
        if (event.key === 'Enter') {
            searchProduct(event.target.value)
        }
    }   

    const loadCategoriesFromServer = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/api/categories", true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            setCategories(data)
        };
        xhr.send();
    };

    useEffect(() => {
        loadCategoriesFromServer();
        loadProductsFromServer();
        
    }, []);

    return (
        <div className="product-container">
            <AddProductModal 
                handleClose={handleCloseAddModal} 
                show={showAddModal} 
                reloadProduct={loadProductsFromServer}
            />
            <UpdateProductModal 
                handleClose={handleCloseUpdateModal} 
                show={showUpdateModal} 
                product={productSelected}
                setProduct={setProductSelected}
                reloadProduct={loadProductsFromServer}
            />
            <DeleteProductDialog
                handleClose={handleCloseDialog}
                show={showDialog}
                product={productSelected}
                reloadProduct={loadProductsFromServer}
            />
            <div className="product-filter">
                <div className="product-filter__card">
                    <h4>Tìm kiếm</h4>
                    <input type="text" id="search" placeholder="Tìm theo mã, tên sản phẩm"
                        onKeyPress={handleSearchProduct} />
                </div>
                <div className="product-filter__card">
                    <h4>Các loại áo quần</h4>
                    <select name="categories" id="categories" 
                        onChange={(e) => {
                            filterProductsByCategory(e.target.value)
                        }}>
                        <option value={0}>Tất cả</option>
                        {categories && categories.map((category, index) => (
                            <option key={index} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <button 
                    className="btn-qrcode" 
                    onClick={() => {
                        console.log("Loại quần", trouserType)
                        console.log("Loại áo", shirtType)
                    }}>
                    Xem mã vạch
                </button>
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
                                    <button className="btn-edit" onClick={() => {
                                        setProductSelected(product);
                                        productSelected && handleShowUpdateModal()
                                        //console.log(productSelected)
                                    }}>
                                        <i class="bx bx-edit"></i>
                                    </button>
                                    <button className="btn-delete" onClick={() => {
                                        setProductSelected(product);
                                        handleShowDialog()
                                    }}>
                                        <i class="bx bx-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="product-group-btn">
                    <button className="btn-new" onClick={handleShowAddModal}>
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
