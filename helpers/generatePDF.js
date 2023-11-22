const puppeteer = require("puppeteer");
const { CERTIFICATE_PATH } = require("../path");

async function generatePDF(certificate, id) {
	const browser = await puppeteer.launch({
		defaultViewport: {
			width: 1524,
			height: 720
		},
		args: ["--disable-web-security", "--no-sandbox"],
		headless: true
	});

	const page = await browser.newPage();
	const path = CERTIFICATE_PATH + `${id}.pdf`;

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
					printBackground: true,
					path,
					scale: 0.75
				});

				resolve(path);
			} catch (err) {
				console.log(err);
				reject(err);
			}
		}, 3000);
	});
}

module.exports = generatePDF;
