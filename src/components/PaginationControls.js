import React from 'react';
import classNames from 'classnames';

export default class PaginationControls extends React.PureComponent {
	render() {
		const pagesCount = Math.ceil(this.props.total / this.props.perPage);
		const currentPage = this.props.skip / this.props.perPage + 1; 

		const theresNext = this.props.total - this.props.skip > this.props.perPage;
		const theresPrevious = this.props.skip - this.props.perPage >= 0;

		return <div className="mt-5 row justify-content-center">
			<div className="col-auto text-right">
				<a className={classNames({'text-dark': theresPrevious, 'text-muted': !theresPrevious, disabled: !theresPrevious})}
					href="#previous-page"
					onClick={() => this.props.onPrevious()}>
					Previous
				</a>
			</div>

			<div className="col-auto text-center">
				<span className="text-muted mx-3">
					Page {currentPage} of {pagesCount}
				</span>
			</div>

			<div className="col-auto text-left">
				<a className={classNames({'text-dark': theresNext, 'text-muted': !theresNext, disabled: !theresNext})}
					href="#next-page" onClick={() => this.props.onNext()}>
					Next
				</a>
			</div>
		</div>
	}
}