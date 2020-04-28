import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux';
import Step from './Step';
import BasicInfo from './BasicInfo';
import Images from './Images';

import {addProduct} from '../../store/actions/productActions'

const AddProduct = ({addProduct}) => {
  const [state, setstate] = useState({});
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
    addProduct({...state, seller: 1});
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfo state={state} next={next} back={back} updateState={updateState} />;
      case 2:
        return <Images state={state} next={next} back={back} submit={submit} updateState={updateState} />;
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
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {};
};


export default connect(mapStateToProps, {addProduct})(AddProduct);
