const apieroor = require("../api-error");
const authorService = require("../services/author.service")
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    try {
        const Authorservice = new authorService(MongoDB.client);
        const document = await Authorservice.create(req.body);
        return res.send(document);
    } catch (err) {
        return next(
            new apieroor(500, "An error occurred while creating the author!"));
    }
};
exports.findAll = async (req, res, next) => {
    let document = [];
    try {
        const Authorservice = new authorService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            document = await Authorservice.findByName(name);
        }
        else {
            document = await Authorservice.find({});
        }
        return res.send(document);
    } catch (err) {
        return next(new apieroor(500, "An error occured while retrieving contacts"))
    }

};
exports.deleteAll = async (req, res, next) => {
    try {
        const Authorservice = new authorService(MongoDB.client);
        await Authorservice.deleteAll();
        return res.send("done!");
    } catch {
        return next(new apieroor(500, "An error occured"));
    }
};
exports.FindOne = async (req, res, next) => {
    try {
        const Authorservice = new authorService(MongoDB.client);
        const document = await Authorservice.findById(req.params.id);
        if (!document) {
            return next(new apieroor(404, "author not found"));
        }
        return res.send(document);
    } catch (err) {
        return next(new apieroor(500, `Error retrieving author with id=${req.params.id}`));
    }
};
exports.update = async (req, res, next) => {
    try {
        const Authorservice = new authorService(MongoDB.client);
        const document = await Authorservice.update(req.params.id, req.body);
        if (!document) {
            return next(new apieroor(404, "author not found"));
        }
        return res.send("author was updated successfully");
    }
    catch {
        return next(new apieroor(500, `Error updating author with id=${req.params.id}`))
    }
};
exports.delete = async (req, res, next) => {
    try {
        const Authorservice = new authorService(MongoDB.client);
        const document = await Authorservice.delete(req.params.id);
        if (!document) {
            return next(new apieroor(404, "contact not found"));

        }
        return res.send("delete completely!");
    } catch {
        return next(new apieroor(500, `Could not delete contact with id=${req.params.id}`)
        )
    }
};
