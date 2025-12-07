<template>
    <div class="bg-white h-screen">
        <div class="flex max-[1296px]:flex-col ml-4 p-2 justify-between">
            <routerLink to="/books"><i class="fa-solid fa-list"></i>Xem sách</routerLink>
            <div class="flex flex-row ">
                <search @book-search="publisherSearch" class="ml-4 mb-2"></search>
                <Sidebar></Sidebar>
            </div>
            <h1
                class="text-center max-[1296px]:relative absolute left-1/2 transform -translate-x-1/2 text-neutral-800 text-2xl font-bold p-2">
                Danh sách nhà xuất bản</h1>
        </div>
        <div class="overflow-x-auto p-4">
            <table className="table table-2xl border-separate border-spacing-0" v-if="publishers">
                <thead>
                    <tr class="">
                        <th class="bg-gray-300 h-9 border-stone-400 rounded-tl-lg border-t border-l">Tên nhà xuất bản
                        </th>
                        <th class="bg-gray-300 h-9 border-t-2 border-stone-400">Địa chỉ</th>
                        <th class="bg-gray-300 h-9 border-t-2 border-stone-400">Liên hệ</th>
                        <th class="bg-gray-300 w-10 h-9 rounded-tr-lg border-t border-r w-10">Xóa nhà xuất bản
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="publisher in publishers" :key="publisher.id"
                        @click="isOpen = !isOpen; change(publisher)">
                        <td class="border-l-2 font-semibold border-t-2 h-9 border-stone-400 hover:text-red-600">{{
                            publisher.name }}</td>
                        <td class="border-t-2 h-9 border-stone-400 hover:text-red-600">{{ publisher.address }}</td>
                        <td class="border-t-2 h-9 border-stone-400 hover:text-red-600">{{ publisher.phone }}</td>
                        <th class="border-t-2 h-9 border-stone-400 hover:text-red-600 font-black cursor-pointer border-r-2"
                            @click.stop=" deleteThis(publisher._id);"><i class="fa-solid fa-trash"></i>
                        </th>
                    </tr>
                </tbody>
                <thead>
                    <th class="bg-stone-300 h-9 border-stone-400 rounded-bl-lg border-b border-l"></th>
                    <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                    <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                    <th class="bg-stone-300 h-9  rounded-br-lg border-b border-r"></th>
                </thead>
                <div v-if="isOpen" class="fixed inset-0 bg-black opacity-55 z-1"
                    @click="isOpen = !isOpen; isAdd = false">
                </div>
                <div v-if="isOpen"
                    class="p-6 rounded-xl fixed z-100 h-fit w-100 bg-white shadow-2xl left-1/2 top-1/4 -translate-x-1/2">
                    <h1 v-if="!isAdd" class="font-bold text-blue-500 text-center mb-4.5 pb-2">Chỉnh sửa thông tin nhà
                        xuất
                        bản
                    </h1>
                    <h1 v-else class="font-bold text-blue-500 text-center mb-4.5 pb-2">Thêm một nhà xuất bản mới</h1>

                    <Form :initialValues="publisherValue" v-if="isLoad" class="space-y-2" @submit="sendaUpdate"
                        :validation-schema="addpublisherSchema">
                        <div v-if="!isAdd">
                            <label class="block font-semibold mb-1" for="id">Mã nhà xuất bản</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 bg-gray-300" disabled
                                as="input" name="id"></Field>
                            <ErrorMessage class=" text-red-500" name="id"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="name">Tên nhà xuất bản</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                as="input" name="name"></Field>
                            <ErrorMessage class=" text-red-500" name="name"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="address">Địa chỉ</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                as="input" name="address"></Field>
                            <ErrorMessage class=" text-red-500" name="address"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="phone">Liên hệ</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                as="input" name="phone">
                            </Field>
                            <ErrorMessage class=" text-red-500" name="phone"></ErrorMessage>
                        </div>

                        <button v-if="!isAdd" type="submit"
                            class="mt-2 w-full bg-blue-500 text-white font-semibold py-2 rounded-xl hover:ring hover:bg-blue-600 cur-p">Chỉnh
                            sửa</button>
                        <button v-else type="submit"
                            class="mt-2 w-full bg-blue-500 text-white font-semibold py-2 rounded-xl hover:ring hover:bg-blue-600 cur-p">Tạo
                            mới</button>
                    </Form>
                </div>
            </table>

            <div class="space-x-3 flex justify-start w-full">
                <span class="btn btn-sm  text-black mt-2 hover:ring bg-red-600 hover:scale-105"
                    @click="deleteAllpublishers"><i class="fa-solid fa-trash"></i></span>
                <span class="btn btn-sm btn-primary mt-2 hover:ring hover:scale-105"
                    @click="isOpen = !isOpen; addpublisher()"><i class="fa-solid fa-plus"></i></span>
            </div>
            <!-- <div v-else class=" flex w-screen justify-center items-center flex-col" @click="publisherSearch('')">
            <h1 class=" text-xl text-gray-600 bg-white shadow-2xl px-2 py-3 rounded">Không có tác giả nào được
                hiển thị!
            </h1>
        </div> -->
        </div>
    </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import { usepublisher } from '../store/publisherStore';
