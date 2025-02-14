import type { Updater } from '@tanstack/react-form';
import React from 'react';
import type { FormFieldContextValue, FormItemContextValue, UseFormFieldReturnType } from './type';

export function onSubmitExtend(onSubmit: () => Promise<void>) {
	return (event: React.FormEvent) => {
		event.preventDefault();
		event.stopPropagation();

		onSubmit();
	};
}

export function onChangeExtend<TUpdater>(onChange: (updater: Updater<TUpdater>) => void) {
	return (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputType = event.target.type as React.HTMLInputTypeAttribute;

		function validateInputType() {
			switch (inputType) {
				case 'number':
					return event.target.valueAsNumber;

				default:
					return event.target.value;
			}
		}

		onChange(validateInputType() as TUpdater);
	};
}

export const FormFieldContext: React.Context<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	FormFieldContextValue<any, any, any, any, any> | undefined
> = React.createContext<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	FormFieldContextValue<any, any, any, any, any> | undefined
>(undefined);

export const FormItemContext: React.Context<FormItemContextValue | undefined> = React.createContext<
	FormItemContextValue | undefined
>(undefined);

export function useFormField(): UseFormFieldReturnType {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);

	if (typeof fieldContext === 'undefined') {
		throw new Error('useFormField must be used within a <FormField/> provider');
	}

	if (typeof itemContext === 'undefined') {
		throw new Error('useFormField must be used within a <FormItem/> provider');
	}

	return {
		fieldApi: fieldContext,
		error: !!(fieldContext.state.meta.errors.length && fieldContext.state.meta.isTouched),
		message: fieldContext.state.meta.errors.join(', '),
		id: itemContext.id,
		formItemId: `${itemContext.id}-form-item`,
		formDescriptionId: `${itemContext.id}-form-item-description`,
		formMessageId: `${itemContext.id}-form-item-message`,
	};
}
