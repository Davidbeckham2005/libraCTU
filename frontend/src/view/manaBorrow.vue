<template>
    <div>
        <div class="bg-white">
            <div class="flex max-[1296px]:flex-col ml-4 p-2 justify-between">
                <routerLink to="/books"><i class="fa-solid fa-list"></i>Xem sách</routerLink>
                <div class="flex flex-row ">
                    <search @book-search="borrowsearch" class="ml-4 mb-2"></search>
                    <Sidebar></Sidebar>
                </div>
                <h1
                    class="text-center max-[1296px]:relative absolute left-1/2 transform -translate-x-1/2 text-neutral-800 text-2xl font-bold p-2">
                    Danh sách mượn</h1>
            </div>
            <div class="overflow-x-auto p-4">
                <table className="table table-xs shadow-2xs border-separate border-spacing-0" v-if="borrows">
                    <thead>
                        <tr>
                            <!-- bo loc ten -->
                            <th class="bg-gray-300 w-38 h-9 border-stone-400 rounded-tl-lg border-t border-l">
                                <Form>
                                    <Field name="name"
                                        class="text-gray-500 bg-white w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                        as="select" v-model="nameSelected">
                                        <option class="text-black" value="">Tên người mượn</option>
                                        <option class="text-black" :value="name" v-for="name in ListNameBorrow"
                                            :key="name">{{ name }}
                                        </option>
                                    </Field>
                                </Form>
                            </th>
                            <!-- bo loc username -->
                            <th class="bg-gray-300 h-9 border-t-2 border-stone-400">
                                <Form>
                                    <Field name="username"
                                        class="text-gray-500 bg-white w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                        as="select" v-model="userSelected">
                                        <option class="text-black" value="">Tài khoản</option>
                                        <option class="text-black" :value="username" v-for="username in ListUserBorrow"
                                            :key="username">{{
                                                username }}</option>
                                    </Field>
                                </Form>
                            </th>
                            <th class="bg-gray-300 h-9 border-t-2 border-stone-400">
                                <!-- bo loc sach -->
                                <Form>
                                    <Field name="book"
                                        class="text-gray-500 bg-white w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                        as="select" v-model="bookSelected">
                                        <option class="text-black" value="">Sách</option>
                                        <option class="text-black" :value="book" v-for="book in ListBookBorrow"
                                            :key="book">{{ book }}
                                        </option>
                                    </Field>
                                </Form>
                            </th>
                            <th class="bg-gray-300 h-9 border-t-2 border-stone-400">Tác giả</th>
                            <th class="bg-gray-300 h-9 border-t-2 border-stone-400">Ngày mượn</th>
                            <th class="bg-gray-300 h-9 border-t-2 border-stone-400">Ngày trả</th>
                            <th class="bg-gray-300 h-9 border-t-2 border-stone-400">Điện thoại</th>
                            <th class="bg-gray-300 h-9 border-t-2 border-stone-400">Địa chỉ</th>
                            <th class="bg-gray-300 h-9 border-t-2 border-stone-400 max-w-xs truncate">Ghi chú</th>
                            <th class="bg-gray-300 h-9 border-t-2 border-stone-400 w-50">
                                <!-- form cho de nay dung lai cho ne -->
                                <Form>
                                    <Field name="status"
                                        class="text-gray-500 bg-white w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                                        as="select" v-model="statusSelected">
                                        <option value="">Trạng thái</option>
                                        <option value="Đang chờ duyệt">Đang chờ duyệt</option>
                                        <option value="Đã duyệt">Đã duyệt</option>
                                        <option value="Đã từ chối">Từ chối</option>
                                        <option value="Đã trả sách">Hoàn thành</option>
                                        <option value="Đang yêu cầu">Đang yêu cầu</option>
                                    </Field>
                                </Form>
                            </th>
                            <th class="bg-gray-300 h-9 rounded-tr-lg border-t border-r">Xóa đơn mượn</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="borrow in borrows" :key="borrow._id">
                            <td class="border-l-2 font-semibold border-t-2 h-9 border-stone-400"
                                @click="isOpen = !isOpen; change(borrow)">{{ borrow.borrowName
                                }}
                            </td>
                            <td class="border-t-2 h-9 border-stone-400" @click="isOpen = !isOpen; change(borrow)">{{
                                username(borrow.user_id) }}</td>
                            <td class="border-t-2 h-9 border-stone-400" @click="isOpen = !isOpen; change(borrow)">{{
                                bookname(borrow.book_id) }}</td>
                            <td class="border-t-2 h-9 border-stone-400" @click="isOpen = !isOpen; change(borrow)">{{
                                authorStore.getAuthor(bookStore.getBook(borrow.book_id)?.author)?.name
                                }}
                            </td>


                            <td class="border-t-2 h-9 border-stone-400" @click="isOpen = !isOpen; change(borrow)">{{
                                borrow.borrowDate
                                }}
                            </td>
                            <td class="border-t-2 h-9 border-stone-400" @click="isOpen = !isOpen; change(borrow)">{{
                                borrow.returnDate
                                }}
                            </td>
                            <td class="border-t-2 h-9 border-stone-400" @click="isOpen = !isOpen; change(borrow)">{{
                                borrow.phone }}
                            </td>
                            <td class="border-t-2 h-9 border-stone-400" @click="isOpen = !isOpen; change(borrow)">{{
                                borrow.address }}
                            </td>
                            <td class="border-t-2 h-9 border-stone-400  max-w-30 truncate"
                                @click=" isOpen = !isOpen; change(borrow)">
                                {{ borrow.note }}</td>
                            <td class="border-t-2 h-9 border-stone-400 flex justify-between hover:text-black:">
                            <td class="border border-none font-semibold" :class="{
                                'text-amber-600': borrow.status === 'Đang chờ duyệt',
                                'text-blue-500': borrow.status === 'Đã duyệt',
                                'text-green-700': borrow.status === 'Đã trả sách',
                                'text-red-500': borrow.status === 'Đã từ chối',
                            }">
                                {{ borrow.status }}
                            </td>
                            <select
                                v-if="borrow.status === 'Đang chờ duyệt' || borrow.status === 'Đã duyệt' || borrow.status === 'Đã từ chối'"
                                class="border-2 p-2 w-5 rounded-lg overflow-hidden" name="" id="" v-model="value"
                                @change="updateStatus(borrow)">
                                <option value="" disabled></option>
                                <option value="Đã duyệt">Duyệt</option>
                                <option class=" rounded-bl-lg rounded-br-lg" value="Đã từ chối">Từ chối</option>
                            </select>
                            <select v-if="borrow.status === 'Đang yêu cầu'" @click.stop @change="updateStatus(borrow)"
                                v-model="value" class="border-2 p-2 w-5 rounded-lg overflow-hidden">
                                <option value="Đã trả sách">Chấp nhận</option>
                                <option value="Đã duyệt">Từ chối</option>
                            </select>
                            </td>

                            <th class="border-t-2 h-9 border-stone-400 font-black cursor-pointer border-r-2"
                                @click.stop="deleteThis(borrow);">
                                <i class="fa-solid fa-trash"></i>
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
                        <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                        <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                        <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                        <th class="bg-stone-300 h-9 border-b-2 border-stone-400"></th>
                        <th class="bg-stone-300 h-9  rounded-br-lg border-b border-r"></th>
                    </thead>

                </table>
                <div v-else class=" flex w-screen justify-center items-center flex-col" @click="borrowsearch('')">
                    <h1 class=" text-xl text-gray-600 bg-white shadow-2xl px-2 py-3 rounded">Không có danh sách nào được
                        hiển thị!
                    </h1>
                </div>
            </div>
        </div>
        <div v-if="isOpen" class="fixed inset-0 bg-black opacity-55 z-1" @click="isOpen = !isOpen">
        </div>
        <div v-if="isOpen"
            class="p-6 rounded-xl fixed z-100 max-h-[90vh] w-3xl bg-white shadow-2xl left-1/2 top-1/16 -translate-x-1/2 overflow-auto">
            <Form :initialValues="borrowValue" v-if="isLoad" class="space-y-2" @submit="sendaUpdate">

                <div>
                    <h1 v-if="!isAdd" class="font-bold text-blue-500 text-center mb-4.5 pb-2">Thông tin mượn sách</h1>
                    <h1 v-else class="font-bold text-blue-500 text-center mb-4.5 pb-2">Tạo đơn mượn sách</h1>
                </div>
                <div v-if="!isAdd">
                    <label class="block font-semibold mb-1" for="username">Tài khoản mượn</label>
                    <Field disabled class="px-3 py-2 w-full border rounded-lg focus:ring-2 bg-gray-300" as="input"
                        name="username">
                    </Field>
                </div>

                <div>
                    <label class="block font-semibold mb-1" for="book_id">Sách</label>
                    <Field :disabled="!isAdd" class="px-3 py-2 w-full border rounded-lg focus:ring-2 bg-gray-300"
                        as="select" name="book_id">
                        <option v-for="book in bookStore.books" :key="book._id" :value="book._id">{{ book.name }}
                        </option>
                    </Field>
                    <ErrorMessage class=" text-red-500" name="book_id"></ErrorMessage>
                </div>


                <!-- <div>
                    <label class="block font-semibold mb-1" for="status">Trạng thái</label>
                    <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" as="select"
                        name="status">
                        <option value="Đang chờ duyệt">Đang chờ duyệt</option>
                        <option value="Đã duyệt">Phê duyệt</option>
                        <option value="Đã từ chối">Từ chối</option>
                        <option value="Đã trả sách">Đã trả sách</option>
                        <option value="Đang yêu cầu">Yêu cầu trả sách</option>
                    </Field>
                    <ErrorMessage class=" text-red-500" name="status"></ErrorMessage>
                </div> -->
                <div>
                    <label class="block font-semibold mb-1" for="borrowName">Tên người mượn</label>
                    <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" as="input"
                        name="borrowName"></Field>
                    <ErrorMessage class=" text-red-500" name="borrowName"></ErrorMessage>
                </div>

                <div class="flex gap-4 justify-center w-full">
                    <div class="flex-1">
                        <label class="block font-semibold mb-1 flex-1" for="Ngaymuon">Ngày mượn</label>
                        <Field class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400" type="date"
                            name="ngaymuon">
                        </Field>
                        <ErrorMessage name="ngaymuon" class="text-red-500"></ErrorMessage>

                    </div>
                    <div class="flex-1">
                        <label class="block font-semibold mb-1 flex-1" for="ngaytra">Ngày trả dự kiến</label>
                        <Field class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400" type="date"
                            name="ngaytra">
                        </Field>
                        <ErrorMessage name="ngaytra" class="text-red-500"></ErrorMessage>
                    </div>
                </div>
                <div>
                    <label class="block font-semibold mb-1" for="phone">Số điện thoại</label>
                    <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" as="input"
                        name="phone">
                    </Field>
                    <ErrorMessage class=" text-red-500" name="phone"></ErrorMessage>
                </div>
                <div>
                    <label class="block font-semibold mb-1" for="address">Địa chỉ</label>
                    <Field class="px-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" as="input"
                        name="address"></Field>
                    <ErrorMessage class=" text-red-500" name="address"></ErrorMessage>
                </div>
                <div>
                    <label class="block font-semibold mb-1" for="note">Ghi chú</label>
                    <Field class="px-3 py-2 w-full border rounded-lg h-20 focus:ring-2 focus:ring-blue-400"
                        as="textarea" type="textarea" name="note"></Field>
                    <ErrorMessage class=" text-red-500" name="note"></ErrorMessage>
                </div>
                <div>
                    <button type="submit" v-if="!isAdd"
                        class="mt-2 w-full bg-blue-500 text-white font-semibold py-2 rounded-xl hover:ring hover:bg-blue-600 cur-p">Chỉnh
                        sửa</button>
                    <button type="submit" v-else
                        class="mt-2 w-full bg-blue-500 text-white font-semibold py-2 rounded-xl hover:ring hover:bg-blue-600 cur-p">Thêm
                        đơn mượn</button>
                </div>

            </Form>
        </div>
        <div class="space-x-3 flex flex-row w-full ml-6">
            <span class="btn btn-sm  text-black mt-2 hover:ring bg-red-600 hover:scale-105"><i
                    class="fa-solid fa-trash"></i></span>
            <span class="btn btn-sm btn-primary mt-2 hover:ring hover:scale-105"
                @click="isOpen = !isOpen; addBorrow()"><i class="fa-solid fa-plus"></i></span>
        </div>
    </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import { useBorrow } from '../store/borrowStore';
