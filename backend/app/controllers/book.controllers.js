const apieroor = require("../api-error");
const BookService = require("../services/book.services");

const MongoDB = require("../utils/mongodb.util");
exports.addComment = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const book_id = req.params.id
        const document = bookService.addComment(req.body, book_id);
        return res.send(document)
    } catch (error) {
        return next(
            new apieroor(500, "An error occurred while creating comment!"));
    }
}
exports.create = async (req, res, next) => {
    if (!req.body?.name) return next(new apieroor(400, "Name can not be empty"));

    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.create(req.body);
        return res.send(document);
    } catch (err) {
        return next(
            new apieroor(500, "An error occurred while creating the book!"));
    }
};

exports.findAll = async (req, res, next) => {
    let document = [];
    try {
        const bookService = new BookService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            document = await bookService.findByName(name);
        }
        else {
            document = await bookService.find({});
        }
        return res.send(document);
    } catch (err) {
        return next(new apieroor(500, "An error occured while retrieving contacts"))
    }

};
exports.increaseView = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.increaseView(req.params.id);
        if (!document) {
            return next(new apieroor(404, "Book not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new apieroor(500, "Error increasing book view"));
    }
};
exports.deleteAll = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        await bookService.deleteAll();
        return res.send("done!");
    } catch {
        return next(new apieroor(500, "An error occured"));
    }
};
exports.FindOne = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id);
        if (!document) {
            return next(new apieroor(404, "Book not found"));
        }
        return res.send(document);
    } catch (err) {
        return next(new apieroor(500, `Error retrieving Book with id=${req.params.id}`));
    }
};
exports.update = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.update(req.params.id, req.body);
        if (!document) {
            return next(new apieroor(404, "book not found"));
        }
        return res.send("book was updated successfully");
    }
    catch {
        return next(new apieroor(500, `Error updating book with id=${req.params.id}`))
    }
};
exports.delete = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.delete(req.params.id);
        if (!document) {
            return next(new apieroor(404, "contact not found"));

        }
        return res.send("delete completely!");
    } catch {
        return next(new apieroor(500, `Could not delete contact with id=${req.params.id}`)
        )
    }
};
exports.changeQuaylity = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.QualityByBorrowStatus(req.body.book_id, req.body);
        if (!document) {
            return next(new apieroor(404, `Book not found with id=${req.body.newStatus}`));

        }
        return res.send(`update comletely so luong ${document.sl}`);


    } catch {
        return next(new apieroor(500, `Could not update book with id=${req.body.newStatus}`)
        )
    }
}