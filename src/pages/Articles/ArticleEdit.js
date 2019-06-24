import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { useGetRequest } from '../../hooks';
import { Api } from '../../services';

import ArticleForm from './ArticleForm';

export default function ArticleEdit(props) {
	const userId = props.match.params.id;

	const loadData = useCallback(
		() => {
			if (userId) return Api.getArticle(userId);
			else
				return Promise.resolve({
					data: { id: null, title: '', shortDescription: null, longDescription: null, authors: [] }
				});
		},
		[ userId ]
	);

	const [ data, refreshData, status, loading, error ] = useGetRequest({ getFn: loadData, delay: 1000 });

	return (
		<div className="ArticlePage">
			<Container fluid="true">
				<Row>
					<Col xs="7">
						<h2>
							{userId ? 'Edit' : 'New'} Article {userId ? userId : ''}
						</h2>
					</Col>
					<Col xs="2">
						<Button as={Link} to={'/articles'} variant="warning">
							Back
						</Button>
					</Col>
				</Row>
				<Row>
					{error && (
						<div>
							Http Status: {status} - Error: {error && error.message}
						</div>
					)}

					{loading ? (
						<div>Loading...</div>
					) : (
						!error && data && <ArticleForm data={data} refreshData={refreshData} history={props.history} />
					)}
				</Row>
			</Container>
		</div>
	);
}
