<template>
    <div>
        <!-- <i class="fa-solid fa-user text-sm sm:text-2xl align-text-top h-8 sm:mr-2" @click="isOpen = !isOpen"></i> -->
        <button @click=" isOpen = !isOpen"
            class="bg-gray-800 text-white text-xl h-8 hover:bg-white hover:text-black transition btn btn-sm z-1"><i
                class="fa-solid fa-list"></i></button>
        <div v-if="isOpen" class="fixed inset-0 bg-black opacity-15 z-1" @click="isOpen = !isOpen"></div>

        <div>
            <div v-if="isOpen"
                class="fixed top-0 right-0 w-88 max-sm:w-55 h-screen shadow-2xl z-56 bg-white animation-truot flex flex-col">
                <div class="flex-1 overflow-y-auto space-y-3 pl-2 p-2 border shadow-2xl">
                    <div>
                        <div v-if="user.role === `user`" class="flex flex-row space-x-2">
                            <h1 class="font-semibold text-neutrol-500 text-lg boder-b">Sách của
                                {{
                                    user.fullname }}
                            </h1>

                        </div>

                        <h1 v-else class="font-semibold text-neutrol-500 text-lg boder-b">Hello! Admin
                        </h1>
                    </div>
                    <hr>


                    <div class="w-full h-10" v-if="userStore.isUser">
                        <div @click="mybook"
                            class="text-neutrol-800 font-bold hover:bg-yellow-100 w-full pl-2 hover:cursor-pointer">
                            My book
                        </div>
                        <hr>
                    </div>
                    <div class="w-full h-10">
                        <div @click="logout"
                            class="text-neutrol-800 font-bold text-red-500 hover:bg-yellow-100 w-full pl-2 hover:cursor-pointer">
                            Đăng suất</div>
                        <hr class="mt-2 text-stone-600">
                    </div>
                    <h1 v-if="user.role === `user`" class="font-semibold text-neutrol-500 text-lg pl-2">Thông
                        tin người
                        dùng <i @click.stop="mybook" class="fa-solid fa-gear ml-2 text-sm hover:text-red-500"></i>
                    </h1>
                    <hr v-if="user.role === `user`">
                    <div>
                        <div v-if="user.role === `user`" class="flex flex-col justify-between space-y-2 p-2">
                            <span class="font-semibold pb-0.5 text-gray-800 p-1 mb-2"><i class="fa-solid fa-user"></i>
                                Người
                                dùng:
                                {{ user.fullname }}

                            </span>

                            <span class="font-semibold text-gray-800 p-1 mb-2"><i class="fa-solid fa-phone"></i>
                                Điện
                                thoại:
                                {{ user.phone }}
                            </span>
                            <span class="font-semibold text-gray-800 p-1 mb-2"><i class="fa-solid fa-envelope"></i>
                                Email:
                                {{ user.email }}
                            </span>


                        </div>
                        <div v-if="user.role === 'admin'">
                            <div class="flex flex-col justify-betwwen space-y-4">
                                <RouterLink to="/staff/manaBook"
                                    class="font-semibold text-gray-800 hover:bg-yellow-100 p-1">
                                    <div class="flex flex-row justify-between">
                                        <div>
                                            <i class="fa-solid fa-book"></i> Quản lí sách
                                        </div>
                                        <i v-if="currentPage === `/staff/manaBook`"
                                            class="fa-solid fa-pen animate-pulse text-red-400"></i>
                                    </div>
                                </RouterLink>
                                <RouterLink to="/staff/manaUser"
                                    class="font-semibold text-gray-800 hover:bg-yellow-100 p-1">
                                    <div class="flex flex-row justify-between">
                                        <div>
                                            <i class="fa-solid fa-users"></i> Danh sách người dùng
                                        </div>
                                        <i v-if="currentPage === `/staff/manaUser`"
                                            class="fa-solid fa-pen animate-pulse text-red-400"></i>

                                    </div>
                                </RouterLink>
                                <RouterLink to="/staff/manaAuthor"
                                    class="font-semibold text-gray-800 hover:bg-yellow-100 p-1">
                                    <div class="flex flex-row justify-between">
                                        <div>
                                            <i class="fa-solid fa-marker"></i> Danh sách tác giả
                                        </div>
                                        <i v-if="currentPage === `/staff/manaAuthor`"
                                            class="fa-solid fa-pen animate-pulse text-red-400"></i>
                                    </div>
                                </RouterLink>
                                <RouterLink to="/staff/manaBorrow"
                                    class="font-semibold text-gray-800 hover:bg-yellow-100 p-1">
                                    <div class="flex flex-row justify-between">
                                        <div>
                                            <i class="fa-solid fa-book-open-reader"></i> Danh sách mượn
                                        </div>
                                        <i v-if="currentPage === `/staff/manaBorrow`"
                                            class="fa-solid fa-pen animate-pulse text-red-400"></i>
                                    </div>


                                </RouterLink>
                                <RouterLink to="/staff/manapublisher"
                                    class="font-semibold text-gray-800 hover:bg-yellow-100 p-1">
                                    <div class="flex flex-row justify-between">
                                        <div>
                                            <i class="fa-solid fa-building"></i> Danh sách nhà xuất bản
                                        </div>
                                        <i v-if="currentPage === `/staff/manapublisher`"
                                            class="fa-solid fa-pen animate-pulse text-red-400"></i>
                                    </div>


                                </RouterLink>
                                <RouterLink to="/staff/manaAdmin"
                                    class="font-semibold text-gray-800 hover:bg-yellow-100 p-1">
                                    <div class="flex flex-row justify-between">
                                        <div>
                                            <i class="fa-solid fa-user-tie"></i> Admin
                                        </div>
                                        <i v-if="currentPage === `/staff/manaAdmin`"
                                            class="fa-solid fa-pen animate-pulse text-red-700"></i>
                                    </div>

                                </RouterLink>
                            </div>
                        </div>
                        <h1 class="font-semibold text-neutrol-500 text-lg boder-b p-2">Chức năng khác
                        </h1>
                        <hr>
                        <div class="w-full p-2 h-12">
                            <div class="text-neutrol-800 pb-2 hover:bg-yellow-100 w-full pl-2 hover:cursor-pointer">
                                Về LibraCTU</div>
                            <hr class="text-stone-600">
                        </div>
                        <div class="w-full p-2 h-12">
                            <div class="text-neutrol-800 pb-2 hover:bg-yellow-100 w-full pl-2 hover:cursor-pointer">
                                Chủ
                                đề</div>
                            <hr class="text-stone-600">
                        </div>
                        <div class="w-full p-2 h-12">
                            <div class="text-neutrol-800 pb-2 hover:bg-yellow-100 w-full pl-2 hover:cursor-pointer">
                                Tác giả</div>
                            <hr class="text-stone-600">
                        </div>
                        <div class="w-full p-2 h-12">
                            <div class="text-neutrol-800 pb-2 hover:bg-yellow-100 w-full pl-2 hover:cursor-pointer">
                                List</div>
                            <hr class="text-stone-600">
                        </div>
                        <div class="w-full p-2 h-12">
                            <div class="text-neutrol-800 pb-2 hover:bg-yellow-100 w-full pl-2 hover:cursor-pointer">
                                Sách nói (VoiceSM)</div>
                            <hr class="text-stone-600">
                        </div>
                        <div class="w-full p-2 h-12">
                            <div class="text-neutrol-800 pb-2 hover:bg-yellow-100 w-full pl-2 hover:cursor-pointer">
                                Phòng đọc sách</div>
                            <hr class="text-stone-600">
                        </div>

                        <h1 class="font-semibold text-neutrol-500 text-lg boder-b p-2">Resources

                        </h1>
                        <hr>
                        <div class="w-full p-2 h-12">
                            <div class="text-neutrol-800 pb-2 hover:bg-yellow-100 w-full pl-2 hover:cursor-pointer">
                                Help & Support</div>
                            <hr class="text-stone-600">
                        </div>
                        <div class="w-full p-2 h-12">
                            <div class="text-neutrol-800 pb-2 hover:bg-yellow-100 w-full pl-2 hover:cursor-pointer">
                                CT449 - Ứng dụng Web</div>
                            <hr class="text-stone-600">
                        </div>
                        <div class="w-full p-2 h-12">
                            <div class="text-neutrol-800 pb-2 hover:bg-yellow-100 w-full pl-2 hover:cursor-pointer">
                                Trung Tâm phát triển</div>
                            <hr class="text-stone-600">
                        </div>
                        <h1 class="font-semibold text-neutrol-500 text-lg boder-b p-2">Liên hệ
                        </h1>
                        <hr>
                        <div class="w-full p-2 h-12">
                            <div class="text-neutrol-800 pb-2 hover:bg-yellow-100 w-full pl-2 hover:cursor-pointer">
                                <i class="fa-brands fa-facebook"></i>
                                Facebook
                            </div>
                            <hr class="text-stone-600">
                        </div>
                        <div class="w-full p-2 h-12">
                            <div class="text-neutrol-800 pb-2 hover:bg-yellow-100 w-full pl-2 hover:cursor-pointer">
                                <i class="fa-brands fa-github"></i>
                                Github
                            </div>
                            <hr class="text-stone-600">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, resolveDirective } from 'vue';
import { useUser } from '../store/userLogin';
import { push } from 'notivue';
import router from '../router';
import { useRoute } from 'vue-router';
import { useListUser } from '../store/userStore';

const openAvatar = ref(false)
const userStore = useUser();
const ListuserStore = useListUser()
const route = useRoute();
const isOpen = ref(false);

userStore.loadSession()

const id = userStore.user?._id
const user = computed(() => {  //tim trong list user neu ko co thi user do la admin voi user.role = admin
    return ListuserStore.users.find(u => u._id === id) || userStore.user
})
const logout = () => {
    userStore.logout()
    router.push("/")
    push.success("Đăng xuất thành công!")
}
const mybook = () => {
    router.push("/user/mybook")
}

const currentPage = ref()
currentPage.value = route.fullPath
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