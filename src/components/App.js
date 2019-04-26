import React from 'react';
import Logo from './Logo';
import TodoList from './TodoList';
import PostsList from './PostsList';
import CreatePost from './CreatePost';

import {BrowserRouter as Router, Route} from "react-router-dom";

export default class App extends React.Component {
	render() {
		return <div className="container">
			<Router>
				<Logo />

				<Route path="/" component={TodoList} exact />
				<Route path="/posts" component={PostsList} exact />
				<Route path="/posts/create" component={CreatePost} exact />
			</Router>
		</div>
	}
}