import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div>
			<p>This page is not found!</p>
			<Link to="/">back to home</Link>
		</div>
	);
};

export default NotFound;
