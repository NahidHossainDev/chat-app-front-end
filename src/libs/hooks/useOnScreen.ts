import { useEffect, useState } from 'react';

export const useOnScreen = (ref, onVisible: () => void) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			entry.isIntersecting ? onVisible() : null;
			setIsVisible(entry.isIntersecting);
		});
		observer.observe(ref.current);
		// Remove the observer as soon as the component is unmounted
		return () => {
			observer.disconnect();
		};
	}, []);
};
