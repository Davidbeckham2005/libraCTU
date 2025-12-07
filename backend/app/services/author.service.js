const { ObjectId } = require("mongodb");

class authorService {
    constructor(client) {
        this.authorList = client.db().collection("authors");  //tao them bien authorList va this.authorList se la một collection có thể thực hiện các hàm find,...
    }
    authorData(payload) {
        const author = {
            name: payload.name,
            birthday: payload.birthday,
            address: payload.address,
            phone: payload.phone,
            write: payload.write,
            country: payload.country || "Việt Nam",
            gioithieu: payload.gioithieu || "Không có gì cả!"
        };
        Object.keys(author).forEach(  //thao tác để xóa các trường có giá trị là undefined
            (key) => author[key] === undefined && delete author[key]
        );
        return author;
    }

    //post -> create
    async create(payload) {
        const author = this.authorData(payload);
        const result = await this.authorList.insertOne(author);
        return result
    }
    //get -> findAll -> find + findbyname
    async find(filter) {
        const cursor = await this.authorList.find(filter || {});
        return await cursor.toArray();
    }
    async findByName(name) {
        return this.find({
            name: { $regex: new RegExp(name), $options: "i" }
        })
    }
    async deleteAll() {
        await this.authorList.deleteMany({});
    };
    async findById(id) {
        return await this.authorList.findOne(
            {
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const update = this.authorData(payload);
        const result = await this.authorList.findOneAndUpdate(
            filter, { $set: update }, { returnDocument: "after" }
        )
        return result;
    };
    async delete(id) {
        return this.authorList.findOneAndDelete({ _id: new ObjectId(id) });
    };
}
module.exports = authorService;