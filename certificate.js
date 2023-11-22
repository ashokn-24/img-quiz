function getCertificate({ name, institution, date }) {
	let template = `
    <!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
         @page {
  size: A4 landscape;
  margin: 10mm;
}

body {
  margin: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.border-pattern {
  position: relative;
  height: 220mm;
  width: 100vw;
  border: 1mm solid #991B1B;
  /* http://www.heropatterns.com/ */
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23991b1b' fill-opacity='0.68'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E");
}

.content {
  position: absolute;
  left: 10mm;
  top: 10mm;
  height: 198mm;
  width: 94%;
  border: 1mm solid #991B1B;
  background: white;
}

.inner-content {
  border: 1mm solid #991B1B;
  margin: 4mm;
  padding: 10mm;
  height: 168mm;
  text-align: center;
}

h1 {
  text-transform: uppercase;
  font-size: 24pt;
  margin: 0;
}

h2 {
  font-size: 24pt;
  margin-top: 0;
  padding-bottom: 1mm;
  display: inline-block;
  margin-bottom: 2px;
}

h3 {
  font-size: 20pt;
  margin-bottom: 10px;
  margin-top: 5mm;
}

p {
  font-size: 16pt;
}

.badge {
  width: 30mm;
  height: 30mm;
  position: absolute;
  right: 10mm;
  bottom: 10mm;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' /%3E%3C/svg%3E");
}

.d-none {
  display: none;
}

.name {
  font-size: 22px;
  font-weight: bold;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.logo {
  height: 35mm;
}

.left {
  left: 25mm;
}

.right {
  right: 5mm;
}

.signature {
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-top: 5rem;
}

.flex {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.center {
  align-items: center;
}

@media print {
  .border-patter {
    position: relative;
  height: 220mm;
  width: 100%;
  border: 1mm solid #991B1B;
  /* http://www.heropatterns.com/ */
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23991b1b' fill-opacity='0.68'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E");
  }
}
    </style>
		<title>E-Certificate</title>
	</head>
	<body>
		<div class="border-pattern">
			<div class="content">
				<div class="inner-content">
					<div class="logo-container">
						<img class="logo" src="https://innovationhub.ncsm.gov.in/assets/data/downloads/logo1.png" />
						<img class="logo" src="https://th.bing.com/th/id/R.31c953599d6e996b48ad880ba5b4b41c?rik=S9qxnoFLQRx5uw&riu=http%3a%2f%2fportuguese-memories.pt%2fuploads%2fworld-heritage-logo-global-svg.png&ehk=DkK7l6kwzPqaTYM5kx1O9oyrTJGNNPHqhtw2TQhhfO0%3d&risl=&pid=ImgRaw&r=0" />
						<img class="logo" src="https://th.bing.com/th/id/OIP.DvhetD5y-YvLyVwMj7FiLgHaHa?rs=1&pid=ImgDetMain" />
					</div>
					<h1>World Heritage Week Celebration</h1>
					<br />
					<h3>
						Archaeological Survey of India <br />
						Government of India <br />
						Trichy Circle, Trichy
					</h3>
					<h3>Certificate of Participation</h3>
					<p>
						This is to Certify that Mr./Smt./Miss./Dr. <strong>${name}</strong><br />
						from School/College/Institution <strong>${institution}</strong> participated in
						National Online Archaeology Art Exhibition 2023 competition during
						<strong>World Heritage Week Celebration</strong> organized by
						<strong>Archaeology Survey of India</strong>, Government of India, Trichy Circle, Trichy
						from 20.11.2023 to 25.11.2023 at Thiagarajar College, Madurai District, Tamil Nadu
					</p>
					<!-- <div class="badge"></div> -->
					<div>
						<div class="signature">
							<div class="flex">
								<span>Place: <strong>Madurai</strong></span>
								<span>Date: <strong>${date}</strong></span>
							</div>
							<div class="flex center">
								<strong>A.ANIL KUMAR</strong>
								<strong>Superintending Archaeologist</strong>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>

  `;

	return template;
}

module.exports = getCertificate;
