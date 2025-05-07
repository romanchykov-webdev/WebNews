import React from 'react'

import NewItem from '../NewItem/NewItem.jsx'

import styles from './styles.module.css'

function NewsList({ news }) {
	// console.log('NewsList item', news)
	return (
		<ul className={styles.list}>
			{news.map(item => {
				return <NewItem key={item.id} item={item} />
			})}
		</ul>
	)
}

export default NewsList
