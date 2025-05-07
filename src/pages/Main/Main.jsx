import React, { useEffect, useState } from 'react'

import { getNews } from '../../../api/apiNews.js'
import { getMokNews } from '../../../api/apiNewsMok.js'
import NewBanner from '../../components/NewBaner/NewBanner.jsx'
import NewsList from '../../components/NewsList/NewsList.jsx'
import Pagination from '../../components/Pagination/Pagination.jsx'
import Skeleton from '../../components/Skeleton/Skeleton.jsx'

import styles from './styles.module.css'

function Main() {
	const [news, setNews] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const [currentPage, setCurrentPage] = useState(1)
	const totalPages = 10
	const pageSize = 10
	//
	// const fetchNews = async currentPage => {
	// 	try {
	// 		setIsLoading(true)
	// 		const response = await getNews(currentPage, pageSize)
	// 		setNews(response.news)
	// 		console.log('response', response)
	// 		setIsLoading(false)
	// 	} catch (e) {
	// 		console.log(e)
	// 	}
	// }
	//
	// // api original
	// useEffect(() => {
	// 	fetchNews(currentPage).catch(e => console.log(e))
	// }, [currentPage])

	// api mok
	useEffect(() => {
		const fetchNews = async () => {
			try {
				setIsLoading(true)
				const response = await getMokNews()
				setNews(response.news)
				// console.log('response', response)
				setIsLoading(false)
			} catch (e) {
				console.log(e)
			}
		}
		fetchNews()
	}, [])

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
			{/*<NewItem item={news[0]}/>*/}

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
