const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { config } = require("dotenv");

if (process.env.NODE_ENV !== "production") {
	config();
}

const app = express();

const adminRouter = require("./routes/admin");
const generalRouter = require("./routes/general");

(async () => {
	try {
		const { connection } = await mongoose.connect(process.env.DATABASE_URI);
		console.log(`Database connected (${connection.host})`);
	} catch (err) {
		console.log(err);
	}
})();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

app.use("/", generalRouter);
app.use("/admin", adminRouter);

app.listen(5000, () => {
	console.log("Server started on port 5000");
});
