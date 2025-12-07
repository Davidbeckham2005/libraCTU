<template>
    <div
        class="relative flex justify-center items-center h-auto py-12 bg-cover bg-center bg-[url('/public/background_cover.jpg')]">
        <Form :validation-schema="Schema" @submit="sendaRegister"
            class="relative z-10 flex flex-col space-y-4 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-3/10">
            <h1 class="select-none text-2xl font-bold text-center text-gray-800">Đăng Ký</h1>
            <div>
                <label for="username" class="block text-gray-700 mb-1 font-medium">Tên đăng nhập (*)</label>
                <Field autofocus="" as="input" name="username" type="text"
                    class="w-full border border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <ErrorMessage name="username" class="text-red-500 text-sm" />
            </div>
            <div>
                <label for="fullname" class="block text-gray-700 mb-1 font-medium">Họ và Tên</label>
                <Field as="input" name="fullname"
                    class="w-full border border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"></Field>
                <ErrorMessage class="text-red-500 text-sm" name="fullname"></ErrorMessage>
            </div>
            <!-- <label for="gender" class="block text-gray-700 mb-1 font-medium">Giới tính</label>
            <div class="grid grid-cols-2">
                <div class="flex items-center gap-2">
                    <Field type="radio" name="gender" value="Nam"
                        class="p-2 text-blue-500 hover:ring-2 w-4 h-4 cursor-pointer">
                    </Field>
                    <span>Nam</span>
                </div>
                <div class="flex items-center gap-2">
                    <Field type="radio" name="gender" value="Nữ"
                        class="p-2 text-blue-500 hover:ring-2 w-4 h-4 cursor-pointer"></Field>
                    <span>Nữ</span>
                </div>
            </div> -->
            <div>
                <label for="email" class="block text-gray-700 mb-1 font-medium">Email (*)</label>
                <Field as="input" name="email"
                    class="w-full border border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"></Field>
                <ErrorMessage class="text-red-500 text-sm" name="email"></ErrorMessage>
            </div>
            <!-- <div>
                <label for="address" class="block text-gray-700 mb-1 font-medium">Địa chỉ</label>
                <Field as="input" name="address"
                    class="w-full border border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"></Field>
                <ErrorMessage class="text-red-500 text-sm" name="address"></ErrorMessage>
            </div> -->
            <div>
                <label for="phone" class="block text-gray-700 mb-1 font-medium">Số điện thoại (*)</label>
                <Field as="input" name="phone"
                    class="w-full border border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"></Field>
                <ErrorMessage class="text-red-500 text-sm" name="phone"></ErrorMessage>
            </div>

            <div class="relative">
                <label for="password" class="block text-gray-700 mb-1 font-medium">Mật khẩu (*)</label>
                <Field as="input" name="password" :type="isShow ? 'text' : 'password'"
                    class="w-full border border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <i @click.stop="showPass" title="Hiện mật khẩu"
                    class="select-none absolute right-2 top-10 hover:cursor-pointer hover:scale-110 duration-300 transition-all fa-eye"
                    :class="{ 'fa-regular': isShow, 'fa-solid': !isShow }"></i>
                <i class=" fa-eye"></i>
                <ErrorMessage name="password" class="text-red-500 text-sm" />
            </div>
            <div class="relative">
                <label for="confirmPassword" class="block text-gray-700 mb-1 font-medium">Xác nhận mật khẩu khẩu
                    (*)</label>
                <Field as="input" name="confirmPassword" :type="isShow ? 'text' : 'password'"
                    class="w-full border border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <i @click.stop="showPass" title="Hiện mật khẩu"
                    class="select-none absolute right-2 top-10 hover:cursor-pointer hover:scale-110 duration-300 transition-all fa-eye"
                    :class="{ 'fa-regular': isShow, 'fa-solid': !isShow }"></i>
                <i class=" fa-eye"></i>
                <ErrorMessage name="confirmPassword" class="text-red-500 text-sm" />
            </div>
            <!-- <div>
                <label for="password" class="block text-gray-700 mb-1 font-medium">Xác nhận mật khẩu (*)</label>
                <Field as="input" name="password" type="password"
                    class="w-full border border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <ErrorMessage name="password" class="text-red-500 text-sm" />
            </div> -->

            <button type="submit"
                class="select-none mt-4 font-bold bg-gray-700  hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-300">
                <span v-if="!loading">Đăng ký</span>
                <span v-else class="loading loading-spinner loading-lg"></span>
            </button>
            <span class="mt-2">Bạn đã có tài khoản?
                <strong class="hover:underline">
                    <RouterLink to="/user/login" class="text-base">Đăng nhập</RouterLink>
                </strong>
            </span>
        </Form>
    </div>
</template>

<script setup>
// import Header from '../components/Header.vue';
import { Form, Field, ErrorMessage } from "vee-validate";
import { Schema } from "../validations/user.validation";
import userService from "../services/user.service";
import { push } from "notivue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useListUser } from "../store/userStore";

const showPass = () => {
    isShow.value = !isShow.value
}
const ListUserStore = useListUser()
const loading = ref(false)
const router = useRouter()
const isShow = ref(false)
async function sendaRegister(values) {
    loading.value = true
    if (values.password != values.confirmPassword) {
        await new Promise(r => setTimeout(r, 1000))
        loading.value = false
        push.error("Xác nhận mật khẩu không đúng!")
        return
    }
    try {
        // console.log(values)
        await new Promise(r => setTimeout(r, 1000))
        await userService.register(values)
        await ListUserStore.fetchUsers()
        push.success("Đăng ký tài khoản thành công!")
        router.push("/user/login")
    }
    catch (error) {
        console.log(error)
        if (error.response.status === 405) push.error("Tên đăng nhập đã tồn tại!")
    } finally {
        loading.value = false
    }
}
</script>