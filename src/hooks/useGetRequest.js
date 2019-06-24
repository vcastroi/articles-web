import { useState, useEffect, useCallback } from 'react';
import useInterval from './useInterval';

export default function useGetRequest(props) {
	const { getFn, delay = 500 } = props;
	const [ data, setData ] = useState();
	const [ error, setError ] = useState();
	const [ loading, setLoading ] = useState(false);
	const [ status, setStatus ] = useState(null);
	const [ wait, setWait ] = useState(delay);

	const refreshData = useCallback(
		() => {
			setWait(delay);
			getFn()
				.then((res) => {
					setWait(null);
					setData(res.data);
					setStatus(res.status);
					setLoading(false);
				})
				.catch((err) => setError(err));
		},
		[ getFn, delay ]
	);

	useEffect(
		() => {
			refreshData();
		},
		[ refreshData ]
	);

	// We put our delay into a state hook because we need to be able to toggle it between our delay and a null value.
	// A null value will stop the useInterval from running.
	useInterval(() => {
		setLoading(true);
	}, wait);
	return [ data, refreshData, status, loading, error ];
}

// modified, but originally from: https://medium.com/@atwilliams88/how-to-fetch-data-with-react-hooks-dec0e094dc11
