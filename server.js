const express = require("express");
const mongoose = require("mongoose");
const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
const { config } = require("dotenv");
const { readFile } = require("fs/promises");

if (process.env.NODE_ENV !== "production") {
	config();
}

const app = express();
const User = require("./model/User");
const Certificate = require("./model/Certificate");
const getCertificate = require("./certificate");

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
	const institution = req.body.institution;

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

	await generateCertificate(res, { email, name, institution });
});

app.get("/quiz", (req, res) => {
	res.render("quiz");
});

app.get("/certificate", (req, res) => {
	res.render("certificate", {
		username: "Abhishek P",
		institution: "Anna University",
	});
});

app.listen(5000, () => {
	console.log("Server started on port 5000");
});

async function generateCertificate(res, { email, name, institution }) {
	const certificate = await Certificate.findOne({ email });

	if (certificate) return;

	const newCertificate = new Certificate({
		name,
		email,
		institution
	});

	const date = new Date(Date.now());
	const dateFormat = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

	const cert = await newCertificate.save();
	const template = getCertificate({
		name: cert.name,
		institution: cert.institution,
		date: dateFormat
	});

	const pdfPath = await generatePDF(template, cert._id);
	const fileContent = await readFile(pdfPath);

	const attachment = {
		filename: "certificate.pdf", // Name of the attached file
		content: fileContent, // Content of the attachment (use buffer or stream for a file)
		encoding: "base64" // Use 'base64' encoding for binary data (e.g., PDF)
	};

	sendMail(cert, attachment);

	res.render("certificate", {
		username: cert.name,
		institution: cert.institution,
		date: dateFormat
	});
}

async function generatePDF(certificate, id) {
	const browser = await puppeteer.launch({
		defaultViewport: {
			width: 1524,
			height: 720
		},
		args: ["--disable-web-security"],
		headless: true
	});
	const page = await browser.newPage();
	const path = `${__dirname}/certificates/${id}.pdf`;

	page.on("console", msg => console.log("PAGE LOG:", msg.text()));

	await page.setContent(certificate, { waitUntil: "domcontentloaded" });
	await page.waitForSelector("img");
	return new Promise((resolve, reject) => {
		setTimeout(async () => {
			try {
				await page.pdf({
					format: "A4",
					landscape: true,
					omitBackground: true,
					path,
					scale: 0.75
				});

				resolve(path);
			} catch (err) {
				reject(err);
			}
		}, 3000);
	});
}

function sendMail(recipient, attachment) {
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_SMTP_HOST,
		port: process.env.EMAIL_SMTP_PORT,
		secure: true,
		auth: {
			user: process.env.EMAIL_AUTH_USERNAME,
			pass: process.env.EMAIL_AUTH_PASSWORD
		}
	});

	const mailOptions = {
		from: process.env.EMAIL_AUTH_USERNAME,
		to: recipient.email,
		subject: "Certificate of Participation",
		text: ``,
		html: `<p>Greetings ${recipient.name}, Thank you for participating in <strong>World Heritage Week Celebration<strong>. Here is your participation certificate for online Archaeological Quiz.</p>`,
		attachments: [attachment]
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error("Error:", error.message);
		} else {
			console.log("Email sent:", info.response);
		}
	});
}
