import React from 'react'

import LatestNews from '../../components/LatestNews/LatestNews.jsx'
import NewsByFilters from '../../components/NewsByFilters/NewsByFilters.jsx'

import styles from './styles.module.css'

function Main() {
	return (
		<main className={styles.main}>
			<LatestNews />

			<NewsByFilters />
		</main>
	)
}

export default Main
