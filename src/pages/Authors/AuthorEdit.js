import React, { useState } from 'react';
import { Form, Container, Row, Col, ButtonToolbar, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';

import { useInterval } from '../../hooks';
import { Api } from '../../services';

export default function AuthorEdit(props) {
	const { author, refreshData } = props;
	const [ error, setError ] = useState(null);
	const [ wait, setWait ] = useState(null);

	const saveAuthor = (values, formikBag) => {
		const newAuthor = { ...values };
		Api.saveAuthor(newAuthor)
			.then(() => {
				formikBag.setFieldTouched('name', false);
				refreshData();
			})
			.catch((error) => {
				setError(error);
				setWait(2000);
			});
	};

	const deleteAuthor = (id) => {
		Api.deleteAuthor(id)
			.then(() => {
				refreshData();
			})
			.catch((error) => {
				setError(error);
				setWait(2000);
			});
	};

	useInterval(() => {
		setWait(null);
		setError(null);
	}, wait);

	const handleDismiss = () => {
		setWait(null);
		setError(null);
	};

	return (
		<Container fluid="false">
			{author && (
				<Formik onSubmit={saveAuthor} initialValues={author}>
					{({ handleSubmit, handleChange, values, touched, setFieldTouched, resetForm }) => {
						return (
							<Form onSubmit={handleSubmit} style={{ marginBottom: 10 }}>
								<Row>
									<Col xs="3">
										<Form.Control
											as="input"
											name="id"
											value={values.id}
											onChange={handleChange}
											disabled
										/>
									</Col>
									<Col style={{ marginInline: 5 }}>
										<Form.Control
											as="input"
											name="name"
											value={values.name}
											onChange={handleChange}
											placeholder="Author name"
											onInput={() => setFieldTouched('name', true)}
										/>
									</Col>
									<Col xs="4">
										{touched.name ? (
											<ButtonToolbar>
												<Button type="submit" style={{ marginRight: 10 }} variant="success">
													save
												</Button>
												<Button onClick={() => resetForm(author)} variant="secondary">
													cancel
												</Button>
											</ButtonToolbar>
										) : (
											<Button onClick={() => deleteAuthor(values.id)} variant="danger">
												delete
											</Button>
										)}
									</Col>
								</Row>
							</Form>
						);
					}}
				</Formik>
			)}
			{error && (
				<Alert variant="danger" onClose={handleDismiss} dismissible>
					<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
					<p>{error && error.message}</p>
				</Alert>
			)}
		</Container>
	);
}
