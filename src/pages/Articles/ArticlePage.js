import React from 'react';
import { Table } from 'react-bootstrap';

export default function ArticlePage(props) {
	return (
		<div className="ArticlePage">
			<h2> Articles</h2>

			<Table   hover >
				<thead>
					<tr>
						<th>#</th>
						<th>Article</th>
						<th>Authors</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td><p class="font-weight-bold">Bold text.</p>
						<p class="font-weight-light">Light weight text.</p>
						</td>
						<td>1
							2
						</td>
						<td>Edit</td>
					</tr>
					
				</tbody>
			</Table>
		</div>
	);
}
