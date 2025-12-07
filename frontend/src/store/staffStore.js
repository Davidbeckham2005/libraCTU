import { defineStore } from "pinia";
import staffService from "../services/staff.service";
import { ref } from "vue";
export const useStaff = defineStore('staffList', () => {
    const staffs = ref([])
    const fetchUsers = async () => {
        try {

            const response = await staffService.getAll()
            // console.log(response)
            staffs.value = response
        } catch (error) {
            console.log(error)
        }
    }
    function getStaff(id) {
        return staffs.value.find(s => s._id === id) || null
    }
    return { staffs, fetchUsers, getStaff };
}, {
    persist: true
})
