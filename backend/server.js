const app = require("./app.js"); //nap file app.js
const config = require("./app/config"); //nap file index.js
const mongodb = require("./app/utils/mongodb.util.js");

async function startServer() {
    try {
        await mongodb.connect(config.db.uri);
        console.log("Connected to the database");
        const port = config.app.port;
        app.listen(port, () => {
            console.log(`Server is runing on port ${port}`)
        });
    } catch (err) {
        console.log("Can not connect to the database", err);
        process.exit()
    }
}
startServer();