const apieroor = require("../api-error");
const BorrowServices = require("../services/borrow.services");
const BookService = require("../services/book.services")
const MongoDB = require("../utils/mongodb.util");

exports.createBrrow = async (req, res, next) => {
    try {
        const borrowServices = new BorrowServices(MongoDB.client);
        const document = await borrowServices.create(req.body);
        return res.send(document);
    } catch (err) {
        return next(
            new apieroor(500, "An error occurred while creating the Borrow!"));
    }
};
exports.findAll = async (req, res, next) => {
    let document = [];
    try {
        const borrowServices = new BorrowServices(MongoDB.client);

        document = await borrowServices.find({});

        return res.send(document);
    } catch (err) {
        return next(new apieroor(500, "An error occured while retrieving contacts"))
    }

};
exports.deleteAll = async (req, res, next) => {
    try {
        const borrowServices = new BorrowServices(MongoDB.client);
        await borrowServices.deleteAll();
        return res.send("done!");
    } catch {
        return next(new apieroor(500, "An error occured"));
    }
};
exports.FindOne = async (req, res, next) => {
    try {
        const borrowServices = new BorrowServices(MongoDB.client);
        const document = await borrowServices.findById(req.params.id);
        if (!document) {
            return next(new apieroor(404, "Borrow not found"));
        }
        return res.send(document);
    } catch (err) {
        return next(new apieroor(500, `Error retrieving Borrow with id=${req.params.id}`));
    }
};
exports.update = async (req, res) => {
    try {
        const borrowServices = new BorrowServices(MongoDB.client);
        const document = await borrowServices.update(req.params.id, req.body);
        if (!document) {
            return next(new apieroor(404, "Borrow not found"));
        }
        return res.send("Borrow was updated successfully");
    }
    catch {
        return next(new apieroor(500, `Error updating Borrow with id=${req.params.id}`))
    }
};
exports.delete = async (req, res, next) => {
    try {
        const borrowServices = new BorrowServices(MongoDB.client);
        const document = await borrowServices.delete(req.params.id);
        if (!document) {
            return next(new apieroor(404, "contact not found"));

        }
        return res.send("delete completely!");
    } catch {
        return next(new apieroor(500, `Could not delete contact with id=${req.params.id}`)
        )
    }
};
