import * as yup from "yup"

const maxdate = new Date()
const mindate = new Date()
mindate.setDate(mindate.getDate() - 1)

maxdate.setDate(maxdate.getDate() + 15)
export const borrowSchema = yup.object({
    fullname: yup.string().required("Vui lòng nhập tên của bạn."),
    phone: yup.string().required("Vui lòng nhập số điện thoại."),
    ngaytra: yup.date()
        .required("Vui lòng chọn ngày trả")
        .min(new Date(), "Ngày trả không hợp lệ")
        .max(maxdate, "Chỉ được mượn sách tối đa 15 ngày")
        .typeError("Vui lòng chọn ngày trả"),
    ngaymuon: yup.date()
        .required("Vui lòng chọn ngày mượn")
        .min(mindate, "Không thể mượn sách từ quá khứ")
    // .max(maxdate, "Chỉ được mượn sách tối đa 15 ngày")

})