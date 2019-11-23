import React, { Component } from 'react';
import Authorization from './components/auth'
import Admin         from './components/admin'
import Broker        from './components/broker'

import './App.css';
import * as io from 'socket.io-client'
let socket;

class App extends Component {
	componentDidMount() {
		this.getInfo();
	}

	state = {
		username: '',
		stocks: null,
		brokers: null,
		settings: null,
		trading: false,
		message: ''
	};

	login = (event) => {
		event.preventDefault(); // Prevents the page from reloading
		let name = event.target.elements.name.value; // Taking a value from input at auth component

		// Check if this user exists
		let b = false;
		if (!this.state.brokers) {
			return;
		}
		for (let it of this.state.brokers) {
			if (it.name === name) {
				b = true;
				break;
			}
		}
		if (!b && name !== "Admin") {
			this.setState({message: "Такого участника не существует"});
			return;
		}

		this.setState({username: name, message: ""});
		socket = io('http://localhost');
		socket.on("connect", () => {
			socket.emit("connected", {"name": this.state.username});
		});
		socket.on('update', (info) => {
			this.setState({
				stocks: info.stocks,
				brokers: info.brokers,
				trading: info.trading
			})
		});
	}


	checkActionAttempt = (stockIndex, amount) => {
		if (!amount || amount <= 0) {
			this.setState({message: 'Неверное количество'})
			return 0;
		}
		if (!this.state.trading) {
			this.setState({message: 'Трайдинг не начался'})
			return 0;
		}

		return 1;
	}

	buy = (username, stockIndex, amount) => {
		if (!this.checkActionAttempt(stockIndex, amount))
			return;
		console.log(this.state.stocks[stockIndex].quantity);
		if (this.state.stocks[stockIndex].quantity < amount) {
			this.setState({message: 'Неверное количество'})
			return;
		}

		let userIndex  = null;

		for (let i in this.state.brokers) {
			if (this.state.brokers[i].name === username) {
				userIndex = i;
				break;
			}
		}


		if (this.state.brokers[userIndex].wealth < amount*this.state.stocks[stockIndex].price) {
			this.setState({message: "У вас недостаточно средств"});
			return;
		}

		this.setState({message: ''});
		socket.emit('buy', {
			username: username,
			stockID: this.state.stocks[stockIndex].id,
			selectedAmount: amount
		});
	}

	sell = (username, stockIndex, amount) => {
		if (!this.checkActionAttempt(stockIndex, amount))
			return;

		let userIndex  = null;

		for (let i in this.state.brokers) {
			if (this.state.brokers[i].name === username) {
				userIndex = i;
				break;
			}
		}

		let stockID = this.state.stocks[stockIndex].id;
		if (!this.state.brokers[userIndex].stocks
			|| !this.state.brokers[userIndex].stocks[stockID]
			|| this.state.brokers[userIndex].stocks[stockID] < amount
		) {
			this.setState({message: 'У вас недостаточно акций'});
			return;
		}

		this.setState({message: ''});
		socket.emit('sell', {
			username: username,
			stockID: stockID,
			selectedAmount: amount
		});
	}

	startDay = () => {
		socket.emit('start');
	}
	finishDay = () => {
		socket.emit('finish');
	}

	getInfo(){
		fetch('http://localhost:80/data/stocks', {
			headers: {'Content-Type': 'application/json'},
		})
			.then(res => res.json())
			.then(
				(response)=>{ this.setState({stocks: response})})

		fetch('http://localhost:80/data/brokers', {
			headers: {'Content-Type': 'application/json'},
		})
			.then(res => res.json())
			.then(
					response => {
						this.setState({brokers: response})
						// console.log(response);
					}
			);

		fetch('http://localhost:80/data/settings', {
			headers: {'Content-Type': 'application/json'},
		})
			.then(res => res.json())
			.then(
					response => this.setState({settings: response})
			);
	}


	render() {
		return (
			<div className="App">
				{this.getContent()}
			</div>
		);
	}

	getContent() {
		let content;
		if (this.state.username === '')
			content = <Authorization  className="w3-center"
				login={this.login}
				message={this.state.message}
			/>;
		else if (this.state.username === 'Admin')
			content = <Admin
				startDay = {this.startDay}
				finishDay = {this.finishDay}
				stock = {this.state.stocks}
				members = {this.state.brokers}
				setting = {this.state.settings}
			/>;
		else {
			content = (
				<Broker
					buy = {this.buy}
					sell = {this.sell}
					name = {this.state.username}
					stocks = {this.state.stocks}
					brokers = {this.state.brokers}
					message = {this.state.message}
				/>
			);
		}
		return content;
	}
}

export default App;
