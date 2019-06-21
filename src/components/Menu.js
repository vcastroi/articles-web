import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

export default function Menu(props) {
	return (
		<ListGroup>
			<ListGroup.Item action as={NavLink} to="/articles" exact activeClassName="active">
				Articles
			</ListGroup.Item>
			<ListGroup.Item action as={NavLink} to="/authors" exact activeClassName="active">
				Authors
			</ListGroup.Item>
			<ListGroup.Item action as={NavLink} to="/about" exact activeClassName="active">
				About
			</ListGroup.Item>
		</ListGroup>
	);
}
