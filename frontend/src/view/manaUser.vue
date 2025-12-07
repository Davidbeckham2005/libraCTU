<template>
    <div>
        <div class="flex max-[1296px]:flex-col ml-4 p-2 justify-between">
            <routerLink to="/books"><i class="fa-solid fa-list"></i>Xem sách</routerLink>
            <div class="flex flex-row ">
                <search @book-search="userSearch" class="ml-4 mb-2"></search>
                <Sidebar></Sidebar>
            </div>
            <h1
                class="text-center max-[1296px]:relative absolute left-1/2 transform -translate-x-1/2 text-neutral-800 text-2xl font-bold p-2">
                Danh sách người dùng</h1>
        </div>
        <div class="overflow-auto p-4">
            <table className="table table-xs border-separate border-spacing-0" v-if="users">
                <thead>
                    <tr>
                        <th class="bg-gray-300 border-stone-400 rounded-tl-lg border-t border-l">username
                        </th>
                        <th class="bg-gray-300 border-t-2 border-stone-400">Họ và Tên</th>
                        <th class="bg-gray-300 border-t-2 border-stone-400">Giới tính</th>
                        <th class="bg-gray-300 border-t-2 border-stone-400">Só điện thoại</th>
                        <th class="bg-gray-300 border-t-2 border-stone-400">Địa chỉ</th>
                        <th class="bg-gray-300 border-t-2 border-stone-400">Email</th>
                        <th class="bg-gray-300 border-t-2 border-stone-400">Tổng số sách đã mượn</th>
                        <th class="bg-gray-300 rounded-tr-lg w-10 border-t border-r">Xóa người dùng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user._id" @click="isOpen = !isOpen; change(user)"
                        class=" border-2 hover:border-black hover:text-red-400">
                        <td class="border-l-2 font-semibold border-t-2 h-9 border-stone-400 hover:text-red-600">{{
                            user.username }}
                        </td>
                        <td class="border-t-2 font-semibold h-9 border-stone-400 hover:text-red-600">{{ user.fullname }}
                        </td>
                        <td class="border-t-2 h-9 border-stone-400 hover:text-red-600">{{ user.gender }}</td>
                        <td class="border-t-2 h-9 border-stone-400 hover:text-red-600">{{ user.phone }}</td>
                        <td class="border-t-2 h-9 border-stone-400 hover:text-red-600">{{ user.address }}</td>
                        <td class="border-t-2 h-9 border-stone-400 hover:text-red-600">{{ user.email }}</td>
                        <td class="border-t-2 h-9 border-stone-400 hover:text-red-600">{{ user.sumBorrow }}</td>
                        <th class="border-t-2 h-9 border-stone-400 hover:text-red-600 font-black cursor-pointer border-r-2"
                            @click.stop="deleteThis(user._id)"><i class="fa-solid fa-trash"></i>
                        </th>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th class="bg-stone-300 h-9 border-stone-400 rounded-bl-lg border-b border-l"></th>
                        <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                        <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                        <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                        <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                        <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                        <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                        <th class="bg-stone-300 h-9  rounded-br-lg border-b border-r"></th>
                    </tr>
                </thead>
            </table>
            <div v-if="isOpen" class="fixed inset-0 bg-black opacity-55 z-1" @click="isOpen = !isOpen"></div>
            <div v-if="isOpen"
                class="p-6 rounded-xl fixed z-100 h-fit w-2xl bg-white shadow-2xl left-1/2 top-1/10 -translate-x-1/2">
                <h1 class="font-bold text-blue-500 text-center mb-4.5 pb-2">Chỉnh sửa thông tin khách hàng
                </h1>
                <Form @submit="sendaUpdate" :initialValues="userValue" v-if="isLoad" class="space-y-2 h-auto w-full">
                    <div>
                        <label class="block font-semibold mb-1" for="id">ID</label>
                        <Field class="px-3 py-2 w-full border bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400"
                            disabled name="id"></Field>
                    </div>
                    <div>
                        <label class="block font-semibold mb-1" for="username">username</label>
                        <Field class="px-3 py-2 w-full border bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400"
                            disabled name="username"></Field>
                    </div>
                    <div>
                        <label class="block font-semibold mb-1" for="fullname">Họ và tên</label>
                        <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" as="input"
                            name="fullname"></Field>
                        <ErrorMessage class=" text-red-500" name="fullname"></ErrorMessage>
                    </div>
                    <label for="gender" class="block text-gray-700 mb-1 font-medium">Giới tính</label>
                    <div class="flex gap-3">
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
                    </div>
                    <div>
                        <label class="block font-semibold mb-1" for="address">Địa chỉ</label>
                        <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" as="input"
                            name="address"></Field>
                        <ErrorMessage class=" text-red-500" name="address"></ErrorMessage>
                    </div>
                    <div>
                        <label class="block font-semibold mb-1" for="phone">Phone</label>
                        <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" as="input"
                            name="phone"></Field>
                        <ErrorMessage class=" text-red-500" name="phone"></ErrorMessage>
                    </div>
                    <div>
                        <label class="block font-semibold mb-1" for="email">Email</label>
                        <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" as="input"
                            name="email"></Field>
                        <ErrorMessage class=" text-red-500" name="email"></ErrorMessage>
                    </div>
                    <button type="submit"
                        class="mt-2 w-full bg-blue-500 text-white font-semibold py-2 rounded-xl hover:ring hover:bg-blue-600 cur-p">Chỉnh
                        sửa</button>
                </Form>
            </div>
        </div>
    </div>

