import * as yup from "yup"
export const bookSchema = yup.object({
    name: yup
        .string()
        .required("Vui lòng nhập tên sách."),
    author: yup
        .string()
        .required("Vui lòng chọn tên tác giả."),
    nxb: yup
        .string()
        .required("Vui lòng chọn nhà xuất bản."),
    language: yup
        .string()
        .required("Vui lòng chọn ngôn ngữ."),
    type: yup
        .string()
        .required("Vui lòng chọn thể loại."),
    namxb: yup
        .number()
        .min(1500, "Vui lòng chọn năm hợp lệ!")
        .max(2025, "Vui lòng chọn năm hợp lệ!")
        .required("Vui lòng chọn năm xuất bản."),
    page: yup
        .string()
        .required("Vui lòng chọn số trang."),
})