import { clsx, type ClassValue } from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const withMemo: <T>(
	Component: T,
	propsAreEqual?: (prevProps: Readonly<T>, nextProps: Readonly<T>) => boolean,
) => T = React.memo;
