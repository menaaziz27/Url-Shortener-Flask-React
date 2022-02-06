import React from 'react';

const Pagination = ({ totalUrls, urlsPerPage, paginate, currentPage }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalUrls / urlsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="mt-3">
			<nav aria-label="Page navigation example">
				<ul className="pagination justify-content-center">
					{pageNumbers.map(number => {
						return (
							<li className="page-item" key={number} onClick={() => paginate(number)}>
								<a
									className={`page-link text-black ${currentPage === number ? 'bg-primary' : null}`}
								>
									{number}
								</a>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
};

export default Pagination;
