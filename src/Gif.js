import React, {Component} from 'react';

class Gif extends Component {
	render() {
		const {images} = this.props;
		return <video src={images.original.mp4} className="grid-item video" autoPlay loop />;
	}
}

export default Gif;
