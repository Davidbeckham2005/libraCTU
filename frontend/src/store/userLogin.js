import { defineStore } from "pinia";
import { ref, computed } from 'vue';
export const useUser = defineStore("user", () => {
    const user = ref(null);
    const token = ref(null);

    const isLogin = computed(() => !!user.value)
    const isAdmin = computed(() => {
        if (!user.value) return false
        return user.value.role === "admin"
    })
    const isUser = computed(() => {
        if (!user.value) return false
        return user.value.role === "user"
    })

    function loadSession() {

        const tempUser = sessionStorage.getItem("user")
        const tempToken = sessionStorage.getItem("token")

        user.value = tempUser ? JSON.parse(tempUser) : null
        token.value = tempToken || null
    }
    function setData(userData, tokenData) {
        user.value = userData
        token.value = tokenData

        sessionStorage.setItem("user", JSON.stringify(userData))
        sessionStorage.setItem("token", tokenData)
    }
    function logout() {
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("token")
        user.value = null
        token.value = null

    }
    return {
        user,
        token,
        isAdmin,
        isLogin,
        isUser,
        loadSession,
        setData,
        logout
    }
}, {
    persist: true
})