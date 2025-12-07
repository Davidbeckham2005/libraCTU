<template>
    <div class="bg-[#0b0c10] ">
        <div @click="back" class="flex flex-col sm:flex-row sm:space-x-10 space-y-2 p-2 justify-center">
            <div class="flex flex-row space-x-3 sm:hidden">
                <Sidebar @click.stop v-if="userStore.isLogin"></Sidebar>
                <RouterLink @click.stop to="/books"><span v-if="userStore.isLogin && userStore.isUser"
                        class="btn btn-sm text-white font-bold w-23 h-8 hover:ring-2 bg-neutral-800 active:scale-105 hover:bg-white hover:text-black">Trang
                        Chủ</span>
                </RouterLink>
                <RouterLink @click.stop to="/user/mybook"><span v-if="userStore.isLogin && userStore.isUser"
                        class="btn btn-sm text-white font-bold w-23 h-8 hover:ring-2 bg-neutral-800 active:scale-105 hover:bg-white hover:text-black">MyBook</span>
                </RouterLink>
            </div>
            <RouterLink @click.stop to="/books" class="hidden sm:inline"> <span
                    v-if="userStore.isLogin && userStore.isUser"
                    class="btn btn-sm text-white font-bold w-23 h-8 hover:ring-2 bg-neutral-800 active:scale-105 hover:bg-white hover:text-black">Trang
                    Chủ</span>
            </RouterLink>
            <RouterLink @click.stop to="/user/mybook" class="hidden sm:inline"> <span
                    v-if="userStore.isLogin && userStore.isUser"
                    class="btn btn-sm text-white font-bold w-23 h-8 hover:ring-2 bg-neutral-800 active:scale-105 hover:bg-white hover:text-black">MyBook</span>
            </RouterLink>
            <search class="hidden sm:inline"></search>
            <Sidebar @click.stop class="hidden sm:inline" v-if="userStore.isLogin"></Sidebar>
            <div class="space-x-2 h-8" v-if="!userStore.isLogin">
                <RouterLink @click.stop class="btn-sm btn hover:ring transition-all hover:bg-neutral-700 duration-200
                hover:text-white" to="/user/register">Đăng ký</RouterLink>
                <RouterLink @click.stop
                    class="btn-sm btn bg-neutral-800 text-white hover:ring transition-all hover:bg-white duration-200 hover:text-neutral-700"
                    to="/user/login">Đăng nhập</RouterLink>
            </div>
        </div>
        <div class="flex-col sm:flex-row min-h-screen shadow-2xs flex">
            <div class="flex flex-col flex-3 gap-2 items-center bg-white shadow-2xl p-5">
                <!-- them yeu thich -->
                <figure class=" px-2 py-4 shadow-2xl relative">
                    <i v-if="useUser().isLogin" @click="changeFavorite" :title="isFavorite ? 'Bỏ đánh dấu' : 'Đánh dấu'"
                        class="absolute top-2 right-4 fa-solid fa-bookmark text-4xl hover:cursor-pointer hover:scale-110 select-none "
                        :class="{ 'text-orange-600': isFavorite }"></i>
                    <img :src="book.cover" class="h-90  aspect-[3/4]">
                </figure>

                <button class="btn bg-neutral-800 text-white hover:bg-white hover:text-black hover:ring-2"
                    @click="BorrowAdd" :disabled="book.sl === 0" :class="{ 'bg-red-600': book.sl == 0 }">Mượn
                    sách</button>
            </div>
            <div class="flex-10 flex flex-col p-4 bg-white">
                <div class="flex w-full gap-x-6 my-3 items-center h-15">
                    <span @click="showView"
                        class="text-center ml-6 w-28 text-gray-600 hover:cursor-pointer hover:rounded-xl hover:bg-gray-300 px-3 py-1"
                        :class="{
                            'bg-gray-300 rounded-xl scale-110': isView
                        }">Tổng
                        quan</span>
                    <span @click="showAuthor"
                        class="text-center ml-6 w-28 text-gray-600 hover:cursor-pointer hover:rounded-xl hover:bg-gray-300 px-3 py-1"
                        :class="{
                            'bg-gray-300 rounded-xl scale-110': isAuthor
                        }">Tác
                        giả</span>
                    <span @click="showPublisher"
                        class="text-center ml-6 w-28 text-gray-600 hover:cursor-pointer hover:rounded-xl hover:bg-gray-300 px-3 py-1"
                        :class="{
                            'bg-gray-300 rounded-xl scale-110': isPublisher
                        }">Xuất
                        bản </span>
                    <span @click="showComment"
                        class="text-center ml-6 w-28 text-gray-600 hover:cursor-pointer hover:rounded-xl hover:bg-gray-300 px-3 py-1 "
                        :class="{
                            'bg-gray-300 rounded-xl scale-110': isComment
                        }">Đánh
                        giá</span>
                    <!-- <span
                            class="text-center ml-6 w-28 text-gray-600 hover:cursor-pointer hover:rounded-xl hover:bg-gray-300 px-3 py-1 ">Liên
                            quan</span>  -->
                </div>
                <div v-if="isView">
                    <div class="p-2 px-3 space-y-4">
                        <h1 class="font-bold text-3xl hover:underline ">{{ book.name }}</h1>
                        <h1 @click="showAuthor" class="text-2xl font-serif hover:underline">{{
                            useAuthor().getauthorName(book.author) }}
                        </h1>
                        <div class="flex flex-row gap-x-7">

                            <span>⭐⭐⭐⭐⭐</span><span>25 đã đọc</span><span>{{ book.view }} lượt xem</span><span
                                @click="showComment" class="hover:underline hover:text-blue-500 cursor-pointer"
                                title="xem bình luận">{{
                                    Object.keys(listComments).length }} Bình luận</span>
                        </div>
                        <p class="">{{ book.des }}</p>
                    </div>
                    <div class="flex gap-x-1 w-full justify-evenly sm:gap-x-6 my-3 items-center h-auto">
                        <span
                            class="text-center ml-2 border w-30 sm:h-19 h-35   text-gray-600 hover:cursor-pointer hover:bg-gray-300 px-2  py-1 ">Thể
                            loại
                            <br><span class="text-sm">
                                {{ book.type }}
                            </span></span>
                        <span
                            class="text-center ml-2 border w-30 sm:h-19 h-35 text-gray-600 hover:cursor-pointer hover:bg-gray-300 px-2  py-1 ">Sáng
                            tác <br><span class="text-sm font-serif">
                                năm {{ book.namxb }}
                            </span></span>
                        <span @click="showPublisher"
                            class="text-center ml-2 border w-30 sm:h-19 h-35   text-gray-600 hover:cursor-pointer hover:bg-gray-300 px-2  py-1 ">Nhà
                            xuất bản <br><span class="text-sm underline">
                                {{ usepublisher().getnamePublisher(book.nxb) }}
                            </span></span>
                        <span
                            class="text-center ml-2 border w-30 sm:h-19 h-35   text-gray-600 hover:cursor-pointer hover:bg-gray-300 px-2  py-1 ">Ngôn
                            ngữ <br><span class="text-sm">
                                {{ book.language }}
                            </span></span>
                        <span
                            class="text-center ml-2 border w-30 sm:h-19 h-35   text-gray-600 hover:cursor-pointer hover:bg-gray-300 px-2  py-1 ">Số
                            trang
                            <br><span class="text-sm font-serif">
                                {{ book.page }}
                            </span></span>
                        <span
                            class="text-center ml-2 border w-30 sm:h-19 h-35   text-gray-600 hover:cursor-pointer hover:bg-gray-350 px-2  py-1 ">Số
                            lượng
                            <br><span class="text-sm font-serif" :class="{ 'text-red-600': book.sl == 0 }">
                                {{ book.sl }}
                            </span></span>

                    </div>
                </div>
                <!-- tac gia -->
                <div v-if="isAuthor">
                    <div class="flex">
                        <div class="w-[70%]">
                            <h1 class="text-3xl">{{ author.name }} - {{ author.write }}</h1>
                            <p class=" font-mono mt-4 leading-relaxed overflow-hidden">{{ author.gioithieu }}</p>
                            <div class=" font-medium text-2xl">Các tác phẩm khác của {{
                                author.name }}
                            </div>
                            <div class=" leading-relaxed space-x-2.5" @click="isView">
                                <span class="underline cursor-pointer hover:text-blue-600" @click="next(book._id)"
                                    v-for="book in listByAuthor" :key="book._id">{{
                                        book.name }}</span>
                            </div>
                        </div>
                        <div class="w-[30%] flex justify-end p-2">
                            <figure class="px-2 py-4 shadow-2xl">
                                <img src="/v.png" class="h-90">
                                <h1 class="text-xl font-serif text-center">{{ author.name }} - {{ author.birthday }}
                                    -
                                    {{
                                        author.country }}
                                </h1>
                            </figure>
                        </div>

                    </div>
                </div>
                <div v-if="isPublisher">
                    <div class="px-2 shadow-lg p-2 rounded">
                        <div class=" font-medium text-2xl">Các tác phẩm khác của nhà xuất bản {{
                            usepublisher().getnamePublisher(book.nxb) }}

                            <div class="flex flex-row">
                                <bookCard @click.stop="next(book._id)" v-for="book in listByPublicsher" :key="book._id"
                                    :book></bookCard>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- comment -->
                <div v-if="isComment">
                    <div class="flex justify-between h-15">
                        <span>{{ Object.keys(listComments).length }} Bình luận</span>
                        <div class="select-none">
                            <span></span>
                            <select class="border-none">
                                <option value="">mới nhất</option>
                                <option value="">cũ nhất</option>
                            </select>
                        </div>
                    </div>
                    <div v-if="userStore.isLogin && isComment" class="h-40 relative">
                        <form @submit.prevent="sendComment" @keydown.enter.prevent="sendComment">
                            <textarea autofocus="" v-model="newComment" placeholder="Nhập nhận xét của bạn..." class="textarea textarea-bordered w-full resize-none focus:outline-none focus:textarea-primary 
                     transition-all duration-200"></textarea>
                            <div class="h-12 w-full bg-black/20"> <button type="submit" :disabled="!newComment"
                                    class="absolute right-3 bottom-10 btn btn-sm text-white font-bold w-20 h-8 hover:ring-2 bg-neutral-800 active:scale-105 hover:bg-white hover:text-black ">
                                    <span v-if="!loading">Đăng tải</span>
                                    <span v-else class="loading loading-spinner loading-xs"></span>
                                </button></div>
                        </form>
                    </div>
                    <div>
                        <div v-for="comment in listComments" :key="comment" class="">
                            <div class="chat chat-start">
                                <div class="chat-image avatar">
                                    <div class="w-10 h-10">
                                        <img :src="`${ListuserStore.getUser(comment.user_id).avatar}.png`" alt="image">
                                    </div>
                                </div>
                                <div class="chat-header text-blue-600/90">
                                    {{ ListuserStore.getUser(comment.user_id).fullname || "anonymous" }}

                                </div>
                                <div class="chat-bubble">{{ comment.content }}</div>
                                <div class="chat-footer">
                                    <span class="text-blue-600/90 mr-2">Like - Reply</span>

                                    <span class="text-gray-400">{{ comment.time }}</span>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
    <!-- <div class="h-screen absolute bg-black/30 inset-0"></div> -->
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import search from "./search.vue";
import { RouterLink, useRoute } from 'vue-router';
import bookCard from "./BookCard.vue";
import { useAuthor } from "../store/authorStore";
import { useBook } from '../store/bookStore';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue'
import { push } from "notivue";
import userService from "../services/user.service";
import { useUser } from "../store/userLogin";
import { usepublisher } from "../store/publisherStore";
import { useListUser } from "../store/userStore";
import bookService from "../services/book.service";
const ListuserStore = useListUser()
const userStore = useUser()
const isView = ref(true)
const isAuthor = ref(false)
const isPublisher = ref(false)
const isComment = ref(false)

