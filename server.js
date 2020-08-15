const express = require('express');
const multer = require('multer');
const path = require('path');
const util = require('util');
const {exec} = require('child_process');

const execAndWait = util.promisify(exec);

const LocationOption = {
	TopLeft: 'top-left',
	TopMiddle: 'top-middle',
	TopRight: 'top-right',
	BottomLeft: 'bottom-left',
	BottomMiddle: 'bottom-middle',
	BottomRight: 'bottom-right',
};

const storage = multer.diskStorage({
	filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
})

const upload = multer({storage});

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.post('/burn-timecode', upload.single('movie'), async (req, res) => {
	try {
		const path = req.file.path;
		const extension = req.file.path.split('.').pop();
		const outputPath = path.substring(0, path.length - extension.length) + '-output.' + extension;
		const {stdout, stderr} = await execAndWait(
			`ffmpeg -i ${path} -vf "drawtext=text='%{pts\\:hms}':fontsize=48:fontcolor=white:box=1:boxborderw=6:boxcolor=black@0.75:x=(w-text_w)/2:y=h-text_h-20" -c:a copy ${outputPath}`);
		res.sendFile(outputPath);
	} catch (e) {
		res.send(`Error while processing file: ${e}`);
	}
});

app.listen(8080);