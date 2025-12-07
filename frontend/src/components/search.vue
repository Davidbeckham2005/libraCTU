<template>
    <Form class="flex h-8 border-2 w-fit shadow-2xl hover:ring bg-white" @submit="search">
        <Field type="input" placeholder="Nhập thông tin cần tìm" as="input" name="input" class="w-70 p-2"></Field>
        <button type="submit" class="w-30 text-center border-l-2  ransition-all duration-300 cursor-pointer">Tìm
            kiếm</button>
    </Form>
</template>
<script setup>
import { Form, Field } from 'vee-validate';

const emit = defineEmits(['bookSearch'])

function search(value) {
    emit("bookSearch", value.input)
}

</script>