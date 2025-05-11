import React from 'react'

import { getMokCategories } from '../../../api/apiNewsMok.js'
import { useFetch } from '../../helpers/hooks/useFatch.js'
import Categories from '../Categories/Categories.jsx'
import Search from '../Search/Search.jsx'
import Skeleton from '../Skeleton/Skeleton.jsx'
import Slider from '../Slider/Slider.jsx'

import styles from './styles.module.css'

function NewsFilters({ filter, changeFilter }) {
	// api	get categories
	// const { data: dataCategory } = useFetch(getCategories)
	// api mok
	const { data: dataCategory } = useFetch(getMokCategories)
	return (
		<div className={styles.filters}>
			{dataCategory ? (
				<Slider>
					<Categories
						categories={dataCategory.categories}
						selectedCategory={filter.category}
						setSelectedCategory={category =>
							changeFilter('category', category)
						}
					/>
				</Slider>
			) : null}
			{/*Search*/}
			<Search
				keywords={filter.keywords}
				setKeywords={keywords => changeFilter('keywords', keywords)}
			/>
		</div>
	)
}

export default NewsFilters
