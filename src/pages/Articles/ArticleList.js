import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, ButtonToolbar } from 'react-bootstrap';

import { useGetRequest } from '../../hooks';
import { Api } from '../../services';

import ArticleTable from './ArticleTable';
import ArticleSearch from './ArticleSearch';

export default function ArticlePage(props) {
	const [ searchTitle, setSearchTitle ] = useState('');
	const [ searchAuthors, setSearchAuthors ] = useState('');

	const loadData = useCallback(
		() => {
			//todo: debounce call
			return Api.searchArticles(searchTitle, searchAuthors);
		},
		[ searchTitle, searchAuthors ]
	);

	const [ data, refreshData, status, loading, error ] = useGetRequest({
		getFn: loadData,
		fnParams: null,
		delay: 1000
	});

	return (
		<div className="ArticlePage">
			<Container fluid="true">
				<Row>
					<Col xs="7">
						<h2> Articles List</h2>
					</Col>
					<Col xs="3">
						<ButtonToolbar>
							<Button as={Link} to={'/articles/new'} variant="primary" style={{ marginRight: 10 }}>
								New
							</Button>
						</ButtonToolbar>
					</Col>
				</Row>
				<Row>
					<ArticleSearch setSearchTitle={setSearchTitle} setSearchAuthors={setSearchAuthors} />
				</Row>
				<Row>
					<Col>
						{error && (
							<div>
								Http Status: {status} - Error: {error && error.message}
							</div>
						)}

						{loading ? (
							<div>Loading...</div>
						) : (
							!error && data && <ArticleTable data={data} refreshData={refreshData} />
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
}
