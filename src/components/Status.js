import React from 'react';

export default class Status extends React.PureComponent {
	render() {
		if (this.props.loading)
			return <span className="text-muted">Loading...</span>
		else if (this.props.error)
			return <span className="text-danger">{this.props.error}</span>
	}
}