import axios from 'axios';

const baseURL = 'http://localhost:9090/api';

class DataService {
	getUrl() {
		return baseURL;
	}

	searchArticles(title, authors) {
		return axios.get(`${baseURL}/article?title=${title}&&authors=${authors}`);
	}

	getArticle(id) {
		return axios.get(`${baseURL}/article/${id}`);
	}

	saveArticle(article) {
		if (article.id) {
			return axios.put(`${baseURL}/article/${article.id}`, article);
		} else {
			return axios.post(`${baseURL}/article`, article);
		}
	}

	deleteArticle(id) {
		return axios.delete(`${baseURL}/article/${id}`);
	}

	listAuthors() {
		return axios.get(`${baseURL}/author`);
	}

	getAuthor(id) {
		return axios.get(`${baseURL}/author/${id}`);
	}

	saveAuthor(author) {
		if (author.id) {
			return axios.put(`${baseURL}/author/${author.id}`, author);
		} else {
			return axios.post(`${baseURL}/author`, author);
		}
	}

	deleteAuthor(id) {
		return axios.delete(`${baseURL}/author/${id}`);
	}
}

export default new DataService();
