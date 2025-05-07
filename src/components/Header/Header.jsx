import React from 'react'

import { formatDate } from '../../helpers/formatDate.js'

import styles from './styles.module.css'

function Header() {
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>Web News</h1>
			<p className={styles.data}>{formatDate(new Date())}</p>
		</header>
	)
}

export default Header
