import React, { useState, useRef } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

import { Api } from '../../services';

export default function AuthorNew(props) {
	const { afterNew } = props;
	const [ name, setName ] = useState('');
	const frmNameInput = useRef(null);

	const handleChange = (event) => {
		setName(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const newAuthor = { name };
		Api.saveAuthor(newAuthor).then(() => {
			setName('');
			afterNew();
			frmNameInput.current.focus();
		});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Row >
				<Col>
					<Form.Control
						ref={frmNameInput}
						as="input"
						name="name"
						value={name}
						onChange={handleChange}
						placeholder="Author name"
						autoFocus
					/>
				</Col>
				<Col xs="4">
					<Button type="submit">Add</Button>
				</Col>
			</Row>
		</Form>
	);
}
