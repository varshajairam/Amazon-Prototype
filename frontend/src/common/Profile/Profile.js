import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Profile.css';
import * as profileActions from '../../store/actions/profileActions';

function Profile() {
  const { email } = useParams();
  const profileReducerData = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  useEffect(() => dispatch(profileActions.fetchProfileData(email)), [email, dispatch]);
  const [imageHovered, setImageHovered] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
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
            <h1>Profile</h1>
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
    </div>
  );
}

export default Profile;
