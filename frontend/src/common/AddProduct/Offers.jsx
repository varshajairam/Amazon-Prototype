import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

const Offers = ({ state, back, submit, updateState }) => {
  const { offers } = state;

  const [newOffer, setNewOffer] = useState({
    type: 'flat',
    value: 5.0,
  });
  const renderButtons = () => {
    return (
      <div className="ui fluid buttons">
        <div className="ui button" onClick={back}>
          Back
        </div>
        <div className="or"></div>
        <div
          className="ui primary button"
          onClick={() => {
            submit();
          }}
        >
          Submit
        </div>
      </div>
    );
  };
  const renderForm = () => {
    return (
      <div className="ui form">
        <div className="inline relaxed fields">
          <label htmlFor="fruit">Select Offer Type:</label>
          <div className="field">
            <input
              className="ui radio checkbox"
              type="radio"
              name="type"
              value="flat"
              checked={newOffer.type === 'flat' ? true : false}
              onChange={() => {
                setNewOffer({ ...newOffer, type: 'flat' });
              }}
            />
            <label>Flat Discount</label>
          </div>
          <div className="field">
            <input
              className="ui radio checkbox"
              type="radio"
              name="type"
              value="percentage"
              checked={newOffer.type === 'percentage' ? true : false}
              onChange={() => {
                setNewOffer({ ...newOffer, type: 'percentage' });
              }}
            />
            <label>Percentage Discount</label>
          </div>
          <div className="field">
            <div className="ui right labeled input">
              <label htmlFor="baseCost" className="ui label">
                {newOffer.type === 'flat' ? '$' : '%'}
              </label>
              <input
                type="number"
                placeholder="Discount amount"
                step="0.01"
                name="value"
                value={newOffer.value}
                onChange={(e) => {
                  var re = new RegExp(
                    newOffer.type === 'flat'
                      ? '^[0-9]*.?[0-9]{0,2}$'
                      : '^([0-9]{0,2}|100)$'
                  );
                  if (re.test(e.target.value)) {
                    setNewOffer({
                      ...newOffer,
                      [e.target.name]: e.target.value,
                    });
                  }
                }}
              />
            </div>
          </div>

          <div
            className="ui button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              updateState({ offers: [...offers, newOffer] });
            }}
          >
            Add Offer
          </div>
        </div>
      </div>
    );
  };

  const renderOffers = () => {
    return (
      <div className="ui relaxed divided list">
        {offers.map((offer, index) => {
          return (
            <div className="item" key={index}>
              <div className="right floated content">
                <div
                  className="ui button"
                  onClick={() => {
                    updateState({
                      ...state,
                      offers: offers.filter((offer, i) => {
                        return i !== index;
                      }),
                    });
                  }}
                >
                  Remove
                </div>
              </div>
              <i
                className={
                  offer.type === 'flat'
                    ? 'large money bill alternate middle aligned icon'
                    : 'large percent middle aligned icon'
                }
              ></i>
              <div className="content">
                <div className="header">
                  {offer.type === 'flat'
                    ? 'Flat-rate discount'
                    : 'Percentage Discount'}
                </div>
                <div className="description">{offer.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Fragment>
      {renderForm()}
      <div className="ui basic segment">{renderOffers()}</div>
      <div className="ui basic segment">{renderButtons()}</div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(Offers);
