<template>
    <div
        class="relative flex justify-center items-center p-5 min-h-screen bg-cover bg-center bg-[url('/public/background_cover.jpg')]">
        <Form @submit="loginUser" :validation-schema="loginSchema"
            class="relative z-10 flex flex-col space-y-3 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-85 max-sm:w-70">
            <h1 class="text-2xl font-bold text-center text-gray-800">Hi! Admin</h1>

            <div>
                <label for="username" class="block text-gray-700 mb-1 font-medium">Tên đăng nhập</label>
                <Field autofocus="" name="username" type="text"
                    class="w-full border border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    as="input" />
                <ErrorMessage name="username" class="text-red-500 text-sm" />
            </div>
            <div class="relative">
                <label for="password" class="block text-gray-700 mb-1 font-medium">Mật khẩu
                    (*)</label>
                <Field as="input" name="password" :type="isShow ? 'text' : 'password'"
                    class="w-full border border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <i @click.stop="isShow = !isShow" title="Hiện mật khẩu"
                    class="select-none absolute right-2 top-10 hover:cursor-pointer hover:scale-110 duration-300 transition-all fa-eye"
                    :class="{ 'fa-regular': isShow, 'fa-solid': !isShow }"></i>
                <i class=" fa-eye"></i>
                <ErrorMessage name="password" class="text-red-500 text-sm" />
            </div>

            <button type="submit"
                class="select-none mt-4 font-bold bg-gray-700  hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-300">
                <span v-if="!loading">Đăng nhập</span>
                <span v-else class="loading loading-spinner loading-lg"></span>
            </button>
            <span class="mt-2">Bạn là người dùng?
                <strong class="hover:underline">
                    <RouterLink to="/user/login" class="text-base">Đăng nhập</RouterLink>
                </strong>
            </span>
        </Form>
    </div>

</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { loginSchema } from "../validations/login.validation";
import staffService from "../services/staff.service";
import router from "../router";
import { push } from "notivue";
import { useUser } from '../store/userLogin';
import { onMounted, ref } from "vue";

const focusbox = ref(null)
onMounted(() => {
    focusbox.value?.focus()
})
const isShow = ref(false)
const loading = ref(false)
async function loginUser(values) {
    loading.value = true
    await new Promise(r => setTimeout(r, 1000))

    try {
        const response = await staffService.login(values.username, values.password);
        if (response) {

            useUser().setData(response.user, response.ACCESS_Token)
            push.success("Đăng nhập thành công!")
            router.push("/staff/manabook")
        }
    } catch {
        push.error("Đăng nhập lỗi, vui lòng thử lại!")
    }
    loading.value = false
}

</script>