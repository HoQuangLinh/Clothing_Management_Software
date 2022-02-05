import React from "react";

const Product = (props) => {
    let [state, updateState] = React.useState({
        products: props.initialProducts,
    })

    /*
    let productNodes = state.products.map(product => (
        <Item name={product.name}></Item>
    ))
    */
    console.log(state.products)

    return (
        <div>
            <h1>This is product page</h1>
        </div>
    );
};

const Item = (name) => {
    return (
        <li>{name}</li>
    )
}

export default Product;
