"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const file_1 = require("./../entities/file");
const ormconfig_1 = __importDefault(require("./../ormconfig"));
const filesRouter = (0, express_1.Router)();
exports.filesRouter = filesRouter;
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
filesRouter.post('/addFile', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('No file Uploaded');
        }
        const file = new file_1.File();
        file.name = req.file.originalname;
        file.mimetype = req.file.mimetype;
        file.size = req.file.size;
        file.data = req.file.buffer;
        await ormconfig_1.default.getRepository(file_1.File).save(file);
        res.json({ message: 'File uploaded successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to upload file' });
    }
});
//# sourceMappingURL=fileRouter.js.map