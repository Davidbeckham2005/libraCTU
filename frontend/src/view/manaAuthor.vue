<template>
    <div class="bg-white h-screen">
        <div class="flex max-[1296px]:flex-col ml-4 p-2 justify-between">
            <routerLink to="/books"><i class="fa-solid fa-list"></i>Xem sách</routerLink>
            <div class="flex flex-row ">
                <search @book-search="authorsearch" class="ml-4 mb-2"></search>
                <Sidebar></Sidebar>
            </div>
            <h1
                class="text-center max-[1296px]:relative absolute left-1/2 transform -translate-x-1/2 text-neutral-800 text-2xl font-bold p-2">
                Danh sách tác giả</h1>
        </div>
        <div class="overflow-x-auto p-4">
            <table className="table table-xs border-separate border-spacing-0" v-if="authors">
                <thead>
                    <tr class="">
                        <th class="bg-gray-300 h-9 border-stone-400 rounded-tl-lg border-t border-l">Tên tác giả</th>
                        <th class="bg-gray-300 h-9 border-t-2 border-stone-400">Bút danh</th>
                        <th class="bg-gray-300 h-9 border-t-2 border-stone-400">Năm sinh</th>
                        <th class="bg-gray-300 h-9 border-t-2 border-stone-400">Quốc tịch</th>
                        <th class="bg-gray-300 h-9 border-t-2 border-stone-400">Số điện thoại</th>
                        <th class="bg-gray-300 h-9 border-t-2 border-stone-400">Giới thiệu tác giả</th>
                        <th class="bg-gray-300 h-9 rounded-tr-lg border-t border-r w-10">Xóa tác giả</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="author in authors" :key="author.id" class="border-2 border-black hover:text-red-400"
                        @click="isOpen = !isOpen; change(author)">
                        <td class="border-l-2 font-semibold border-t-2 h-9 border-stone-400 hover:text-red-600">{{
                            author.name }}</td>
                        <td class="border-t-2 h-9 border-stone-400 hover:text-red-600">{{ author.write }}</td>
                        <td class="border-t-2 h-9 border-stone-400 hover:text-red-600">{{ author.birthday }}</td>
                        <td class="border-t-2 h-9 border-stone-400 hover:text-red-600">{{ author.country }}</td>
                        <td class="border-t-2 h-9 border-stone-400 hover:text-red-600">{{ author.phone }}</td>
                        <td class="border-t-2 h-9 border-stone-400 hover:text-red-600 max-w-30 truncate">{{
                            author.gioithieu }}</td>

                        <th class="border-t-2 h-9 border-stone-400 hover:text-red-600 font-black cursor-pointer border-r-2"
                            @click.stop="deleteThis(author._id);"><i class="fa-solid fa-trash"></i>
                        </th>
                    </tr>

                </tbody>
                <thead>
                    <th class="bg-stone-300 h-9 border-stone-400 rounded-bl-lg border-b border-l"></th>
                    <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                    <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                    <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                    <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                    <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                    <th class="bg-stone-300 h-9  rounded-br-lg border-b border-r"></th>
                </thead>
                <div v-if="isOpen" class="fixed inset-0 bg-black opacity-55 z-1"
                    @click="isOpen = !isOpen; isAdd = false">
                </div>
                <div v-if="isOpen"
                    class="p-6 rounded-xl fixed z-100 h-fit w-3xl bg-white shadow-2xl left-1/2 top-1/32 -translate-x-1/2">
                    <h1 v-if="!isAdd" class="font-bold text-blue-500 text-center mb-4.5 pb-2">Chỉnh sửa thông tin tác
                        giả
                    </h1>
                    <h1 v-else class="font-bold text-blue-500 text-center mb-4.5 pb-2">Thêm một tác giả mới</h1>

                    <Form :initialValues="authorValue" v-if="isLoad" class="space-y-2" @submit="sendaUpdate"
                        :validation-schema="addAuthorSchema">

                        <div v-if="!isAdd">
                            <label class="block font-semibold mb-1" for="id">Mã tác giả</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 bg-gray-300" disabled
                                as="input" name="id"></Field>
                            <ErrorMessage class=" text-red-500" name="id"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="name">Tên tác giả</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                as="input" name="name"></Field>
                            <ErrorMessage class=" text-red-500" name="name"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="write">Bút danh</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                as="input" name="write"></Field>
                            <ErrorMessage class=" text-red-500" name="write"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="birthday">Năm sinh</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                as="input" type="Number" min="1920" max="2025" name="birthday" value="1979"></Field>
                            <ErrorMessage class=" text-red-500" name="birthday"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="phone">Điện thoại</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                as="input" name="phone"></Field>
                            <ErrorMessage class=" text-red-500" name="phone"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="country">Quốc tịch</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                as="select" name="country">
                                <option value="" disabled>--Chọn--</option>
                                <option value="Việt Nam">Việt Nam</option>
                                <option value="Nga">Nga</option>
                                <option value="Trung Quốc">Trung Quốc</option>
                                <option value="Pháp">Pháp</option>
                                <option value="Mỹ">Mỹ</option>
                                <option value="Nhật">Nhật</option>
                                <option value="Hàn Quốc">Hàn Quốc</option>
                                <option value="Đức">Đức</option>
                                <option value="Ý">Ý</option>
                                <option value="Úc">Úc</option>
                                <option value="Canada">Canada</option>
                                <option value="Brazil">Brazil</option>
                            </Field>
                            <ErrorMessage class=" text-red-500" name="country"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="gioithieu">Giới thiệu</label>
                            <Field class="px-3 py-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                name="gioithieu" as="textarea"></Field>
                            <ErrorMessage class=" text-red-500" name="gioithieu"></ErrorMessage>
                        </div>
                        <div>
                            <button type="submit" v-if="!isAdd"
                                class="mt-2 w-full bg-blue-500 text-white font-semibold py-2 rounded-xl hover:ring hover:bg-blue-600 cur-p">Chỉnh
                                sửa</button>
                            <button type="submit" v-else
                                class="mt-2 w-full bg-blue-500 text-white font-semibold py-2 rounded-xl hover:ring hover:bg-blue-600 cur-p">Thêm</button>
                        </div>
                    </Form>
                </div>
            </table>

            <div class="space-x-3 flex justify-start w-full">
                <span class="btn btn-sm  text-black mt-2 hover:ring bg-red-600 hover:scale-105"
                    @click="deleteAllauthors"><i class="fa-solid fa-trash"></i></span>
                <span class="btn btn-sm btn-primary mt-2 hover:ring hover:scale-105"
                    @click="isOpen = !isOpen; addAuthor()"><i class="fa-solid fa-plus"></i></span>
            </div>
            <!-- <div v-else class=" flex w-screen justify-center items-center flex-col" @click="authorsearch('')">
            <h1 class=" text-xl text-gray-600 bg-white shadow-2xl px-2 py-3 rounded">Không có tác giả nào được
                hiển thị!
            </h1>
        </div> -->
        </div>
    </div>

