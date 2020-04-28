import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getCategories } from '../../store/actions/categoryActions';

const BasicInfo = ({ state, categories, getCategories, back, next, updateState }) => {
  const [basicInfo, setBasicInfo] = useState({
    category: state.category? state.category : undefined,
    name: state.name? state.name : '',
    baseCost: state.baseCost? state.baseCost : '',
    description: state.description? state.description : '',
  });

  const onChange = (e) => {
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const renderCategoryMenu = () => {
    return (
      <div className="ui loading fluid menu">
        {categories.loading ? (
          <div className="ui loading fluid simple dropdown item small header">
            Loading Categories
          </div>
        ) : (
          <div className="ui fluid simple dropdown item small header">
            {basicInfo.category
              ? categories.categories.find((cat) => {
                  return cat._id === basicInfo.category;
                }).name
              : `choose a category`}
            <i className="dropdown icon"></i>
            <div className="menu">
              {categories.categories.map((category) => {
                return (
                  <div
                    className="item"
                    key={category._id}
                    onClick={() => {
                      setBasicInfo({ ...basicInfo, category: category._id });
                    }}
                  >
                    {category.name}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const validateInput = () => {
    if (!basicInfo.category) return false;
    if (!basicInfo.name || basicInfo.name.trim().length < 5) return false;
    if (!basicInfo.baseCost || isNaN(parseFloat(basicInfo.baseCost))) return false;
    return true;
  };
  const renderButtons = () => {
    return (
      <div className="ui fluid buttons">
        <div className="ui disabled button">Cancel</div>
        <div className="or"></div>
        <div
          className="ui primary button"
          onClick={() => {
            if (validateInput()) {
              updateState(basicInfo);
              next();
            }
          }}
        >
          Next
        </div>
      </div>
    );
  };
  return (
    <div className="ui grid">
      <div className="sixteen row">
        <div className="four wide column ui form">
          <div className="field">{renderCategoryMenu()}</div>
        </div>
        <div className="eight wide column ui form">
          <div className="field">
            <input
              placeholder="Product Name"
              type="text"
              name="name"
              value={basicInfo.name}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="four wide column ui form">
          <div className="field">
            <div className="ui right labeled input">
              <label htmlFor="baseCost" className="ui label">
                $
              </label>
              <input
                type="number"
                placeholder="Price"
                name="baseCost"
                value={basicInfo.baseCost}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="ui form row">
        <div className="column field">
          <label>Product Description</label>
          <textarea
            name="description"
            onChange={onChange}
            value={basicInfo.description}
          ></textarea>
        </div>
      </div>
      <div className="ui row">{renderButtons()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categoryReducer,
  };
};

export default connect(mapStateToProps, { getCategories })(BasicInfo);
