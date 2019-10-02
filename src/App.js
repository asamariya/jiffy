import React, {Component} from 'react';
import loader from './images/loader.svg';
import Gif from './Gif';

const randomChoice = arr => {
	const randIndex = Math.floor(Math.random() * arr.length);
	return arr[randIndex];
};

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
			loading: false,
			searchTerm: '',
			hintText: '',
			gif: null,
			gifs: []
		};
	}

	// we want a function that searches the giphy api using fetch
	// and puts the search term into the query url and
	// then we can do something with the results

	// we can also write async methods into our components
	// that let us use the async/await style of functions
	searchGiphy = async searchTerm => {
		// here we set our loading state to be true
		// and this will show the spinner at the bottom
		this.setState({
			loading: true
		});
		// first we try our fetch
		try {
			// here we use the await keyword to wait for our response to come back
			const response = await fetch(
				`https://api.giphy.com/v1/gifs/search?api_key=frzJZgXDzDP5ezre7rfuRIhWvfovmaUY&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`
			);
			// here we convert our raw resonse into json data
			// const {data} gets the .data part of our response
			const {data} = await response.json();

			//here we check if the array of results is empty
			// if it is, we throw an error which will stop
			// the code here and handle it in the catch area
			if (!data.length) {
				throw `Nothing found for ${searchTerm}`;
			}
			// here we grab a random result from our images
			const randomGif = randomChoice(data);

			this.setState((prevState, props) => ({
				...prevState,
				gif: randomGif,
				// here we use our spread to take the previous gifs and
				// spread them out, and then add or new randomGif to the end
				gifs: [...prevState.gifs, randomGif],
				// we turn off our loading spinner again
				loading: false
			}));
			// if our fetch fails, we catch it down here
		} catch (error) {
			this.setState((prevState, props) => ({
				...prevState,
				hintText: error,
				loading: false
			}));
			console.log(error);
		}
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
					{/* it's only going to render our video when we have a gif in the state */}
					{this.state.gifs.map(gif => (
						// we spread out all of our props onto our Gif component
						<Gif {...gif} />
					))}

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
