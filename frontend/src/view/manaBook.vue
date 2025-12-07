<template>
    <div>
        <div class="flex max-[1296px]:flex-col ml-4 p-2 justify-between">
            <routerLink to="/books"><i class="fa-solid fa-list"></i>Xem sách</routerLink>
            <div class="flex flex-row ">
                <search @book-search="bookSearch" class="ml-4 mb-2"></search>
                <Sidebar></Sidebar>
            </div>
            <h1
                class="text-center max-[1296px]:relative absolute left-1/2 transform -translate-x-1/2 text-neutral-800 text-2xl font-bold p-2">
                Quản lí sách</h1>
        </div>
        <div class="overflow-x-auto p-4">
            <table class="table table-sm border-separate border-spacing-0 bg-white" v-if="books">
                <thead>
                    <tr class="space-x-9">
                        <th class="bg-gray-300 border-stone-400 rounded-tl-lg border-t border-l">Tên sách</th>
                        <th class="bg-gray-300 border-t-2 border-stone-400">Tác giả</th>
                        <th class="bg-gray-300 border-t-2 border-stone-400">Nhà xuất bản</th>
                        <th class="bg-gray-300 border-t-2 border-stone-400">Thể loại</th>
                        <th class="bg-gray-300 border-t-2 border-stone-400">Ngôn ngữ</th>
                        <th class="bg-gray-300 border-t-2 border-stone-400">Số lượng</th>
                        <th class="bg-gray-300  rounded-tr-lg border-t border-r">Xóa sách</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="book in books" :key="book.id" @click="isOpen = !isOpen; change(book)"
                        class="hover:text-red-400">

                        <td class="border-t-2 border-l-2 h-9 font-semibold border-stone-400 max-w-40 truncate">
                            {{ book.name
                            }}
                        </td>
                        <td class="border-t-2 h-9 font-semibold border-stone-400 max-w-40 truncate">
                            {{
                                authorStore.getauthorName(book.author)
                            }}
                        </td>
                        <td class="border-t-2 h-9 border-stone-400">{{ publisherStore.getnamePublisher(book.nxb) }}</td>
                        <td class="border-t-2 h-9  border-stone-400">{{ book.type }}</td>
                        <td class="border-t-2 h-9 border-stone-400">{{ book.language }}</td>
                        <td class="border-t-2 h-9 border-stone-400">{{ book.sl }}</td>
                        <th class="border-t-2 border-r-2 w-10 h-9 text-center border-stone-400 font-black"
                            @click.stop="deleteThis(book._id);"><i class="fa-solid fa-trash"></i>
                        </th>
                    </tr>

                </tbody>
                <thead>
                    <tr class="">
                        <th class="bg-stone-300 h-8 border-stone-400 rounded-bl-lg border-b border-l"></th>
                        <th class="bg-stone-300 h-8 border-b-2 border-stone-400"></th>
                        <th class="bg-stone-300 h-8 border-b-2 border-stone-400"></th>
                        <th class="bg-stone-300 h-8 border-b-2 border-stone-400"></th>
                        <th class="bg-stone-300 h-8 border-b-2 border-stone-400"></th>
                        <th class="bg-stone-300 h-8 border-b-2 border-stone-400"></th>
                        <th class="bg-stone-300 h-8  rounded-br-lg border-b border-r"></th>
                    </tr>
                </thead>
                <div v-if="isOpen" class="fixed inset-0 bg-black opacity-55 z-1"
                    @click="isOpen = !isOpen; isAdd = false">
                </div>
                <div v-if="isOpen"
                    class="p-6 rounded-xl fixed z-100 w-2xl bg-white shadow-2xl left-1/2 top-1/32 -translate-x-1/2 h-[90vh] flex flex-col">
                    <h1 v-if="!isAdd" class="font-bold text-blue-500 text-center mb-4.5 pb-2">Chỉnh sửa thông tin sách
                    </h1>
                    <h1 v-else class="font-bold text-blue-500 text-center mb-4.5 pb-2">Thêm một sách mới</h1>

                    <Form :initialValues="bookValue" v-if="isLoad" class="space-y-2 overflow-y-auto"
                        @submit="sendaUpdate" :validation-schema="bookSchema">
                        <div>
                            <label class="block font-semibold mb-1" for="name">Tên sách</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                as="input" name="name"></Field>
                            <ErrorMessage class=" text-red-500" name="name"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="author">Tác giả</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                as="select" name="author">
                                <option :value=author._id v-for="author in authorStore.authors" :key="author._id">{{
                                    author.name }}</option>
                                <option value="Không có thông tin">Tác giả khác</option>
                            </Field>
                            <!-- <ErrorMessage class=" text-red-500" name="author"></ErrorMessage> -->
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="type">Thể loại</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                as="select" name="type">
                                <option value="" disabled selected>--Chọn thể loại--</option>
                                <option value="Truyện ngắn">Truyện ngắn</option>
                                <option value="Tiểu thuyết">Tiểu thuyết</option>
                                <option value="Khoa học">Khoa học</option>
                                <option value="Lịch sử">Lịch sử</option>
                                <option value="Tâm lý">Tâm lý</option>
                                <option value="Giáo dục">Giáo dục</option>
                                <option value="Văn học thiếu nhi">Văn học thiếu nhi</option>
                                <option value="Trinh thám">Trinh thám</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Tự truyện">Tự truyện</option>
                                <option value="Kinh doanh">Kinh doanh</option>
                            </Field>
                            <ErrorMessage class=" text-red-500" name="type"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="nxb">Nhà xuất bản</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                as="select" name="nxb">
                                <option v-for="publisher in publisherStore.publishers" :key="publisher._id"
                                    :value=publisher._id>{{ publisher.name }}</option>
                            </Field>
                            <ErrorMessage class=" text-red-500" name="nxb"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="language">Ngôn ngữ</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                as="select" name="language">
                                <option value="" disabled selected>--Chọn ngôn ngữ--</option>
                                <option value="Tiếng Việt">Tiếng Việt</option>
                                <option value="English">Tiếng Anh</option>
                                <option value="Tiếng Pháp">Tiếng Pháp</option>
                                <option value="Tiếng Nhật">Tiếng Nhật</option>
                                <option value="Tiếng Hàn">Tiếng Hàn</option>
                                <option value="Tiếng Trung">Tiếng Trung</option>
                                <option value="Tiếng Đức">Tiếng Đức</option>
                                <option value="Tiếng Ý">Tiếng Ý</option>
                                <option value="Tiếng Tây Ban Nha">Tiếng Tây Ban Nha</option>
                                <option value="Tiếng Nga">Tiếng Nga</option>
                            </Field>
                            <ErrorMessage class=" text-red-500" name="language"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="page">Số trang</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                as="input" type="number" min="1" name="page"></Field>
                            <ErrorMessage class=" text-red-500" name="page"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="namxb">Năm suất bản</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                as="input" type="number" name="namxb" min="1500" max="2025"></Field>
                            <ErrorMessage class=" text-red-500" name="namxb"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="sl">Số lượng</label>
                            <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                as="input" type="number" min="1" name="sl"></Field>
                            <ErrorMessage class=" text-red-500" name="sl"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="des">Mô tả</label>
                            <Field class="px-3 py-2 w-full border rounded-lg h-20 focus-2ing-2 focus:ring-blue-400"
                                as="textarea" type="textarea" name="des"></Field>
                            <ErrorMessage class=" text-red-500" name="des"></ErrorMessage>
                        </div>
                        <div v-if="!isAdd">
                            <button type="submit"
                                class="mt-2 w-full bg-blue-500 text-white font-semibold py-2 rounded-xl hover:ring hover:bg-blue-600 cur-p">Chỉnh
                                sửa</button>
                        </div>
                        <div v-else>
                            <button type="submit" as="input"
                                class="mt-2 w-full bg-blue-500 text-white font-semibold py-2 rounded-xl hover:ring hover:bg-blue-600 cur-p">Thêm
                                mới</button>
                        </div>
                    </Form>
                </div>
            </table>
            <div v-else class=" flex w-screen justify-center items-center flex-col" @click="bookSearch('')">
                <h1 class=" text-xl text-gray-60 shadow-2xl px-2 py-3 rounded">Không có sách nào được
                    hiển thị!
                </h1>
            </div>
            <div class="space-x-3 flex justify-start w-full">
                <span class="btn btn-sm  text-black mt-2 hover:ring bg-red-600 hover:scale-105"
                    @click="deleteAllauthors"><i class="fa-solid fa-trash"></i></span>
                <span class="btn btn-sm btn-primary mt-2 hover:ring hover:scale-105"
                    @click="isOpen = !isOpen; addBook()"><i class="fa-solid fa-plus"></i></span>
            </div>
        </div>
    </div>

