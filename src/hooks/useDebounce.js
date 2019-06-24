import { useRef, useCallback, useEffect } from 'react';

// todo: implement debouncer for article search

export default function useDebouncedCallback(callback, delay, options) {
	const maxWait = options.maxWait;
	const maxWaitHandler = useRef(null);
	const maxWaitArgs = useRef([]);
	const functionTimeoutHandler = useRef(null);
	const isComponentUnmounted = useRef(false);

	const debouncedFunction = callback;

	const cancelDebouncedCallback = useCallback(() => {
		clearTimeout(functionTimeoutHandler.current);
		clearTimeout(maxWaitHandler.current);
		maxWaitHandler.current = null;
		maxWaitArgs.current = [];
		functionTimeoutHandler.current = null;
	}, []);

	useEffect(
		() => () => {
			// we use flag, as we allow to call callPending outside the hook
			isComponentUnmounted.current = true;
		},
		[]
	);

	const debouncedCallback = useCallback(
		(...args) => {
			maxWaitArgs.current = args;
			clearTimeout(functionTimeoutHandler.current);
			functionTimeoutHandler.current = setTimeout(() => {
				cancelDebouncedCallback();

				if (!isComponentUnmounted.current) {
					debouncedFunction(...args);
				}
			}, delay);

			if (maxWait && !maxWaitHandler.current) {
				maxWaitHandler.current = setTimeout(() => {
					const args = maxWaitArgs.current;
					cancelDebouncedCallback();

					if (!isComponentUnmounted.current) {
						debouncedFunction.apply(null, args);
					}
				}, maxWait);
			}
		},
		[ debouncedFunction, maxWait, delay, cancelDebouncedCallback ]
	);

	const callPending = () => {
		// Call pending callback only if we have anything in our queue
		if (!functionTimeoutHandler.current) {
			return;
		}

		debouncedFunction.apply(null, maxWaitArgs.current);
		cancelDebouncedCallback();
	};

	// At the moment, we use 3 args array so that we save backward compatibility
	return [ debouncedCallback, cancelDebouncedCallback, callPending ];
}

//from : https://github.com/xnimorz/use-debounce/blob/master/src/callback.ts
