import React, { Component } from 'react';
import "../assets/styles/main.css"
class Login extends Component {
	constructor(props) {
    super(props);
    this.state = {
			email: '',
			password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value });

	handleSubmit(e)
	{
		e.preventDefault();
		alert(JSON.stringify(this.state))
	}

	render()
	{
		return (
			<div>
				<form>
					<div className="form-group">
						<label>Email</label>
						<input type="email" name="email" placeholder="Email" className="form-control" value={this.state.email} onChange={this.handleChange}/>
					</div>

					<div className="form-group">
						<label>Password</label>
						<input type="password" name="password" placeholder="Password" className="form-control" value={this.state.password} onChange={this.handleChange}/>
					</div>
					
					<button type="submit" className="btn btn-primary btn-block">Login</button>
				</form>
			</div>
		)
	}
}

export default Login;