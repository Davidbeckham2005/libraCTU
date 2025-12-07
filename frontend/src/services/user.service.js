import createApiClient from "./api.service";
class UserService {
    constructor(baseUrl = "/api/user") {
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
    async register(data) {
        return (await this.api.post("/register", data)).data;
    }
    async login(username, password) {
        return (await this.api.post("/login", { username, password })).data;
    }
    async addFavorite(id, data) {
        return (await this.api.post(`/books/${id}`, data)).data
    }
    async removeFavorite(id, data) {
        return (await this.api.patch(`/books/${id}`, data)).data
    }
    async addComment(id, data) {
        return (await this.api.post(`/books/${id}/comments`, data)).data
    }
    // async increaseBorrow(data) {
    //     return (await this.api.put("/borrow", data)).data
    // }
    // async increaseborrow(id) {
    //     return (await this.api.put(`/borrow/${id}`)).data;
    // }
    // async decreaseborrow(id) {
    //     return (await this.api.put(`/return/${id}`)).data;
    // }
}
export default new UserService();