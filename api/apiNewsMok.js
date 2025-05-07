// api/apiNews.js mok data
import { data } from '../mokData/news.js'

export const getMokNews = async () => {
	try {
		// Имитация задержки сети (опционально, для реализма)
		await new Promise(resolve => setTimeout(resolve, 500))

		// Возврат моковых данных в формате, имитирующем API-ответ
		return { news: data }
	} catch (e) {
		console.log(e)
		throw new Error('Не удалось загрузить новости')
	}
}