</template>

<script setup>
import { usepublisher } from '../store/publisherStore';
import { useBook } from '../store/bookStore';
import { Form, Field, ErrorMessage } from "vee-validate";
import bookService from '../services/book.service';
import { computed, ref } from 'vue';
import { push } from 'notivue';
import { useRouter } from 'vue-router';
import search from '../components/search.vue';
import { useAuthor } from '../store/authorStore';
import { bookSchema } from '../validations/book.validation';
import Sidebar from '../components/Sidebar.vue';
import publisherService from '../services/publisher.service';

const bookValue = ref({})
const publisherStore = usepublisher()
const bookStore = useBook()
const authorStore = useAuthor()
const router = useRouter()
const isOpen = ref(false);
const isLoad = ref(false)
const isAdd = ref(false)

function addBook() {
    bookValue.value = {}
    isLoad.value = true
    isAdd.value = true
}
function change(value) {
    bookValue.value = {
        id: value._id,
        name: value.name || null,
        author: value.author || null,
        nxb: value.nxb || null,
        sl: value.sl || 0,
        language: value.language || null,
        des: value.des,
        ngaytao: value.ngaytao,
        type: value.type,
        namxb: value.namxb,
        page: value.page || 500,
        view: value.view || 0,
    }
    isLoad.value = true
    isAdd.value = false
}
const keyValue = ref('')

