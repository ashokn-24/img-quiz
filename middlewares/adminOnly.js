const User = require("../model/User");

const adminOnly = async (req, res, next) => {
	try {
		const id = req.cookies[process.env.COOKIE_NAME];
		const user = await User.findById(id);

		if (!user) {
			return res.redirect("/");
		}

		if (user.email !== process.env.ADMIN_EMAIL) {
			return res.redirect("/");
		}

		next();
	} catch (err) {
		res.redirect("/");
		console.log(err);
	}
};

module.exports = adminOnly;
