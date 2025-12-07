<template>
    <div class="bg-[#0b0c10] select-none">
        <div class="flex-col m-auto flex space-x-10 p-2 lg:px-40 sm:justify-center sm:flex-row space-y-2">
            <RouterLink to="/user/mybook"> <span v-if="userStore.isLogin && userStore.isUser"
                    class="btn btn-sm text-white font-bold w-23 h-8 hover:ring-2 bg-neutral-800 active:scale-105 hover:bg-white hover:text-black">MyBook</span>
            </RouterLink>

            <search @book-search="bookSearch"></search>
            <Sidebar class="hidden sm:inline" v-if="userStore.isLogin"></Sidebar>

            <div class="space-x-2 h-8 flex" v-if="!userStore.isLogin">
                <RouterLink class="btn-sm btn btn-active hover:ring transition-all hover:bg-neutral-700 duration-200
                hover:text-white" to="/user/register">Đăng ký</RouterLink>
                <RouterLink
                    class="btn-sm btn bg-neutral-800 text-white btn-active hover:ring transition-all hover:bg-white duration-200 hover:text-neutral-700"
                    to="/user/login">Đăng nhập</RouterLink>
            </div>
        </div>


    </div>
    <div class="px-30 mt-10 max-lg:px-5 select-none">
        <div class="w-full h-20 sm:h-10 bg-gray-900 flex flex-row pt-2 justify-evenly">
            <Sidebar class="hidden max-sm:inline" v-if="userStore.isLogin"></Sidebar>
            <div class="inline-block relative">
                <div @mouseenter="openAuthor = true" @mouseleave="openAuthor = false"
                    class="w-10 sm:w-56 h-20 sm:h-10 flex text-sm sm:justify-center sm:text-center font-medium text-white hover:text-orange-400 cursor-pointer">
                    <span class="">
                        {{ useAuthor().getAuthor(authorSelected)?.name || "TÁC GIẢ" }}
                    </span>

                </div>
                <div v-if="openAuthor"
                    class=" px-2 py-2 text-xs bg-gray-800 text-white mt-8 cursor-pointer z-50 absolute top-0 w-48 overflow-y-auto ease-in-out duration-300 transition-all"
                    @mouseenter="openAuthor = true" @mouseleave="openAuthor = false">
                    <div @click="authorSelected = ``" class=" h-6 hover:text-orange-400">
                        -- Tất cả --
                    </div>
                    <div v-for="author in useAuthor().authors" :key="author._id" @click="authorSelected = author._id"
                        class=" h-6 hover:text-orange-400">
                        {{ author.name }}
                    </div>

                </div>
            </div>
            <div class="inline-block relative">
                <div @mouseenter="openNXB = true" @mouseleave="openNXB = false"
                    class="w-10 sm:w-56 h-20 sm:h-10 flex text-sm sm:justify-center sm:text-center font-medium text-white hover:text-orange-400 cursor-pointer">
                    <span class="">
                        {{ usepublisher().getnamePublisher(NXBSelected) || "NHÀ XUẤT BẢN" }}
                    </span>

                </div>
                <div v-if="openNXB"
                    class=" px-2 py-2 text-xs bg-gray-800 text-white mt-8 cursor-pointer z-50 absolute top-0 w-48 overflow-y-auto ease-in-out duration-300 transition-all"
                    @mouseenter="openNXB = true" @mouseleave="openNXB = false">
                    <div @click="NXBSelected = ``" class=" h-6 hover:text-orange-400">
                        -- Tất cả --
                    </div>
                    <div v-for="publisher in usepublisher().publishers" :key="publisher._id"
                        @click="NXBSelected = publisher._id" class=" h-6 hover:text-orange-400">
                        {{ publisher.name }}
                    </div>

                </div>
            </div>
            <div class="inline-block relative">
                <div @mouseenter="openType = true" @mouseleave="openType = false"
                    class="w-10 sm:w-56 h-20 sm:h-10 flex text-sm sm:justify-center sm:text-center font-medium text-white hover:text-orange-400 cursor-pointer">
                    <span class="">
                        {{ TheloaiSelected || "THỂ LOẠI" }}
                    </span>

                </div>
                <div v-if="openType"
                    class=" px-2 py-2 text-xs bg-gray-800 text-white mt-8 cursor-pointer z-50 absolute top-0 w-48 overflow-y-auto ease-in-out duration-300 transition-all"
                    @mouseenter="openType = true" @mouseleave="openType = false">
                    <div @click="TheloaiSelected = ``" class=" h-6 hover:text-orange-400">
                        -- Tất cả --
                    </div>
                    <div v-for="type in types" :key=type @click="TheloaiSelected = type"
                        class=" h-6 hover:text-orange-400">
                        {{ type }}
                    </div>

                </div>

            </div>
            <div class="inline-block relative">
                <div @mouseenter="openLanguage = true" @mouseleave="openLanguage = false"
                    class="w-10 sm:w-56 h-20 sm:h-10 flex text-sm sm:justify-center sm:text-center font-medium text-white hover:text-orange-400 cursor-pointer">
                    <span class="">
                        {{ languageSelected || "NGÔN NGỮ" }}
                    </span>

                </div>
                <div v-if="openLanguage"
                    class=" px-2 py-2 text-xs bg-gray-800 text-white mt-8 cursor-pointer z-50 absolute top-0 w-48 overflow-y-auto ease-in-out duration-300 transition-all"
                    @mouseenter="openLanguage = true" @mouseleave="openLanguage = false">
                    <div @click="languageSelected = ``" class=" h-6 hover:text-orange-400">
                        -- Tất cả --
                    </div>
                    <div v-for="language in languageList" :key=language @click="languageSelected = language"
                        class=" h-6 hover:text-orange-400 ">
                        {{ language }}
                    </div>

                </div>
            </div>
            <div @click.stop="clearSearch" class="text-red-400">XÓA BỘ LỌC</div>

        </div>
        <div class="mt-7 space-y-2">

            <span v-if="authorSelected || TheloaiSelected || languageSelected || NXBSelected"
                class="text-orange-400 text-2xl px-5 py-2 font-medium">SÁCH VỚI</span>
            <h1 v-else class="text-orange-400 text-2xl px-5 py-2 font-medium">TẤT CẢ SÁCH</h1>
            <span v-if="authorSelected" class="group rounded-xl p-1 ml-2 inline-block text-center bg-orange-400/45 shadow-sm border font-sm
            hover:cursor-pointer relative">{{ useAuthor().getauthorName(authorSelected) }}
                <div title="Loại bỏ" @click="authorSelected = ''"
                    class="absolute font-medium group-hover:opacity-100 opacity-0 top-0 text-red-500 text-2xl flex translate-x-1/2 -translate-y-1/2 justify-center items-center right-0">
                    x</div>
            </span>
            <span v-if="TheloaiSelected" class="group rounded-xl p-1 ml-2 inline-block text-center bg-orange-400/45 shadow-sm border font-sm
            hover:cursor-pointer relative">{{ TheloaiSelected }}<div title="Loại bỏ" @click="TheloaiSelected = ''"
                    class="absolute font-medium group-hover:opacity-100 opacity-0 top-0 text-red-500 text-2xl flex translate-x-1/2 -translate-y-1/2 justify-center items-center right-0">
                    x</div></span>
            <span v-if="NXBSelected" class="group rounded-xl p-1 ml-2 inline-block text-center bg-orange-400/45 shadow-sm border font-sm
            hover:cursor-pointer relative">{{ usepublisher().getnamePublisher(NXBSelected) }}
                <div title="Loại bỏ" @click="NXBSelected = ''"
                    class="absolute font-medium group-hover:opacity-100 opacity-0 top-0 text-red-500 text-2xl flex translate-x-1/2 -translate-y-1/2 justify-center items-center right-0">
                    x</div>
            </span>
            <span v-if="languageSelected" class="group rounded-xl p-1 ml-2 inline-block text-center bg-orange-400/45 shadow-sm border font-sm
            hover:cursor-pointer relative">{{ languageSelected }}<div title="Loại bỏ" @click="languageSelected = ''"
                    class="absolute font-medium group-hover:opacity-100 opacity-0 top-0 text-red-500 text-2xl flex translate-x-1/2 -translate-y-1/2 justify-center items-center right-0">
                    x</div></span>
            <div v-if="books.length != 0">
                <div
                    class="grid max-[437px]:grid-cols-1 max-[668px]:grid-cols-2 max-[977px]:grid-cols-3 max-[1280px]:grid-cols-4 xl:grid-cols-6 gap-4 px-5 space-y-3">

                    <FreeCard class="col-span-2 row-span-2" :book="books[Math.floor(Math.random() * books.length)]" />
                    <bookCard class="" v-for="book in books" :key="book._id" :book></bookCard>
                </div>
            </div>
            <div v-else class="flex flex-col justify-center items-center mt-9 h-100 ">

                <i class="fa-solid fa-book text-center text-6xl mb-4"></i>
                <h1 class=" text-xl text-gray-600 bg-white max-w-md leading-relaxed mb-8">Hiện tại không có sách
                    nào phù hợp với
                    bộ lọc
                    hoặc từ khóa tìm kiếm của bạn.
                    Hãy thử thay đổi điều kiện tìm kiếm hoặc xóa bộ lọc để xem toàn bộ danh sách.
                </h1>
                <button @click.stop="clearSearch"
                    class="px-6 py-3 bg-black hover:bg-stone-700 text-white font-medium rounded-lg shadow-md transition-colors duration-200">
                    Xóa bộ lọc &amp; thử lại
                </button>
                <p class="text-sm mt-2" @click.stop="clearSearch">
                    Nhấn vào bất kỳ đâu trong khu vực này để đặt lại nhanh
                </p>

            </div>
            <!-- sach yeu thich -->
            <div v-if="userStore.isLogin" class=" relative p-2  px-5">
                <h1 class="text-orange-400 text-2xl py-2 font-medium">SÁCH ĐÃ ĐÁNH DẤU</h1>
                <button @click="scrollLeft4"
                    class="p-3 absolute rounded-full z-50 top-1/2 left-0 text-white bg-stone-700 cursor-pointer hover:scale-105">
                    < </button>
                        <button @click="scrollRight4"
                            class="p-3 absolute rounded-full z-50 top-1/2 right-0 text-white bg-stone-700 cursor-pointer hover:scale-105">
                            > </button>
                        <div ref="scroll4" class="space-x-2 flex overflow-x-auto scrollbar-hide scroll-smooth">
                            <bookCard class="w-35 flex-shrink-0" v-for="book_id in favoriteBook" :key="book_id"
                                :book="booksStore.books.find(b => b._id === book_id)">
                            </bookCard>
                        </div>
            </div>
            <!-- sach de cu -->
            <div class=" relative p-2  px-5">
                <h1 class="text-orange-400 text-2xl py-2 font-medium">SÁCH ĐỀ CỬ</h1>
                <button @click="scrollLeft"
                    class="p-3 absolute rounded-full z-50 top-1/2 left-0 text-white bg-stone-700 cursor-pointer hover:scale-105">
                    < </button>
                        <button @click="scrollRight"
                            class="p-3 absolute rounded-full z-50 top-1/2 right-0 text-white bg-stone-700 cursor-pointer hover:scale-105">
                            > </button>
                        <div ref="scroll" class="space-x-2 flex overflow-x-auto scrollbar-hide scroll-smooth">
                            <bookCard class="w-35 flex-shrink-0" v-for="book in useBook().books" :key="book._id"
                                :book="useBook().books[Math.floor(Math.random() * useBook().books.length)]">
                            </bookCard>
                        </div>
            </div>
            <!-- loc nam -->
            <div class="mt-3 relative p-2 px-5 space-y-3">
                <span class="text-orange-400 text-2xl px-5 py-5 font-medium">SÁCH THEO QUA CÁC NĂM XUẤT BẢN</span>
                <span @click.stop="namselected = null"
                    class="rounded-xl p-1 ml-2 inline-block w-14 text-center hover:scale-110 shadow-sm border font-sm hover:cursor-pointer"
                    :class="{ 'bg-orange-400/45': !namselected }">Tất cả</span>
                <span @click.stop="namselected = nam"
                    class="rounded-xl p-1 ml-2 inline-block w-14 text-center hover:scale-110 shadow-sm border font-sm hover:cursor-pointer"
                    :class="{ 'bg-orange-400/45': nam == namselected }" v-for="nam in namxb" :key="nam">{{
                        nam
                    }}</span>
                <button @click="scrollLeft2"
                    class="p-3 absolute rounded-full z-50 top-1/2 left-0 text-white bg-stone-700 cursor-pointer hover:scale-105">
                    < </button>
                        <button @click="scrollRight2"
                            class="p-3 absolute rounded-full z-50 top-1/2 right-0 text-white bg-stone-700 cursor-pointer hover:scale-105">
                            > </button>
                        <div ref="scroll2" class="space-x-2 flex overflow-x-auto scrollbar-hide scroll-smooth">
                            <bookCard class="w-35 flex-shrink-0" v-for="book in filterNam" :key="book._id" :book>
                            </bookCard>
                        </div>
            </div>

            <!-- loc tac gia -->
            <div class="mt-3 relative p-2 px-5 space-y-3 space-x-1">
                <span class="text-orange-400 text-2xl px-5 py-5 font-medium">SÁCH THEO TÁC GIẢ</span>
                <span @click.stop="authorByselected = null"
                    class="rounded-xl p-1 ml-2 w-14 inline-block text-center hover:scale-110 shadow-sm border font-sm hover:cursor-pointer"
                    :class="{ 'bg-orange-400/45': !authorByselected }">Tất cả</span>
                <span @click.stop="authorByselected = author._id"
                    class="rounded-xl p-1 ml-2 my-1 inline-block text-center hover:scale-110 shadow-sm border font-sm hover:cursor-pointer"
                    :class="{ 'bg-orange-400/45': author._id == authorByselected }"
                    v-for="author in useAuthor().authors" :key="author">{{
                        author.name
                    }}</span>
                <button @click="scrollLeft3"
                    class="p-3 absolute rounded-full z-50 top-1/2 left-0 text-white bg-stone-700 cursor-pointer hover:scale-105">
                    < </button>
                        <button @click="scrollRight3"
                            class="p-3 absolute rounded-full z-50 top-1/2 right-0 text-white bg-stone-700 cursor-pointer hover:scale-105">
                            > </button>
                        <div ref="scroll3" class="space-x-2 flex overflow-x-auto scrollbar-hide scroll-smooth">
                            <bookCard class="w-35 flex-shrink-0" v-for="book in filterAuthor" :key="book._id" :book>
                            </bookCard>
                        </div>
            </div>


        </div>

    </div>
