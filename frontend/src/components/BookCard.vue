<template>
    <div v-if="book" @click="gotoBorrow" class="group shadow-sm transition-all duration-100 hover:shadow-2xl">

        <figure class="aspect-[3/4] max-h-[250px] overflow-hidden relative border-10 border-amber-50">
            <i
                class="text-4xl  bg-orange-400 shadow-2xl rounded-3xl text-white opacity-0 group-hover:opacity-70 ease-out duration-100 transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 fa-solid fa-book-open"></i>
            <span
                class="absolute h-5 text-center bg-orange-400/75 backdrop-blur-md w-[56%] px-1 text-xs truncate top-0 left-0">{{
                    useAuthor().getauthorName(book.author) }}</span>
            <img :src="book.cover" :title="`${book.name} - ${useAuthor().getauthorName(book.author)}`"
                class=" h-full w-full object-cover hover:scale-110 transition-all duration-500 ease-in-out" />
            <span
                class="text-sm font-sans absolute bottom-0 h-8 p-1 w-full bg-black/75 truncate group-hover:line-clamp-none text-white font-bold text-left">{{
                    book.name
                }}</span>
            <!-- <div class="absolute inset-0 bg-black/10"></div> -->
        </figure>
    </div>
</template>
<script setup>
import { useUser } from '../store/userLogin';
import { useAuthor } from '../store/authorStore';

const userStore = useUser()
userStore.loadSession()
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
    book: Object,
})
async function gotoBorrow() {

    router.push(`/books/${props.book._id}`)
}
</script>