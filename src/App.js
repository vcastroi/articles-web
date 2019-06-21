import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

import { Header, Menu } from './components';
import { ArticlePage, AuthorPage } from './pages';

function App() {
	return (
		<Container fluid="true">
			<Row>
				<Header />
			</Row>
			<Row style={{ height: '100%' }}>
				<Router>
					<Col xs='3'>
						<Menu />
					</Col>
					<Col xs="8">
						<Switch>
							<Route path="/authors" component={AuthorPage} />
							<Route path="/articles" component={ArticlePage} />
							<Route path="/about" component={AuthorPage} />
              <Redirect exact from="/" to="/authors" />
						</Switch>
					</Col>
				</Router>
			</Row>
		</Container>
	);
}

export default App;