</template>

<script setup>
import { useUser } from "../store/userLogin";
const userStore = useUser();
userStore.loadSession()
// console.log(userStore.user)
import FreeCard from "../components/FreeCard.vue";
import Sidebar from "../components/Sidebar.vue";
import search from "../components/search.vue";
import bookCard from "../components/BookCard.vue"
import { useBook } from "../store/bookStore";
import { computed, onMounted, ref } from "vue";
import { useAuthor } from "../store/authorStore";
import { usepublisher } from "../store/publisherStore";
import { useListUser } from "../store/userStore";

// const loading = ref(false)
const ListuserStore = useListUser()
const user = computed(() => {
    return ListuserStore.users.find(u => u._id === userStore.user?._id)
})

const booksStore = useBook();
const namxb = [...new Set(useBook().books.map(b => b.namxb))].sort((a, b) => a - b)
const favoriteBook = computed(() => {
    if (user.value) {
        return user.value.favoriteBook
    } return []
})

const namselected = ref('')
const authorByselected = ref('')


const filterNam = computed(() => {
    if (!namselected.value) return useBook().books
    return useBook().books.filter(book => book.namxb == namselected.value)
})
const filterAuthor = computed(() => {
    if (!authorByselected.value) return useBook().books

    return useBook().books.filter(book => book.author == authorByselected.value)

})



