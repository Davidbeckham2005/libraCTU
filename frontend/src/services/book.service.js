import createApiClient from "./api.service";
class BookService {
    constructor(baseUrl = "/api/book") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async updatesl(data) {
        return (await this.api.put('/books/borrow', data)).data
    }
    // async increaseView(id) {
    //     return (await this.api.put(`/view/${id}`)).data;
    // }
    async addComment(id, data) {
        return (await this.api.post(`/books/${id}/comments`, data)).data
    }
}
export default new BookService();