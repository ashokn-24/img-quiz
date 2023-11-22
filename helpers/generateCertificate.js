const Certificate = require("../model/Certificate");
const getCertificate = require("../certificate");
const sendMail = require("./sendMail");
const generatePDF = require("./generatePDF");
const { readFile } = require("fs/promises");

async function generateCertificate(res, { email, name, institution }) {
	const certificate = await Certificate.findOne({ email });

	if (certificate) {
		return res.send("<p>Please check your E-mail the certificate has already been generated.</p>");
	}

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

	const pdfPath = await generatePDF(template, cert.id);
	// const fileContent = await readFile(pdfPath);

	// const attachment = {
	// 	filename: "certificate.pdf",
	// 	content: fileContent,
	// 	encoding: "base64"
	// };

	// sendMail(cert, attachment);

	res.render("certificate", {
		username: cert.name,
		institution: cert.institution,
		date: dateFormat
	});
}

module.exports = generateCertificate;
