<template>
    <div
        class="relative flex justify-center items-center p-5 min-h-screen bg-cover bg-center bg-[url('/public/background_cover.jpg')]">


        <Form @submit="loginUser" :validation-schema="loginSchema"
            class="relative z-10 flex flex-col space-y-3 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-85 max-sm:w-70">
            <h1 class="text-2xl font-bold text-center text-gray-800 select-none">Đăng Nhập</h1>

            <div>
                <label for="username" class="block text-gray-700 mb-1 font-medium">Tên đăng nhập</label>
                <Field autofocus="" name="username" type="text"
                    class="w-full border border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    as="input" />
                <ErrorMessage name="username" class="text-red-500 text-sm" />
            </div>

            <!-- <div>
                <label for="password" class="block text-gray-700 mb-1 font-medium">Mật khẩu</label>
                <Field name="password" type="password"
                    class="w-full border border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    as="input" />
                <ErrorMessage name="password" class="text-red-500 text-sm" />
                <RouterLink to="/user/register" class="hover:underline text-sm font-light text-gray-700">
                    Quên mật khẩu?
                </RouterLink>
            </div> -->
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

            <button v-if="!loading" type="submit"
                class="mt-4 font-bold bg-gray-700  hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-300">
                Đăng nhập
            </button>
            <span v-else class="m-auto loading loading-spinner loading-sm"></span>

            <div class="flex flex-col text-sm">
                <span class="">Bạn chưa có tài khoản?
                    <strong class="hover:underline">
                        <RouterLink to="/user/register" class="text-base"> Đăng ký</RouterLink>
                    </strong>
                </span>
                <span class="mt-1">Bạn là quản trị viên?
                    <strong class="hover:underline">
                        <RouterLink to="/staff/login" class="text-base"> Đăng nhập</RouterLink>
                    </strong>
                </span>

            </div>
        </Form>
    </div>

</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { loginSchema } from "../validations/login.validation";
import userService from "../services/user.service";
import router from "../router";
import { useRoute } from "vue-router";
import { push } from "notivue";
import { useUser } from "../store/userLogin";
import { ref } from "vue";
// import { userRoute, userRouter } from "vue"

const isShow = ref(false)
const loading = ref(false)
async function loginUser(values) {
    try {
        const response = await userService.login(values.username, values.password);
        if (response) {
            loading.value = true
            useUser().setData(response.user, response.ACCESS_Token)
            await new Promise(r => setTimeout(r, 1000))
            push.success("Đăng nhập thành công!")
            router.push("/books")
        }
    } catch {
        push.error("Đăng nhập lỗi, vui lòng thử lại!")
    } finally {
        loading.value = false
    }
}
</script>