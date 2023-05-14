"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const fileHandling_1 = require("./fileHandling");
let router = express_1.default.Router();
exports.router = router;
router.get('/', (req, res) => {
    res.render('index');
});
router.post('/addForm', fileHandling_1.handleFileUpload, controller_1.addForm);
router.delete('/deleteForm:id', controller_1.deleteForm);
router.get('/allForms', controller_1.allForms);
router.get('/allFiles', controller_1.allFiles);
//# sourceMappingURL=route.js.map