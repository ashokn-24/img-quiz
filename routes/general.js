const { Router } = require("express");
const router = Router();

const validateCertificateForm = require("../middlewares/validator");
const generateCertificate = require("../helpers/generateCertificate");
const { BASE_PATH } = require("../path");

router.get("/", (req, res) => {
	res.render("index");
});

router.get("/form", (req, res) => {
	res.render("form");
});

router.get("/questions", (req, res) => {
	res.sendFile(`${BASE_PATH}/questions.json`);
});

router.post("/form", validateCertificateForm, async (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const institution = req.body.institution;

	await generateCertificate(res, { email, name, institution });
});

router.get("/certificate", (req, res) => {
	res.render("certificate", {
		username: "Abhishek",
		institution: "Anna University",
		date: new Date().toLocaleString("en-GB")
	});
});

router.get("/quiz", (req, res) => {
	res.render("quiz");
});

module.exports = router;
