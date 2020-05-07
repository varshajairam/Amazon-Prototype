import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CountryRegionData } from 'react-country-region-selector';
import './Profile.css';
import * as profileActions from '../../store/actions/profileActions';

function Profile() {
  const { email } = useParams();
  const profileReducerData = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  useEffect(() => dispatch(profileActions.fetchProfileData(email)), [email, dispatch]);
  const [imageHovered, setImageHovered] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [addressModalOpen, setaddressModalOpen] = useState(false);
  const [states, setStates] = useState([]);
  const profileImageInput = React.createRef();
  return (
    <div className="PROFILE ui container">
      <div className="ui grid">
        <div className="row">
          <div className="six wide column">
            <div className="ui card">
              <div className={`image dimmable${imageHovered ? ' dimmed' : ''}`} onMouseEnter={() => setImageHovered(true)} onMouseLeave={() => setImageHovered(false)}>
                <div className={`ui dimmer transition ${imageHovered ? 'visible active' : 'hidden'}`}>
                  <div className="content">
                    <div className="center">
                      <form className="profile-image-input">
                        <input type="file" name="profile_image" accept="image/*" onChange={(ev) => dispatch(profileActions.addProfileImage(ev))} ref={profileImageInput} />
                      </form>
                      <button type="button" onClick={() => profileImageInput.current.click()} className="ui inverted button">Change Profile Image</button>
                    </div>
                  </div>
                </div>
                <img src={profileReducerData.profile_image} alt="" />
              </div>
              <div className="content">
                <span className="edit-icon" aria-hidden="true" onClick={() => setProfileModalOpen(true)}>&#9998;</span>
                <div className="header">{profileReducerData.name}</div>
                <div className="meta">{profileReducerData.email}</div>
              </div>
            </div>
          </div>
          <div className="ten wide column">
            <div>
              <h1 className="ui dividing header">Addresses</h1>
              <i className="plus icon add-address" onClick={() => setaddressModalOpen(true)} aria-hidden="true" />
            </div>
            <div className="ui divided items">
              { profileReducerData.user_addresses.map((address) => (
                <div className="link item" key={address.id}>
                  <div className="content">
                    <div className="header">{address.name}</div>
                    <div className="description">
                      <div>
                        <span className="bold">Address1: </span>
                        <span>{address.street1}</span>
                      </div>
                      <div>
                        <span className="bold">Address2: </span>
                        <span>{address.street2}</span>
                      </div>
                      <div>
                        <span className="bold">City: </span>
                        <span>{address.city}</span>
                      </div>
                      <div>
                        <span className="bold">Country: </span>
                        <span>{address.country}</span>
                      </div>
                      <div>
                        <span className="bold">State: </span>
                        <span>{address.state}</span>
                      </div>
                      <div>
                        <span className="bold">Zip Code: </span>
                        <span>{address.zipcode}</span>
                      </div>
                      <div>
                        <span className="bold">Phone: </span>
                        <span>{address.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`ui dimmer modals page transition ${profileModalOpen ? 'visible active' : 'hidden'}`}>
        <div className={`ui standard demo modal transition ${profileModalOpen ? 'visible active' : 'hidden'}`}>
          <i className="close icon" aria-hidden="true" onClick={() => setProfileModalOpen(false)} />
          <div className="header">Edit Profile</div>
          <form className="ui form" onSubmit={(ev) => dispatch(profileActions.editProfile(ev, setProfileModalOpen))}>
            <div className="description">
              <div className="field">
                <label htmlFor="inputName">
                  Full Name
                  <input type="text" id="inputName" name="name" placeholder="Full Name" defaultValue={profileReducerData.name} required />
                </label>
              </div>
            </div>
            <div className="actions">
              <button type="submit" className="ui primary button">Save</button>
            </div>
          </form>
        </div>
      </div>
      <div className={`ui dimmer modals page transition ${addressModalOpen ? 'visible active' : 'hidden'}`}>
        <div className={`ui standard demo modal transition ${addressModalOpen ? 'visible active' : 'hidden'}`}>
          <i className="close icon" aria-hidden="true" onClick={() => setaddressModalOpen(false)} />
          <div className="header">Add Address</div>
          <form className="ui form" onSubmit={(ev) => dispatch(profileActions.addAddress(ev, setaddressModalOpen))}>
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
              <button type="submit" className="ui primary button">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
