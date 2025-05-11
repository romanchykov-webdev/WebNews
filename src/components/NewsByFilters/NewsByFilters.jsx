import React from 'react'

import { getCategories } from '../../../api/apiNews.js'
import { getMokCategories } from '../../../api/apiNewsMok.js'
import { TOTAL_PAGES } from '../../constants/constants.js'
import { useFetch } from '../../helpers/hooks/useFatch.js'
import Categories from '../Categories/Categories.jsx'
import NewsFilters from '../NewsFilters/NewsFilters.jsx'
import NewList from '../NewsList/NewsList.jsx'
import Pagination from '../Pagination/Pagination.jsx'
import Search from '../Search/Search.jsx'
import Skeleton from '../Skeleton/Skeleton.jsx'

import styles from './styles.module.css'

function NewsByFilters({ filter, changeFilter, isLoading, news }) {
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
			<Pagination
				totalPages={TOTAL_PAGES}
				currentPage={filter.page_number}
				handleNextPage={handleNextPage}
				handlePrevPage={handlePrevPage}
				handlePageChange={handlePageChange}
			/>
			<NewList news={news} isLoading={isLoading} />

			<Pagination
				totalPages={TOTAL_PAGES}
				currentPage={filter.page_number}
				handleNextPage={handleNextPage}
				handlePrevPage={handlePrevPage}
				handlePageChange={handlePageChange}
			/>
		</section>
	)
}

export default NewsByFilters
