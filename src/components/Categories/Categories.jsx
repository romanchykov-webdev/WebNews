import React, { useRef } from 'react'

import Skeleton from '../Skeleton/Skeleton.jsx'

import styles from './styles.module.css'

function Categories({ categories, selectedCategory, setSelectedCategory }) {
	// console.log('categories', categories.length)
	const scrollRef = useRef(null)

	const scrollLeft = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' }) //behavior: 'smooth' — задаёт анимацию плавной прокрутки.
		}
	}
	const scrollRight = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' })
		}
	}

	return (
		<div className={styles.wrapper}>
			<button className={styles.categoryButton} onClick={scrollLeft}>
				{'<'}
			</button>
			<div className={styles.wrapperCategories} ref={scrollRef}>
				{categories.length === 0
					? [...Array(10)].map((_, i) => {
							return (
								<button
									key={i}
									className={styles.categoryButtonSkeleton}
								>
									load
								</button>
							)
						})
					: categories.map((item, index) => {
							return (
								<button
									key={index}
									onClick={() => setSelectedCategory(item)}
									className={
										selectedCategory === item
											? `${styles.categoryButton} ${styles.isActiveCategory}`
											: styles.categoryButton
									}
								>
									{item}
								</button>
							)
						})}
			</div>
			<button className={styles.categoryButton} onClick={scrollRight}>
				{'>'}
			</button>
		</div>
	)
}

export default Categories
