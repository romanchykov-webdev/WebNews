import React from 'react'

import withSkeleton from '../../helpers/hocs/withSkeleton.jsx'
import NewBanner from '../NewBaner/NewBanner.jsx'

import styles from './styles.module.css'

function BannersList({ banners }) {
	return (
		<ul className={styles.banners}>
			{banners?.map(banner => {
				return <NewBanner key={banner.id} item={banner} />
			})}
		</ul>
	)
}
const BannersListWithSkeleton = withSkeleton(BannersList, 'banner', 10)
export default BannersListWithSkeleton
