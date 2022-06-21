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
const QueueModel = require('../../models/queue.model')
const { sequelize } = require('../../models/user.model');
const PatientModel = require('../../models/patient.model');
const registration_palataModel = require('../../models/registration_palata.model');
const register_palataModel = require('../../models/register_palata.model');
const {Op} = require('sequelize')
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class RegistrationController {
     massiv = [];
    getAll = async (req, res, next) => {
        const model = await RegistrationModel.findAll({
            include:[
                {
                    model: PatientModel, as: 'patient'
                },

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
   create = async (req, res, next, insert = true) => {
    const x = await UserModel.findOne({
        where:{
            id: 1
        },
    })
    let miqdor = x._previousDataValues.percent;
    // console.log(miqdor);
       this.checkValidation(req);
       const {registration_files, registration_palata,queue, registration_doctor, registration_inspection, registration_pay, ...registration} = req.body;
       const model = await RegistrationModel.create(registration);
    //    registration.forEach()
       if(!model){
           throw new HttpException(500, 'model mavjud emas');
       }
       registration_palata.forEach((value, index) =>{
            registration_palataModel.create(value);
            register_palataModel.create({
                "palata_id": value.palata_id,
                "patient_id": model.id,
                "registration_id": value.registration_id,
                "price": value.price,
                "day": value.day,
                "date_to": value.date_to,
                "date_do": value.date_do,
                "date_time": value.date_time
            })
       })
       registration_files.forEach((value, index) => {
           Registration_filesModel.create(value)
       })
       registration_doctor.forEach( async (value, index) =>{
      var {registration_recipe, ...registration_doctor} = value;
    //   console.log(value);
      var user = await UserModel.findOne({
        where:{
            doctor_id: value.doctor_id
        }
      })
      function isHave(item){
        return item.room_id == user._previousDataValues.room_id && item.patient_id == model.patient_id;
    }
    // console.log(user.room_id + "||"+ model.patient_id);
    var have =  this.massiv.find(isHave);
    // console.log(have);
    if(have == undefined){
        this.massiv.push({"room_id":user._previousDataValues.room_id,"patient_id":model.patient_id,"number":0,"date_time":Math.floor(new Date().getTime() / 1000),"status":registration_doctor.status})
    }
    else if(value.status!=have.status){
      if(value.status!='complete'){
          var index=this.massiv.findIndex(isHave);
          this.massiv[index].status=have.status;
      }else if(have.status!='complete'){
          var index=this.massiv.findIndex(isHave);
          this.massiv[index].status=have.status;
      }
  }
     Registration_doctorModel.create(registration_doctor);
   for(let i = 0; i < registration_recipe.length; i++){
       Registration_recipeModel.create(registration_recipe[i]);
       var date_time = Math.floor(new Date().getTime() / 1000);
       RegisterDoctorModel.create({
           "date_time": date_time,
           "type": value.text,
           "price": value.price,
           "doc_id": 1, 
           "doctor_id": value.doctor_id
       })
   }
    })

    registration_inspection.forEach( async (value, index) => {
            var {registration_inspection_child, ...registration_inspection} = value;
            var user = await UserModel.findOne({
                where:{
                    id: value.inspection_id
                }
            })
              function isHave(item){
                  return item.room_id == user._previousDataValues.room_id && item.patient_id == model.patient_id;
              }
              var a = this.massiv.find(isHave)
            //   console.log(a);
              if(a == undefined){
                  this.massiv.push({"room_id":user._previousDataValues.room_id,"patient_id":model.patient_id,"number":0,"date_time":Math.floor(new Date().getTime() / 1000),"status":registration_inspection.status})
              }
              else if(value.status!=a.status){
                if(value.status!='complete'){
                    var index=this.massiv.findIndex(isHave);
                    this.massiv[index].status=a.status;
                }else if(a.status!='complete'){
                    var index=this.massiv.findIndex(isHave);
                    this.massiv[index].status=a.status;
                }
              }
            Registration_inspectionModel.create(registration_inspection);
            for(let i = 0; i < registration_inspection_child.length; i++){
                Registration_inspection_childModel.create(registration_inspection_child[i]);
            }
            var date_time = Math.floor(new Date().getTime() / 1000);
            // console.log(date_time);
            Register_inspectionModel.create({
                "date_time": date_time,
                "type": value.type,
                "price": value.price * miqdor,
                "doc_id": value.registration_id,
                "user_id": model.id,
                "inspection_id": value.inspection_id
              })
    })
    registration_pay.forEach((value, index)=>{
        Registration_payModel.create(value);
        var date_time = Math.floor(new Date().getTime() / 1000);
        Register_kassaModel.create({
            "date_time": date_time,
            "doctor_id": value.user_id,
            "pay_type": value.pay_type,
            "price": value.summa * miqdor,    
            "type": 'kirim'
        })
        
    })
            for(var element of this.massiv){
                if(!insert){
                    var has= await QueueModel.findOne({
                        where:{
                            status:{[Op.not]:'complete'},
                            room_id: element.room_id,
                            patient_id: element.patient_id
                        }
                    });
                    if(has!=null){
                        if(element.status!=has.status){
                            has.status=element.status;
                           await  has.save();
                        }
                    }else if(element.status!='complete') {
                        var que= await QueueModel.findOne({
                            where:{ 
                                room_id: element.room_id,
                            },
                            order: [
                                ['number', 'DESC']
                            ],
                        });
                        console.log(que);
                        if(que!=null){
                            element.number=que.number+1;
                        }else{
                            element.number=1;
                        }
                       await  QueueModel.create(element);
                    }
                }else{
                    var que= await QueueModel.findOne({
                        where:{ 
                            room_id: element.room_id,
                        },
                        order: [
                            ['number', 'DESC']
                        ],
                    });
                    if(que!=null){
                        element.number=que.number+1;
                    }else{
                        element.number=1;
                    }
                   await  QueueModel.create(element); 
    
                }
            } 
            this.massiv=[];
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next, insert = true) => {
       this.checkValidation(req);
       const id = req.params.id;
       const {registration_files, registration_doctor, registration_inspection, registration_pay, ...registration} = req.body;
    const model = await RegistrationModel.findOne({
        where:{
            id: id
        }
    });
     if(model === null){
         throw new HttpException(404, 'data not found')
     }
    await Registration_doctorModel.destroy({
         where:{
            id: id
         }
        })
        await Registration_recipeModel.destroy({
            where:{
                id: id
             }
           })
        await Registration_filesModel.destroy({
            where:{
                id: id
             }
           })
           await Registration_inspectionModel.destroy({
            where:{
                id: id
             }
           })
           await Registration_inspection_childModel.destroy({
            where:{
                id: id
             }
           })
           await Registration_payModel.destroy({
            where:{
                id: id
             }
           })
           await RegisterDoctorModel.destroy({
            where:{
                id: id
             }
           })
           await Register_inspectionModel.destroy({
            where:{
                id: id
             }
           })
           await Register_kassaModel.destroy({
            where:{
                id: id
             }
           })
           await QueueModel.destroy({ 
            where:{
                id: id
             }
           })
        if(model === null){
            res.status(404).send("not found")
        }
        model.user_id = registration.user_id;
        model.status = registration.status;
        model.patient_id = registration.patient_id;
        model.type_service = registration.type_service;
        model.complaint = registration.complaint;
        model.summa = registration.summa;
        model.pay_summa = registration.pay_summa;
        model.backlog = registration.backlog;
        model.discount = registration.discount;
    model.save();
   
    const x = await UserModel.findOne({
        where:{
            id: 1
        },
    })
    let miqdor = x._previousDataValues.percent;
    console.log(miqdor);
       if(!model){
           throw new HttpException(500, 'model mavjud emas');
       }
       registration_files.forEach((value, index) => {
           Registration_filesModel.create(value)
       })
       registration_doctor.forEach((value, index) =>{
      var {registration_recipe, ...registration_doctor} = value;
      function isHave(item){
        return item.room_id == x._previousDataValues.room_id && item.patient_id == model.patient_id;
    }
    var a = this.massiv.find(isHave)
    console.log(a);
    if(a == undefined){
        this.massiv.push({"room_id":x._previousDataValues.room_id,"patient_id":model.patient_id,"number":0,"date_time":Math.floor(new Date().getTime() / 1000),"status":value.status})
    }
    else if(value.status!=a.status){
      if(value.status!='complete'){
          var index=this.massiv.findIndex(isHave);
          this.massiv[index].status=a.status;
      }else if(a.status!='complete'){
          var index=this.massiv.findIndex(isHave);
          this.massiv[index].status=a.status;
      }
  }
     Registration_doctorModel.create(registration_doctor);
   for(let i = 0; i < registration_recipe.length; i++){
       Registration_recipeModel.create(registration_recipe[i]);
       var date_time = Math.floor(new Date().getTime() / 1000);
       RegisterDoctorModel.create({
           "date_time": date_time,
           "type": value.text,
           "price": value.price,
           "doc_id": 1, 
           "doctor_id": value.doctor_id
       })
   }
    })

    registration_inspection.forEach((value, index) => {
            var {registration_inspection_child, ...registration_inspection} = value;
              function isHave(item){
                  return item.room_id == x._previousDataValues.room_id && item.patient_id == model.patient_id;
              }
              var a = this.massiv.find(isHave)
              console.log(a);
              if(a == undefined){
                  this.massiv.push({"room_id":x._previousDataValues.room_id,"patient_id":model.patient_id,"number":0,"date_time":Math.floor(new Date().getTime() / 1000),"status":value.status})
              }
              else if(value.status!=a.status){
                if(value.status!='complete'){
                    var index=this.massiv.findIndex(isHave);
                    this.massiv[index].status=a.status;
                }else if(a.status!='complete'){
                    var index=this.massiv.findIndex(isHave);
                    this.massiv[index].status=a.status;
                }
            }
            Registration_inspectionModel.create(registration_inspection);
            for(let i = 0; i < registration_inspection_child.length; i++){
                Registration_inspection_childModel.create(registration_inspection_child[i]);
            }
            var date_time = Math.floor(new Date().getTime() / 1000);
            console.log(date_time);
            Register_inspectionModel.create({
                "date_time": date_time,
                "type": value.type,
                "price": value.price * miqdor,
                "doc_id": value.registration_id,
                "user_id": value.id,
                "inspection_id": value.inspection_id
              })
    })
    registration_pay.forEach((value, index)=>{
        Registration_payModel.create(value);
        var date_time = Math.floor(new Date().getTime() / 1000);
        Register_kassaModel.create({
            "date_time": date_time,
            "doctor_id": value.user_id,
            "pay_type": value.pay_type,
            "price": value.summa * miqdor,    
            "type": 'kirim'
        })
        
    })
            for(var element of this.massiv){
                if(!insert){
                    var has= await QueueModel.findOne({
                        where:{
                            status:{[Op.not]:'complete'},
                            room_id: element.room_id,
                            patient_id: element.patient_id
                        }
                    });
                    if(has!=null){
                        if(element.status!=has.status){
                            has.status=element.status;
                           await  has.save();
                        }
                    }else if(element.status!='complete') {
                        var que= await QueueModel.findOne({
                            where:{ 
                                room_id: element.room_id,
                            },
                            order: [
                                ['number', 'DESC']
                            ],
                        });
                        if(que!=null){
                            element.number=que.number+1;
                        }else{
                            element.number=1;
                        }
                       await  QueueModel.create(element);
                    }
                }else{
                    var que= await QueueModel.findOne({
                        where:{ 
                            room_id: element.room_id,
                        },
                        order: [
                            ['number', 'DESC']
                        ],
                    });
                    if(que!=null){
                        element.number=que.number+1;
                    }else{
                        element.number=1;
                    }
                   await  QueueModel.create(element); 
    
                }
            } 
            this.massiv=[];
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumot tahrirlandi',
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