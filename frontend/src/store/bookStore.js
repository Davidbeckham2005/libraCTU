import { defineStore } from "pinia";
import bookService from "../services/book.service";
import { ref } from "vue";
export const useBook = defineStore('book', () => {
    const books = ref([])
    const fetchBooks = async () => {
        try {

            const response = await bookService.getAll()
            books.value = response

        } catch (error) {
            console.log(error)
        }
    }

    function getBook(id) {
        const book = books.value.find(a => a._id === id)
        return book ? book : null;
    }
    const getNameBook = (id) => {
        return books.value.find(a => a._id === id)?.name
    }

    return { books, fetchBooks, getBook, getNameBook };
}, {
    persist: true,  // 👈 Dòng này giúp tự động lưu vào localStorage

})