// console.log(namxb)
// console.log(namselected.value)
// console.log(filterAuthor.value)
const openAuthor = ref(false)
const openType = ref(false)
const openNXB = ref(false)
const openLanguage = ref(false)

const scroll = ref(null)
const scroll2 = ref(null)
const scroll3 = ref(null)
const scroll4 = ref(null)
const scrollLeft = () => scroll.value?.scrollBy({
    left: -600,
    behaviour: 'smooth'
})
const scrollRight = () => scroll.value?.scrollBy({
    left: 600,
    behaviour: 'smooth'
})
const scrollLeft2 = () => scroll2.value?.scrollBy({
    left: -600,
    behaviour: 'smooth'
})
const scrollRight2 = () => scroll2.value?.scrollBy({
    left: 600,
    behaviour: 'smooth'
})
const scrollLeft3 = () => scroll3.value?.scrollBy({
    left: -600,
    behaviour: 'smooth'
})
const scrollRight3 = () => scroll3.value?.scrollBy({
    left: 600,
    behaviour: 'smooth'
})
const scrollLeft4 = () => scroll4.value?.scrollBy({
    left: -600,
    behaviour: 'smooth'
})
const scrollRight4 = () => scroll4.value?.scrollBy({
    left: 600,
    behaviour: 'smooth'
})


