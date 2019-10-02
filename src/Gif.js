import React, {Component} from 'react';

class Gif extends Component {
	//when our video has loaded we add a loaded classname
	//otherwise the video stays hidden
	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		};
	}
	render() {
		const {images} = this.props;
		const {loaded} = this.state;
		return (
			<video
				src={images.original.mp4}
				// when we have the loaded state as true, we add a loaded class
				// && is like an if statement, without else
				className={`grid-item video ${loaded && 'loaded'}`}
				autoPlay
				loop
				onLoadedData={() => this.setState({loaded: true})}
			/>
		);
	}
}

export default Gif;
