import { defineStore } from "pinia";
import publisherService from "../services/publisher.service";
import { ref } from "vue";
export const usepublisher = defineStore('publisher', () => {
    const publishers = ref([])
    const fetchpublishers = async () => {
        try {

            const response = await publisherService.getAll()
            publishers.value = response

        } catch (error) {
            console.log(error)
        }
    }

    function getPublisher(id) {
        const publisher = publishers.value.find(a => a._id === id)
        return publisher ? publisher : null;
    }
    function getnamePublisher(id) {
        const publisher = publishers.value.find(a => a._id === id)
        return publisher ? publisher.name : "NHÀ XUẤT BẢN"
    }
    function getcontactPublisher(id) {
        const publisher = publishers.value.find(a => a._id === id)
        return publisher ? publisher.phone : "Không xác định"
    }
    function getaddressPublisher(id) {
        const publisher = publishers.value.find(a => a._id === id)
        return publisher ? publisher.address : "Không xác định"
    }

    return { publishers, fetchpublishers, getPublisher, getnamePublisher, getcontactPublisher, getaddressPublisher };
}, {
    persist: true,  // 👈 Dòng này giúp tự động lưu vào localStorage

})
