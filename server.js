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

const static = express.static(path.join(__dirname, 'build'));
app.use(static);
app.use('/timestamp', static);

function getIndex(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
}
app.get('/', getIndex);
app.get('/timestamp', getIndex)

function getTimestampCenter(location) {
	switch (location) {
		case LocationOption.TopLeft:
			return {x: '20', y: '20'};
		case LocationOption.TopMiddle:
			return {x: '(w-text_w)/2', y: '20'};
		case LocationOption.TopRight:
			return {x: 'w-text_w-20', y: '20'};
		case LocationOption.BottomLeft:
			return {x: '20', y: 'h-text_h-20'};
		case LocationOption.BottomMiddle:
			return {x: '(w-text_w)/2', y: 'h-text_h-20'};
		case LocationOption.BottomRight:
			return {x: 'w-text_w-20', y:'h-text_h-20'};
		default:
			return getTimestampCenter(LocationOption.BottomMiddle);
	}
}

async function postBurnTimecode(req, res) {
	try {
		const path = req.file.path;
		const extension = req.file.path.split('.').pop();
		const outputPath = path.substring(0, path.length - extension.length) + '-output.' + extension;
		const location = req.body.location;
		const {x, y} = getTimestampCenter(location);
		const {stdout, stderr} = await execAndWait(
			`ffmpeg -i ${path} -vf "drawtext=text='%{pts\\:hms}':fontsize=48:fontcolor=white:box=1:boxborderw=6:boxcolor=black@0.75:x=${x}:y=${y}" -c:a copy ${outputPath}`);
		res.sendFile(outputPath);
	} catch (e) {
		res.send(`Error while processing file: ${e}`);
	}
}

app.post('/burn-timecode', upload.single('movie'), postBurnTimecode);
app.post('/timestamp/burn-timecode', upload.single('movie'), postBurnTimecode);

app.listen(8080);