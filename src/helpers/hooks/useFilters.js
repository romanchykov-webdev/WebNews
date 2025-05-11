import { useState } from 'react'

export const useFilters = initialFilters => {
	const [filter, setFilter] = useState(initialFilters)
	const changeFilter = (key, value) => {
		setFilter(prev => {
			// console.log('useFilters changeFilter key', key)
			// console.log('useFilters changeFilter value', value)
			return { ...prev, [key]: value }
		})
	}
	return { filter, changeFilter }
}
