<template>
    <div class="p-2">
        <h1 class=" font-bold text-blue-500 text-center pb-2 text-xl ">CHI TIẾT MƯỢN SÁCH</h1>
        <Form class="space-y-2 h-auto w-full" :initial-values="initborrow" :key="borrow._id">
            <div>
                <label class="block font-semibold mb-1" for="name">Tên Sách</label>
                <Field disabled class="px-3 py-2 w-full border-b-2" as="input" name="name"></Field>
                <ErrorMessage class=" text-red-500" name="name"></ErrorMessage>
            </div>
            <div>
                <label class="block font-semibold mb-1" for="fullname">Họ tên người mượn</label>
                <Field disabled class="px-3 py-2 w-full border-b-2" as="input" name="fullname"></Field>
                <ErrorMessage class=" text-red-500" name="fullname"></ErrorMessage>
            </div>
            <div>
                <label class="block font-semibold mb-1" for="phone">Liên hệ</label>
                <Field disabled class="px-3 py-2 w-full border-b-2" as="input" name="phone"></Field>
                <ErrorMessage class=" text-red-500" name="phone"></ErrorMessage>
            </div>
            <div>
                <label class="block font-semibold mb-1" for="borrowDate">Ngày mượn</label>
                <Field disabled class="px-3 py-2 w-full border-b-2" as="input" name="borrowDate">
                </Field>
                <ErrorMessage class=" text-red-500" name="borrowDate"></ErrorMessage>
            </div>
            <div>
                <label class="block font-semibold mb-1" for="returnDate">Ngày trả</label>
                <Field disabled class="px-3 py-2 w-full border-b-2" as="input" name="returnDate">
                </Field>
                <ErrorMessage class=" text-red-500" name="returnDate"></ErrorMessage>
            </div>
            <div>
                <label class="block font-semibold mb-1" for="note">Ghi chú</label>
                <Field disabled class="px-3 py-2 w-full border-b-2" as="input" name="note">
                </Field>
                <ErrorMessage class=" text-red-500" name="note"></ErrorMessage>
            </div>
            <div @click="sendaUpdate" v-if="borrow.status === `Đã duyệt`" class=" w-32 btn btn-neutral">
                Trả sách
            </div>
            <div v-if="borrow.status === `Đang yêu cầu`" class=" w-32 btn btn-neutral">
                Đã gửi yêu cầu trả sách
            </div>
        </Form>
    </div>
</template>
<script setup>
import { useBorrow } from "../store/borrowStore";
import { Form, Field, ErrorMessage } from "vee-validate";
import { computed } from "vue";
import borrowservice from "../services/borrow.service";
import { push } from "notivue";
import { useBook } from "../store/bookStore";
import { useUser } from "../store/userLogin";
const borrowStore = useBorrow()
const prop = defineProps({
    borrow: Object,
})
const getbook = (book_id) => {
    return useBook().getBook(book_id)
}
const initborrow = computed(() => {
    return {
        name: getbook(prop.borrow.book_id)?.name,
        fullname: prop.borrow.borrowName,
        note: prop.borrow.note,
        returnDate: prop.borrow.returnDate,
        borrowDate: prop.borrow.borrowDate,
        phone: prop.borrow.phone
    }

})
async function sendaUpdate(value) {
    try {
        const data = {
            status: "Đang yêu cầu"
        }
        await borrowservice.update(prop.borrow._id, data)
        await borrowStore.fetchborrows()
        push.info(`Đã gửi yêu cầu thành công!`)
        location.reload()
    }
    catch (error) {
        console.log(error)
    }
}
</script>