const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		email: {
			type: String,
			trim: true,
			required: true
		},
		institution: {
			type: String,
			trim: true,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
