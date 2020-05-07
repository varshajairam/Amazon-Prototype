import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as categoryActions from '../../store/actions/categoryActions';


function AddCategory() {
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);
	const [delModalOpen, setDelModalOpen] = useState(false);
	const [category, setCategory] = useState();
	const dispatch = useDispatch();
	
	useEffect(() => dispatch(categoryActions.getCategories()), [dispatch]);
	const categoryReducerData = useSelector((state) => state.categoryReducer);
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   componentDidMount() {
//     this.props.getCategories();
//   }

//   render() {
    return (
      <div className="CATEGORY ui container">
        <button type="button" onClick={() => setCategoryModalOpen(true)} className="ui primary button">Add Category</button>
        <div className={`ui dimmer modals page transition ${categoryModalOpen ? 'visible active' : 'hidden'}`}>
          <div className={`ui standard demo modal transition ${categoryModalOpen ? 'visible active' : 'hidden'}`}>
          <i className="close icon" aria-hidden="true" onClick={() => setCategoryModalOpen(false)} />
          <div className="header">Add a new Category</div>
          <form className="ui form" onSubmit={(ev) => dispatch(categoryActions.addCategory(ev, setCategoryModalOpen))}>
            <div className="description">
              <div className="field">
                <label htmlFor="category">
                  Please enter category to add
                  <input type="text" id="category" name="category" placeholder="Category" required />
                </label>
              </div>
            </div>
            <div className="actions">
              <button type="submit" className="ui primary button">Save</button>
              <button type="button" onClick={() => setCategoryModalOpen(false)} className="ui secondary button">Cancel</button>
            </div>
          </form>
        </div>
      </div>
	  <div class="ui list">
	  {
              categoryReducerData.categories.length ?
			  categoryReducerData.categories.map((currCategory, i) => {


                  return <React.Fragment key={i}>
                    <div className="ui relaxed divided items">
					
						<div className="item">
							{currCategory.name}<i className="trash icon" onClick={() => { setDelModalOpen(true), setCategory(currCategory)}} ></i>
						</div>
                
		 </div>
                  </React.Fragment>

                }) : <center><h2 className="ui header">No Category Found!</h2></center>
            }
	  </div>
	  <div className={`ui dimmer modals page transition ${delModalOpen ? 'visible active' : 'hidden'}`}>
          <div className={`ui standard demo modal transition ${delModalOpen ? 'visible active' : 'hidden'}`}>
          <i className="close icon" aria-hidden="true" onClick={() => setDelModalOpen(false)} />
		<div className="header">Are you sure you want to delete {category && category.name} category?</div>
          <form className="ui form">
            {/* <div className="description">
              <div className="field">
                <label htmlFor="category">
                  Please enter category to add
                  <input type="text" id="category" name="category" placeholder="Category" required />
                </label>
              </div>
            </div> */}
            <div className="actions">
              <button type="button" className="ui primary button" onClick={() => dispatch(categoryActions.deleteCategory(category, setDelModalOpen))}>Yes</button>
              <button type="button" onClick={() => setDelModalOpen(false)} className="ui secondary button">No</button>
            </div>
          </form>
        </div>
      </div>
      </div>


    );
//   }
}

// function mapStateToProps(state) {
//   return {
//     categories: state.categoryReducer,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getCategories: () => dispatch(getCategories()),
//   };
// }

export default (AddCategory);
