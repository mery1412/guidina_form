"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ormconfig_1 = __importDefault(require("./ormconfig"));
const route_1 = require("./appForm/route");
const user_1 = __importDefault(require("./entities/user"));
(async () => {
    await ormconfig_1.default.initialize();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use('/form', route_1.router);
    app.use('/form/addFile', route_1.router);
    app.use('/form/allFiles', route_1.router);
    app.use('/form/allForms', route_1.router);
    app.get('/allServiceProviders', async (req, res) => {
        try {
            console.log("Fetching...");
            let { nameRole } = req.query;
            let userRepo = ormconfig_1.default.getRepository(user_1.default);
            let serviceProviders = await userRepo
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.roles', 'role')
                .where('role.roleName = :guide OR role.roleName = :translator OR role.roleName = :car_rentor OR role.roleName = :house_rentor', { guide: nameRole, translator: nameRole, car_rentor: nameRole, house_rentor: nameRole })
                .getMany();
            res.json({ serviceProviders });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Could not fetch users" });
        }
    });
    app.listen(3000, () => {
        console.log('listening...');
    });
})();
//# sourceMappingURL=server.js.map