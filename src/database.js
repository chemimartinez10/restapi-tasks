import mongoose from "mongoose";
import config from "./config";

(async () => {
	try {
		const db = await mongoose.connect(config.mongoURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("connected to database: ", db.connection.name);
	} catch (error) {
		console.error(error);
	}
})();
