import { defineStore } from "pinia";
import authorService from "../services/author.service";
import { ref } from "vue";

export const useAuthor = defineStore('author', () => {
    const authors = ref([])
    const fetchAuthor = async () => {
        try {
            const respon = await authorService.getAll();
            authors.value = respon
        } catch (error) {
            console.log(error)
        }
    }
    function getauthorName(id) {
        const author = authors.value.find(a => a._id === id)
        return author ? author.name : "Không xác định"

    }
    function getAuthor(id) {
        const author = authors.value.find(a => a._id === id)
        return author ? author : null;
    }
    return { authors, fetchAuthor, getauthorName, getAuthor };
}, {
    persist: true,
}
)
