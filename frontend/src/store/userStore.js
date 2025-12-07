import { defineStore } from "pinia";
import UserServices from "../services/user.service";
import { ref } from "vue";
export const useListUser = defineStore('userList', () => {
    const users = ref([])
    const fetchUsers = async () => {
        try {

            const response = await UserServices.getAll()
            // console.log(response)
            users.value = response
        } catch (error) {
            console.log(error)
        }
    }
    function getUser(id) {
        if (!id) return { fullname: "guest" }
        const user = users.value.find(a => a._id === id)
        return user ? user : { fullname: "admin", avatar: "/admin" };
    }
    return { users, fetchUsers, getUser };
}, {
    persist: true
})