const router = useRouter();
const booksStore = useBook();
const route = useRoute();
const id = (route.params.id)
const book = booksStore.books.find(book => book._id === id)
const author = useAuthor().getAuthor(book.author)

const listByPublicsher = computed(() => {
    const nxb = usepublisher().getPublisher(book.nxb)?._id
    return useBook().books.filter(b => b?.nxb == nxb && b != book)
})
const listByAuthor = computed(() => {
    const author = useAuthor().getAuthor(book.author)?._id
    return useBook().books.filter(b => b?.author == author && b != book)
})

const user = computed(() => {
    return ListuserStore.getUser(userStore.user?._id)
})
// console.log(ListuserStore.users)
// console.log(userStore.user?._id)
// console.log(user.value)
function showView() {
    isView.value = true
    isAuthor.value = false
    isPublisher.value = false
    isComment.value = false
}
function showAuthor() {
    isAuthor.value = true
    isView.value = false
    isPublisher.value = false
    isComment.value = false
}
function showPublisher() {
    isPublisher.value = true
    isAuthor.value = false
    isView.value = false
    isComment.value = false
}
function showComment() {
    isPublisher.value = false
    isAuthor.value = false
    isView.value = false
    isComment.value = true
}
const back = () => {
    router.push("/books")
}
const next = (id) => {
    // console.log(id)
    router.push(`/books/${id}`)
}
async function BorrowAdd() {

    router.push(`/borrow/${id}`)
}
//comment
const listComments = computed(() => {
    return booksStore.books.find(b => b._id === id)?.comments || {}
})
// console.log(listComments.value)
const loading = ref(false)
// console.log(typeof (listComments.value))
const newComment = ref('')
async function sendComment() {
    if (!newComment.value) return
    loading.value = true
    try {
        const data = {
            content: newComment.value,
            user_id: user.value?._id
        }
        await bookService.addComment(id, data)
        //them do delay cho comment
        await new Promise(r => setTimeout(r, 1000))
        newComment.value = ''
        await booksStore.fetchBooks()
        push.info("Đã thêm mới 1 bình luận")
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}
const arrayKey = Object.keys(listComments.value)
// console.log(arrayKey.length)
//yeu thich
const listFavorite = computed(() => {
    if (user.value) {
        return user.value.favoriteBook
    }
    return []
})
// console.log((listFavorite.value))
const isFavorite = computed(() => {
    if (!listFavorite.value) return
    if (listFavorite.value.includes(id)) {
        return true
    } return false
})
// console.log(isFavorite.value)
async function changeFavorite() {
    try {
        const data = {
            user_id: user.value?._id,
        }
        // console.log(id, data, isFavorite.value)

        if (isFavorite.value) {
            await userService.removeFavorite(id, data)
            // await new Promise(r => setTimeout(r, 300))
            push.success("Bỏ đánh dấu thành công")
        } else {
            await userService.addFavorite(id, data)
            // await new Promise(r => setTimeout(r, 300))
            push.success("Đánh dấu thành công")
        }
        await ListuserStore.fetchUsers()
    } catch (error) {
        console.log(error)
    }
}


</script>