import appDataDource from "typeorm"
import express,{Request, Response} from "express"
import Form from "src/entities/form";
import User from "src/entities/user"





let acceptApp = async(req: Request, res: Response)=>{
    let {id} = req.params;
    let appRep = appDataDource.getRepository(Form);
    let userRep = appDataDource.getRepository(User);
        
    try {
        let app = await appRep.findOneOrFail({where: {id: id}});
        app.status='accepted';
        await appRep.save(app)
        res.send("Application accepted!")
        const userId = app.user.id
        const user = await userRep.findOne({where: {id: userId}});
        if(user){
            user.phoneNumber=app.phoneNumber;
            user.region=app.region;
            user.roles
        }else{
            res.status(500).json({msg: "failed"})
        }
    } catch (error) {
        res.status(404).send('Application form not found ny id');
    }
}


let declineApp = async(req: Request, res:Response) =>{
    let {id} = req.params;
    let appRep = appDataDource.getRepository(Form);

    try {
        let app = await appRep.findOneOrFail({where: {id: id}});
        //app.status = 'declined';
        //await appRep.save(app)
        await appRep.remove(app);
        res.send("Application declined and deleted!")
    } catch (error) {
         res.status(404).send('Application form not found ny id');
    }
}


export {
    acceptApp,
    declineApp
}