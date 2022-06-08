const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const RegistrationModel = require('../../models/registration.model');
const Registration_doctorModel = require('../../models/registration_doctor.model');
const Registration_filesModel = require('../../models/registration_files.model');
const Registration_inspection_childModel = require('../../models/registration_inspection_child.model');
const Registration_inspectionModel = require('../../models/registration_inspection.model');
const Registration_payModel = require('../../models/registration_pay.model');
const Registration_recipeModel = require('../../models/registration_recipe.model');
const Register_kassaModel = require('../../models/register_kassa.model')
const RegisterDoctorModel = require('../../models/register_doctor.model')
const Register_inspectionModel = require('../../models/register_inspection.model');
const UserModel = require('../../models/user.model');
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class RegistrationController {
    getAll = async (req, res, next) => {
        const model = await RegistrationModel.findAll({
            include:[
                {
                    model: Registration_doctorModel, as: 'registration_doctor',
                    include:[
                        {
                            model: Registration_recipeModel, as: 'registration_recipe'
                        }
                    ]
                },
                {
                    model: Registration_inspectionModel, as: 'registration_inspection',
                    include:[
                        {
                            model: Registration_inspection_childModel, as: 'registration_Child'
                        }
                    ]
                }
             ],
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
            include:[
               {
                   model: Registration_doctorModel, as: 'registration_doctor',
                   include:[
                       {
                           model: Registration_recipeModel, as: 'registration_recipe'
                       }
                   ]
               },
               {
                   model: Registration_inspectionModel, as: 'registration_inspection',
                   include:[
                       {
                           model: Registration_inspection_childModel, as: 'registration_Child'
                       }
                   ]
               }
            ],
            
            where:{
                id: req.params.id
            }
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
       const {registration_files, registration_doctor, registration_inspection, registration_pay, ...registration} = req.body;
       const model = await RegistrationModel.create(registration);
       
       if(!model){
           throw new HttpException(500, 'model mavjud emas');
       }
       registration_files.forEach((value, index) => {
           Registration_filesModel.create(value)
       })
       registration_doctor.forEach((value, index) =>{
      var {registration_recipe, ...registration_doctor} = value
     Registration_doctorModel.create(registration_doctor);
   for(let i = 0; i < registration_recipe.length; i++){
       Registration_recipeModel.create(registration_recipe[i]);
       RegisterDoctorModel.create({
           "date_time": Math.floor(new Date().getTime() / 1000),
           "type": value.text,
           "price": value.price,
           "doc_id": value.registration_id, 
           "doctor_id": value.doctor_id
       })
   }
    })
    registration_inspection.forEach((value, index) => {
            var {registration_inspection_child, ...registration_inspection} = value;
            Registration_inspectionModel.create(registration_inspection);
            for(let i = 0; i < registration_inspection_child.length; i++){
                Register_inspectionModel.create({
                  "date_time": Math.floor(new Date().getTime() / 1000),
                  "type": value.type,
                  "price": value.price,
                  "doc_id": value.registration_id,
                  "user_id": value.id
                })
                Registration_inspection_childModel.create(registration_inspection_child[i]);
            }
    })
    registration_pay.forEach((value, index)=>{
        Registration_payModel.create(value);
        Register_kassaModel.create({
            "date_time": value.date_time,
            "doctor_id": model.id,
            "pay_type": value.pay_type,
            "price": value.summa,   
            "type": 'kirim'
        })
    })

    //    for(let i = 0; i < registration_doctor.length; i++){
    //        registration_doctor[i].id = model.id; 
    //        registration_recipe[i].id = model.id;
    //        registration_files[i].id = model.id;
    //        registration_inspection[i].id = model.id;
    //        registration_inspection_child[i].id = model.id;
    //        registration_pay[i].id = model.id;
    //        await Registration_payModel.create(registration_pay[i])
    //        await Registration_doctorModel.create(registration_doctor[i])
    //        await RegisterDoctorModel.create({
    //            "doc_id": registration_doctor[i].registration_id,
    //            "doctor_id": registration_doctor[i].doctor_id,
    //            "price": registration_doctor[i].price,
    //            "date_time": model.created_at,
    //            "type": registration_doctor[i].status
    //        })
    //        await Registration_recipeModel.create(registration_recipe[i])
    //        await Registration_filesModel.create(registration_files[i])
    //        await Registration_inspectionModel.create(registration_inspection[i])
    //        await Registration_inspection_childModel.create(registration_inspection_child[i]) 
    //    }
    //    for(let i = 0; i < registration_pay.length; i++){
    //        await Register_kassaModel.create({
    //         "date_time": model.created_at,
    //         "pay_type": registration_pay[i].pay_type,
    //         "type": "kirim",
    //         "price": registration_pay[i].summa,
    //         "doctor_id": model.id
    //   })
    //    }
   
        
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
    // await Registration_doctorModel.destroy({
    //      where:{
    //          registration_id: model.id
    //      }
    //     })
    //     await Registration_filesModel.destroy({
    //         where:{
    //             registration_id: model.id
    //         }
    //        })
    //        await Registration_inspectionModel.destroy({
    //         where:{
    //             registration_id: model.id
    //         }
    //        })
    //        await Registration_inspection_childModel.destroy({
    //         where:{
    //             registration_id: model.id
    //         }
    //        })
    //        await Registration_payModel.destroy({
    //         where:{
    //             registration_id: model.id
    //         }
    //        })
    //        await Registration_recipeModel.destroy({
    //         where:{
    //             registration_id: model.id
    //         }
    //        })
    //        await Register_kassaModel.destroy({
    //            where:{
    //                doctor_id: model.id
    //            } 
    //        })
    //     if(model === null){
    //         res.status(404).send("not found")
    //     }
    //     model.user_id = registration.user_id;
    //     model.status = registration.status;
    //     model.patient_id = registration.patient_id;
    //     model.type_service = registration.type_service;
    //     model.complaint = registration.complaint;
    //     model.summa = registration.summa;
    //     model.pay_summa = registration.pay_summa;
    //     model.backlog = registration.backlog;
    //     model.discount = registration.discount;
    // model.save();
    // for(let i = 0; i < registration_doctor.length; i++){
    //     registration_doctor[i].registration_id =model.id;
    //     registration_recipe[i].registration_id =model.id;
    //     registration_files[i].registration_id =model.id;
    //     registration_pay[i].registration_id =model.id;
    //     registration_inspection[i].registration_id =model.id;
    //     registration_inspection_child[i].registration_id =model.id;
    //     await Registration_doctorModel.create(registration_doctor[i])
    //     await Registration_recipeModel.create(registration_recipe[i])
    //     await Registration_filesModel.create(registration_files[i])
    //     await Registration_payModel.create(registration_pay[i])
    //     await RegisterDoctorModel.create({
    //         "doc_id": registration_doctor[i].doctor_id,
    //         "doctor_id": registration_doctor[i].registration_id,
    //         "price": registration_doctor[i].price,
    //         "date_time": model.created_at,
    //         "type": registration_doctor[i].status
    //     })
    //     await Registration_inspectionModel.create(registration_inspection[i])
    //     await Registration_inspection_childModel.create(registration_inspection_child[i])
    //     for(let i = 0; i < registration_pay.length; i++){
    //         await Register_kassaModel.create({
    //          "date_time": model.created_at,
    //          "pay_type": registration_pay[i].pay_type,
    //          "type": "kirim",
    //          "price": registration_pay[i].summa,
    //          "doctor_id": model.id
    //    })
    //     }
    // }
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
            id: req.params.id
        }
       })
       await Registration_filesModel.destroy({
           where:{
            id: req.params.id
           }
          })
          await Registration_inspectionModel.destroy({
           where:{
            id: req.params.id
           }
          })
          await Registration_inspection_childModel.destroy({
           where:{
            id: req.params.id
           }
          })
          await Registration_payModel.destroy({
           where:{
            id: req.params.id
           }
          })
          await Registration_recipeModel.destroy({
           where:{
            id: req.params.id
           }
          })
          await Register_kassaModel.destroy({
              where:{
                  id: req.params.id
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