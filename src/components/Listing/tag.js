import React, {Component} from 'react';
import './listing.css'

class Tag extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);

		var tags = this.props.tags;
		if (tags) {
		  	tags = this.props.tags.split(",");
		  	this.state = {tags: tags};
		} else {
		  	this.state = {tags: []};
             	}

		console.log("current tags: " + tags);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.active !== this.props.active) {
			console.log("current tags: " + tags);
			var tags = nextProps.tags.split(",");
			this.setState({tags: tags});
		}
	}

	handleChange(e) {
		var newArray = [];
		if (e.target.checked) {
			newArray = this.state.tags.concat(e.target.name);
			this.setState({tags: newArray}, () => this.props.callbackFunction(this.state.tags));
		} else {
			newArray = this.state.tags;
			var index = newArray.indexOf(e.target.name);
			if (index !== -1) {
				newArray.splice(index, 1);
			}
			this.setState({tags: newArray}, () => this.props.callbackFunction(this.state.tags));
		}
	}

	render() {
		const categories = ["i-Clickers", "Food", "Furniture", "Housing", "Textbooks"];
		const tagList = categories.map(item => {
			return (
				<div key={item}>
					<input type="checkbox" checked={this.state.tags.indexOf(item) != -1} name={item} id={item} value={item} onChange={this.handleChange} />
					<label htmlFor={item}>{item}</label>
				</div>
			)
		});

		return(
			<div>
				{tagList}		
			</div>
		);
	}
}

export default Tag;
