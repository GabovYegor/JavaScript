import React from 'react';
import "./auth.css"

export default class Auth extends React.Component{
	render(){
		return(

				<div className="form__">
				<h1 className="header4">Авторизация</h1>
				<form onSubmit={this.props.login}>
					<p className="text">Введите ваше имя:</p>
					<p>
						<input className="my-input" type='text' name='name' placeholder='Имя' />
					</p>
					<p><button>Войти</button></p>
				</form>
					<p>{this.props.message}</p>
				</div>


		)
	}
}
