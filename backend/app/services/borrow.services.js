const { ObjectId } = require("mongodb");

class BorrowServices {
    constructor(client) {
        this.borrowList = client.db().collection("borrows");  //tao them bien borrowList va this.borrowList se la một collection có thể thực hiện các hàm find,...
    }
    borrowData(payload) {
        const borrow = {
            user_id: payload.user_id,
            book_id: payload.book_id,
            borrowName: payload.borrowName,
            phone: payload.phone,
            borrowDate: payload.ngaymuon,
            returnDate: payload.ngaytra,
            address: payload.address,
            status: payload.status || "Đang chờ duyệt",
            note: payload.note,
        };
        Object.keys(borrow).forEach(  //thao tác để xóa các trường có giá trị là undefined
            (key) => borrow[key] === undefined && delete borrow[key]
        );
        return borrow;
    }

    //post -> create
    async create(payload) {
        const borrow = this.borrowData(payload);
        const result = await this.borrowList.insertOne(borrow);
        return result
    }
    //get -> findAll -> find + findbyname
    async find(filter) {
        const cursor = await this.borrowList.find(filter || {});
        return await cursor.toArray();
    }

    async deleteAll() {
        await this.borrowList.deleteMany({});
    };
    async findById(id) {
        return await this.borrowList.findOne(
            {
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const update = this.borrowData(payload);
        const result = await this.borrowList.findOneAndUpdate(
            filter, { $set: update }, { returnDocument: "after" }
        )
        return result;
    };
    async delete(id) {
        return this.borrowList.findOneAndDelete({ _id: new ObjectId(id) });
    };
}
module.exports = BorrowServices;