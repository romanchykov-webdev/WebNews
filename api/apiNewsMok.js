// api/apiNews.js mok data
// api/apiNews.js mok data
import { categories } from '../mokData/categories.js'
import { data } from '../mokData/news.js'

// get moc news
export const getMokNews = async () => {
	try {
		// Имитация задержки сети (опционально, для реализма)
		await new Promise(resolve => setTimeout(resolve, 50000))

		// Возврат моковых данных в формате, имитирующем API-ответ
		return { news: data }
	} catch (e) {
		console.log(e)
		throw new Error('Не удалось загрузить новости')
	}
}

// get mok categories
export const getMokCategories = async () => {
	try {
		// Имитация задержки сети (опционально, для реализма)
		await new Promise(resolve => setTimeout(resolve, 500))

		// Возврат моковых данных в формате, имитирующем API-ответ
		return { categories: categories }
	} catch (e) {
		console.log(e)
	}
}
