const os = require('os');
const fs = require('fs');
const path = require('path');
const express = require('express');
const { createCanvas } = require('canvas');

const app = express();
app.use(express.json());

app.get('/canvas', async (req, res) => {
	try {
		const canvas = createCanvas(200, 200);
		const ctx = canvas.getContext('2d');

		ctx.font = '30px Impact';
		ctx.rotate(0.1);
		ctx.fillText('Awesome!', 50, 100);

		const outPath = path.join(os.tmpdir(), 'test.png');

		await fs.promises.writeFile(outPath, canvas.toBuffer('image/png'));
		res.download(outPath);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = app;
