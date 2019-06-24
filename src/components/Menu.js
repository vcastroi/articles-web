import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

export default function Menu(props) {
	return (
		<ListGroup>
			<ListGroup.Item action as={NavLink} to="/home" activeClassName="active">
				Home
			</ListGroup.Item>
			<ListGroup.Item action as={NavLink} to="/articles" activeClassName="active">
				Articles
			</ListGroup.Item>
			<ListGroup.Item action as={NavLink} to="/authors" activeClassName="active">
				Authors
			</ListGroup.Item>
		</ListGroup>
	);
}
