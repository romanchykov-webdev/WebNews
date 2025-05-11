import { useEffect, useState } from 'react'

/**
 * Пользовательский хук React для выполнения асинхронного запроса с помощью заданной функции.
 *
 * @template T
 * @param {function(Object=): Promise<Response>} fetchFunction - Асинхронная функция, выполняющая HTTP-запрос и возвращающая объект `Response`.
 * @param {Object} [params] - Объект параметров, передаваемых в `fetchFunction`. Также используется для отслеживания изменений.
 * @returns {{
 *   data: T | null,
 *   isLoading: boolean,
 *   error: Error | null
 * }} Объект, содержащий полученные данные, состояние загрузки и возможную ошибку.
 *
 * @example
 * const fetchUsers = (params) => fetch(`https://api.example.com/users?${new URLSearchParams(params)}`);
 * const { data, isLoading, error } = useFetch(fetchUsers, { page: 1 });
 */
export const useFetch = (fetchFunction, params) => {
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	const stringParams = params ? new URLSearchParams(params).toString() : null

	useEffect(() => {
		;(async () => {
			try {
				setIsLoading(true)
				const result = await fetchFunction(stringParams)
				setData(result)
			} catch (e) {
				setError(e)
			} finally {
				setIsLoading(false)
			}
		})()
	}, [fetchFunction, stringParams])
	return { data, isLoading, error }
}
