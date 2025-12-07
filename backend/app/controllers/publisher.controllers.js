const apieroor = require("../api-error");
const PubliserService = require("../services/publisher.services");

const MongoDB = require("../utils/mongodb.util");

exports.createBrrow = async (req, res, next) => {
    try {
        const publiserService = new PubliserService(MongoDB.client);
        const document = await publiserService.create(req.body);
        return res.send(document);
    } catch (err) {
        return next(
            new apieroor(500, "An error occurred while creating the publisher!"));
    }
};
exports.findAll = async (req, res, next) => {
    let document = [];
    try {
        const publiserService = new PubliserService(MongoDB.client);

        document = await publiserService.find({});

        return res.send(document);
    } catch (err) {
        return next(new apieroor(500, "An error occured while retrieving contacts"))
    }

};
exports.deleteAll = async (req, res, next) => {
    try {
        const publiserService = new PubliserService(MongoDB.client);
        await publiserService.deleteAll();
        return res.send("done!");
    } catch {
        return next(new apieroor(500, "An error occured"));
    }
};
exports.FindOne = async (req, res, next) => {
    try {
        const publiserService = new PubliserService(MongoDB.client);
        const document = await publiserService.findById(req.params.id);
        if (!document) {
            return next(new apieroor(404, "publisher not found"));
        }
        return res.send(document);
    } catch (err) {
        return next(new apieroor(500, `Error retrieving publisher with id=${req.params.id}`));
    }
};
exports.update = async (req, res) => {
    try {
        const publiserService = new PubliserService(MongoDB.client);
        const document = await publiserService.update(req.params.id, req.body);
        if (!document) {
            return next(new apieroor(404, "publisher not found"));
        }
        return res.send("publisher was updated successfully");
    }
    catch {
        return next(new apieroor(500, `Error updating publisher with id=${req.params.id}`))
    }
};
exports.delete = async (req, res, next) => {
    try {
        const publiserService = new PubliserService(MongoDB.client);
        const document = await publiserService.delete(req.params.id);
        if (!document) {
            return next(new apieroor(404, "contact not found"));

        }
        return res.send("delete completely!");
    } catch {
        return next(new apieroor(500, `Could not delete contact with id=${req.params.id}`)
        )
    }
};
