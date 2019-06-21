import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Header(props) {
	return (
		<Container fluid="true" style={{ margin: 25, marginTop: 15 }}>
			<Row>
				<Col>
					<h1>Articles &amp; Authors</h1>
					<h4>A Simple React Frontend to manage your articles API.</h4>
				</Col>
				<Col xs={2}>
					<Button href="#" variant="info">
						Swagger Documentation
					</Button>
				</Col>
			</Row>
		</Container>
	);
}
