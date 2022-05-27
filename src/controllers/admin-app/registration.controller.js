const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const RegistrationModel = require('../../models/registration.model');
const Registration_doctorModel = require('../../models/registration_doctor.model');
const Registration_filesModel = require('../../models/registration_files.model');
const Registration_inspection_childModel = require('../../models/registration_inspection_child.model');
const Registration_inspectionModel = require('../../models/registration_inspection.model');
const Registration_payModel = require('../../models/registration_pay.model');
const Registration_recipeModel = require('../../models/registration_recipe.model');
const PatientModel = require('../../models/patient.model');
const UserModel = require('../../models/user.model');
const DoctorModel = require('../../models/doctor.model');
const Inspection_categoryModel = require('../../models/inspector_category.model')
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class RegistrationController {
    getAll = async (req, res, next) => {
        const model = await RegistrationModel.findAll({
            include:[
                {model: PatientModel, as: 'patient', attributes: ['fullname']},
                {model: UserModel, as: 'user', attributes: ['user_name']}
            ]
        });
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await RegistrationModel.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {model: Registration_filesModel, as: 'registration_files'},
                // {model: Registration_inspection_childModel, as: 'registration_inspection_child'},
                // {model: Registration_inspectionModel, as: 'registration_inspection'},
                {model: Registration_payModel, as: 'registration_pay'},
                {model: Registration_recipeModel, as: 'registration_recipe'},
                {model: PatientModel, as: 'patient'}
            ]
        }); 
        if(!model){
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot chiqdi',
            data: model
        });
    }
   create = async (req, res, next) => {
       this.checkValidation(req);
       const {registration_doctor, registration_files,registration_inspection,
        registration_pay,registration_inspection_child, registration_recipe, ...registration} = req.body;
       
       const model = await RegistrationModel.create(registration);
       for(let i = 0; i < registration_doctor.length; i++){
           registration_doctor[i].registration_id = model.id;
           await Registration_doctorModel.create(registration_doctor[i])
       }
       for(let j = 0; j < registration_files.length; j++){
           registration_files[j].registration_id = model.id;
           await Registration_filesModel.create(registration_files[j])
       }
       for(let j = 0; j < registration_inspection.length; j++){
        registration_inspection[j].registration_id = model.id;
        await Registration_inspectionModel.create(registration_inspection[j])
    }
    for(let j = 0; j < registration_pay.length; j++){
        registration_pay[j].registration_id = model.id;
        await Registration_payModel.create(registration_pay[j])
    }
    for(let j = 0; j < registration_inspection_child.length; j++){
        registration_inspection_child[j].registration_id = model.id;
        await Registration_inspection_childModel.create(registration_inspection_child[j])
    }
    for(let j = 0; j < registration_recipe.length; j++){
        registration_recipe[j].registration_id = model.id;
        await Registration_recipeModel.create(registration_recipe[j])
    }
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
       const {registration_doctor, registration_files,registration_inspection,
        registration_pay,registration_inspection_child, registration_recipe, ...registration} = req.body;
    const model = await RegistrationModel.findOne({
        where:{
            id: req.params.id
        }
    });
     if(model === null){
         throw new HttpException(404, 'data not found')
     }
    await Registration_doctorModel.destroy({
         where:{
             registration_id: model.id
         }
        })
        await Registration_filesModel.destroy({
            where:{
                registration_id: model.id
            }
           })
           await Registration_inspectionModel.destroy({
            where:{
                registration_id: model.id
            }
           })
           await Registration_inspection_childModel.destroy({
            where:{
                registration_id: model.id
            }
           })
           await Registration_payModel.destroy({
            where:{
                registration_id: model.id
            }
           })
           await Registration_recipeModel.destroy({
            where:{
                registration_id: model.id
            }
           })
        if(model === null){
            res.status(404).send("not found")
        }
        model.user_id = registration.user_id;
        model.created_at = registration.created_at;
        model.updated_at = registration.updated_at;
        model.status = registration.status;
        model.patient_id = registration.patient_id;
        model.type_service = registration.type_service;
        model.complaint = registration.complaint;
        model.summa = registration.summa;
        model.pay_summa = registration.pay_summa;
        model.backlog = registration.backlog;
        model.discount = registration.discount;
    model.save();
    for(let i = 0; i < registration_doctor.length; i++){
        registration_doctor[i].registration_id = model.id;
        await Registration_doctorModel.create(registration_doctor[i])
    }
    for(let j = 0; j < registration_files.length; j++){
        registration_files[j].registration_id = model.id;
        await Registration_filesModel.create(registration_files[j])
    }
    for(let j = 0; j < registration_inspection.length; j++){
     registration_inspection[j].registration_id = model.id;
     await Registration_inspectionModel.create(registration_inspection[j])
 }
 for(let j = 0; j < registration_pay.length; j++){
     registration_pay[j].registration_id = model.id;
     await Registration_payModel.create(registration_pay[j])
 }
 for(let j = 0; j < registration_inspection_child.length; j++){
     registration_inspection_child[j].registration_id = model.id;
     await Registration_inspection_childModel.create(registration_inspection_child[j])
 }
 for(let j = 0; j < registration_recipe.length; j++){
     registration_recipe[j].registration_id = model.id;
     await Registration_recipeModel.create(registration_recipe[j])
 }
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
  const model =  await RegistrationModel.destroy({
        where:{
          id: req.params.id
        }
    });
    await Registration_doctorModel.destroy({
        where:{
            registration_id: model.id
        }
       })
       await Registration_filesModel.destroy({
           where:{
               registration_id: model.id
           }
          })
          await Registration_inspectionModel.destroy({
           where:{
               registration_id: model.id
           }
          })
          await Registration_inspection_childModel.destroy({
           where:{
               registration_id: model.id
           }
          })
          await Registration_payModel.destroy({
           where:{
               registration_id: model.id
           }
          })
          await Registration_recipeModel.destroy({
           where:{
               registration_id: model.id
           }
          })
    if(!model){
        throw new HttpException(404, "bunday id yoq")
    }
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumot o\'chirildi',
        data: model
    });
}
    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

   
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new RegistrationController;