import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header.js';
import CreateUrl from './components/CreateUrl';
import ShortUrls from './components/ShortUrls';
import UpdateUrl from './components/UpdateUrl';
import NotFound from './components/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<main className="py-3">
					<Container>
						<Switch>
							<Route exact path="/">
								<ShortUrls />
							</Route>
							<Route path="/create">
								<CreateUrl />
							</Route>
							<Route path="/url/:id">
								<UpdateUrl />
							</Route>
							<Route path="">
								<NotFound />
							</Route>
						</Switch>
					</Container>
					<ToastContainer />
				</main>
			</BrowserRouter>
		</>
	);
}

export default App;