</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import { useAuthor } from '../store/authorStore';
import { Form, Field, ErrorMessage } from "vee-validate";
import authorservice from '../services/author.service';
import { computed, ref } from 'vue';
import { push } from 'notivue';
import { useRouter } from 'vue-router';
import search from '../components/search.vue';
import * as yup from "yup"

const addAuthorSchema = yup.object({
    name: yup.string().required("Vui lòng nhập tên tác giả"),
    birthday: yup.number().typeError("Vui lòng nhập năm sinh").min(1920, "Năm sinh không hợp lệ").max(2025, "Năm sinh không hợp lệ"),
    phone: yup
        .string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),

})




const authorValue = ref({})
const authorstore = useAuthor()
const router = useRouter()

const isOpen = ref(false);
const isAdd = ref(false);
const isLoad = ref(false);
function addAuthor() {
    authorValue.value = {}
    isLoad.value = true
    isAdd.value = true
}
function change(value) {
    authorValue.value = {
        id: value._id,
        name: value.name || null,
        country: value.country || null,
        birthday: value.contry || null,
        phone: value.phone || null,
        write: value.write || null,
        gioithieu: value.gioithieu || ""
    }
    isLoad.value = true
    isAdd.value = false
}
const keyValue = ref('')

const authors = computed(() => {
    const key = (keyValue.value || '').toLowerCase().trim();
    if (!key) return authorstore.authors
    const result = authorstore.authors.filter(author => author.name.toLowerCase().includes(key))
    if (!result.length == 0) {
        return authorstore.authors.filter(author => author.name.toLowerCase().includes(key))
    } else {
        []
    }
})

function authorsearch(key) {
    keyValue.value = key
}
async function sendaUpdate(value) {
    try {
        if (isAdd.value) {
            await authorservice.create(value)
            await authorstore.fetchAuthor()
            isOpen.value = !isOpen.value
            isAdd.value = false
            push.success(`Đã thêm một tác giả mới`)
        } else {
            await authorservice.update(value.id, value)
            await authorstore.fetchAuthor()
            isOpen.value = !isOpen.value
            push.success(`Cập nhật tác giả "${value.name}" thành công!`)
        }
    } catch (error) {
        console.log(error)
    }

}
async function deleteAllauthors() {
    const isConfirm = confirm("Bạn có chắc chắn không thể khôi phuc!")
    if (isConfirm) {
        try {
            await authorservice.deleteAll()
            push.success(`Đã xóa tất cả thành công!`)
            await authorstore.fetchAuthor()
            router.push("/staff/manaAuthor")
        } catch (error) {
            console.log(error)
        }
    } else {
        return
    }
}
async function deleteThis(id) {
    const isConfirm = confirm(`Xác nhận xóa tác giả ${authorstore.getauthorName(id)}`)
    if (!isConfirm) return
    try {
        await authorservice.delete(id)
        push.success(`Đã xóa id ${id} thành công!`)
        await authorstore.fetchAuthor()
        router.push("/staff/manaAuthor")
    } catch (error) {
        console.log(error)
    }
}
</script>

<style scoped>
@keyframes truot {
    from {
        transform: translateX(100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.animation-truot {
    animation: truot 0.25s ease-in forwards;
}
</style>