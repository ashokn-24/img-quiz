const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true
	},

	email: {
		type: String,
		trim: true,
		unique: true
	},

	mobileNo: {
		type: String,
		trim: true,
		default: ""
	}
});

module.exports = mongoose.model("User", userSchema);
