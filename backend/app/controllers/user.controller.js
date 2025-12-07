const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const apieroor = require("../api-error")
const UserService = require("../services/user.services")
const MongoDB = require("../utils/mongodb.util")

dotenv.config();
exports.addFavorite = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const book_id = req.params.id
        // const isExit
        const document = userService.addFavorite(req.body.user_id, book_id);
        return res.send(document)
    } catch (error) {
        return next(
            new apieroor(500, "An error occurred while creating the user!"));
    }
}
exports.addComment = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const book_id = req.params.id
        const document = userService.addComment(req.body, book_id);
        return res.send(document)
    } catch (error) {
        return next(
            new apieroor(500, "An error occurred while creating comment!"));
    }
}
// exports.deletecomment = async (req, res, next) => {
//     try {
//         const userService = new UserService(MongoDB.client);
//         const book_id = req.params.id

//         const document = userService.deleteComment(req.body, book_id);


//         return res.send(document)
//     } catch (error) {
//         return next(
//             new apieroor(500, "An error occurred while creating the user!"));
//     }
// }
exports.removeFavorite = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const book_id = req.params.id

        const document = userService.removeFavorite(req.body.user_id, book_id);


        return res.send(document)
    } catch (error) {
        return next(
            new apieroor(500, "An error occurred while creating the user!"));
    }
}
exports.create = async (req, res, next) => {

    try {
        const userService = new UserService(MongoDB.client);
        const isExit = await userService.findByUsername(req.body.username);
        if (isExit) {
            return next(new apieroor(405, "Username đã tồn tại"))
        }
        const document = await userService.create(req.body);
        return res.send(document);
    } catch (err) {
        return next(
            new apieroor(500, "An error occurred while creating the user!"));
    }
};
exports.increaseborrow = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.updateBorrow(req.body.user_id, req.body.change);
        if (!document) {
            return next(new apieroor(404, "user not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new apieroor(500, "Error update book borrow"));
    }
}
// exports.increaseborrow = async (req, res, next) => {
//     try {
//         const userService = new UserService(MongoDB.client);
//         const document = await userService.increaseborrow(req.params.id);
//         if (!document) {
//             return next(new apieroor(404, "user not found"));
//         }
//         return res.send(document);
//     } catch (error) {
//         return next(new apieroor(500, "Error increasing book borrow"));
//     }
// };
// exports.decreaseborrow = async (req, res, next) => {
//     try {
//         const userService = new UserService(MongoDB.client);
//         const document = await userService.decreaseborrow(req.params.id);
//         if (!document) {
//             return next(new apieroor(404, "Book not found"));
//         }
//         return res.send(document);
//     } catch (error) {
//         return next(new apieroor(500, "Error increasing book borrow"));
//     }
// };
exports.findAll = async (req, res, next) => {
    let document = [];
    try {
        const userService = new UserService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            document = await userService.findByName(name);
        }
        else {
            document = await userService.find({});
        }
        return res.send(document);
    } catch (err) {
        return next(new apieroor(500, "An error occured while retrieving contacts"))
    }

};
exports.deleteAll = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        await userService.deleteAll();
        return res.send("done!");
    } catch {
        return next(new apieroor(500, "An error occured"));
    }
};
exports.FindOne = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
        if (!document) {
            return next(new apieroor(404, "user not found"));
        }
        return res.send(document);
    } catch (err) {
        return next(new apieroor(500, `Error retrieving user with id=${req.params.id}`));
    }
};
exports.update = async (req, res) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);

        if (!document) {
            return next(new apieroor(404, "user not found"));

        }
        return res.send("user was updated successfully");
    }
    catch {
        return next(new apieroor(500, `Error updating user with id=${req.params.id}`))
    }
};
exports.delete = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
        if (!document) {
            return next(new apieroor(404, "contact not found"));

        }
        return res.send("delete completely!");
    } catch {
        return next(new apieroor(500, `Could not delete contact with id=${req.params.id}`)
        )
    }
};
exports.login = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const { username, password } = req.body
        const user = await userService.findByUsername(username)
        if (!user) {
            return next(new apieroor(404, "user not found"));
        }
        const isCorrect = await userService.checkPass(req.body)
        if (!isCorrect) {
            return next(new apieroor(404, "Invalid password"));

        }
        const ACCESS_Token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        )
        return res.status(200).send({
            ACCESS_Token,
            user: user,
        })
    } catch (error) {
        console.log(error);
        return next(new apieroor(500, "An error occurred while login"))
    }
}