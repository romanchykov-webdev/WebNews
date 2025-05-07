import React from 'react'

import styles from './styles.module.css'

function Pagination({
	totalPages,
	currentPage,
	handleNextPage,
	handlePrevPage,
	handlePageChange
}) {
	// console.log('totalPages', totalPages)
	return (
		<div className={styles.pagination}>
			<button
				className={styles.arrow}
				onClick={handlePrevPage}
				disabled={currentPage <= 1}
			>
				{'<'}
			</button>

			<div className={styles.list}>
				{[...Array(totalPages)].map((_, index) => {
					return (
						<button
							onClick={() => handlePageChange(index + 1)}
							className={
								currentPage === index + 1
									? styles.active
									: styles.pageNumber
							}
							disabled={currentPage === index + 1}
							key={index}
						>
							{index + 1}
						</button>
					)
				})}
			</div>

			<button
				className={styles.arrow}
				disabled={currentPage === totalPages}
				onClick={handleNextPage}
			>
				{'>'}
			</button>
		</div>
	)
}

export default Pagination
