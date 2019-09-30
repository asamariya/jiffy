import React, {Component} from 'react';

const Header = () => (
	<div className="header grid">
		<h1 className="title">Jiffy</h1>
	</div>
);
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: ''
		};
	}
	handleChange = event => {
		// const value = event.target.value
		const {value} = event.target;
		// by setting the searchItem in our state and also using that
		// on the input as the value, we have created what is called
		// a controlled input
		this.setState((prevState, props) => ({
			//we take our old props and spread them out here
			...prevState,
			//and thn we overwrite the ones we want after
			searchTerm: value
		}));
		if (value.length > 2) {
		}
	};

	handleKeyPress = event => {
		const {value} = event.target;
		// When we have 2 or more characters in our search box
		// and we have also pressed enter, we then want to run a search
		if (value.length > 2 && event.key === 'Enter') {
			alert(`search for ${value}`);
		}
	};
	render() {
		const {searchTerm} = this.state;
		return (
			<div className="page">
				<Header />
				<div className="search grid">
					{/* Our stack of gif images */}
					<input
						type="text"
						className="input grid-item"
						placeholder="Type something"
						onChange={this.handleChange}
						onKeyPress={this.handleKeyPress}
						value={searchTerm}
					/>
				</div>
			</div>
		);
	}
}

export default App;
