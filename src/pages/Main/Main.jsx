import React from 'react'

import { getNews } from '../../../api/apiNews.js'
import { getMokNews } from '../../../api/apiNewsMok.js'
import LatestNews from '../../components/LatestNews/LatestNews.jsx'
import NewsByFilters from '../../components/NewsByFilters/NewsByFilters.jsx'
import { PAGE_SIZE } from '../../constants/constants.js'
import { useCustomDebounce } from '../../helpers/hooks/useDebounce.js'
import { useFetch } from '../../helpers/hooks/useFatch.js'
import { useFilters } from '../../helpers/hooks/useFilters.js'

import styles from './styles.module.css'

function Main() {
	const { filter, changeFilter } = useFilters({
		page_number: 1,
		page_size: PAGE_SIZE,
		category: null,
		keyword: ''
	})

	const debounceKeywords = useCustomDebounce(filter.keywords, 500)

	// get al original
	// const { data, isLoading } = useFetch(getNews, {
	// 	...filter,
	// 	keywords: debounceKeywords
	// })
	// ---------------------------------------------------

	// api mok
	const { data, isLoading } = useFetch(getMokNews, {
		...filter,
		keywords: debounceKeywords
	})

	return (
		<main className={styles.main}>
			<LatestNews isLoading={isLoading} banners={data && data.news} />

			<NewsByFilters
				filter={filter}
				changeFilter={changeFilter}
				isLoading={isLoading}
				news={data?.news}
			/>
		</main>
	)
}

export default Main
