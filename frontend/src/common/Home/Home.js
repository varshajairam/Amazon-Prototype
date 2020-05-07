import React, { Fragment, useState, useEffect } from 'react';

import { connect } from 'react-redux';

import { getCategories } from '../../store/actions/categoryActions';
import { getRecomendations } from '../../store/actions/recomendationActions';
import StarRatings from '../StarRatings/StarRatings';

const Home = ({
  getCategories,
  getRecomendations,
  categories,
  recomendations,
}) => {
  useEffect(() => {
    getCategories();
    getRecomendations();
  }, [getCategories, getRecomendations]);

  return (
    <div className="ui container">
      {categories.loading || recomendations.loading ? (
        <div className="ui loading segment">Loading Categories</div>
      ) : (
        <Fragment>
          {recomendations.recomendations.map((recomendation) => (
            <div className="ui segment" key={recomendation._id}>
              <div className="ui header">
                {
                  categories.categories.find((cat) => {
                    return cat._id === recomendation._id;
                  }).name
                }
              </div>
              <div className="ui five cards">
                {recomendation.products.map((product) => {
                  return (
                    <div className="ui card">
                      <div className="image">
                        <img
                          src={
                            product.images.length > 1
                              ? product.images[0]
                              : 'https://www.moodfit.com/front/images/genral_image_notfound.png'
                          }
                        />
                      </div>
                      <div className="content">
                        <div className="header">{product.name}</div>
                        <StarRatings
                          max="5"
                          rating={product.averageRating || 0}
                          customizable="false"
                        />
                      </div>
                      <a className="ui bottom attached primary button">View Details</a>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categoryReducer,
    recomendations: state.recomendationsReducer,
  };
};

export default connect(mapStateToProps, { getCategories, getRecomendations })(
  Home
);
