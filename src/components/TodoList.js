import React from 'react';
import axios from 'axios';
import classNames from 'classnames';

import styles from '../scss/components/todolist.module.scss';
import {apiUrl} from '../helpers';

import PaginationControls from './PaginationControls';
import Status from './Status';

export default class TodoList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: [],

			perPage: 10,
			skip: 0,

			loading: true,
			error: '',
		};

		// This really bugs me, I'm so sure there's a better best practice here, but for
		// Simplicity in the meantime, I'm keeping this as is.

		this.renderTodo = this.renderTodo.bind(this);
	}

	nextPage() {
		this.setState({
			skip: this.state.skip + this.state.perPage,
		});
	}

	previousPage() {
		if (this.state.skip - this.state.perPage >= 0)
			this.setState({
				skip: this.state.skip - this.state.perPage,
			});
	}

	toggleTodo(todo) {
		const completed = !todo.completed;

		axios.put(apiUrl(`/todos/${todo.id}`), {
			...todo,
			completed,
		}).then(() => {
			const newTodos = [...this.state.todos];
			newTodos.find(t => t.id === todo.id).completed = completed;

			this.setState({
				todos: newTodos,
			});
		});
	}

	renderTodo(todo) {
		return <li className="list-group-item" key={todo.id}>
		    <div className="pretty p-icon p-round">
				<input type="checkbox" checked={todo.completed}
					onChange={() => this.toggleTodo(todo)} />
				
				<div className="state p-primary">
					<span className="icon fas fa-check" />

					<label className={classNames('ml-3', {'text-muted': todo.completed, 'text-strikethrough': todo.completed})}>
						{todo.title}
					</label>
				</div>
			</div>
		</li>
	}

	renderList() {
		const todos = this.state.todos
			.slice(this.state.skip, this.state.skip + this.state.perPage)
			.map(this.renderTodo);

		return <ul className={classNames('list-group', 'mx-auto', 'mt-5', styles.todolist)}>
			{todos}
		</ul>
	}

	render() {
		if (this.state.loading || this.state.error) {
			return <div className="text-center mt-5">
				<Status loading={this.state.loading} error={this.state.error} />
			</div>
		} else {
			return <div>
				{this.renderList()}

				<PaginationControls total={this.state.todos.length}
					perPage={this.state.perPage}
					skip={this.state.skip}
					onNext={() => this.nextPage()}
					onPrevious={() => this.previousPage()} />
			</div>
		}
	}

	componentDidMount() {
		axios.get(apiUrl('/todos')).then(response => {
			this.setState({
				todos: response.data,
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