import React, { useEffect, useState } from 'react'

import { getCategories, getNews } from '../../../api/apiNews.js'
import { getMokCategories, getMokNews } from '../../../api/apiNewsMok.js'
import Categories from '../../components/Categories/Categories.jsx'
import NewBanner from '../../components/NewBaner/NewBanner.jsx'
import NewBannerWithSkeleton from '../../components/NewBaner/NewBanner.jsx'
import NewsList from '../../components/NewsList/NewsList.jsx'
import NewListWithSkeleton from '../../components/NewsList/NewsList.jsx'
import Pagination from '../../components/Pagination/Pagination.jsx'
import Search from '../../components/Search/Search.jsx'
import Skeleton from '../../components/Skeleton/Skeleton.jsx'
import { PAGE_SIZE, TOTAL_PAGES } from '../../constants/constants.js'
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
	// 	page_number: currentPage,
	// 	page_size: PAGE_SIZE,
	// 	category: selectedCategory === 'All' ? null : selectedCategory,
	// 	keywords: debounceKeywords
	// })
	// const fetchNews = async currentPage => {
	// 	try {
	// 		setIsLoading(true)
	// 		const response = await getNews({
	// 			page_number: currentPage,
	// 			page_size: PAGE_SIZE,
	// 			category: selectedCategory === 'All' ? null : selectedCategory,
	// 			keywords: debounceKeywords
	// 		})
	// 		setNews(response.news)
	// 		console.log('response', response)
	// 		setIsLoading(false)
	// 	} catch (e) {
	// 		console.log(e)
	// 	}
	// }

	// api original
	// useEffect(() => {
	// 	fetchNews(currentPage).catch(e => console.log(e))
	// }, [currentPage, selectedCategory, debounceKeywords])

	// api	get categories
	// const { data: dataCategory } = useFetch(getCategories)
	// const fetchCategories = async () => {
	// 	try {
	// 		const response = await getCategories()
	// 		setCategories(['All', ...response.categories])
	// 	} catch (e) {
	// 		console.log(e)
	// 	}
	// }
	// console.log('categories', categories)

	// get api categories useEffect original
	// useEffect(() => {
	// 	fetchCategories().catch(e => console.log(e))
	// }, [])
	// ---------------------------------------------------

	// get mok categories
	const { data: dataCategory } = useFetch(getMokCategories)
	// useEffect(() => {
	// 	const fetchCategories = async () => {
	// 		try {
	// 			const response = await getMokCategories()
	// 			setCategories(response.categories)
	// 		} catch (e) {
	// 			console.log(e)
	// 		}
	// 	}
	// 	fetchCategories().catch(err => console.log(err))
	// }, [])
	// console.log('get mok categories', categories)

	// api mok
	const { data, isLoading } = useFetch(getMokNews, {
		...filter,
		keywords: debounceKeywords
	})
	// useEffect(() => {
	// 	const fetchNews = async () => {
	// 		try {
	// 			setIsLoading(true)
	// 			const response = await getMokNews()
	// 			setNews(response.news)
	// 			// console.log('response', response)
	// 			setIsLoading(false)
	// 		} catch (e) {
	// 			console.log(e)
	// 		}
	// 	}
	//
	// 	fetchNews().catch(err => console.log(err))
	// }, [selectedCategory, debounceKeywords])
	// console.log('debounceValue', debounceValue)

	// section pagination
	const handleNextPage = () => {
		if (filter.page_size < TOTAL_PAGES) {
			changeFilter('page_number', filter.page_number + 1)
		}
	}
	const handlePrevPage = () => {
		if (filter.page_size > 1) {
			changeFilter('page_number', filter.page_number - 1)
		}
	}
	const handlePageChange = pageNumber => {
		changeFilter('page_number', pageNumber)
	}
	// section pagination

	return (
		<main className={styles.main}>
			{/*Categories*/}
			{dataCategory ? (
				<Categories
					categories={dataCategory.categories}
					selectedCategory={filter.category}
					setSelectedCategory={category =>
						changeFilter('category', category)
					}
				/>
			) : (
				<Skeleton type={'button'} count={10} />
			)}

			{/*Search*/}
			<Search
				keywords={filter.keywords}
				setKeywords={keywords => changeFilter('keywords', keywords)}
			/>

			{/*banner*/}
			<NewBanner
				item={data && data.news && data.news[0]}
				isLoading={isLoading}
			/>

			<Pagination
				totalPages={TOTAL_PAGES}
				currentPage={filter.page_size}
				handleNextPage={handleNextPage}
				handlePrevPage={handlePrevPage}
				handlePageChange={handlePageChange}
			/>
			<NewListWithSkeleton
				news={data && data.news}
				isLoading={isLoading}
			/>

			<Pagination
				totalPages={TOTAL_PAGES}
				currentPage={filter.page_size}
				handleNextPage={handleNextPage}
				handlePrevPage={handlePrevPage}
				handlePageChange={handlePageChange}
			/>
		</main>
	)
}

export default Main
