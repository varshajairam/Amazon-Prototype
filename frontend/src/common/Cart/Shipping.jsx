import React, { useState, useEffect } from 'react';
import './Cart.css';
import { connect } from 'react-redux';
import { CountryRegionData } from 'react-country-region-selector';
import { Link } from 'react-router-dom';

import {
  fetchProfileData,
  addAddress,
} from '../../store/actions/profileActions';

const Shipping = (props) => {
  const [states, setStates] = useState([]);

  const {products} = props.location.state;

  useEffect(() => {
    props.fetchProfileData();
  }, []);

  return (
    <React.Fragment>
            <div className="ui grid container mt-5">
            <h2 class="ui header">Select a delivery address</h2>
                <div class="ui grid">
                {
                    props.profileReducerData.user_addresses && props.profileReducerData.user_addresses.length ? 
                    props.profileReducerData.user_addresses.map((address, i) => <React.Fragment>
                        <div class="six wide column">
                          <div className="ui card">
                            <div className="content">
                              <h4 class="ui header">{address.name}</h4>
                              <label>{address.street1} {address.street2}</label><br />
                              <label>{address.city}, {address.state} {address.zipcode}</label><br />
                              <label>{address.country}</label><br />
                              <label>Phone: {address.phone}</label>
                              <Link to={{ pathname: '/billing', state: { address, products } }} >
                              <div className="ui primary button mt-5">
                                  Deliver to this address
                            </div>
                            </Link>
                        </div>
                    </div></div>
                    </React.Fragment>) : <center></center>
                }
                </div>
                <hr/>
                <h2 class="ui header">(OR) Add a new address</h2>
                <form className="ui form mt-5" onSubmit={(ev) => props.history.push({ pathname: '/billing', state: { address: ev, products } })}>
            <div className="description">
              <div className="field">
                <label htmlFor="inputName">
                  Full Name
                  <input type="text" id="inputName" name="name" placeholder="Full Name" required />
                </label>
              </div>
              <div className="field">
                <label htmlFor="inputStreet1">
                  Address 1
                  <input type="text" id="inputStreet1" name="street1" placeholder="Address 1" required />
                </label>
              </div>
              <div className="field">
                <label htmlFor="inputStreet2">
                  Address 2
                  <input type="text" id="inputStreet2" name="street2" placeholder="Address 2" />
                </label>
              </div>
              <div className="field">
                <label htmlFor="inputCity">
                  City
                  <input type="text" id="inputCity" name="city" placeholder="City" required />
                </label>
              </div>
              <div className="field">
                <label htmlFor="inputCountry">Country</label>
                <select
                  onChange={(ev) => {
                    const ind = ev.target.options.selectedIndex;
                    const newStates = ev.target.options[ind].getAttribute('data-states').split('|');
                    setStates(newStates);
                  }}
                  className="ui dropdown"
                  id="inputCountry"
                  name="country"
                  required
                >
                  <option value="" data-states="">Country</option>
                  { CountryRegionData.map((country) => (
                    <option value={country[0]} key={country[1]} data-states={country[2]}>
                      {country[0]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="inputState">State</label>
                <select className="ui dropdown" id="inputState" name="state" required>
                  <option value="">State</option>
                  { states.map((state) => {
                    const stateArr = state.split('~');
                    return (
                      <option value={stateArr[0]} key={stateArr[1]}>{stateArr[0]}</option>
                    );
                  })}
                </select>
              </div>
              <div className="field">
                <label htmlFor="inputZip">
                  Zip Code
                  <input type="number" min="10000" max="99999" id="inputZip" name="zipcode" placeholder="Zip Code" required />
                </label>
              </div>
              <div className="field">
                <label htmlFor="inputPhone">
                  Phone
                  <input type="number" min="1000000000" max="9999999999" id="inputPhone" name="phone" placeholder="Phone" required />
                </label>
              </div>
            </div>
            <div className="actions">
              <button type="submit" className="ui primary button">Deliver to this address</button>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
