import React from 'react'

import { formatTimeAgo } from '../../helpers/formatTimeAgo.js'
import withSkeleton from '../../helpers/hocs/withSkeleton.jsx'
import Image from '../Image/Image.jsx'

import styles from './styles.module.css'

function NewBanner({ item }) {
	// console.log("newBAner item",item);
	// console.log("newBAner item",item);
	return (
		<div className={styles.banner}>
			<Image image={item?.image} />
			<h3 className={styles.title}> {item.title}</h3>
			<p className={styles.extra}>
				{' '}
				{formatTimeAgo(item.published)} by {item.author}
			</p>
		</div>
	)
}
const NewBannerWithSkeleton = withSkeleton(NewBanner, 'banner', 1)
export default NewBannerWithSkeleton
