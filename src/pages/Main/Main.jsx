import React, { useEffect, useState } from 'react'

import { getMokNews } from '../../../api/apiNewsMok.js'
import NewBanner from '../../components/NewBaner/NewBanner.jsx'
import NewsList from '../../components/NewsList/NewsList.jsx'
import Skeleton from '../../components/Skeleton/Skeleton.jsx'

import styles from './styles.module.css'

function Main() {
	const [news, setNews] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	// api original
	// useEffect(() => {
	// 	const fetchNews = async () => {
	// 		try {
	// 			const response = await getNews()
	// 			setNews(response.news)
	// 			console.log('response', response)
	// 		} catch (e) {
	// 			console.log(e)
	// 		}
	// 	}
	// 	setNews(data)
	// 	fetchNews()
	// }, [])

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

	return (
		<main className={styles.main}>
			{/*<NewItem item={news[0]}/>*/}
			{news.length > 0 && !isLoading ? (
				<NewBanner item={news[0]} />
			) : (
				<Skeleton count={1} type={'banner'} />
			)}

			{!isLoading ? (
				<NewsList news={news} />
			) : (
				<Skeleton count={10} type={'item'} />
			)}
		</main>
	)
}

export default Main
