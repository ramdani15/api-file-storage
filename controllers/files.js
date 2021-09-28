const ErrorResponse = require('../utils/errorResponse');
var fs = require('fs');

// @params      Directory with Filename $path
var getDetailFile = function (req, path) {
    fullUrl = req.protocol + '://' + req.get('host') + '/' + process.env.UPLOAD_FOLDER + '/' + path;
    fullpath = `${process.env.FILE_UPLOAD_PATH}/${path}`;
    return data = {
        path: path,
        fullpath: fullpath,
        url: fullUrl
    };
}

// @desc        GET File
// @route       GET /api/v1/files
// @access      Private
exports.getFile = async (req, res, next) => {
    path = req.body.path;
    fullpath = `${process.env.FILE_UPLOAD_PATH}/${path}`;
    // Check Params
    if (!path) {
        return next(new ErrorResponse(`Please input path`, 400));
    }

    code = 404;
    status = false;
    message = 'Not Found';
    data = null

    if (fs.existsSync(fullpath)) {
        code = 200;
        status = true;
        message = 'success';
        data = getDetailFile(req, path)
    }

    let response = {
        "code": code,
        "status": status,
        "message": message,
        "data": data
    }

    res.status(response['code']).json((response))
};

// @desc        Upload File
// @route       POST /api/v1/files
// @access      Private
exports.fileUpload = async (req, res, next) => {
    let files = req.files;
    let filename = req.body.filename;
    let env = req.body.env;
    let path = req.body.path;
    // Check Params
    if (!files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }
    if (!filename) {
        return next(new ErrorResponse(`Please set filename`, 400));
    }
    if (!env) {
        return next(new ErrorResponse(`Please set env`, 400));
    }
    if (!path) {
        return next(new ErrorResponse(`Please set path`, 400));
    }

    const file = files.file;
    path = `${env}/${path}`;
    let dir = `${process.env.FILE_UPLOAD_PATH}/${path}`;
    let fullpath = `${dir}/${filename}`;

    // Create if Directory not exists
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Please upload an file less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    file.mv(fullpath, async err => {
        if (err) {
            console.log(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        data = getDetailFile(req, `${path}/${filename}`);

        let response = {
            "code": 201,
            "status": true,
            "message": "success",
            "data": data
        }
        res.status(response['code']).json((response))
    });
};