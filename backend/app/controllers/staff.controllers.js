const apieroor = require("../api-error");
const StaffServices = require("../services/staff.services");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const MongoDB = require("../utils/mongodb.util");

dotenv.config();

exports.create = async (req, res, next) => {
    // if (!req.body?.name) return next(new apieroor(400, "Name can not be empty"));

    try {
        const staffServices = new StaffServices(MongoDB.client);
        const document = await staffServices.create(req.body);
        return res.send(document);
    } catch (err) {
        return next(
            new apieroor(500, "An error occurred while creating the staff!"));
    }
};
exports.findAll = async (req, res, next) => {
    let document = [];
    try {
        const staffServices = new StaffServices(MongoDB.client);
        const { name } = req.query;
        if (name) {
            document = await staffServices.findByName(name);
        }
        else {
            document = await staffServices.find({});
        }
        return res.send(document);
    } catch (err) {
        return next(new apieroor(500, "An error occured while retrieving staff"))
    }

};
exports.deleteAll = async (req, res, next) => {
    try {
        const staffServices = new StaffServices(MongoDB.client);
        await staffServices.deleteAll();
        return res.send("done!");
    } catch {
        return next(new apieroor(500, "An error occured"));
    }
};
exports.FindOne = async (req, res, next) => {
    try {
        const staffServices = new StaffServices(MongoDB.client);
        const document = await staffServices.findById(req.params.id);
        if (!document) {
            return next(new apieroor(404, "staff not found"));
        }
        return res.send(document);
    } catch (err) {
        return next(new apieroor(500, `Error retrieving staff with id=${req.params.id}`));
    }
};
exports.update = async (req, res, next) => {
    try {
        const staffServices = new StaffServices(MongoDB.client);
        const document = await staffServices.update(req.params.id, req.body);
        if (!document) {
            return next(new apieroor(404, "staff not found"));
        }
        return res.send("staff was updated successfully");
    }
    catch {
        return next(new apieroor(500, `Error updating staff with id=${req.params.id}`))
    }
};
exports.delete = async (req, res, next) => {
    try {
        const staffServices = new StaffServices(MongoDB.client);
        const document = await staffServices.delete(req.params.id);
        if (!document) {
            return next(new apieroor(404, "staff not found"));

        }
        return res.send("delete completely!");
    } catch {
        return next(new apieroor(500, `Could not delete contact with id=${req.params.id}`)
        )
    }
};
exports.login = async (req, res, next) => {
    try {
        const staffServices = new StaffServices(MongoDB.client);
        const { username, password } = req.body
        const staff = await staffServices.findByUsername(username);

        if (!staff) {
            return next(new apieroor(404, "staff not found"));

        }
        const isCorrectPass = await staffServices.checkPassWord(req.body)
        if (!isCorrectPass) return next(new apieroor(404, "Invalid password!"))


        const ACCESS_Token = jwt.sign(
            { id: staff._id, username: staff.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        )
        return res.status(200).send({
            ACCESS_Token,
            user: staff,
        })
    } catch (error) {
        console.log(error);
        return next(new apieroor(500, "An error occurred while login"))
    }
}
