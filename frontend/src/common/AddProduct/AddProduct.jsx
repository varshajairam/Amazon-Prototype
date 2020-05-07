import React, { Fragment, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import Step from './Step';
import BasicInfo from './BasicInfo';
import Images from './Images';

import {
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../store/actions/productActions';
import Offers from './Offers';

const AddProduct = (props) => {
  const { addProduct, updateProduct, deleteProduct } = props;
  let initialState = { offers: [] };
  if (props.location.state) {
    const {
      name,
      baseCost,
      category,
      description,
      images,
      offers,
    } = props.location.state.product;
    initialState = {
      name,
      baseCost,
      category,
      description,
      images,
      offers,
    };
  }

  const [state, setstate] = useState(initialState);
  const [currentStep, setCurrentStep] = useState(1);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const back = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const updateState = (updatedValues) => {
    setstate({ ...state, ...updatedValues });
  };

  const submit = () => {
    if (props.location.state) {      
      updateProduct({id: props.location.state.product._id, ...state, offers: JSON.stringify(state.offers) });
    } else {
      addProduct({ ...state, offers: JSON.stringify(state.offers) });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfo
            state={state}
            next={next}
            back={back}
            updateState={updateState}
          />
        );
      case 2:
        return (
          <Images
            state={state}
            next={next}
            back={back}
            updateState={updateState}
          />
        );
      case 3:
        return (
          <Offers
            state={state}
            back={back}
            submit={submit}
            updateState={updateState}
            update={props.location.state? true : false}
          />
        );
      default:
        return `Step`;
    }
  };

  return (
    <Fragment>
      <div className="ui container">
        <div className="ui three top attached steps">
          <Step
            title="Basic Info"
            icon="list"
            description="Enter basic information about your product"
            active={currentStep === 1}
          />
          <Step
            title="Images"
            icon="file image"
            description="Add Images to your product"
            active={currentStep === 2}
          />
          <Step
            title="Offers"
            icon="tag"
            description="Choose your products category"
            active={currentStep === 3}
          />
        </div>
        <div className="ui attached segment">{renderStep()}</div>
        {props.location.state ? (
          <div className="ui bottom attached segment">
            <div
              className="ui fluid negative button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteProduct({ id: props.location.state.product._id });
              }}
            >
              Delete Product
            </div>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  addProduct,
  updateProduct,
  deleteProduct,
})(AddProduct);
