import React, { useEffect, useRef, useState } from 'react'

import Skeleton from '../Skeleton/Skeleton.jsx'

import styles from './styles.module.css'

function Categories({ categories, selectedCategory, setSelectedCategory }) {
	// console.log('categories', categories.length)
	const scrollRef = useRef(null)

	// проверку положения прокрутки
	const [canScrollLeft, setCanScrollLeft] = useState(false)
	const [canScrollRight, setCanScrollRight] = useState(true)

	// Отключение кнопок на границах
	const checkScrollPosition = () => {
		if (scrollRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
			setCanScrollLeft(scrollLeft > 0)
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
		}
	}
	useEffect(() => {
		checkScrollPosition()
		const container = scrollRef.current
		container?.addEventListener('scroll', checkScrollPosition)
		return () =>
			container?.removeEventListener('scroll', checkScrollPosition)
	}, [])

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
	console.log('selectedCategory', selectedCategory)
	return (
		<div className={styles.wrapper}>
			<button
				className={styles.categoryButton}
				onClick={scrollLeft}
				disabled={!canScrollLeft}
			>
				{'<'}
			</button>
			<div className={styles.wrapperCategories} ref={scrollRef}>
				<button
					onClick={() => setSelectedCategory(null)}
					className={
						!selectedCategory
							? `${styles.categoryButton} ${styles.isActiveCategory}`
							: styles.categoryButton
					}
				>
					All
				</button>
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
			<button
				className={styles.categoryButton}
				onClick={scrollRight}
				disabled={!canScrollRight}
			>
				{'>'}
			</button>
		</div>
	)
}

export default Categories
