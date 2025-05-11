import React from 'react'

import { getLatestNews } from '../../../api/apiNews.js'
import { getMokNews } from '../../../api/apiNewsMok.js'
import { useFetch } from '../../helpers/hooks/useFatch.js'
import BannersList from '../BannersList/BannersList.jsx'

import styles from './styles.module.css'

function LatestNews() {
	// api mok
	const { data, isLoading } = useFetch(getMokNews)
	// get al original
	// const { data, isLoading } = useFetch(getLatestNews)
	return (
		<section className={styles.section}>
			<BannersList banners={data && data.news} isLoading={isLoading} />
		</section>
	)
}

export default LatestNews
