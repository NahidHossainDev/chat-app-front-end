/* eslint-disable no-empty */
import { cartAPI, productAPI, wishlistAPI } from '@libs/api';
import { IProduct } from '@libs/api/interfaces';
import { authPopup, getProductState, getUserState, updateCart, updateWishlist } from '@store/actions';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useProduct = (id: string): IUseProduct => {
	const [isPending, setPending] = useState<'addToCart' | 'wishlist'>(null);
	const [isCartPopup, setCartPopup] = useState<boolean>(false);
	const [recommended, setRecommended] = useState<IProduct[]>(null);
	const { isAuthenticate } = useSelector(getUserState);
	const { stock, isWishlist, globalSKU, quantity } = useSelector(getProductState);
	const dispatch = useDispatch();
	const {
		query: { slug },
	} = useRouter();

	useEffect(() => {
		const getRecommended = async () => {
			try {
				const { success, data } = await productAPI.getRelatedProducts(slug);
				if (success) setRecommended(data);
			} catch (error) {}
		};
		getRecommended();
	}, [id]);

	useEffect(() => {
		if (isAuthenticate) {
			if (isPending === 'addToCart') handleAddToCart();
			if (isPending === 'wishlist') handleWishlist();
		}
	}, [isAuthenticate]);

	const handleAddToCart = async (callback?: () => void) => {
		const payload = {
			productID: id,
			skuID: globalSKU,
			quantity,
		};
		if (isAuthenticate) {
			setPending(null);
			try {
				const { success, data } = await cartAPI.addToCart(payload);
				if (success) {
					setCartPopup(true);
					dispatch(updateCart(data));
					if (callback) callback();
				}
			} catch (error) {}
		} else {
			dispatch(authPopup({ isActive: true, type: 'signin' }));
			setPending('addToCart');
		}
	};

	const handleWishlist = async () => {
		const payload = {
			productID: id,
			skuID: globalSKU,
		};

		if (isAuthenticate) {
			setPending(null);
			try {
				const { success } = isWishlist
					? await wishlistAPI.removeFromWishlist(payload)
					: await wishlistAPI.addToWishlist(payload);
				if (success) dispatch(updateWishlist(!isWishlist));
			} catch (error) {}
		} else {
			dispatch(authPopup({ isActive: true, type: 'signin' }));
			setPending('wishlist');
		}
	};

	return {
		stock,
		isWishlist,
		isPending,
		isCartPopup,
		recommended,
		setCartPopup,
		handleAddToCart,
		handleWishlist,
	};
};

export type IUseProduct = {
	stock: number;
	isWishlist: boolean;
	isPending: 'addToCart' | 'wishlist';
	isCartPopup: boolean;
	recommended: IProduct[];
	setCartPopup: Dispatch<SetStateAction<boolean>>;
	handleAddToCart: (callback?: () => void) => void;
	handleWishlist: () => void;
};
