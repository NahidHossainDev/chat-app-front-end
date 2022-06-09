import { MutableRefObject, useEffect, useRef } from 'react';

export const useClickOutside = (callback: () => void): returnType => {
	const wrapperRef = useRef(null);

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, false);
		return () => {
			document.removeEventListener('click', handleClickOutside, false);
		};
	}, []);

	const handleClickOutside = (event: Event) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			callback();
		}
	};

	return {
		wrapperRef,
	};
};

interface returnType {
	wrapperRef: MutableRefObject<any>;
}
