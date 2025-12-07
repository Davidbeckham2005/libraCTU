const { ObjectId } = require("mongodb");

class UserServices {
    constructor(client) {
        this.userList = client.db().collection("users");  //tao them bien userList va this.bookList se la một collection có thể thực hiện các hàm find,...
    }
    userData(payload) {
        const covers = ["/user", "/images", "/logo", "/manUser", "/v", "/1", "/2", "/3"]
        const randomCover = covers[Math.floor(Math.random() * covers.length)]
        const user = {
            fullname: payload.fullname,
            username: payload.username,
            password: payload.password,
            role: payload.role || "user",
            address: payload.address,
            email: payload.email,
            phone: payload.phone,
            gender: payload.gender,
            sumBorrow: payload.sumBorrow || 0,
            ngaytao: new Date().toLocaleString(),
            message: payload.message || 0,
            favoriteBook: payload.favoriteBook || [],
            comments: payload.comments || [],
            avatar: payload.avatar || randomCover,
        };
        Object.keys(user).forEach(  //thao tác để xóa các trường có giá trị là undefined
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }

    //post -> create
    async addComment(payload, book_id) {
        const result = await this.userList.findOneAndUpdate(
            {
                _id: new ObjectId(payload.user_id)
            },
            {
                $push: {
                    comments: {
                        book_id: new ObjectId(book_id),
                        content: payload.content
                    }
                }
            },
            {
                returnDocument: "after"
            }
        );
        return result
    }
    // async deleteComment(user_id, book_id) {
    //     const result = await this.userList.findOneAndUpdate(
    //         {
    //             _id: new ObjectId(user_id)
    //         },
    //         {
    //             $pull: { comments: new ObjectId(book_id) }
    //         },
    //         {
    //             returnDocument: "after"
    //         }
    //     );
    //     return result
    // }
    async create(payload) {
        const user = this.userData(payload);
        const result = await this.userList.insertOne(user);
        return result
    }
    async addFavorite(user_id, book_id) {
        const result = await this.userList.findOneAndUpdate(
            {
                _id: new ObjectId(user_id)
            },
            {
                $addToSet: { favoriteBook: new ObjectId(book_id) }
            },
            {
                returnDocument: "after"
            }
        );
        return result
    }
    async removeFavorite(user_id, book_id) {
        const result = await this.userList.findOneAndUpdate(
            {
                _id: new ObjectId(user_id)
            },
            {
                $pull: { favoriteBook: new ObjectId(book_id) }
            },
            {
                returnDocument: "after"
            }
        );
        return result
    }
    //get -> findAll -> find + findbyname
    async find(filter) {
        const cursor = await this.userList.find(filter || {});
        return await cursor.toArray();
    }
    async findByName(fullname) {
        return this.find({
            fullname: { $regex: new RegExp(name), $options: "i" }
        })
    }
    async deleteAll() {
        await this.userList.deleteMany({});
    };
    async findByUsername(username) {
        return await this.userList.findOne({ username })
    }
    // async findbookOnfavorite(book_id) {
    //     return await this.userList.find({ favoriteBook: book_id }).toArray()
    // }
    async findById(id) {
        return await this.userList.findOne(
            {
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
    }
    async updateBorrow(user_id, change) {
        // let change = 0
        const filter = {
            _id: ObjectId.isValid(user_id) ? new ObjectId(user_id) : null,
        }
        const result = await this.userList.findOneAndUpdate(
            filter, {
            $inc: {
                sumBorrow: change
            }
        }, { returnDocument: "after" }
        )
        return result;
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const update = this.userData(payload);
        const result = await this.userList.findOneAndUpdate(
            filter, { $set: update }, { returnDocument: "after" }
        )
        return result;
    };
    async delete(id) {
        return this.userList.findOneAndDelete({ _id: new ObjectId(id) });
    };
    async checkPass(payload) {
        const { username, password } = payload
        if (!username || !password) {
            return false
        }
        const user = await this.userList.findOne({ username });
        if (!user) {
            return false

        }

        return user.password === password

    }
    // async increaseborrow(id) {
    //     const result = await this.bookList.findOneAndUpdate(
    //         { _id: new ObjectId(id) },
    //         { $inc: { borrow: 1 } },
    //         { returnDocument: "after" }
    //     );
    //     return result;
    // }
    // async decreaseborrow(id) {
    //     const result = await this.bookList.findOneAndUpdate(
    //         { _id: new ObjectId(id) },
    //         { $inc: { borrow: -1 } },
    //         { returnDocument: "after" }
    //     );
    //     return result;
    // }
}

module.exports = UserServices;