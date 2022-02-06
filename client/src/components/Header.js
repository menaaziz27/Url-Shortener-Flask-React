import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header>
			<Navbar bg="dark" expand="lg">
				<Container>
					<Navbar.Brand>
						<Link to="/" className="nav-link">
							Epic Url Shortener
						</Link>
					</Navbar.Brand>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
