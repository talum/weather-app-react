import React, { Component } from 'react';
import './App.css';
import xhr from 'xhr';

class App extends Component {
	state = {
		location: '',
		data: {}
	};

	fetchData = (evt) => {
		evt.preventDefault();
		var location = encodeURIComponent(this.state.location);
		var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
		var urlSuffix = '&APPID=APPID&units=metric';
		var url = urlPrefix + location + urlSuffix;
	
		var self = this;

		xhr({
			url: url
		}, function (err, data) {
			self.setState({
				data: JSON.parse(data.body)
			});
		});
	};

	changeLocation = (evt) => {
		this.setState({
			location: evt.target.value
		});
	};

  render() {
		var currentTemp = 'not loaded yet';
		if (this.state.data.list) {
			currentTemp = this.state.data.list[0].main.temp;
		}
    return (
			<div>
				<h1>Weather</h1>
				<form onSubmit={this.fetchData}>
					<label>I want to know the weather for
						<input 
							placeholder={"City, Country"}
						  type="text"
							value={this.state.location}
							onChange={this.changeLocation}
					  />
					</label>
				</form>
				<p className="temp-wrapper">
					<span className="temp">{ currentTemp }</span>
					<span className="temp-symbol">°C</span>
				</p>
			</div>
    );
  }
}

export default App;