import { Form, Field, ErrorMessage } from "vee-validate";
import borrowservice from '../services/borrow.service';
import { computed, onMounted, ref, watch } from 'vue';
import { push } from 'notivue';
import { useRouter } from 'vue-router';
import search from '../components/search.vue';
import borrowService from '../services/borrow.service';
import { useBook } from '../store/bookStore';
import { useAuthor } from '../store/authorStore';
import { useListUser } from '../store/userStore';
import userService from '../services/user.service';
import bookService from '../services/book.service';

const authorStore = useAuthor()
const bookStore = useBook()
const borrowValue = ref({})
const borrowStore = useBorrow()
const value = ref("")

function bookname(book_id) {
    const book = useBook().getBook(book_id)
    return book?.name
}
const username = (user_id) => {
    return useListUser().getUser(user_id).username
}
const router = useRouter()
const isOpen = ref(false);
const isLoad = ref(false)
const isAdd = ref(false)

//fetch du lieu lien tuc
onMounted(() => {
    bookStore.fetchBooks()
    authorStore.fetchAuthor()
    borrowStore.fetchborrows()
})
async function updateStatus(borrow) {
    // console.log(borrow)
    try {
        const data = {
            status: value.value,
        }
        // let currentborrow = useListUser().users.find(u => u._id === borrow.user_id)?.sumBorrow
        // console.log(currentborrow)
        // if (data.status === "Đã từ chối" || data.status === "Đã trả sách") {
        //     currentborrow = currentborrow - 1
        // }
        // const userData = {
        //     sumBorrow: currentborrow
        // }
        const slbookdata = {
            book_id: borrow.book_id,
            oldStatus: borrow.status,
            newStatus: value.value,
            user_id: borrow.user_id
        }
        // console.log(currentborrow)

        // if (data.status === "")
        //     if (data.status === "")
        // await userService.update(borrow.user_id, userData)
        await borrowService.update(borrow._id, data)
        await bookService.updatesl(slbookdata)
        push.success(`Cập nhật yêu cầu mượn thành công!`)
        value.value = ""
        // await borrowStore.fetchborrows()
        await borrowStore.fetchborrows()
        await bookStore.fetchBooks()
        await useListUser().fetchUsers()
    } catch (error) {
        console.log(error)
    }
}

