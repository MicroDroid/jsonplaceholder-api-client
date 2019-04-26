import React from 'react';
import logo from '../images/logo.png';
import {NavLink} from "react-router-dom";

export default class Logo extends React.PureComponent {
	render() {
		return <div>
			<div className="row justify-content-center">
				<div className="col-auto">
					<img src={logo} alt="React Todo" width="72" height="72" />
				</div>
				<div className="col-auto d-flex flex-column justify-content-center">
					<h1 className="font-weight-light">
						React Todo
					</h1>
				</div>
			</div>

			<div className="mt-4 text-center">
				<p className="text-muted">
					Oh this is so misleading of a name. I forgot there's a posts section
				</p>
				<p className="text-muted mb-0">
					<NavLink className="mx-3 text-dark" activeClassName="font-weight-bold" to="/" exact>Todos</NavLink>
					<NavLink className="mx-3 text-dark" activeClassName="font-weight-bold" to="/posts">Posts</NavLink>
				</p>
			</div>
		</div>
	}
}