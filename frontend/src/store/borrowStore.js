import { defineStore } from "pinia";
import borrowService from "../services/borrow.service";
import { ref } from "vue";

export const useBorrow = defineStore('borrow', () => {
    const borrows = ref([])
    const fetchborrows = async () => {
        try {

            const response = await borrowService.getAll()
            borrows.value = response

        } catch (error) {
            console.log(error)
        }
    }
    // const userStore = useUser()
    // const books = computed(() => {
    //     if (!userStore.user._id) {
    //         const result = borrows.value.find(borrow => borrow.user._id === userStore.user._id)
    //     }
    //     return result?.books
    // })
    const getBorrow = (id) => {
        return borrows.value.find(a => a._id === id)
    }
    return { borrows, fetchborrows, getBorrow };
}, {
    persist: true,

})
