import React, { useEffect, useState } from 'react'

import { getCategories, getNews } from '../../../api/apiNews.js'
import { getMokCategories, getMokNews } from '../../../api/apiNewsMok.js'
import Categories from '../../components/Categories/Categories.jsx'
import NewBanner from '../../components/NewBaner/NewBanner.jsx'
import NewsList from '../../components/NewsList/NewsList.jsx'
import Pagination from '../../components/Pagination/Pagination.jsx'
import Search from '../../components/Search/Search.jsx'
import Skeleton from '../../components/Skeleton/Skeleton.jsx'
import { useCustomDebounce } from '../../helpers/hooks/useDebounce.js'

import styles from './styles.module.css'

function Main() {
	const [news, setNews] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const [categories, setCategories] = useState([])

	const [selectedCategory, setSelectedCategory] = useState('All')

	const [keywords, setKeywords] = useState('')

	const debounceKeywords = useCustomDebounce(keywords, 500)

	const [currentPage, setCurrentPage] = useState(1)
	const totalPages = 10
	const pageSize = 10

	// get al news
	const fetchNews = async currentPage => {
		try {
			setIsLoading(true)
			const response = await getNews({
				page_number: currentPage,
				page_size: pageSize,
				category: selectedCategory === 'All' ? null : selectedCategory,
				keywords: keywords
			})
			setNews(response.news)
			console.log('response', response)
			setIsLoading(false)
		} catch (e) {
			console.log(e)
		}
	}

	// api original
	useEffect(() => {
		fetchNews(currentPage).catch(e => console.log(e))
	}, [currentPage, selectedCategory, debounceKeywords])

	// api	get categories
	const fetchCategories = async () => {
		try {
			const response = await getCategories()
			setCategories(['All', ...response.categories])
		} catch (e) {
			console.log(e)
		}
	}
	// console.log('categories', categories)

	// get api categories useEffect
	useEffect(() => {
		fetchCategories().catch(e => console.log(e))
	}, [])
	// ---------------------------------------------------

	// get mok categories
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
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1)
		}
	}
	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}
	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber)
	}
	// section pagination

	return (
		<main className={styles.main}>
			{/*Categories*/}
			<Categories
				categories={categories}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>

			{/*Search*/}
			<Search keywords={keywords} setKeywords={setKeywords} />

			{/*banner*/}
			{news.length > 0 && !isLoading ? (
				<NewBanner item={news[0]} />
			) : (
				<Skeleton count={1} type={'banner'} />
			)}

			<Pagination
				totalPages={totalPages}
				currentPage={currentPage}
				handleNextPage={handleNextPage}
				handlePrevPage={handlePrevPage}
				handlePageChange={handlePageChange}
			/>
			{!isLoading ? (
				<NewsList news={news} />
			) : (
				<Skeleton count={10} type={'item'} />
			)}
			<Pagination
				totalPages={totalPages}
				currentPage={currentPage}
				handleNextPage={handleNextPage}
				handlePrevPage={handlePrevPage}
				handlePageChange={handlePageChange}
			/>
		</main>
	)
}

export default Main
