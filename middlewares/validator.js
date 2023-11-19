const validateCertificateForm = (req, res, next) => {
	const { name, email, mobile, institution } = req.body;
	const params = {
		name,
		email,
		mobile,
		institution,
		nameError: "",
		emailError: "",
		mobileError: "",
		institutionError: ""
	};

	if (!name || name.length < 2) {
		params.nameError = "Please enter a valid name";
		return res.render("errors/form.ejs", params);
	}

	if (!email || !email.includes(".") || !email.includes("@")) {
		params.emailError = "Please enter a valid email";
		return res.render("errors/form.ejs", params);
	}

	if (!institution) {
		params.institutionError = "Please enter a valid institution name";
		return res.render("errors/form.ejs", params);
	}

	return next();
};

module.exports = validateCertificateForm;
