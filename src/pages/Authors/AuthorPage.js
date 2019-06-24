import React from 'react';

import { useGetRequest } from '../../hooks';
import { Api } from '../../services';

import AuthorNew from './AuthorNew';
import AuthorEdit from './AuthorEdit';

export default function AuthorPage(props) {
	const [ data, refreshData, status, loading, error ] = useGetRequest({
		getFn: Api.listAuthors,
		fnParams: null,
		delay: 1000
	});

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
