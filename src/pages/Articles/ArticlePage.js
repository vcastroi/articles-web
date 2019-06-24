import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ArticleList from './ArticleList';
import ArticleEdit from './ArticleEdit';

export default function ArticlePage(props) {
	const { match } = props;
	return (
		<div className="ArticlePage">
			<Switch>
				<Route exact path={`${match.path}/`} component={ArticleList} />
				<Route exact path={`${match.path}/new`} component={ArticleEdit} />
				<Route exact path={`${match.path}/:id`} component={ArticleEdit} />
				<Redirect to="/" />
			</Switch>
		</div>
	);
}
