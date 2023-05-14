"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = __importDefault(require("./entities/user"));
const post_1 = __importDefault(require("./entities/post"));
const form_1 = __importDefault(require("./entities/form"));
const role_1 = __importDefault(require("./entities/role"));
exports.default = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "marichou2004",
    database: "alguide_db",
    synchronize: true,
    logging: false,
    entities: [user_1.default, post_1.default, form_1.default, role_1.default],
    subscribers: [],
    migrations: [],
});
//# sourceMappingURL=ormconfig.js.map