const keyValue = ref('')
const languageSelected = ref('')
const authorSelected = ref('')
const NXBSelected = ref('')
const TheloaiSelected = ref('')
const types = ["Truyện ngắn",
    "Tiểu thuyết",
    "Khoa học",
    "Lịch sử",
    "Tâm lý",
    "Giáo dục",
    "Văn học thiếu nhi",
    "Trinh thám",
    "Fantasy",
    "Tự truyện",
    "Kinh doanh"]
const languageList = [
    "Tiếng Việt",
    "English",
    "Tiếng Pháp",
    "Tiếng Nhật",
    "Tiếng Hàn",
    "Tiếng Trung",
    "Tiếng Đức",
    "Tiếng Ý",
    "Tiếng Tây Ban Nha",
    "Tiếng Nga"
]

const books = computed(() => {
    // loading.value = true
    const key = (keyValue.value || '').toLowerCase().trim();
    let result = booksStore.books
    if (key)
        result = result.filter(book => book.name.toLowerCase().includes(key))
    if (TheloaiSelected.value)
        result = result.filter(book => book.type === TheloaiSelected.value)
    if (authorSelected.value)
        result = result.filter(book => book.author === authorSelected.value)
    if (NXBSelected.value)
        result = result.filter(book => book.nxb === NXBSelected.value)
    if (languageSelected.value)
        result = result.filter(book => book.language === languageSelected.value)
    // await new Promise(r => setTimeout(r, 1000))
    // loading.value = true
    return result
})
// console.log(books.value)

const clearSearch = () => {
    keyValue.value = ''
    authorSelected.value = ''
    TheloaiSelected.value = ''
    NXBSelected.value = ''
    languageSelected.value = ''
}
function bookSearch(key) {
    keyValue.value = key
}
</script>
