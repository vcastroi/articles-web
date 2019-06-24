import React, { useState } from 'react';
import {
	Form,
	Container,
	Row,
	Col,
	Button,
	Alert,
	DropdownButton,
	Dropdown,
	OverlayTrigger,
	Tooltip
} from 'react-bootstrap';
import { Formik } from 'formik';

import { useInterval, useGetRequest } from '../../hooks';
import { Api } from '../../services';

export default function ArticleForm(props) {
	const { data, history } = props;
	const [ error, setError ] = useState(null);
	const [ wait, setWait ] = useState(null);

	const saveArticle = (values, formikBag) => {
		const newArticle = { ...values };
		Api.saveArticle(newArticle)
			.then(() => {
				history.push('/articles');
			})
			.catch((error) => {
				setError(error);
				setWait(2000);
			});
	};

	const deleteArticle = (id) => {
		Api.deleteArticle(id)
			.then(() => {
				history.push('/articles');
			})
			.catch((error) => {
				delete error.response.data.stackTrace;
				if (error.response.data.message) setError(error.response.data);
				else setError(error);
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

	const [ allAuthors ] = useGetRequest({ getFn: Api.listAuthors, delay: 500 });

	return (
		<Container fluid="false" style={{ marginTop: 15 }}>
			{data && (
				<Formik onSubmit={saveArticle} initialValues={data}>
					{({ handleSubmit, handleChange, values, touched, setFieldTouched, resetForm }) => {
						const authorsNotAlreadyAssigned = allAuthors
							? allAuthors.filter((a) => !values.authors.some((d) => d.id === a.id))
							: [];
						return (
							<Form onSubmit={handleSubmit} style={{ marginBottom: 10 }}>
								<Form.Group as={Row} controlId="frmTitle">
									<Form.Label column sm="2">
										Title
									</Form.Label>
									<Col sm="6">
										<Form.Control name="title" value={values.title} onChange={handleChange} />
									</Col>
								</Form.Group>

								<Form.Group as={Row} controlId="frmShortDescr">
									<Form.Label column sm="2">
										Short Description
									</Form.Label>
									<Col sm="8">
										<Form.Control
											name="shortDescription"
											value={values.shortDescription}
											onChange={handleChange}
										/>
									</Col>
								</Form.Group>

								<Form.Group as={Row} controlId="frmLongDescr">
									<Form.Label column sm="2">
										Long Description
									</Form.Label>
									<Col sm="8">
										<Form.Control
											name="longDescription"
											value={values.longDescription}
											onChange={handleChange}
											as="textarea"
											rows="5"
										/>
									</Col>
								</Form.Group>

								<Form.Label>
									<strong>Authors:</strong>
								</Form.Label>
								<Form.Group as={Row}>
									<Col>
										{values.authors &&
											values.authors.map((a) => (
												<div key={a.id} style={{ marginBottom: 5 }}>
													<Form.Label>
														{a.id} - {a.name}
													</Form.Label>
													<Button
														size="sm"
														variant="outline-danger"
														style={{ marginLeft: 10 }}
														onClick={() => {
															values.authors = values.authors.filter(
																(author) => author.id !== a.id
															);
															setFieldTouched('authors', true);
														}}
													>
														Remove
													</Button>
													<br />
												</div>
											))}
									</Col>
									<Col>
										<DropdownButton title="Assign Author">
											{authorsNotAlreadyAssigned &&
												authorsNotAlreadyAssigned.map((a) => (
													<Dropdown.Item
														key={a.id}
														eventKey={a.id}
														onSelect={(key) => {
															values.authors.push(a);
															setFieldTouched('authors', true);
															console.log(JSON.stringify(key, null, 2));
														}}
													>
														{a.id} - {a.name}
													</Dropdown.Item>
												))}
										</DropdownButton>
									</Col>
								</Form.Group>

								<Dropdown.Divider />
								<Row style={{ marginTop: 25 }}>
									<Col sm="auto">
										<OverlayTrigger
											placement="bottom"
											overlay={
												<Tooltip id={`tooltip-delete`}>
													Delete article #{values.id}, cannot be undone.
												</Tooltip>
											}
										>
											<Button
												onClick={() => deleteArticle(values.id)}
												variant="danger"
												style={{ marginRight: 30 }}
												disabled={!values.id}
											>
												delete
											</Button>
										</OverlayTrigger>
									</Col>
									<Col />
									<Col sm="auto">
										<Button
											onClick={() => {
												resetForm(data);
												history.push('/articles');
											}}
											variant="secondary"
											style={{ marginRight: 10 }}
										>
											cancel
										</Button>
										<Button type="submit" style={{ marginRight: 10 }} variant="success">
											save
										</Button>
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
