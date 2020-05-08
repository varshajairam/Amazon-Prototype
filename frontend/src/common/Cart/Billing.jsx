import React, { useState, useEffect } from 'react';
import './Cart.css';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  fetchProfileData,
  addCard,
} from '../../store/actions/profileActions';

const Billing = (props) => {
  const dispatch = useDispatch();
  const {address} = props.location.state;

  useEffect(() => {
    props.fetchProfileData();
  }, []);

  return (
    <React.Fragment>
            <div className="ui grid container mt-5">
            <h2 class="ui header">Select a card for payment</h2>
            <div class="ui grid">
                {
                    props.profileReducerData.user_cards && props.profileReducerData.user_cards.length ? 
                    props.profileReducerData.user_cards.map((card, i) => <React.Fragment>
                        <div class="six wide column"><div className="ui card">
                        <div className="content">
                            <h4 class="ui header">{card.name}</h4>
                            <label>{card.number}</label><br />
                            <label>{card.expiration}</label><br />
                            <Link to={{ pathname: '/checkout', state: { address, card } }} >
                            <div className="ui primary button mt-5">
                                Pay with this card
                            </div>
                            </Link>
                        </div>
                    </div></div>
                    </React.Fragment>) : <center></center>
                }
                </div>
                <hr/>
                <h2 class="ui header">(OR) Add a new card</h2>
                <form className="ui form mt-5" onSubmit={(ev) => dispatch(addCard(ev))}>
            <div className="description">
              <div className="field">
                <label htmlFor="inputName">
                  Full Name
                  <input type="text" id="inputName" name="name" placeholder="Full Name" required />
                </label>
              </div>
              <div className="field">
                <label htmlFor="inputCardNumber">
                  Card Number
                  <input type="text" id="inputCardNumber" name="number" placeholder="Card Number" required />
                </label>
              </div>
              <div className="field">
                <label htmlFor="inputExpiry">
                  Expiration Date
                  <input type="date" id="inputExpiry" name="expiration" placeholder="Expiration Date" />
                </label>
              </div>
              <div className="field">
                <label htmlFor="inputCvv">
                  CVV
                  <input type="number" id="inputCvv" min="100" max="999" name="cvv" placeholder="CVV" required />
                </label>
              </div>
            </div>
            <div className="actions">
              <button type="submit" className="ui primary button">Save</button>
            </div>
          </form>
            </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  profileReducerData: state.profileReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProfileData: () => dispatch(fetchProfileData()),
  addCard: (data) => dispatch(fetchProfileData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
