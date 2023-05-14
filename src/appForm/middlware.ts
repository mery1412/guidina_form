
import appDataSource from "./../ormconfig"
import roles from "../constants/roles"
import Form from "../entities/form";


let createForm =  async (url:string, firstName: string, lastName:string, region:string, phoneNumber: string, role: roles, languages: string[]) => {
  
    let newForm = new Form()
        newForm.firstName=firstName
        newForm.lastName=lastName
        newForm.region=region
        newForm.phoneNumber=phoneNumber
        newForm.role=role  
        newForm.cvFile = url
        newForm.languages=languages
        await appDataSource.getRepository(Form).save(newForm)
}


/*let addFileMiddlware = ( url: string) => {
    let fileRep = appDataSource.getRepository(Form)
    let newForm = new Form()
    newForm.cvFile = url
    fileRep.save(newForm)
}*/


export {
    createForm
}