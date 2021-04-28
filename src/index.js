import app from "./app";
import "./database";

//Run server
app.listen(app.get("port"));
console.log(`listening on port ${app.get("port")}`);