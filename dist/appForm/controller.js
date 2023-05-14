"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allFiles = exports.allForms = exports.deleteForm = exports.addForm = void 0;
const ormconfig_1 = __importDefault(require("./../ormconfig"));
const form_1 = __importDefault(require("../entities/form"));
const middlware_1 = require("./middlware");
let addForm = async (req, res) => {
    var _a;
    try {
        console.log(req.body);
        let { firstName, lastName, region, phoneNumber, role } = req.body;
        if (!req.body)
            res.json({ msg: "no body" });
        else {
            try {
                let newForm = await (0, middlware_1.createForm)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path, firstName, lastName, region, phoneNumber, role);
                res.status(200).json({ msg: "File uploaded successfully", newForm });
            }
            catch (error) {
                res.status(500).json({ error: error.message, msg: "Could not upload file" });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.json({ msg: "could not add form" });
    }
};
exports.addForm = addForm;
let deleteForm = async (req, res) => {
    try {
        let formRepo = ormconfig_1.default.getRepository(form_1.default);
        let form = await formRepo.delete(req.params.id);
        if (form.affected === 1) {
            console.log(`Form deleted successfully`);
        }
        else {
            console.log(`Form with given ID not found`);
        }
        res.json({ msg: "Form deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.json({ msg: "Could not delete form" });
    }
};
exports.deleteForm = deleteForm;
let allForms = async (req, res) => {
    try {
        let formRepo = ormconfig_1.default.getRepository(form_1.default);
        let forms = await formRepo.find();
        res.status(200).json({ forms });
    }
    catch (error) {
        res.status(500).json({ msg: "Could not fetch forms" });
    }
};
exports.allForms = allForms;
let allFiles = async (req, res) => {
    try {
        let fileRep = ormconfig_1.default.getRepository(File);
        let files = await fileRep.find();
        res.status(200).json({ files });
    }
    catch (error) {
        res.status(500).json({ msg: "Could not fetch files" });
    }
};
exports.allFiles = allFiles;
//# sourceMappingURL=controller.js.map