"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForm = void 0;
const ormconfig_1 = __importDefault(require("./../ormconfig"));
const form_1 = __importDefault(require("../entities/form"));
let createForm = async (url, firstName, lastName, region, phoneNumber, role) => {
    let newForm = new form_1.default();
    newForm.firstName = firstName;
    newForm.lastName = lastName;
    newForm.region = region;
    newForm.phoneNumber = phoneNumber;
    newForm.role = role;
    newForm.cvFile = url;
    await ormconfig_1.default.getRepository(form_1.default).save(newForm);
};
exports.createForm = createForm;
//# sourceMappingURL=middlware.js.map