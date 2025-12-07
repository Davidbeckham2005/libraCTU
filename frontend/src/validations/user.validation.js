import * as yup from "yup"
export const Schema = yup.object({
    fullname: yup
        .string()
        .required("Vui lòng nhập tên.")
        .min(2, "Tên phải có ít nhất 2 ký tự."),
    // address: yup
    //     .string()
    //     .required("Vui lòng nhập địa chỉ.")
    //     .min(2, " phải có ít nhất 2 ký tự."),
    email: yup
        .string()
        .required("Vui lòng nhập địa chỉ email.")
        .min(7, " phải có ít nhất 7 ký tự."),
    username: yup
        .string()
        .required("Vui lòng nhập tên đăng nhập.")
        .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự."),
    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu.")
        .min(3, "Mật khẩu phải có ít nhất 3 ký tự."),
    confirmPassword: yup
        .string()
        .required("Vui lòng nhập mật khẩu."),
    // gender: yup
    //     .string()
    //     .required("Vui lòng chọn giới tính."),
    phone: yup
        .string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
})