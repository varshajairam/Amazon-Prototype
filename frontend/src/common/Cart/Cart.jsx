import React, { useState, useEffect } from 'react';
import './Cart.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    getCartProducts,
    getSavedProducts,
    changeProductQuantity,
    removeProductFromCart,
    saveForLater,
    removeSavedProduct,
    moveToCart,
    applyGiftCharge,
} from '../../store/actions/cartActions';

const Cart = (props) => {

    useEffect(() => {
        props.getCartProducts();
        props.getSavedProducts();
    }, []);

    return (
        <React.Fragment>
            <div className="ui grid container mt-5">
                <div className="thirteen wide column product-col">
                    <div className="clearing segment">
                        {props.cart.products != 'Cart empty' && props.cart.products.length > 0 && <h1 className="ui left floated header">Shopping Cart</h1>}
                        {props.cart.products != 'Cart empty' && props.cart.products.length > 0 && <h5 class="ui right floated header">Price</h5>}
                        {/* {props.cart.products.length > 0 && <hr />} */}
                        {
                            props.cart.products != 'Cart empty' && props.cart.products.length ?
                                props.cart.products.map((currProduct, i) => <React.Fragment key={i}>
                                    <div className="ui relaxed divided items">
                                        <div className="item">
                                            <Link to={{ pathname: '/product/' + currProduct.product._id, state: { product: currProduct.product } }}>
                                                <div className="ui small image pointer">
                                                    <img src={currProduct.product.images[0] || 'https://www.moodfit.com/front/images/genral_image_notfound.png'} />
                                                </div>
                                            </Link>
                                            <div className="content product-details">
                                                <Link to={{ pathname: '/product/' + currProduct.product._id, state: { product: currProduct.product } }}>
                                                    <div className="ui header onHover">{currProduct.product.name}</div>
                                                </Link>
                                                <div className="ui sub header onHover">{currProduct.product.seller.name}</div><br />
                                                <div className="ui checkbox">
                                                    <input type="checkbox" name="gift" checked={JSON.parse(currProduct.isGift)} onChange={() => { currProduct.isGift = !JSON.parse(currProduct.isGift); props.applyGiftCharge({ product: currProduct.product._id, isGift: currProduct.isGift }) }} />
                                                    <label>This is a gift</label>
                                                </div>
                                                <div className="field mt-3">
                                                    <label>Quantity</label>
                                                    <select onChange={(e) => props.changeProductQuantity({
                                                        product: currProduct.product._id,
                                                        quantity: Number(e.target.value)
                                                    })} defaultValue={currProduct.quantity}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select> |
                                                    <a onClick={() => props.removeProductFromCart({ product: currProduct.product._id })}> Delete</a> |
                                                    <a onClick={() => props.saveForLater({
                                                        product: currProduct.product._id,
                                                        quantity: currProduct.quantity,
                                                        isGift: currProduct.isGift
                                                    })}> Save for Later
                                                    </a>
                                                </div>
                                                <div className="header" style={{ float: 'right' }}>
                                                    $ {currProduct.product.baseCost}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </React.Fragment>) : <center><h2 className="ui header">Add some products to cart.</h2></center>
                        }
                    </div>
                    {props.cart.products != 'Cart empty' && props.cart.products.length > 0 && <h2 class="ui right floated header">Subtotal ({props.cart.products.length} {props.cart.products.length == 1 ? 'item' : 'items'}): ${props.cart.products[0].totalCost}</h2>}
                </div>
                {props.cart.products != 'Cart empty' && props.cart.products.length > 0 && <div className="three wide column">
                    <div className="ui card">
                        <div className="content">
                            <div className="ui checkbox">
                                <input type="checkbox" name="gift" />
                                <label>This order contains a gift</label>
                            </div>
                            <div className="ui primary button mt-5" onClick={() => props.history.push({pathname: '/shipping', state: { products: props.cart.products }})}>
                                Proceed to checkout
                            </div>
                        </div>
                    </div>
                </div>}
                {props.cart.savedForLater != 'Empty' && props.cart.savedForLater && props.cart.savedForLater.length > 0 &&
                    <div className="thirteen wide column product-col mt-10">
                        <h1 className="ui left floated header">Saved for Later</h1>
                        {
                            props.cart.savedForLater && props.cart.savedForLater.length > 0 ?
                                props.cart.savedForLater.map((currProduct, i) => <React.Fragment key={i}>
                                    <div className="ui relaxed divided items">
                                        <div className="item">
                                            <Link to={{ pathname: '/product/' + currProduct.product._id, state: { product: currProduct.product } }} >
                                                <div className="ui small image pointer">
                                                    <img src={currProduct.product.images[0] || "https://www.moodfit.com/front/images/genral_image_notfound.png"} />
                                                </div>
                                            </Link>
                                            <div className="content product-details">
                                                <Link to={{ pathname: '/product/' + currProduct.product._id, state: { product: currProduct.product } }} >
                                                    <div className="ui header onHover">{currProduct.product.name}</div>
                                                </Link>
                                                <div className="ui sub header onHover">{currProduct.product.seller.name}</div>
                                                <div className="field mt-3">
                                                    <a onClick={() => props.removeSavedProduct({ product: currProduct.product._id })}> Delete</a> |
                                                    <a onClick={() => props.moveToCart({
                                                        product: currProduct.product._id,
                                                        quantity: currProduct.quantity,
                                                        isGift: false,
                                                    })}> Move to Cart
                                                    </a>
                                                </div>
                                                <div className="header" style={{ float: 'right' }}>
                                                    $
                                                    {currProduct.product.baseCost}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </React.Fragment>) : <center></center>
                        }
                    </div>}
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    cart: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
    getCartProducts: () => dispatch(getCartProducts()),
    getSavedProducts: () => dispatch(getSavedProducts()),
    changeProductQuantity: (data) => dispatch(changeProductQuantity(data)),
    removeProductFromCart: (data) => dispatch(removeProductFromCart(data)),
    removeSavedProduct: (data) => dispatch(removeSavedProduct(data)),
    saveForLater: (data) => dispatch(saveForLater(data)),
    moveToCart: (data) => dispatch(moveToCart(data)),
    applyGiftCharge: (data) => dispatch(applyGiftCharge(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
