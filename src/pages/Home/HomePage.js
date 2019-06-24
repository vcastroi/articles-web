import React, { useState } from 'react';
import { Alert, Button, Row, Col } from 'react-bootstrap';

import { Api } from '../../services';

export default function HomePage(props) {
	const [ showAlert, setShowAlert ] = useState(true);

	return (
		<div className="HomePage">
			<h1>Welcome</h1>

			{showAlert && (
				<Alert variant="warning">
					<Alert.Heading>Hey, nice to see you</Alert.Heading>
					<p>
						This site uses a in-memory database, so, if this is the first time running it, it would not have
						any data.
					</p>
					<hr />
					<Row>
						<Col>Would you like to add some sample data ? </Col>
						<Col xs="2">
							<Button
								variant="warning"
								onClick={() => {
									Api.runDbSeed();
									setShowAlert(false);
								}}
							>
								run Seeds
							</Button>
						</Col>
					</Row>
				</Alert>
			)}

			{!showAlert && (
				<Alert variant="success">
					New data was created. Go see your new <Alert.Link href="/articles">Articles</Alert.Link>.
				</Alert>
			)}
		</div>
	);
}
