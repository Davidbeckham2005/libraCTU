const { ObjectId } = require("mongodb");

class StaffServices {
    constructor(client) {
        this.staffList = client.db().collection("staffs");  //tao them bien staffList va this.staffList se la một collection có thể thực hiện các hàm find,...
    }
    staffData(payload) {
        const staff = {
            name: payload.name || "B2303822",
            address: payload.address || "123 Tan binh",
            phone: payload.sdt || "0939976811",
            username: payload.username,
            password: payload.password,
            message: payload.message || 0,

            role: payload.role || "admin",
        };
        Object.keys(staff).forEach(  //thao tác để xóa các trường có giá trị là undefined
            (key) => staff[key] === undefined && delete staff[key]
        );
        return staff;
    }

    //post -> create
    async create(payload) {
        const staff = this.staffData(payload);
        const result = await this.staffList.insertOne(staff);
        return result
    }
    //get -> findAll -> find + findbyname
    async find(filter) {
        const cursor = await this.staffList.find(filter || {});
        return await cursor.toArray();
    }
    // async findByName(name) {
    //     return this.find({
    //         name: { $regex: new RegExp(name), $options: "i" }
    //     })
    // }
    async deleteAll() {
        await this.staffList.deleteMany({});
    };
    async findById(id) {
        return await this.staffList.findOne(
            {
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const update = this.staffData(payload);
        const result = await this.staffList.findOneAndUpdate(
            filter, { $set: update }, { returnDocument: "after" }
        )
        return result;
    };
    async findByUsername(username) {
        return await this.staffList.findOne({ username })
    }
    async delete(id) {
        return this.staffList.findOneAndDelete({ _id: new ObjectId(id) });
    };
    async checkPassWord(payload) {
        const { password, username } = payload
        if (!password || !username) return false

        const staff = await this.staffList.findOne({ username })
        if (!staff) return false
        return staff.password === password
    }
}
module.exports = StaffServices;