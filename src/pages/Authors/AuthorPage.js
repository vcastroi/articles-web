import React from 'react';

import { useGetRequest } from '../../hooks';
import { Api } from '../../services';

import AuthorNew from './AuthorNew';
import AuthorEdit from './AuthorEdit';

export default function AuthorPage(props) {
	const [ data, refreshData, status, loading, error ] = useGetRequest({ getFn: Api.listAuthors, delay: 1000 });

	console.log(status);
	console.log(JSON.stringify(error, null, 2));

	return (
		<div className="AuthorPage">
			{error && (
				<div>
					Http Status: {status} - Error: {error && error.message}
				</div>
			)}

			{loading ? (
				<div>Loading...</div>
			) : (
				data && (
					<React.Fragment>
						<h2> Authors</h2>
						{data.map((author) => <AuthorEdit key={author.id} author={author} refreshData={refreshData} />)}
						<AuthorNew afterNew={refreshData} />
					</React.Fragment>
				)
			)}
		</div>
	);
}