function change(value) {
    borrowValue.value = {
        id: value._id,
        username: username(value.user_id),
        book_id: value.book_id,
        borrowName: value.borrowName,
        phone: value.phone,
        address: value.address,
        note: value.note,
        status: value.status
    }
    // console.log(borrowValue.value)
    isLoad.value = true
    isAdd.value = false

}
const keyValue = ref('')
const statusSelected = ref('')
const nameSelected = ref('')
const userSelected = ref('')
const bookSelected = ref('')

const ListBookBorrow = [...new Set(useBorrow().borrows.map(b => useBook().getNameBook(b.book_id)))]
// console.log(ListBookBorrow)
const ListUserBorrow = [...new Set(useBorrow().borrows.map(b => useListUser().getUser(b.user_id)?.username))]
// console.log(ListUserBorrow)

const ListNameBorrow = [...new Set(useBorrow().borrows.map(b => b.borrowName))]
// console.log(ListNameBorrow)

const borrows = computed(() => {
    const key = (keyValue.value || '').toLowerCase().trim();
    let result = borrowStore.borrows
    if (!!statusSelected.value) {
        result = borrowStore.borrows.filter(borrow => borrow.status.includes(statusSelected.value))
    }
    if (key) {
        result = result.filter(borrow => borrow.user?.username.toLowerCase().includes(key))
    }
    if (nameSelected.value) {
        result = result.filter(borrow => borrow.borrowName === nameSelected.value)
    }
    if (userSelected.value) {
        result = result.filter(b => useListUser().getUser(b.user_id)?.username === userSelected.value)
    }
    if (bookSelected.value) {
        result = result.filter(b => useBook().getNameBook(b.book_id) === bookSelected.value)
    }
    return result
})

