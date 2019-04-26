import React from 'react';
import axios from 'axios';
import classNames from 'classnames';

import styles from '../scss/components/postslist.module.scss';
import {apiUrl} from '../helpers';

import PaginationControls from './PaginationControls';
import Status from './Status';

import {NavLink} from 'react-router-dom';

export default class PostsList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],

			perPage: 10,
			skip: 0,

			loading: true,
			error: '',
		};

		// This really bugs me, I'm so sure there's a better best practice here, but for
		// Simplicity in the meantime, I'm keeping this as is.

		this.renderPost = this.renderPost.bind(this);
	}

	nextPage() {
		this.setState({
			skip: this.state.skip + this.state.perPage,
		});

		window.scrollTo(0, 0);
	}

	previousPage() {
		if (this.state.skip - this.state.perPage >= 0)
			this.setState({
				skip: this.state.skip - this.state.perPage,
			});

		window.scrollTo(0, 0);
	}

	renderPost(post) {
		return <div className="card mb-3" key={post.id}>
			<div className="card-body">
				<h5 className="card-title text-truncate font-weight-normal">
					{post.title}
				</h5>
				<p className="card-text text-muted">
					{post.body}
				</p>
			</div>
		</div>
	}

	renderList() {
		const posts = this.state.posts
			.slice(this.state.skip, this.state.skip + this.state.perPage)
			.map(this.renderPost);

		return <div className={classNames('mt-5', 'mx-auto', styles.postslist)}>
			<NavLink to="/posts/create" className="mb-3 text-dark d-inline-block">
				Create new post
				<span className="fas fa-plus ml-2" />
			</NavLink>

			{posts}
		</div>
	}
	
	render() {
		if (this.state.loading || this.state.error) {
			return <div className="text-center mt-5">
				<Status loading={this.state.loading} error={this.state.error} />
			</div>
		} else {
			return <div>
				{this.renderList()}

				<PaginationControls total={this.state.posts.length}
					perPage={this.state.perPage}
					skip={this.state.skip}
					onNext={() => this.nextPage()}
					onPrevious={() => this.previousPage()} />
			</div>
		}
	}

	componentDidMount() {
		axios.get(apiUrl('/posts')).then(response => {
			this.setState({
				posts: response.data,
				loading: false,
			});
		}).catch(e => {
			// Obviously could put more descriptive error there, but this is a dummy API so it doesn't matter.
			this.setState({
				loading: false,
				error: 'Unexpected error.',
			});
		});
	}
}