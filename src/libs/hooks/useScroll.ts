import { useEffect } from 'react';
interface screenType {
	innerWidth?: number;
	innerHeight?: number;
	outerWidth?: number;
	outerHeight?: number;
	pageXOffset?: number;
	pageYOffset?: number;
}

export const useScroll = (callback: (screen: screenType) => void): void => {
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleScroll = () => {
		if (typeof window !== null) {
			const { innerWidth, innerHeight, outerHeight, outerWidth, pageXOffset, pageYOffset } = window;
			callback({ innerWidth, innerHeight, outerHeight, outerWidth, pageXOffset, pageYOffset });
		}
	};
};