</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import { useListUser } from '../store/userStore';
import { Form, Field, ErrorMessage } from "vee-validate";
import { computed, ref } from 'vue';
import { push } from 'notivue';
import { useRouter } from 'vue-router';
import search from '../components/search.vue';
import userService from '../services/user.service';

const userValue = ref({})
const userStore = useListUser()

const router = useRouter()
const isOpen = ref(false);
const isLoad = ref(false)

function change(value) {
    console.log(value)
    userValue.value = {
        id: value._id,
        username: value.username || null,
        fullname: value.fullname || null,
        gender: value.gender || 0,
        phone: value.phone || null,
        email: value.email,
        address: value.address,
        tongmuon: value.sumBorrow,
    }
    isLoad.value = true
}
const keyValue = ref('')

const users = computed(() => {
    const key = (keyValue.value || '').toLowerCase().trim();
    if (!key) return userStore.users
    const result = userStore.users.filter(user => user.fullname.toLowerCase().includes(key))
    if (!result.length == 0) {
        return userStore.users.filter(user => user.fullname.toLowerCase().includes(key))
    } else {
        []
    }
})

function userSearch(key) {
    keyValue.value = key
}
async function sendaUpdate(value) {

    try {
        // console.log(value)
        await userService.update(value.id, value)
        push.success(`Cập nhật user "${value.username}" thành công!`)
        await userStore.fetchUsers()
        isOpen.value = !isOpen.value
        router.push("/staff/manaUser")
    } catch (error) {
        console.log(error)
        // push.success(`Cập nhật thất bại`)

    }
}
async function deleteAllBooks() {
    const isConfirm = confirm("Bạn có chắc chắn không thể khôi phuc!")
    if (isConfirm) {
        try {
            await bookService.deleteAll()
            push.success(`Đã xóa tất cả thành công!`)
            await bookStore.fetchBooks()
            router.push("/staff/manaBook")
        } catch (error) {
            console.log(error)
        }
    } else {
        return
    }
}
const ListUserStore = useListUser()
async function deleteThis(id) {
    const isConfirm = confirm(`Xác nhận xóa username ${ListUserStore.getUser(id).username}`)
    if (!isConfirm) return
    try {
        await userService.delete(id)
        push.success(`Đã xóa id ${id} thành công!`)
        await userStore.fetchUsers()
        router.push("/staff/manaUser")
    } catch (error) {
        console.log(error)
    }
}
</script>
