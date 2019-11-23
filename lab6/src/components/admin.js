import React, { Component } from 'react';
import "./admin.css"
import {render} from "redux-logger/src/diff";
let show = true;

export default class Admin extends Component{
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<div>
				<h1 className="header2">Admin</h1>
				{showButtons(this.props.startDay,this.props.finishDay)}
				<div className="members-list">
					<h3 className="header3">Участники</h3>
					{members(this.props.members)}
				</div>
			</div>
		)

		function showButtons(start,finish){
			return(
				<div>
					{ show ? <button onClick={startDay(start)}>Начать день</button> : <button onClick={finish}>Закончить день</button> }
				</div>
			)
		}

		function startDay(start){
			show = false;
			return start;
		}



		function members(_members){
			let members=[];
			for (let i = 0; i < _members.length;i++){
				members.push(<div>{member_info(_members[i])}</div>)
			}
			return <div>{members}</div>
		}
		function BrokerStocks(broker) {
			if (!broker.stocks)
				return "-";
			let tmp = [];
			tmp.push(
				<tr>
					<th className="w3-center">id</th>
					<th className="w3-center">Количество</th>
				</tr>
			)
			for(let i in broker.stocks) {
				if (!broker.stocks[i]) {
					continue;
				}
				//tmp.push(<p className="shares">{i}: {broker.stocks[i]}</p>)
				tmp.push(<tr>
					<td>{i}</td>
					<td>{broker.stocks[i]}</td>
				</tr>)

			}
			if (tmp.length === 0)
				return "-";
			return (<div> {tmp} </div>);
		}
		function member_info(_member){
			return <div className="member">
				<p>Имя участника: {_member.name}</p>
				<p>Баланс: {_member.wealth}$</p>
					<p >Купленные акции: <div className="bought_shares"><table>{BrokerStocks(_member)}</table></div></p>
				<p>id: {_member.id}</p>
			</div>
		}

	}

}
