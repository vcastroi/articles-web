import React from 'react';
import { Form, Alert, Col } from 'react-bootstrap';

export default function ArticleSearch(props) {
	const { setSearchTitle, setSearchAuthors } = props;

	return (
		<Alert variant="secondary" style={{ margin: 15, width: '80%' }}>
			<Form>
				<Form.Row>
					<Col xs="2">
						<Form.Label className="font-weight-bold">Search</Form.Label>
					</Col>
					<Col>
						<Form.Control placeholder="Title" onChange={(e) => setSearchTitle(e.target.value)} />
					</Col>
					<Col>
						<Form.Control
							placeholder="Authors (comma separated id's)"
							onChange={(e) => setSearchAuthors(e.target.value)}
						/>
					</Col>
				</Form.Row>
			</Form>
		</Alert>
	);
}
