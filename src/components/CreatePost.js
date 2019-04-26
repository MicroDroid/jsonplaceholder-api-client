import React from 'react';
import axios from 'axios';
import classNames from 'classnames';

import {apiUrl} from '../helpers';
import styles from '../scss/components/create-post.module.scss';

import Status from './Status';

import {NavLink} from 'react-router-dom';

export default class CreatePost extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			body: '',

			loading: false,
			error: '',
		};
	}

	createPost(e) {
		e.preventDefault();

		this.setState({
			loading: true,
			error: '',
		});

		axios.post(apiUrl('/posts'), {
			title: this.state.title,
			body: this.state.body,
		}).then(() => {
			this.props.history.push('/posts');
		}).catch(() => {
			this.setState({
				loading: false,
				error: 'Unexpected error', // Again, because of dummy API.
			});
		});
	}

	render() {
		return <form className={classNames('mx-auto', 'mt-5', styles.form)} onSubmit={(e) => this.createPost(e)}>
			<NavLink to="/posts" className="text-muted">
				<span className="fas fa-arrow-left mr-2" />
				Return back
			</NavLink>

			<h4 className="mt-1">
				Create a post
			</h4>

			<div className="form-group mt-4">
				<label>
					<small className="text-muted text-uppercase">Title</small>
				</label>
				<input className="form-control" type="text" placeholder="Title" maxLength="255" ref="title" required />
			</div>

			<div className="form-group">
				<label>
					<small className="text-muted text-uppercase">Content</small>
				</label>
				<textarea type="text" className="form-control" placeholder="Content" maxLength="1024" required></textarea>
			</div>

			<button type="submit" className="btn btn-secondary mt-4" disabled={this.state.loading}>
				Create
			</button>

			<div className="mt-4">
				{this.state.loading || this.state.error ? <Status loading={this.state.loading} error={this.state.error} /> : ''}
			</div>
		</form>
	}

	componentDidMount() {
		this.refs.title.focus();
	}
}