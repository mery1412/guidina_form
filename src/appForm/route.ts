import express, { Request, response, Response } from "express";
import {addForm, allFiles, allForms, deleteForm} from "./controller"
import { handleFileUpload } from "./fileHandling";

let router = express.Router()


router.get('/', (req: Request,res: Response) =>{
    res.render('index')
} ) 

router.post('/addForm', handleFileUpload, addForm)
//router.post('/addFile', handleFileUpload, addFileController )
router.delete('/deleteForm:id', deleteForm)
router.get('/allForms', allForms)
router.get('/allFiles', allFiles)



export {router}