function borrowsearch(key) {
    keyValue.value = key
}
async function sendaUpdate(value) {
    console.log(value)
    try {
        if (isAdd.value) {
            await borrowService.createBorrow(value)
            await borrowStore.fetchborrows()
            isOpen.value = !isOpen.value
            isAdd.value = false
            push.success(`Đã thêm một đơn mượn mới`)
        } else {
            await borrowService.update(value.id, value)
            await borrowStore.fetchborrows()
            isOpen.value = !isOpen.value
            push.success(`Cập nhật đơn mượn thành công!`)
        }
    } catch (error) {
        console.log(error)
    }
}


async function deleteThis(borrow) {
    const user = bookname(borrow.book_id) || null
    const isConfirm = confirm(`Xác nhận xóa đơn mượn của ${useBorrow().getBorrow(borrow._id)?.borrowName} với sách ${user}`)
    if (!isConfirm) return
    try {

        await borrowservice.delete(borrow._id)
        push.success(`Đã xóa id ${borrow._id} thành công!`)
        await borrowStore.fetchborrows()
        await useListUser().fetchUsers()
        router.push("/staff/manaborrow")
    } catch (error) {
        console.log(error)
    }
}
const addBorrow = () => {
    isAdd.value = true
    isLoad.value = true
    borrowValue.value = {}
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