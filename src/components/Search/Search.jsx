import React from 'react'

import styles from './styles.module.css'

function Search({ keywords, setKeywords }) {
	return (
		<div className={styles.wrapper}>
			<input
				type='text'
				value={keywords}
				onChange={e => setKeywords(e.target.value)}
				className={styles.input}
				placeholder='Search by keyword'
			/>
		</div>
	)
}

export default Search
