"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFileUpload = void 0;
const multer_1 = __importStar(require("multer"));
let storage = multer_1.default.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});
let limits = {
    fileSize: 1024 * 1024 * 10
};
let fileFilter = (req, file, cb) => {
    const error = new multer_1.MulterError("LIMIT_UNEXPECTED_FILE");
    error.name = "MulterError";
    error.message = "you must upload pdf files only!";
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    }
    else
        cb(error);
};
let upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits
});
const handleFileUpload = (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer_1.MulterError) {
            console.log(err.code, err.message);
            if (err.code == "LIMIT_FILE_SIZE") {
                res.json({ msg: "file size too large" });
            }
            else if (err.code == "LIMIT_UNEXPECTED_FILE") {
                res.status(500).json({ msg: err.message });
            }
        }
        else if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Unexpected error occurred during file upload' });
        }
        else {
            console.log(req.body);
            next();
        }
    });
};
exports.handleFileUpload = handleFileUpload;
//# sourceMappingURL=fileHandling.js.map