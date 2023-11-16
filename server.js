const express = require("express");
const app = express();
const { v4: uuidV4 } = require("uuid");

const USERS = [];

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.render("form");
});

app.post("/", (req, res) => {
	const name = req.body.name;
	const email = req.body.email;

	const user = { id: uuidV4(), name, email };

	USERS.push(user);

	res.cookie("user", JSON.stringify(user), {
		httpOnly: true
	});

	res.redirect("/quiz");
});

app.get("/quiz", (req, res) => {
	console.log(USERS);
	res.send("<h1>Quiz page</h1>");
});

app.listen(5000, () => {
	console.log("Server started on port 5000");
});
