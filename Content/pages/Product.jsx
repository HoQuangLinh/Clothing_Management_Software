import React, { useEffect, useState } from "react";

const Product = (props) => {
    //let [state, updateState] = React.useState({
    //    products: props.initialProducts,
    //})
    const [products, setProducts] = useState([])

    const loadCommentsFromServer = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', "/products", true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            setProducts(data)
        };
        xhr.send();
    }

    useEffect(() => {
        loadCommentsFromServer()
        //console.log(products)
    }, [])

    return (
        <div>
            <h1>This is product page</h1>
            <ol className="productList">
                {products && products.map(product => (
                    <li>{product.id} | {product.name}</li>
                ))}
            </ol>
        </div>
    );
};

export default Product;
