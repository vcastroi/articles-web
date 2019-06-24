import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Table, Button } from 'react-bootstrap';

export default function ArticleTable(props) {
	const { data } = props;
	return (
		<Col xs="9">
			<Table hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Article</th>
						<th>Authors</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data &&
						data.map((item) => (
							<tr key={item.id}>
								<td>{item.id}</td>
								<td>
									<p className="font-weight-bold">{item.title}</p>
									<p className="font-weight-light">{item.shortDescription}</p>
								</td>
								<td>
									{item.authors &&
										item.authors.map((a) => (
											<div key={a.id}>
												{a.name}
												<br />
											</div>
										))}
								</td>
								<td>
									<Button as={Link} to={'/articles/' + item.id} variant="info">
										Edit
									</Button>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
		</Col>
	);
}

export { default as ArticleTable } from './ArticleTable';
