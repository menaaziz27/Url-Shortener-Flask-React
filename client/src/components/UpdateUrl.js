import React, { useState } from 'react';
import { Form, FormControl, FormGroup, FormLabel, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import Loader from './Loader';
import Message from './Message';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const UpdateUrl = () => {
	const [currentUrl, setCurrentUrl] = useState({});
	const [ios, setIos] = useState({ primary: '', fallback: '' });
	const [android, setAndroid] = useState({ primary: '', fallback: '' });
	const [web, setWeb] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const history = useHistory();
	const params = useParams();
	const { id } = params;

	const notify = () => toast('Url updated!');

	useEffect(() => {
		try {
			const getUrl = async () => {
				setLoading(true);
				const { data } = await axios.get(`http://localhost:8000/shortlinks/${id}`);
				setCurrentUrl(data);
				setIos(data.ios);
				setAndroid(data.android);
				setWeb(data.web);
				setLoading(false);
				setMessage('');
			};
			getUrl();
		} catch (e) {
			setLoading(false);
			setMessage(e.message);
		}
	}, []);

	const submitHandler = async e => {
		e.preventDefault();

		const postData = { ios, android, web };

		if (!ios.primary || !ios.fallback || !android.primary || !android.fallback || !web) {
			setMessage('All fields are required except the slug!');
			return;
		} else {
			try {
				const headers = {
					'Content-Type': 'application/json',
				};
				setLoading(true);
				await axios.put(`/shortlinks/${currentUrl?.slug}`, postData, { headers });
				setLoading(false);
				setMessage('');
				history.push('/');
				notify();
			} catch (e) {
				console.log(e);
				setLoading(false);
				setMessage(e.message);
			}
		}
	};

	return (
		<Container>
			<h1>Update url</h1>

			{loading && <Loader variant="danger">{loading}</Loader>}
			{message && <Message variant="danger">{message}</Message>}
			<Form onSubmit={submitHandler}>
				<FormGroup controlId="name">
					<FormLabel>IOS Urls</FormLabel>
					<small className="mx-2">(primary / fallback)</small>
					<FormControl
						type="text"
						placeholder="Primary url (Required)"
						value={ios?.primary}
						onChange={e => setIos({ ...ios, primary: e.target.value })}
						className="mb-2"
					></FormControl>
					<FormControl
						type="text"
						placeholder="Fallback url (Required)"
						value={ios?.fallback}
						onChange={e => setIos({ ...ios, fallback: e.target.value })}
						className="mb-2"
					></FormControl>
				</FormGroup>

				<FormGroup controlId="email">
					<FormLabel>Android Urls</FormLabel>
					<small className="mx-2">(primary / fallback)</small>
					<FormControl
						type="text"
						placeholder="Primary url (Required)"
						value={android?.primary}
						onChange={e => setAndroid({ ...android, primary: e.target.value })}
						className="mb-2"
					></FormControl>
					<FormControl
						type="text"
						placeholder="Fallback url (Required)"
						value={android?.fallback}
						onChange={e => setAndroid({ ...android, fallback: e.target.value })}
						className="mb-2"
					></FormControl>
				</FormGroup>

				<FormGroup>
					<FormLabel>Web Url</FormLabel>
					<FormControl
						type="text"
						placeholder="Web url (Required)"
						value={web}
						onChange={e => setWeb(e.target.value)}
						className="mb-2"
					></FormControl>
				</FormGroup>

				<Button type="submit" variant="primary" className="my-3">
					Update
				</Button>
			</Form>
		</Container>
	);
};

export default UpdateUrl;
