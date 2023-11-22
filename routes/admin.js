const { Router } = require("express");
const bcrypt = require("bcrypt");
const router = Router();

const User = require("../model/User");
const Certificate = require("../model/Certificate");
const adminOnly = require("../middlewares/adminOnly");

router.get("/login", (req, res) => {
	res.render("admin/login", { errors: [] });
});

router.post("/login", async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	const user = await User.findOne({ email });

	if (!user) {
		return res.render("admin/login", {
			errors: ["Invalid Email"]
		});
	}

	const isMatch = bcrypt.compareSync(password, user.password);

	if (!isMatch) {
		return res.render("admin/login", {
			errors: ["Incorrect password"]
		});
	}

	res.cookie(process.env.COOKIE_NAME, user.id, {
		httpOnly: true
	});

	res.redirect("/admin/dashboard");
});

router.get("/dashboard", adminOnly, async (req, res) => {
	const certificates = await Certificate.find().sort({ createdAt: -1 });
	const certGeneratedToday = certificates.filter(
		certificate =>
			new Date(certificate.createdAt).toLocaleDateString() ===
			new Date(Date.now()).toLocaleDateString()
	);

	res.render("admin/dashboard", {
		certificates,
		certGeneratedToday
	});
});

router.get("/logout", adminOnly, (req, res) => {
	res.clearCookie(process.env.COOKIE_NAME);
	res.redirect("/admin/login");
});

module.exports = router;
