<template>
    <div class="bg-yellow-50">
        <div @click="back" class=" px-40 flex space-x-10 p-2 justify-center">
            <RouterLink @click.stop to="/books"> <span v-if="userStore.isLogin && userStore.isUser"
                    class="btn btn-sm text-white font-bold w-23 h-8 hover:ring-2 bg-neutral-800 active:scale-105 hover:bg-white hover:text-black">Trang
                    Chủ</span>
            </RouterLink>
            <RouterLink @click.stop to="/user/mybook"> <span v-if="userStore.isLogin && userStore.isUser"
                    class="btn btn-sm text-white font-bold w-23 h-8 hover:ring-2 bg-neutral-800 active:scale-105 hover:bg-white hover:text-black">MyBook</span>
            </RouterLink>
            <search @click.stop="backlist"></search>
            <Sidebar @click.stop v-if="userStore.isLogin"></Sidebar>
            <div class="space-x-2 h-8" v-if="!userStore.isLogin">
                <RouterLink @click.stop class=" btn-sm btn btn-active hover:ring transition-all hover:bg-neutral-700 duration-200
                hover:text-white" to="/user/register">Đăng ký</RouterLink>
                <RouterLink @click.stop
                    class="btn-sm btn bg-neutral-800 text-white btn-active hover:ring transition-all hover:bg-white duration-200 hover:text-neutral-700"
                    to="/user/login">Đăng nhập</RouterLink>
            </div>
        </div>
        <div class="h-full py-5">
            <div class="max-w-xl mx-auto bg-white rounded-2xl p-8 shadow-2xl">
                <h1 class="text-2xl font-bold text-blue-600 text-center mb-6">
                    Mượn sách
                </h1>
                <Form :validation-schema="borrowSchema" class="space-y-3" :initial-values="{
                    fullname: userStore.user?.fullname || '',
                    ngaymuon: new Date().toISOString().split('T')[0],
                    ngaytra: '',
                    name: book.name,
                    address: userStore.user?.address,
                    phone: userStore.user?.phone
                }" @submit="sendRequestBorrow">
                    <div>
                        <label class="block font-semibold mb-1" for="name">Tựa sách</label>
                        <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 text-gray-500" disabled as="input"
                            name="name"></Field>
                    </div>
                    <div>
                        <label class="block font-semibold mb-1" for="fullname">Họ và tên</label>
                        <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" as="input"
                            name="fullname"></Field>
                        <ErrorMessage class=" text-red-500" name="fullname"></ErrorMessage>
                    </div>
                    <div>
                        <label class="block font-semibold mb-1" for="phone">Số điện thoại</label>
                        <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" as="input"
                            name="phone"></Field>
                        <ErrorMessage class=" text-red-500" name="phone"></ErrorMessage>
                    </div>
                    <div>
                        <label class="block font-semibold mb-1" for="address">Địa chỉ</label>
                        <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" as="input"
                            name="address"></Field>
                        <ErrorMessage class=" text-red-500" name="address"></ErrorMessage>
                    </div>
                    <div class="flex gap-4 justify-center w-full">
                        <div class="flex-1">
                            <label class="block font-semibold mb-1 flex-1" for="Ngaymuon">Ngày mượn</label>
                            <Field class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                type="date" name="ngaymuon">
                            </Field>
                            <ErrorMessage name="ngaymuon" class="text-red-500"></ErrorMessage>

                        </div>
                        <div class="flex-1">
                            <label class="block font-semibold mb-1 flex-1" for="ngaytra">Ngày trả dự kiến</label>
                            <Field class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                type="date" name="ngaytra">
                            </Field>
                            <ErrorMessage name="ngaytra" class="text-red-500"></ErrorMessage>
                        </div>
                    </div>
                    <div>
                        <label class="block font-semibold mb-1" for="note">Ghi chú</label>
                        <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" as="textarea"
                            name="note"></Field>
                    </div>
                    <ErrorMessage class=" text-red-500" name="note"></ErrorMessage>
                    <div>
                        <button type="submit"
                            class="w-full bg-neutral-800 text-white hover:bg-white hover:text-black btn ring-2 py-2 rounded">Gửi
                            yêu
                            cầu</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup>
// import { useUser } from '../store/userLogin';
import Sidebar from '../components/Sidebar.vue';
import search from '../components/search.vue';
import { borrowSchema } from '../validations/borrow.validation';
import { useRoute } from 'vue-router';
import { useUser } from '../store/userLogin';
import { useBook } from '../store/bookStore';
import { Form, Field, ErrorMessage } from "vee-validate";
import { push } from 'notivue';
import borrowService from '../services/borrow.service';
import userService from '../services/user.service';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { computed } from 'vue';
import { useListUser } from '../store/userStore';
import { useBorrow } from '../store/borrowStore';
import bookService from '../services/book.service';

const borrowStore = useBorrow()
const userStore = useUser()
const route = useRoute()
const router = useRouter()
const id = route.params.id
const book = ref({})
const id_login = useUser().user?._id
const ListuserStore = useListUser()

const user = computed(() => {
    return ListuserStore.users.find(u => u._id === id_login)
})
// console.log(id_login)
// console.log(useListUser().users)
// console.log(user.value)

book.value = useBook().getBook(id)

function back() {
    router.push(`/books/${id}`)
}
const backlist = () => {
    router.push("/books")
}
const currentborrow = computed(() => {
    return user.value?.sumBorrow
})
const bookStore = useBook()
// console.log(currentborrow.value)
// currentborrow = currentborrow + 1
async function sendRequestBorrow(values) {

    if (currentborrow.value > 4) {
        push.error("Bạn đã mượn nhiều hơn 4 sách!")
    } else {
        const data = {
            address: values.address,
            phone: values.phone,
            borrowName: values.fullname,
            book_id: book.value._id,
            user_id: userStore.user._id,
            ngaymuon: values.ngaymuon,
            ngaytra: values.ngaytra,
            note: values.note,

        }
        const borrowData = {
            user_id: id_login,
            book_id: book.value._id,
            newStatus: "Đang chờ duyệt",
            oldStatus: ""

        }

        // console.log(data.user_id, userload)
        // await userService.increaseBorrow(borrowData)
        // await userService.update(data.user_id, userload)
        await bookService.updatesl(borrowData)
        await borrowService.createBorrow(data)
        userStore.loadSession()
        await bookStore.fetchBooks()
        await borrowStore.fetchborrows()
        push.success("Đã gửi yêu cầu mượn sách!", { duration: 3000 })
        // console.log(userStore.isAdmin)
        if (userStore.isAdmin) router.push("/staff/manaBook")
        else {
            router.push("/user/mybook")
        }
    }
}
</script>