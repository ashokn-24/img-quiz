const nodemailer = require("nodemailer");

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

module.exports = sendMail;