import { Form, Field, ErrorMessage } from "vee-validate";
import publisherService from '../services/publisher.service';
import { computed, ref } from 'vue';
import { push } from 'notivue';
import { useRouter } from 'vue-router';
import search from '../components/search.vue';
import * as yup from "yup"

const addpublisherSchema = yup.object({
    name: yup.string().required("Vui lòng nhập tên nhà xuất bản"),

    phone: yup
        .string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
    address: yup
        .string().required("Vui lòng nhập địa chỉ nhà xuất bản")
})




const publisherValue = ref({})
const publisherstore = usepublisher()
const router = useRouter()

const isOpen = ref(false);
const isAdd = ref(false);
const isLoad = ref(false);
function addpublisher() {
    publisherValue.value = {}
    isLoad.value = true
    isAdd.value = true
}
function change(value) {
    publisherValue.value = {
        id: value._id,
        name: value.name || null,
        phone: value.phone || null,
        address: value.address || null,
    }
    isLoad.value = true
    isAdd.value = false
}
const keyValue = ref('')

const publishers = computed(() => {
    const key = (keyValue.value || '').toLowerCase().trim();
    if (!key) return publisherstore.publishers
    const result = publisherstore.publishers.filter(publisher => publisher.name.toLowerCase().includes(key))
    if (!result.length == 0) {
        return publisherstore.publishers.filter(publisher => publisher.name.toLowerCase().includes(key))
    } else {
        []
    }
})

function publisherSearch(key) {
    keyValue.value = key
}
async function sendaUpdate(value) {
    try {
        console.log(value)
        if (isAdd.value) {
            await publisherService.create(value)
            await publisherstore.fetchpublishers()
            isOpen.value = !isOpen.value
            isAdd.value = false
            push.success(`Đã thêm một nhà xuất bản mới`)
        } else {
            await publisherService.update(value.id, value)
            await publisherstore.fetchpublishers()
            isOpen.value = !isOpen.value
            push.success(`Cập nhật nhà xuất bản "${value.name}" thành công!`)
        }
    } catch (error) {
        console.log(error)
    }

}
async function deleteAllpublishers() {
    const isConfirm = confirm("Bạn có chắc chắn không thể khôi phuc!")
    if (isConfirm) {
        try {
            await publisherService.deleteAll()
            push.success(`Đã xóa tất cả thành công!`)
            await publisherstore.fetchpublishers()
            router.push("/staff/manapublisher")
        } catch (error) {
            console.log(error)
        }
    } else {
        return
    }
}
async function deleteThis(id) {
    const isConfirm = confirm(`Xác nhận xóa nhà xuất bản ${publisherstore.getnamePublisher(id)}`)
    if (!isConfirm) return
    try {
        await publisherService.delete(id)
        push.success(`Đã xóa id ${id} thành công!`)
        await publisherstore.fetchpublishers()
        router.push("/staff/manapublisher")
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