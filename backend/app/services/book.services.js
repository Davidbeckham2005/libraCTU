const { ObjectId } = require("mongodb");
const UserService = require("./user.services")
class BookService {
    constructor(client) {
        this.bookList = client.db().collection("books");  //tao them bien bookList va this.bookList se la một collection có thể thực hiện các hàm find,...
        this.userService = new UserService(client);
    }
    bookData(payload) {
        const covers = ["001", "002", "003", "004", "005", "006", "007", "008", "009", "010", "011", "012", "013", "014", "015"]
        const randomCover = covers[Math.floor(Math.random() * covers.length)]
        const book = {
            name: payload.name,
            author: payload.author,
            nxb: payload.nxb,
            sl: payload.sl || 0,
            cover: payload.cover || `/cover/${randomCover}.jpg`,
            des: payload.des || "In a world where every click leaves a trace and every secret has a price, one woman holds the key to unraveling the most dangerous conspiracy of the digital age. When brilliant cryptographer Dr. Lena Harper discovers a hidden algorithm that can predict human behavior with terrifying accuracy, she becomes the target of a shadowy organization that controls governments from the dark web. Hunted across continents, betrayed by those she trusted most, Lena must race against time to expose the truth before humanity surrenders its free will forever. The Silent Code is a heart-pounding techno-thriller that blurs the line between paranoia and reality, forcing readers to question: in the age of total surveillance, who is really watching whom? A masterpiece of suspense that will keep you up all night…and make you think twice before opening your phone again.",
            // dangdoc: payload.dangdoc || 0,
            dadoc: payload.dadoc || 0,
            rate: payload.rate || 1,
            language: payload.language,
            // conlai: (payload.sl || 0) - (payload.dadoc || 0),
            ngaytao: new Date().toLocaleString(),
            type: payload.type || "Truyện ngắn",
            book_id: payload.book_id,
            page: payload.page,
            namxb: payload.namxb,
            view: payload.view || 10,
            // id_author: payload.id_author,
            comments: payload.commnets || []
        };
        Object.keys(book).forEach(  //thao tác để xóa các trường có giá trị là undefined
            (key) => book[key] === undefined && delete book[key]
        );
        return book;
    }
    async QualityByBorrowStatus(id, payload) {
        const oldStatus = payload.oldStatus
        const newStatus = payload.newStatus

        let change = 0
        if (newStatus != "Đã duyệt" && newStatus != "Đã trả sách" && newStatus != "Đang chờ duyệt" && newStatus != "Đã từ chối" && oldStatus != '' && oldStatus != "Đang yêu cầu" && oldStatus != "Đã duyệt" && oldStatus != "Đã trả sách" && oldStatus != "Đang chờ duyệt" && oldStatus != "Đã từ chối") {
            return null
        }
        if (newStatus === oldStatus) {
            change = 0
        }
        if (newStatus == "Đã duyệt") {
            change = 0
        }
        if (newStatus == "Đã trả sách") {
            change = 1
        }
        if (newStatus == "Đang chờ duyệt") {
            change = -1
        }
        if (oldStatus == "Đã duyệt" && (newStatus == "Đã từ chối" || newStatus == "Đã trả")) {
            change = 1
        }
        if (oldStatus == "Đã từ chối") {
            change = -1
        }
        // if(oldStatus =="Đã duyệt" && newStatus=="Đã trả")
        if (oldStatus == "Đang yêu cầu" && newStatus == "Đã duyệt") {
            change = 0
        }
        if (change != 0) {
            await this.userService.updateBorrow(payload.user_id, change * -1)
        }
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const result = await this.bookList.findOneAndUpdate(
            filter, {
            $inc: {
                sl: change
            }
        }, { returnDocument: "after" }
        )
        return result;
    }
    async addComment(payload, book_id) {
        const result = await this.bookList.findOneAndUpdate(
            {
                _id: new ObjectId(book_id)
            },
            {
                $push: {
                    comments: {
                        user_id: new ObjectId(payload.user_id),
                        content: payload.content,
                        time: payload.time || new Date().toLocaleString('vi-VN')
                    }
                }
            },
            {
                returnDocument: "after"
            }
        );
        return result
    }
    //post -> create
    async create(payload) {
        const book = this.bookData(payload);
        const result = await this.bookList.insertOne(book);
        return result
    }
    //get -> findAll -> find + findbyname
    async find(filter) {
        const cursor = await this.bookList.find(filter || {});
        return await cursor.toArray();
    }
    async findByName(name) {
        return this.find({
            name: { $regex: new RegExp(name), $options: "i" }
        })
    }
    async deleteAll() {
        await this.bookList.deleteMany({});
    };
    async findById(id) {
        return await this.bookList.findOne(
            {
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const update = this.bookData(payload);
        const result = await this.bookList.findOneAndUpdate(
            filter, { $set: update }, { returnDocument: "after" }
        )
        return result;
    };
    async delete(id) {
        return this.bookList.findOneAndDelete({ _id: new ObjectId(id) });
    };
    async increaseView(id) {
        const result = await this.bookList.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $inc: { view: 1 } },
            { returnDocument: "after" }
        );
        return result;
    }
}
module.exports = BookService;