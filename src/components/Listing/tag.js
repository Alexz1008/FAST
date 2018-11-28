import React, {Component} from 'react';
import './listing.css'

class Tag extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {tags: []};
	}

	handleChange(e) {
		if (e.target.checked) {
			var newArray = this.state.tags.concat([e.target.name]);
			this.setState({tags: newArray}, () => this.props.callbackFunction(this.state.tags));
		} else {
			newArray = this.state.tags;
			var index = newArray.indexOf([e.target.name]);
			if (index !== -1) {
				newArray.splice(index, 1);
			}
			this.setState({tags: newArray}, () => this.props.callbackFunction(this.state.tags));
		}
	}

	render() {
		const categories = ["iclicker", "food", "furniture", "housing", "textbooks"];
		const tagList = categories.map(item => {
			return (
				<div key={item}>
					<input type="checkbox" name={item} id={item} value={item} onChange={this.handleChange} />
					<label for={item}>{item}</label>
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
