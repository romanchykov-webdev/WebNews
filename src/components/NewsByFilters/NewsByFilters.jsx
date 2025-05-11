import React from 'react'

import { getCategories } from '../../../api/apiNews.js'
import { getMokNews } from '../../../api/apiNewsMok.js'
import { PAGE_SIZE, TOTAL_PAGES } from '../../constants/constants.js'
import { useCustomDebounce } from '../../helpers/hooks/useDebounce.js'
import { useFetch } from '../../helpers/hooks/useFatch.js'
import { useFilters } from '../../helpers/hooks/useFilters.js'
import NewsFilters from '../NewsFilters/NewsFilters.jsx'
import NewList from '../NewsList/NewsList.jsx'
import Pagination from '../Pagination/Pagination.jsx'
import PaginationWrapper from '../PaginationWrapper/PaginationWrapper.jsx'

import styles from './styles.module.css'

function NewsByFilters() {
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
	// console.log('news by news by filters', news)

	// section pagination
	const handleNextPage = () => {
		if (filter.page_number < TOTAL_PAGES) {
			changeFilter('page_number', filter.page_number + 1)
		}
		// console.log('NewsByFilters handleNextPage')
	}
	const handlePrevPage = () => {
		if (filter.page_number > 1) {
			changeFilter('page_number', filter.page_number - 1)
		}
		// console.log('NewsByFilters handlePrevPage')
	}
	const handlePageChange = pageNumber => {
		changeFilter('page_number', pageNumber)
		// console.log('NewsByFilters pageNUmber', pageNumber)
	}
	// section pagination
	return (
		<section className={styles.section}>
			<NewsFilters filter={filter} changeFilter={changeFilter} />
			<PaginationWrapper
				top
				bottom
				totalPages={TOTAL_PAGES}
				currentPage={filter.page_number}
				handleNextPage={handleNextPage}
				handlePrevPage={handlePrevPage}
				handlePageChange={handlePageChange}
			>
				<NewList news={data && data.news} isLoading={isLoading} />
			</PaginationWrapper>
		</section>
	)
}

export default NewsByFilters