const books = computed(() => {
    const key = (keyValue.value || '').toLowerCase().trim();
    if (!key) return bookStore.books
    const result = bookStore.books.filter(book => book.name.toLowerCase().includes(key))
    if (!result.length == 0) {
        return bookStore.books.filter(book => book.name.toLowerCase().includes(key))
    } else {
        []
    }
})

function bookSearch(key) {
    keyValue.value = key
}
async function sendaUpdate(value) {
    try {
        if (isAdd.value) {
            const respon = await bookService.create(value)
            const data = {
                book: respon.insertedId
            }
            // console.log(data)
            await publisherService.update(value.nxb, data)
            await bookStore.fetchBooks()
            isOpen.value = !isOpen.value
            isAdd.value = false
            push.success(`Đã thêm một sách mới`)

        } else {
            await bookService.update(value.id, value)
            await bookStore.fetchBooks()
            isOpen.value = !isOpen.value
            push.success(`Cập nhật sách "${value.name}" thành công!`)
        }
    } catch (error) {
        console.log(error)
    }
}
async function deleteAllBooks() {
    const isConfirm = confirm("Bạn có chắc chắn không thể khôi phục!")
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
async function deleteThis(id) {
    const isConfirm = confirm(`Xác nhận xóa sách có id ${id}`)
    if (!isConfirm) return
    try {
        await bookService.delete(id)
        push.success(`Đã xóa id ${id} thành công!`)
        await bookStore.fetchBooks()
        router.push("/staff/manaBook")
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