<script setup>
import { useBorrow } from '../store/borrowStore';
import { ref, computed, reactive } from 'vue';
import { useUser } from '../store/userLogin';
import { useBook } from '../store/bookStore';
import { useAuthor } from '../store/authorStore';
import search from '../components/search.vue';
import { Form, Field, ErrorMessage } from "vee-validate";
import userService from '../services/user.service';
import { push } from 'notivue';
import { useListUser } from '../store/userStore';
import router from '../router';
import BorrowDetail from '../components/BorrowDetail.vue';
import * as yup from "yup"
import Sidebar from '../components/Sidebar.vue';
import BookCard from '../components/BookCard.vue';

const userSchema = yup.object({
    fullname: yup.string().required("Vui lòng nhập tên"),
    gender: yup.string().required("Vui lòng chọn giới"),
    phone: yup
        .string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
    email: yup.string().required("Vui lòng nhập Email"),
    address: yup.string().required("Vui lòng nhập địa chỉ"),

})

const ListUserStore = useListUser()
const authorStore = useAuthor()
const bookStore = useBook()
const userStore = useUser()
const borrowStore = useBorrow()

userStore.loadSession()
const id = computed(() => userStore.user?._id)
const isDisable = ref(true)

const user = computed(() =>
    ListUserStore.users.find(u => u._id === id.value)
)
// console.log(user.value)
// console.log(id.value)
// console.log(user.value)
// console.log(ListUserStore.users)
const getbook = (book_id) => {
    return useBook().getBook(book_id)
}
const getauthor = (book_id) => {
    const author_id = getbook(book_id)?.author
    return useAuthor().getAuthor(author_id)
}
const borrowUser = computed(() => {
    if (!userStore.user?._id) return []
    return borrowStore.borrows.filter(borrow => borrow.user_id === user.value?._id)
})
// console.log(borrowStore.borrows)
// console.log(borrowUser.value)
function daysBetweenAbs(date) {
    const diffTime = Math.abs(new Date(date) - new Date());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
const valueUser = computed(() => ({

    fullname: user.value?.fullname,
    address: user.value?.address,
    email: user.value?.email,
    phone: user.value?.phone,
    role: user.value?.role,
    gender: user.value?.gender,
}
))
// console.log(valueUser.value)
async function sendaUpdate(values) {
    try {
        await userService.update(id.value, values)
        push.success("Cập nhật thành công!")
        isDisable.value = true
        ListUserStore.fetchUsers()
    } catch (error) {
        console.log(error)
    }

}

function signalEdit() {
    isDisable.value = !isDisable.value
}

const borrowValue = ref({})
function change(borrow) {
    borrowValue.value = borrow
}

const statusSelected = ref("Tất cả sách")
const borrowFiller = computed(() => {
    if (statusSelected.value === "Tất cả sách") return borrowUser.value
    return borrowUser.value.filter(borrow => borrow.status === statusSelected.value)
})
// console.log(borrowUser.value)
// console.log(borrowFiller.value)
const backlist = () => {
    router.push("/books")
}
const isEdit = ref(true)
const isDetail = ref(false)
const isopenFavorite = ref(false)
const edit = () => {
    isEdit.value = true
    isDetail.value = false
    isopenFavorite.value = false
}
const detail = () => {
    isEdit.value = false;
    isDetail.value = true
    isopenFavorite.value = false
}
const openFavorite = () => {
    isopenFavorite.value = true
    isEdit.value = false
    isDetail.value = false
}
const favoriteBook = computed(() => {
    if (user.value) {
        return user.value.favoriteBook
    } return []
})
// console.log(favoriteBook.value)
</script>

<template>
    <div class=" bg-amber-50 min-h-screen">
        <div @click="backlist">

            <div class="p-2 sm:px-40 flex flex-col sm:flex-row sm:space-x-10 sm:justify-center">
                <RouterLink @click.stop to="/books" class="hidden sm:inline"><span
                        v-if="userStore.isLogin && userStore.isUser"
                        class="btn btn-sm text-white font-bold w-23 h-8 hover:ring-2 bg-neutral-800 active:scale-105 hover:bg-white hover:text-black">Trang
                        Chủ</span>
                </RouterLink>
                <RouterLink to="/user/mybook" class="hidden sm:inline"> <span v-if="userStore.isLogin"
                        class="btn btn-sm text-white font-bold w-23 h-8 hover:ring-2 bg-neutral-800 active:scale-105 hover:bg-white hover:text-black">Home</span>
                </RouterLink>
                <search></search>
                <div class="sm:hidden flex flex-row space-x-2 mt-2">
                    <Sidebar @click.stop v-if="userStore.isLogin"></Sidebar>
                    <RouterLink @click.stop to="/books"><span v-if="userStore.isLogin && userStore.isUser"
                            class="btn btn-sm text-white font-bold w-23 h-8 hover:ring-2 bg-neutral-800 active:scale-105 hover:bg-white hover:text-black">Trang
                            Chủ</span>
                    </RouterLink>
                    <RouterLink to="/user/mybook"> <span v-if="userStore.isLogin"
                            class="btn btn-sm text-white font-bold w-23 h-8 hover:ring-2 bg-neutral-800 active:scale-105 hover:bg-white hover:text-black">Home</span>
                    </RouterLink>
                </div>
                <Sidebar @click.stop v-if="userStore.isLogin" class="hidden sm:inline"></Sidebar>

            </div>
        </div>
        <div class="flex min-h-screen sm:px-30 sm:py-10 max-[930px]:block">

            <div class="flex-6 bg-white border">
                <div>
                    <div class="w-full p-2 flex flex-row justify-between">
                        <div class="flex flex-col sm:flex-row">
                            <h1 @click.stop="edit" class="text-xl text-gray-600 hover:underline">
                                <div class="w-8 h-8 inline-block">
                                    <img :src="`${user.avatar}.png`" alt="image">
                                </div>Xin
                                chào {{
                                    user?.fullname }} >
                            </h1>

                            <select class="btn btn-sm bg-white shadow-2xl w-30 ml-2 flex text-start border-2"
                                v-model="statusSelected">
                                <option>Tất cả sách</option>
                                <option value="Đã trả sách">Sách đã trả</option>
                                <option value="Đã từ chối">Sách bị từ chối</option>
                                <option value="Đang chờ duyệt">Sách đang chờ duyệt</option>
                                <option value="Đã duyệt">Sách đang mượn</option>
                            </select>
                            <div @click="openFavorite
                            " class="btn btn-sm bg-white shadow-2xl w-38 ml-2 flex text-start border-2">
                                SÁCH ĐÃ ĐÁNH DẤU
                            </div>
                            <div class=" flex gap-4 text-gray-600 text-sm">

                                <span><strong>0</strong> Following</span>
                                <span><strong>0</strong> Followers</span>
                                <span><i class="fa-solid fa-share-nodes"></i>
                                    Share
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="h-fit m-2 overflow-auto">
                    <div class="flex justify-between">
                        <h1 class="text-sm p-2 text-gray-500">Sách của bạn</h1>
                        <h1 class="text-sm p-2 text-gray-500 mr-10">Trạng thái</h1>
                    </div>
                    <ul class="list bg-base-100 rounded-box shadow-md">
                        <li @click.stop="detail(), change(borrow)" class=" list-row hover:border"
                            v-for="borrow in borrowFiller" :key="borrow._id">
                            <img class="size-10 rounded-box" :src=bookStore.getBook(borrow.book_id)?.cover />
                            <div class="list-col-grow">
                                <div>{{ getauthor(borrow.book_id)?.name }}
                                </div>
                                <div class="text-xs uppercase font-semibold opacity-60">{{
                                    getbook(borrow.book_id)?.name }}
                                </div>
                            </div>
                            <h1 class="max-[610px]:hidden"
                                :class="{ 'text-red-400': daysBetweenAbs(borrow.returnDate) <= 3 }">Còn {{
                                    daysBetweenAbs(borrow.returnDate) }} ngày đến hạn</h1>
                            <button class="btn btn-sm border-2 text-black font-bold w-25">Xem
                                chi
                                tiết</button>
                            <div class="btn btn-sm border-2 text-gray-100 font-bold w-38 " :class="{
                                'bg-amber-600': borrow.status === 'Đang chờ duyệt',
                                'bg-blue-500': borrow.status === 'Đã duyệt',
                                'bg-green-700': borrow.status === 'Đã trả sách',
                                'bg-red-500': borrow.status === 'Đã từ chối',
                                'bg-black': borrow.status === 'Đang yêu cầu'
                            }">{{
                                borrow.status === 'Đã duyệt' ? 'Đang mượn' :
                                    borrow.status === 'Đã trả sách' ? 'Hoàn thành' :
                                        borrow.status === 'Đã từ chối' ? 'Đã bị từ chối' :
                                            borrow.status === 'Đang chờ duyệt' ? 'Đang chờ duyệt' : 'Đã yêu cầu trả sách'
                            }}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="flex-3 border bg-gray-100">
                <div class="p-3 w-[80%] m-auto rounded-xl flex flex-col" v-if="isEdit">
                    <h1 class=" font-bold text-blue-500 text-center pb-2">Thông tin của bạn</h1>
                    <Form @submit="sendaUpdate" :initial-values="valueUser" :validation-schema="userSchema"
                        class="space-y-2 h-auto w-full">
                        <div>
                            <label class="block font-semibold mb-1" for="fullname">Họ và tên</label>
                            <Field :class="{
                                'bg-gray-300': isDisable == true
                            }" :disabled="isDisable" class="px-3 py-2 w-full border-b-2" as="input" name="fullname">
                            </Field>
                            <ErrorMessage class=" text-red-500" name="fullname"></ErrorMessage>
                        </div>
                        <label for="gender" class="block text-gray-700 mb-1 font-medium">Giới tính</label>
                        <div class="flex gap-3">
                            <div class="flex items-center gap-2">
                                <Field :class="{
                                    'bg-gray-300': isDisable == true
                                }" :disabled="isDisable" type="radio" name="gender" value="Nam"
                                    class="p-2 text-blue-500 hover:ring-2 w-4 h-4 cursor-pointer">
                                </Field>
                                <span>Nam</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <Field :class="{
                                    'bg-gray-300': isDisable == true
                                }" :disabled="isDisable" type="radio" name="gender" value="Nữ"
                                    class="p-2 text-blue-500 hover:ring-2 w-4 h-4 cursor-pointer"></Field>
                                <span>Nữ</span>
                            </div>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="address">Địa chỉ</label>
                            <Field :class="{
                                'bg-gray-300': isDisable == true
                            }" :disabled="isDisable" class="px-3 py-2 w-full h-fit border-b-2" as="input"
                                name="address">
                            </Field>
                            <ErrorMessage class=" text-red-500" name="address"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="phone">Phone</label>
                            <Field :class="{
                                'bg-gray-300': isDisable == true
                            }" :disabled="isDisable" class="px-3 py-2 w-full border-b-2" as="input" name="phone">
                            </Field>
                            <ErrorMessage class=" text-red-500" name="phone"></ErrorMessage>
                        </div>
                        <div>
                            <label class="block font-semibold mb-1" for="email">Email</label>
                            <Field :class="{
                                'bg-gray-300': isDisable == true
                            }" :disabled="isDisable" class="px-3 py-2 w-full border-b-2" as="input" name="email">
                            </Field>
                            <ErrorMessage class=" text-red-500" name="email"></ErrorMessage>
                        </div>
                        <div @click="signalEdit" v-if="isDisable"
                            class="text-center mt-2 w-2/5 hover:cursor-pointer m-auto bg-blue-500 text-white text-sm font-semibold py-2 hover:ring hover:bg-blue-600 cur-p">
                            Chỉnh
                            sửa</div>
                        <div v-else class="flex flex-row gap-x-1">
                            <div @click="isDisable = !isDisable"
                                class="text-center mt-2 w-2/5 hover:cursor-pointer m-auto bg-gray-500 text-white text-sm font-semibold py-2 hover:ring hover:bg-gray-600 cur-p">
                                Thoát</div>
                            <button type="submit"
                                class="mt-2 w-2/5 hover:cursor-pointer m-auto bg-red-500 text-white text-sm font-semibold py-2 hover:ring hover:bg-blue-600 cur-p">Xác
                                nhận</button>
                        </div>
                    </Form>
                </div>
                <div class="w-3/4 m-auto" v-if="isDetail">
                    <BorrowDetail :borrow="borrowValue"></BorrowDetail>
                </div>
                <div v-if="isopenFavorite">
                    <div>
                        <h1 class=" font-bold text-blue-500 text-center pb-2">SÁCH ĐÃ ĐÁNH DẤU</h1>
                        <div class="flex flex-row justify-center flex-wrap">
                            <BookCard v-for="book_id in favoriteBook" :key="book_id" :book="bookStore.getBook(book_id)">
                            </BookCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>