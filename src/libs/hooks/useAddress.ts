import { addressAPI } from '@libs/api';
import { IAddress } from '@libs/api/interfaces';
import { useEffect, useState } from 'react';

export const useAddress = (): ReturnType => {
	const [address, setAddress] = useState<StateType>({ region: [], city: [], area: [] });
	const [selectedRegion, setSelectedRegion] = useState<string>(null);
	const [selectedCity, setSelectedCity] = useState<string>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getRegions = async () => {
			setIsLoading(true);
			const { success, data } = await addressAPI.getRegions();
			if (success) setAddress((v) => ({ ...v, region: data }));
			setIsLoading(false);
		};
		getRegions().catch(console.log);
	}, []);

	useEffect(() => {
		const getCity = async (region: string) => {
			setIsLoading(true);
			const { success, data } = await addressAPI.getCitiesByRegion(region);
			if (success) setAddress((v) => ({ ...v, city: data, area: [] }));
			setIsLoading(false);
		};
		if (selectedRegion) getCity(selectedRegion).catch(console.log);
	}, [selectedRegion]);

	useEffect(() => {
		const getArea = async (region: string, city: string) => {
			setIsLoading(true);
			const { success, data } = await addressAPI.getAreasByCity(region, city);
			if (success) setAddress((v) => ({ ...v, area: data }));
			setIsLoading(false);
		};
		if (selectedRegion && selectedCity) getArea(selectedRegion, selectedCity).catch(console.log);
	}, [selectedCity, selectedRegion]);

	return {
		address,
		isLoading,
		setRegion: (region: string) => {
			setSelectedRegion(region);
			setSelectedCity(null);
		},
		setCity: (region: string, city: string) => {
			setSelectedRegion(region);
			setSelectedCity(city);
		},
	};
};

type StateType = {
	region: IAddress[];
	city: IAddress[];
	area: IAddress[];
};

type ReturnType = {
	address: StateType;
	isLoading: boolean;
	setCity: (region: string, city: string) => void;
	setRegion: (region: string) => void;
};
