import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UrlItem = ({ url }) => {
	return (
		<ListGroup.Item
			key={url?.slug}
			className="d-flex justify-content-between align-items-center flex-wrap"
		>
			<a href={url.url} target="_blank" rel="noreferrer" className="text-truncate">
				{url.url}
			</a>
			<Link to={`url/${url._id}`} className="btn mx-3 my-2">
				<i className="fas fa-edit"></i>
			</Link>
		</ListGroup.Item>
	);
};

export default UrlItem;
