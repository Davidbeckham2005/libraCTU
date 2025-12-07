<template>
    <div v-if="!$route.meta.notshow" class="w-full flex flex-row justify-center p-1">
        <RouterLink to="/books" class="ml-2 text-base md:text-lg lg:text-xl font-bold hover:underline">
            LibraCTU
        </RouterLink>
    </div>
    <Notivue v-slot="item">
        <NotivueSwipe :item="item">
            <Notification :item="item">
                <NotificationProgress :item="item" />
            </Notification>
        </NotivueSwipe>
    </Notivue>
    <RouterView :key="$route.params.id"></RouterView>
    <Footer v-if="!$route.meta.notshow" class=" select-none"></Footer>
</template>
<script setup>
import { Notivue, Notification, NotificationProgress, NotivueSwipe } from 'notivue';
import Footer from './components/Footer.vue';
import { onMounted } from 'vue';
import { useBook } from './store/bookStore';
import { useAuthor } from './store/authorStore';
import { usepublisher } from './store/publisherStore';
import { useBorrow } from './store/borrowStore';
import { useListUser } from './store/userStore';
import { useStaff } from './store/staffStore';
const ListuserStore = useListUser()
const borrowStore = useBorrow()
const bookStore = useBook()
const publisherStore = usepublisher()
const authorStore = useAuthor()
const staffStore = useStaff()
onMounted(() => {
    ListuserStore.fetchUsers()
    borrowStore.fetchborrows()
    bookStore.fetchBooks()
    authorStore.fetchAuthor()
    staffStore.fetchUsers()
    publisherStore.fetchpublishers()
})
</script>
