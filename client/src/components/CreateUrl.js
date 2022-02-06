import React, { useState } from 'react';
import { Form, FormControl, FormGroup, FormLabel, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import Loader from './Loader';
import Message from './Message';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateUrl = () => {
	const [ios, setIos] = useState({ primary: '', fallback: '' });
	const [android, setAndroid] = useState({ primary: '', fallback: '' });
	const [web, setWeb] = useState('');
	const [slug, setSlug] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const history = useHistory();

	const notify = () => toast.success('Url created successfully!');

	const submitHandler = async e => {
		e.preventDefault();

		const postData = { ios, android, web, slug };

		if (!ios.primary || !ios.fallback || !android.primary || !android.fallback || !web) {
			setMessage('All fields are required except the slug!');
			return;
		} else {
			try {
				const headers = {
					'Content-Type': 'application/json',
				};
				setLoading(true);
				await axios.post(`http://127.0.0.1:8000/shortlinks`, postData, { headers });
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
			<h1 className="text-center">Create Url</h1>

			{loading && <Loader variant="danger">{loading}</Loader>}
			{message && <Message variant="danger">{message}</Message>}
			<Form onSubmit={submitHandler}>
				<FormGroup controlId="name">
					<FormLabel>IOS Urls</FormLabel>
					<small className="mx-2">(primary / fallback)</small>
					<FormControl
						type="text"
						placeholder="Primary url (Required)"
						value={ios.primary}
						onChange={e => setIos({ ...ios, primary: e.target.value })}
						className="mb-1"
					></FormControl>
					<FormControl
						type="text"
						placeholder="Fallback url (Required)"
						value={ios.fallback}
						onChange={e => setIos({ ...ios, fallback: e.target.value })}
						className="mb-1"
					></FormControl>
				</FormGroup>

				<FormGroup controlId="email">
					<FormLabel>Android Urls</FormLabel>
					<small className="mx-2">(primary / fallback)</small>
					<FormControl
						type="text"
						placeholder="Primary url (Required)"
						value={android.primary}
						onChange={e => setAndroid({ ...android, primary: e.target.value })}
						className="mb-1"
					></FormControl>
					<FormControl
						type="text"
						placeholder="Fallback url (Required)"
						value={android.fallback}
						onChange={e => setAndroid({ ...android, fallback: e.target.value })}
						className="mb-1"
					></FormControl>
				</FormGroup>

				<FormGroup>
					<FormLabel>Web Url</FormLabel>
					<FormControl
						type="text"
						placeholder="Web url (Required)"
						value={web}
						onChange={e => setWeb(e.target.value)}
						className="mb-1"
					></FormControl>
				</FormGroup>

				<FormGroup>
					<FormLabel>Slug</FormLabel>
					<FormControl
						type="text"
						placeholder="url slug (Optional)"
						value={slug}
						onChange={e => setSlug(e.target.value)}
					></FormControl>
				</FormGroup>

				<Button type="submit" variant="primary" className="my-3">
					Create
				</Button>
			</Form>
		</Container>
	);
};

export default CreateUrl;
