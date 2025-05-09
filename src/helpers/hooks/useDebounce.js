import { useEffect, useState } from 'react'

/**
 * Пользовательский хук React, возвращающий "дебаунс" значение.
 * Значение обновляется только после указанной задержки без изменений.
 *
 * @template T
 * @param {T} value - Исходное значение, которое нужно дебаунсить.
 * @param {number} delay - Задержка в миллисекундах перед обновлением значения.
 * @returns {T} Дебаунс-версия переданного значения.
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useCustomDebounce(searchTerm, 500);
 */
export const useCustomDebounce = (value, delay) => {
	const [debounceValue, setDebounceValue] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebounceValue(value)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])

	// console.log('useCustomDebounce')

	return debounceValue
}
