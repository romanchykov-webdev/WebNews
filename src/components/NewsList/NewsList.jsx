import React from 'react'

import withSkeleton from '../../helpers/hocs/withSkeleton.jsx'
import NewItem from '../NewItem/NewItem.jsx'

import styles from './styles.module.css'

function NewsList({ news }) {
	return (
		<ul className={styles.list}>
			{news.map(item => {
				return <NewItem key={item.id} item={item} />
			})}
		</ul>
	)
}
const NewListWithSkeleton = withSkeleton(NewsList, 'item', 10)

export default NewListWithSkeleton
