const os = require('os');
const fs = require('fs');
const path = require('path');
const canvas = require('canvas');
const express = require('express');
const {
	QRCodeStyling
} = require('qr-code-styling-node/lib/qr-code-styling.common');

const app = express();
app.use(express.json());

app.get('/canvas', async (_req, res) => {
	try {
		const options = {
			width: 300,
			height: 300,
			nodeCanvas: canvas,
			data: 'https://www.google.com/',
			dotsOptions: {
				color: '#000000',
				type: 'rounded'
			},
			backgroundOptions: {
				color: '#ffffff'
			}
		};

		const buffer = await new QRCodeStyling(options).getRawData('png');

		const outPath = path.join(os.tmpdir(), 'qr.png');

		await fs.promises.writeFile(outPath, buffer);
		res.download(outPath);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = app;
