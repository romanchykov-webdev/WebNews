import React from 'react'

import BannersList from '../BannersList/BannersList.jsx'

import styles from './styles.module.css'

function LatestNews({ banners, isLoading }) {
	return (
		<section className={styles.section}>
			<BannersList banners={banners} isLoading={isLoading} />
		</section>
	)
}

export default LatestNews
