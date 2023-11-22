const { Router } = require("express");
const router = Router();

const validateCertificateForm = require("../middlewares/validator");
const generateCertificate = require("../helpers/generateCertificate");

router.get("/", (req, res) => {
	res.render("index");
});

router.get("/form", (req, res) => {
	res.render("form");
});

router.get("/questions", (req, res) => {
	res.sendFile(__dirname + "/questions.json");
});

router.post("/form", validateCertificateForm, async (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const institution = req.body.institution;

	await generateCertificate(res, { email, name, institution });
});

router.get("/quiz", (req, res) => {
	res.render("quiz");
});

module.exports = router;
