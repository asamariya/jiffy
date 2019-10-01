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

	// we want a function that searches the giphy api using fetch
	// and puts the search term into the query url and
	// then we can do something with the results

	// we can also write async methods into our components
	// that let us use the async/await style of functions
	searchGiphy = async searchTerm => {
		// first we try our fetch
		try {
			// here we use the await keyword to wait for our response to come back
			const response = await fetch(
				`https://api.giphy.com/v1/gifs/search?api_key=frzJZgXDzDP5ezre7rfuRIhWvfovmaUY&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`
			);
			// here we convert our raw resonse into json data
			const data = await response.json();
			console.log(data);
			// if our fetch fails, we catch it down here
		} catch (error) {}
	};
	handleKeyPress = event => {
		const {value} = event.target;
		// When we have 2 or more characters in our search box
		// and we have also pressed enter, we then want to run a search
		if (value.length > 2 && event.key === 'Enter') {
			this.searchGiphy(value);
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
