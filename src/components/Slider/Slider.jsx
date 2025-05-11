import React, { useRef } from 'react'

import styles from './styles.module.css'

const Slider = ({ children, step = 150 }) => {
	const sliderRef = useRef(null)

	const scrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: -step, behavior: 'smooth' }) //behavior: 'smooth' — задаёт анимацию плавной прокрутки.
		}
	}

	const scrollRight = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: step, behavior: 'smooth' })
		}
	}
	return (
		<div className={styles.slider}>
			<button onClick={scrollLeft} className={styles.arrow}>{`<`}</button>
			{React.cloneElement(children, { ref: sliderRef })}
			<button
				onClick={scrollRight}
				className={styles.arrow}
			>{`>`}</button>
		</div>
	)
}

export default Slider
