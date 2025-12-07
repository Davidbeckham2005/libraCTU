<template>
    <div>
        <div class="flex max-[1296px]:flex-col ml-4 justify-between p-2">
            <routerLink to="/books"><i class="fa-solid fa-list"></i>Xem sách</routerLink>


            <Sidebar></Sidebar>


        </div>
        <Form :initial-values="initvalue" @submit="updateAdmin" class="m-auto flex flex-col space-y-2 w-1/3">
            <h1 class="font-bold text-blue-500 text-center pb-2">Thông tin Admin</h1>
            <div>
                <label class="block font-semibold mb-1" for="name">Họ và tên</label>
                <Field :class="{
                    'bg-gray-300': isDisable == true
                }" :disabled="isDisable" class="px-3 py-2 w-full border-b-2" as="input" name="name">
                </Field>
                <ErrorMessage class=" text-red-500" name="name"></ErrorMessage>
            </div>

            <div>
                <label class="block font-semibold mb-1" for="address">Địa chỉ</label>
                <Field :class="{
                    'bg-gray-300': isDisable == true
                }" :disabled="isDisable" class="px-3 py-2 w-full h-fit border-b-2" as="input" name="address">
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

            <div @click="signalEdit" v-if="isDisable"
                class="text-center mt-2 w-2/5 hover:cursor-pointer m-auto bg-blue-500 text-white text-sm font-semibold py-2 hover:ring hover:bg-blue-600 cur-p">
                Chỉnh
                sửa</div>
            <div v-else class="flex flex-row gap-x-1">
                <div @click="isDisable = true"
                    class="text-center mt-2 w-2/5 hover:cursor-pointer m-auto bg-gray-500 text-white text-sm font-semibold py-2 hover:ring hover:bg-gray-600 cur-p">
                    Thoát</div>
                <button type="submit"
                    class="mt-2 w-2/5 hover:cursor-pointer m-auto bg-red-500 text-white text-sm font-semibold py-2 hover:ring hover:bg-blue-600 cur-p">Xác
                    nhận</button>
            </div>
        </Form>
    </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { useStaff } from "../store/staffStore";
import { computed, ref } from 'vue';
import staffService from "../services/staff.service";
import Sidebar from "../components/Sidebar.vue";
const staffStore = useStaff()
const isDisable = ref(true)
const admin = computed(() => {
    return staffStore.getStaff("690b241558c5f3a4b93c1b4a")
})
const initvalue = ref({
    name: admin.value?.name,
    phone: admin.value?.phone,
    address: admin.value?.address,
})
async function updateAdmin(value) {

    try {
        await staffService.update("690b241558c5f3a4b93c1b4a", value)
        await staffStore.fetchUsers()
    } catch (error) {
        console.log(error);

    }
}
const signalEdit = () => { isDisable.value = false }
</script>