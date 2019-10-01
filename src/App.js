import React, {Component} from 'react';
import loader from './images/loader.svg';

const Header = () => (
	<div className="header grid">
		<h1 className="title">Jiffy</h1>
	</div>
);

const UserHint = ({loading, hintText}) => (
	<div className="user-hint">
		{loading ? <img src={loader} className="block mx-auto" alt="Loader" /> : hintText}
	</div>
);
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			hintText: ''
		};
	}
	handleKeyPress = event => {
		const {value} = event.target;
		// When we have 2 or more characters in our search box
		// and we have also pressed enter, we then want to run a search
		if (value.length > 2 && event.key === 'Enter') {
			alert(`search for ${value}`);
		}
	};

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
			searchTerm: value,
			hintText: value.length > 2 ? `Hit enter to search ${value}` : ''
		}));
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
				<UserHint {...this.state} />
			</div>
		);
	}
}

export default App;
