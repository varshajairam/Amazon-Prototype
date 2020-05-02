import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getCategories } from '../../store/actions/categoryActions';

const BasicInfo = ({
  state,
  categories,
  getCategories,
  back,
  next,
  updateState,
}) => {
  const [basicInfo, setBasicInfo] = useState({
    category: state.category ? state.category : undefined,
    name: state.name ? state.name : '',
    baseCost: state.baseCost ? state.baseCost : '',
    description: state.description ? state.description : '',
  });

  const [errors, setErrors] = useState({
    category: false,
    name: false,
    baseCost: false,
    description: false,
  });

  const onChange = (e) => {
    setErrors({...errors, [e.target.name]: false })
    if (e.target.name === 'baseCost') {
      var re = new RegExp('^[0-9]*.?[0-9]{0,2}$');
      if (re.test(e.target.value)) {
        setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
      }
    } else {
      setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
    }
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
                      setErrors({...errors, category: false})
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
    setErrors({
      category: !basicInfo.category,
      name: !basicInfo.name || basicInfo.name.trim().length < 5,
      baseCost: !basicInfo.baseCost || isNaN(parseFloat(basicInfo.baseCost)),
      description:
        !basicInfo.description || basicInfo.description.trim().length < 20,
    });
    if (!basicInfo.category) return false;
    if (!basicInfo.name || basicInfo.name.trim().length < 5) return false;
    if (!basicInfo.description || basicInfo.description.trim().length < 20)
      return false;
    if (!basicInfo.baseCost || isNaN(parseFloat(basicInfo.baseCost)))
      return false;
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
          <div className={errors.category ? 'error field' : 'field'}>
            {renderCategoryMenu()}
            <div className="ui error message">
              <div className="header">You must choose a product category</div>
            </div>
          </div>
        </div>
        <div className="eight wide column ui form">
          <div className={errors.name ? 'error field' : 'field'}>
            <input
              placeholder="Product Name"
              type="text"
              name="name"
              value={basicInfo.name}
              onChange={onChange}
            />
            <div className="ui error message">
              <div className="header">Invalid product name</div>
              <p>product name must be at least five charachters long</p>
            </div>
          </div>
        </div>
        <div className="four wide column ui form">
          <div className={errors.baseCost ? 'error field' : 'field'}>
            <div className="ui right labeled input">
              <label htmlFor="baseCost" className="ui label">
                $
              </label>
              <input
                type="number"
                placeholder="Price"
                step="0.01"
                name="baseCost"
                value={basicInfo.baseCost}
                onChange={onChange}
              />
            </div>

            <div className="ui error message">
              <div className="header">Invalid Price</div>
              <p>You must enter a price.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="ui form row">
        <div
          className={errors.description ? 'column error field' : 'column field'}
        >
          <label>Product Description</label>
          <textarea
            name="description"
            onChange={onChange}
            value={basicInfo.description}
          ></textarea>
          <div className="ui error message">
            <div className="header">Invalid description</div>
            <p>product description must be at least 20 charachters long</p>
          </div>
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
