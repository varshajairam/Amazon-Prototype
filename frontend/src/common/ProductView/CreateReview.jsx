import React, { useState, useEffect } from 'react';
import "./CreateReview.css"
import StarRatings from '../StarRatings/StarRatings';
import { connect } from 'react-redux';
import {
    Link, Redirect
} from "react-router-dom";

let CreateReview = (props) => {
    const [review, setReview] = useState({
        stars: 0,
        title: "",
        text: ""
    })

    if (!(props.location.state && props.location.state.product))
        return <Redirect to="/productlist" />

    console.log('props', props.location.state.product)
    let product = props.location.state.product;

    return <React.Fragment>
        <div className="review-wrapper ui container">
            <div className="ui  dividing row-header">
                <div className="ui header">
                    <h2>Create Review</h2>
                </div>
                <div className="product-details">
                    <img className="img-container" src={product.images[0]} />
                    <div className="product-name">{product.name}</div>
                </div>
            </div>

            <div className="ui dividing row-header mt-5 review-row">
                <div className="ui header">
                    <h2>Overall Review</h2>
                    <StarRatings max="5" rating={review.stars} onStarClick={data => setReview({ ...review, stars: data })} />
                </div>
            </div>

            <div className="ui dividing row-header mt-5 text-row">
                <div className="ui header">
                    <h4>Add a headline</h4>
                </div>
                <div className="ui form">
                    <div className="field">
                        <input placeholder="What's most important to know?" type="text" onChange={e => setReview({ ...review, title: e.target.value })} />
                    </div>
                    <h4 className="mt-5">Write a review</h4>
                    <div className="field">
                        <textarea placeholder="What did you like or dislike? What did you use this product for?" onChange={e => setReview({ ...review, text: e.target.value })} />
                    </div>
                </div>
                <div className="submit-container mt-3">
                    <div className="ui primary button">Submit</div>
                </div>
            </div>
        </div>
    </React.Fragment>
}
const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview);