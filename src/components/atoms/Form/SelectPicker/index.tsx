import { useClickOutside } from '@libs/hooks';
import Icon, { arrowDown } from '@libs/icons';
import { formatStatus } from '@utils/helpers';
import { FC, InputHTMLAttributes, useEffect, useState } from 'react';
import { FormInputProps } from '..';
import { PickerItems } from './PickerItems';
import { FormControl, FormFeedback, FormGroup, FormLabel, Indicator, PickerWrapper } from './styles';

const initialPicker = { isMenu: false, isFocused: null, isSelected: null };
export const SelectPicker: FC<SelectPickerProps> = (props) => {
	const [picker, setPicker] = useState<InitialPicker>(initialPicker);
	const { wrapperRef } = useClickOutside(() => setPicker((prevState) => ({ ...prevState, isMenu: false })));
	const { label, srOnly, message, className, style, required, items, value, clickHandler, ...rest } = props;
	const groupProps = { className, style };
	const labelProps = { required, srOnly, children: label };
	const controlProps = { invalid: !!(required && message), required, value: formatStatus(String(value)), ...rest };

	useEffect(() => {
		if (props.value) setPicker((prevState) => ({ ...prevState, isFocused: props.value, isSelected: props.value }));
	}, [props]);

	const handleClick = (value: string | ReadonlyArray<string> | number) => {
		const { name } = rest;
		clickHandler({ name, value, required });
		setPicker((prevState) => ({ ...prevState, isMenu: false, isFocused: value, isSelected: value }));
	};

	const pickerProps = { ...picker, setPicker, items, handleClick };

	return (
		<PickerWrapper ref={wrapperRef}>
			<FormGroup {...groupProps}>
				<FormLabel {...labelProps} />
				<div className="w-100 position-relative">
					<FormControl
						{...controlProps}
						onFocus={() => setPicker((prevState) => ({ ...prevState, isMenu: true }))}
					/>
					<Indicator className={picker.isMenu ? 'isFocused' : ''}>
						<Icon path={arrowDown} width={20} height={20} fill="var(--border)" />
					</Indicator>
				</div>
				{required && <FormFeedback>{message}</FormFeedback>}
			</FormGroup>

			<PickerItems {...pickerProps} />
		</PickerWrapper>
	);
};

export type SelectPickerEvent = Pick<InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'required'>;
export interface SelectPickerProps extends FormInputProps {
	items: SelectPickerItemProps[];
	clickHandler?: (event: SelectPickerEvent) => void;
}

export interface SelectPickerItemProps {
	label: string;
	value: string;
}

export interface InitialPicker {
	isMenu: boolean;
	isFocused: string | ReadonlyArray<string> | number;
	isSelected: string | ReadonlyArray<string> | number;
}

SelectPicker.defaultProps = {
	srOnly: false,
	readOnly: true,
};
