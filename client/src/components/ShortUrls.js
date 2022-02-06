import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import UrlItem from './UrlItem';

const ShortUrls = () => {
	const [urls, setUrls] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [urlsPerPage] = useState(6);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getLinks = async () => {
			const { data } = await axios.get('http://localhost:8000/shortlinks');
			setUrls(data);
			setLoading(false);
		};
		getLinks();
	}, []);

	const indexOfLastUrl = currentPage * urlsPerPage;
	const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
	const currentUrls = urls?.slice(indexOfFirstUrl, indexOfLastUrl);

	const allUrls = currentUrls?.map(url => <UrlItem key={url._id} url={url} />);

	const paginateHandler = pageNumber => setCurrentPage(pageNumber);

	return (
		<Container>
			<div className="d-flex justify-content-between mb-2">
				<h3>All short urls ..</h3>
				<Link to="/create" className="mr-3 btn bg-primary text-white">
					Create
				</Link>
			</div>
			{loading ? (
				<Loader />
			) : urls.length === 0 ? (
				<p>No urls found</p>
			) : (
				<ListGroup className="border rounded-sm">{<div>{allUrls}</div>}</ListGroup>
			)}
			<Pagination
				totalUrls={urls?.length}
				urlsPerPage={urlsPerPage}
				paginate={paginateHandler}
				currentPage={currentPage}
			/>
		</Container>
	);
};

export default ShortUrls;
