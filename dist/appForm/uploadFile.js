"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const ormconfig_1 = __importDefault(require("./../ormconfig"));
const file_1 = require("../entities/file");
async function uploadFile(req, res) {
    try {
        let file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'File not uploaded' });
        }
        let { originalname, buffer, size, mimetype } = file;
        let newfile = new file_1.File();
        newfile.name = originalname;
        newfile.data = buffer;
        newfile.size = size;
        newfile.mimetype = mimetype;
        await ormconfig_1.default.getRepository(file_1.File).save(file);
        res.json(file);
    }
    catch (error) {
        res.json({ msg: "Can not upload file" });
    }
}
exports.uploadFile = uploadFile;
//# sourceMappingURL=uploadFile.js.map