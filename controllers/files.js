const ErrorResponse = require('../utils/errorResponse');
var fs = require('fs');

// @params      Directory with Filename $path
let getDetailFile = function (req, path) {
    let fullPath = `${process.env.FILE_UPLOAD_PATH}/${process.env.UPLOAD_FOLDER}/${path}`;
    let fullUrl = req.protocol + '://' + req.get('host') + '/' + url;
    return {
        path: path,
        fullPath: fullPath,
        fullUrl: fullUrl
    };
}

// @desc        GET File
// @route       GET /api/v1/files
// @access      Private
exports.getFile = async (req, res, next) => {
    // with file name
    let path = req.path;
    let fullPath = `${process.env.FILE_UPLOAD_PATH}/${process.env.UPLOAD_FOLDER}/${path}`;
    // Check Params
    if (!path) {
        return next(new ErrorResponse(`Please input path`, 400));
    }

    let code = 404;
    let status = false;
    let message = 'Not Found';
    let data = null

    if (fs.existsSync(fullPath)) {
        code = 200;
        status = true;
        message = 'success';
        data = getDetailFile(req, path)
    }

    let response = {
        "status": status,
        "message": message,
        "data": data
    }

    res.status(code).json((response))
};

// @desc        Upload File
// @route       POST /api/v1/files
// @access      Private
exports.fileUpload = async (req, res, next) => {
    let files = req.files;
    let filename = req.body.filename;
    let envName = req.body.env;
    let bucket = req.body.bucket;

    // Check Params
    if (!files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }
    if (!filename) {
        return next(new ErrorResponse(`Please set filename`, 400));
    }
    if (!envName) {
        return next(new ErrorResponse(`Please set envName`, 400));
    }
    if (!bucket) {
        return next(new ErrorResponse(`Please set bucket`, 400));
    }

    // Set path/upload folder
    const file = files.file;
    const today = new Date();
    const uniqueCode = Math.floor(today.getTime() / 1000);
    let path = `${envName}/${bucket}/${today.getFullYear()}/${today.getMonth()}/${today.getDate()}/${uniqueCode}`;
    let dir = `${process.env.FILE_UPLOAD_PATH}/${process.env.UPLOAD_FOLDER}/${path}`;
    let fullPath = `${dir}/${filename}`;

    // Create if Directory not exists
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Check max size
    let maxFileSizeMb = process.env.MAX_FILE_UPLOAD;
    let maxFileSizeBytes = maxFileSizeMb * 1000000;
    if (file.size > maxFileSizeBytes) {
        return next(new ErrorResponse(`Please upload an file less than ${maxFileSizeMb}`, 400));
    }

    file.mv(fullPath, async err => {
        if (err) {
            console.log(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        let data = getDetailFile(req, `${path}/${filename}`);
        data['uniqueCode'] = uniqueCode;

        let response = {
            "status": true,
            "message": "success",
            "data": data
        }
        res.status(201).json((response))
    });
};