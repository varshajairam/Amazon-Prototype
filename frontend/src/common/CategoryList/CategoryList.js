import React from "react";
import { Component } from "react";
import { getCategories } from '../../store/actions/categoryActions';
import { connect } from "react-redux";


class AddCategory extends Component {

  constructor(props) {
	super(props);
	this.state = {
		active: "",
	}
  }

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
	  
    return (
		
		<React.Fragment>

	<div>
			<div class={`ui ${this.state.active} modal`}>
		<i class="close icon"></i>
		<div class="header">
			Add a category
		</div>
		<div class="ui input">
            <input type="text" placeholder="Category"></input>
        </div>
		<div class="actions">
		<div
			className="ui primary button"
		  >
			Cancel	 
		  </div>
			<div class="ui button">OK</div>
		</div>
		</div>
	</div>

			 <div class={`ui ${this.state.active} modal`}>
			 <i class="close icon"></i>
                        <div class="ui header">Todo item</div>
						<div class="ui input">
                            <input type="text" placeholder="id"></input>
                        </div>
			 </div>
		<div className="categorylist-wrapper">
  
  
		  <div className="ui grid no-margin">
  
		  <div className="ui fluid button">
		  <div
			className="ui primary button"
		    onClick={() => this.setState({active: "active"})}
		  >
			Add
		  </div>
		</div>
			<div className="thirteen wide column product-col">
  
			  {
				this.props.categories.categories.length ?
				this.props.categories.categories.map((currCategory, i) => {
  
  
					return <React.Fragment key={i}>
					  <div className="ui relaxed divided items">
						  <div className="item">
							  {currCategory.name}
						  </div>
					  </div>
					  <div
			className="ui primary button"
		  //   onClick={() => {
		  //     if (validateInput()) {
		  //       updateState(basicInfo);
		  //       next();
		  //     }
		  //   }}
		  >
			Remove	 
		  </div>
					  <hr />
					</React.Fragment>
  
				  }) : <center><h2 className="ui header">No Category Found!</h2></center>
			  }
			  {/* Ends here */}
  
			</div>
		  </div>
		</div>
		
	  </React.Fragment >
	

    );
  }
}

function mapStateToProps(state){
    return {
		categories: state.categoryReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
		getCategories: () => dispatch(getCategories())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
