import React, { Component } from 'react';
import "./broker.css"

export default class Broker extends Component{
	constructor(props){
		super(props);
		this.state = {
			username: props.name,
			brokers: props.brokers,
			selectedStock: 0,
			selectedAmount: 0
		};
	}

	setAmount = (event) => {
		this.setState({selectedAmount: parseInt(event.target.value)})
	}

	chooseStock = (id) => {
		let stocks = this.props.stocks;
		for (let i in stocks){
			if(stocks[i].id === id)
				this.setState({selectedStock: i})
		}
	}

	buy = () => {
		this.props.buy(this.props.name, this.state.selectedStock, this.state.selectedAmount);
	}

	sell = () => {
		this.props.sell(this.props.name, this.state.selectedStock, this.state.selectedAmount);
	}

	render(){
		if (!this.props.stocks)
			return null;
		if (!this.props.brokers)
			return null;
		let broker;
		for (let it of this.props.brokers) {
			if (it.name === this.props.name) {
				broker = it;
			}
		}

		return(
			<div>
				<h1 className="header1">Брокер {broker.name}</h1>
				<div className="broker-info">
					<h3>Баланс участника</h3>
					<p>Баланс: {broker.wealth}$</p>
					<p>Прибыль: {broker.wealth - broker.moneyOnStart}$</p>

				</div>
				<div className="shares-list">
					<h3>Акции</h3>
				<table className="w3-table w3-border w3-bordered w3-hoverable w3-centered" id="stock_table">
					<thead>
						<tr>
							<th className="w3-center">Id</th>
							<th className="w3-center">Цена</th>
							<th className="w3-center">Количество</th>
							<th className="w3-center">У вас имеется</th>
							<th className="w3-center">Закон распределения</th>
						</tr>
					</thead>
					{this.getRows(broker)}
				</table>
				</div>
				<div className="trade">
					<h3>Купить/Продать акцию</h3>
					<div>
						<p>Выбранная акция: {this.props.stocks[this.state.selectedStock].id} </p>
						Количество:{" "}
						<input className="in" type='number' onChange={this.setAmount}/>
						штук(а)
						<p>Итоговая цена:  {this.props.stocks[this.state.selectedStock].price*this.state.selectedAmount}$</p>
					</div>
					<div>
						<button className='w3-button w3-border' onClick={this.buy}>Купить</button>
						<button className='w3-button w3-border' onClick={this.sell}>Продать</button>
					</div>
					{this.props.message}
				</div>
			</div>
		)
	}
	getRows(broker) {
		let tmp = [];
		for (let stock of this.props.stocks) {
			if (stock)
				tmp.push(
					<tr key={stock.id} onClick={() => {this.chooseStock(stock.id)}}>
						<td className='w3-center'>{stock.id}</td>
						<td className='w3-center'>{stock.price}$</td>
						<td className='w3-center'>{stock.quantity}</td>
						<td>{ (broker.stocks && broker.stocks[stock.id]) ? broker.stocks[stock.id] : '-'}</td>
						<td className="w3-center">{stock.distribType}</td>
					</tr>
				 );
		}
		return (
			 <tbody>{tmp}</tbody>
		)
	}
}
