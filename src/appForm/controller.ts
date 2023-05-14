import express, { Request, Response } from "express";
import appDataSource from "./../ormconfig"
import Form from "../entities/form";
import { createForm } from "./middlware"


let addForm = async( req:Request, res: Response) => {
    try{
        let { firstName, lastName, region, phoneNumber, role, languages } = req.body
        if (!req.body) res.json({msg: "no body"})
        else {
            try{
            let newForm = await createForm( req.file?.path!,firstName, lastName, region, phoneNumber, role , languages)
            res.status(200).json({ msg: "File uploaded successfully", newForm })
            }catch (error){
                res.status(500).json({ error: error.message, msg: "Could not upload file" });
            }
         }
    }catch (error){
        res.json({ msg: "could not add form" })
   }

}

let deleteForm = async(req:Request, res: Response) => {
    try {
        let formRepo = appDataSource.getRepository(Form)
        let form = await formRepo.delete(req.params.id);

        if (form.affected === 1) {
            console.log(`Form deleted successfully`);
          } else {
            console.log(`Form with given ID not found`);
          }    
          res.json({msg: "Form deleted successfully"})

    } catch (error) {
        console.log(error)
        res.json({msg: "Could not delete form"})
    }

 
}

let allForms = async(req:Request, res:Response) =>{
    try {
        let formRepo = appDataSource.getRepository(Form)
        let forms  = await formRepo.find()
        res.status(200).json({forms})
    } catch (error) {
        res.status(500).json({msg :"Could not fetch forms"})
    }
}

/*let addFileController = async(req: Request, res: Response)=>{
    try {
          console.log(req.body)
          await addFileMiddlware(req.file?.path!)
          res.status(200).json({ msg: "File uploaded successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message, msg: "Could not upload file" });
        console.log(error)
    }
}*/

let allFiles = async(req: Request, res:Response)=> {
    try {
        let fileRep = appDataSource.getRepository(File)
        let files = await fileRep.find()
        res.status(200).json({files})
    } catch (error) {
        res.status(500).json({msg:"Could not fetch files"})
    }
}


export {
    addForm,
    deleteForm,
    allForms,
    allFiles
}
