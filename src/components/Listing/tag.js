import React, {Component} from 'react';
import './listing.css'

class Tag extends Component {

	render() {
		const categories = ["iclicker", "furniture", "textbooks"];
		const tagList = categories.map(item => {
			return (
				<div key={item}>
					<input type="checkbox" id={item} />
					{item}
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
