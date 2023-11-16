const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.render("form");
});

app.listen(5000, () => {
	console.log("Server started on port 5000");
});
