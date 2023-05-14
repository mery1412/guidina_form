import express, { Request, Response } from "express";
import appDataSource from "./ormconfig"
import {router} from "./appForm/route"
import User from "./entities/user"
import { acceptApp, declineApp } from "./admin/adminApp";




(async() => {
    await appDataSource.initialize()

    const app = express()

    app.use(express.json())

   //app.post("/addForm",addForm )
   //app.use('/', router)

   app.use('/form', router)
   app.use('/form/addFile', router)
   app.use('/form/allFiles', router)
   app.use('/form/allForms', router)
   app.put('/applications/:id/accept', acceptApp);
   app.delete('/applications/:id/decline', declineApp);

   app.get('/allServiceProviders', async(req:Request, res:Response)=>{
    try {
        console.log("Fetching...")
        let {nameRole} = req.query;
        let userRepo = appDataSource.getRepository(User)
        let serviceProviders = await userRepo
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'role')
        .where('role.roleName = :guide OR role.roleName = :translator OR role.roleName = :car_rentor OR role.roleName = :house_rentor', { guide: nameRole, translator: nameRole, car_rentor: nameRole, house_rentor: nameRole })
        .getMany();
        res.json({serviceProviders})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Could not fetch users"})
    }
   })
   

    app.listen(3000, () => {
        console.log('listening...')
    })

    

    /*import roles from "./constants"
import form from "./entities"
import post from "./entities"
import role from "./entities"
import user from "./entities"*/
})()