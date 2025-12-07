const { ObjectId } = require("mongodb");

class publisherService {
    constructor(client) {
        this.publisherList = client.db().collection("publishers");  //tao them bien publisherList va this.bookList se la một collection có thể thực hiện các hàm find,...
    }
    publisherData(payload) {
        const publisher = {
            name: payload.name,
            address: payload.address,
            phone: payload.phone,
            // books: payload.book || []
        };
        Object.keys(publisher).forEach(  //thao tác để xóa các trường có giá trị là undefined
            (key) => publisher[key] === undefined && delete publisher[key]
        );
        return publisher;
    }

    //post -> create
    async create(payload) {
        const publisher = this.publisherData(payload);
        const result = await this.publisherList.insertOne(publisher);
        return result
    }

    //get -> findAll -> find + findbyname
    async find(filter) {
        const cursor = await this.publisherList.find(filter || {});
        return await cursor.toArray();
    }
    async findByName(name) {
        return this.find({
            name: { $regex: new RegExp(name), $options: "i" }
        })
    }
    async deleteAll() {
        await this.publisherList.deleteMany({});
    };
    async findBypublishername(publishername) {
        return await this.publisherList.findOne({ publishername })
    }
    async findById(id) {
        return await this.publisherList.findOne(
            {
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const update = this.publisherData(payload);
        const result = await this.publisherList.findOneAndUpdate(
            filter, { $set: update }, { returnDocument: "after" }
        )
        return result;
    };
    async delete(id) {
        return this.publisherList.findOneAndDelete({ _id: new ObjectId(id) });
    };
    // async addBook(id, payload) {
    //     const filter = {
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     }
    //     const update = this.publisherData(payload.book);
    //     const result = await this.publisherList.findOneAndUpdate(
    //         filter, { $Addet: update }, { returnDocument: "after" }
    //     )
    //     return result;
    // };
}

module.exports = publisherService;