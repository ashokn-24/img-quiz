const express = require("express");
const mongoose = require("mongoose");
const puppeteer = require("puppeteer");
const { config } = require("dotenv");

if (process.env.NODE_ENV !== "production") {
	config();
}

const app = express();
const User = require("./model/User");
const Certificate = require("./model/Certificate");

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

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/form", (req, res) => {
	res.render("form");
});

app.get("/questions", (req, res) => {
	res.sendFile(__dirname + "/questions.json");
});

app.post("/form", async (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const mobileNo = req.body.mobile;

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		return res.render("errors/form", {
			error: true,
			errorMsg: "Email Id already exists",
			name,
			email,
			mobileNo
		});
	}

	const user = new User({
		name,
		email,
		mobileNo
	});

	const savedUser = await user.save();

	// TODO: Encrypt later
	res.cookie("user", JSON.stringify(savedUser), {
		httpOnly: true
	});

	res.render("certificate", { username: user.name });
});

app.get("/quiz", (req, res) => {
	res.render("quiz");
});

app.get("/certificate", (req, res) => {
	res.render("certificate", { username: "Abhishek P", institution:"Anna University" });
});

app.listen(5000, () => {
	console.log("Server started on port 5000");
});

async function generateCertificate({ email, name, institution }) {
	const certificate = await Certificate.findOne({ email });

	if (certificate) return;

	const newCertificate = new Certificate({
		name,
		email,
		institution
	});

	const cert = await newCertificate.save();
	const template = generatePDF();
}

async function generatePDF(certificate, id) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const path = `${__dirname}/certificates/${id}.pdf`;

	await page.setContent(certificate);
	await page.pdf({
		format: "A4",
		omitBackground: true,
		path
	});

	return path;
}
