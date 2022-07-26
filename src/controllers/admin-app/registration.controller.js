const HttpException = require('../../utils/HttpException.utils');
const { validationResult, query } = require('express-validator');
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
const { sequelize, sum } = require('../../models/user.model');
const inspectionCategory = require('../../models/inspector_category.model')
const PatientModel = require('../../models/patient.model');
const registration_palataModel = require('../../models/registration_palata.model');
const register_palataModel = require('../../models/register_palata.model');
const {Op} = require('sequelize');
const RoomModel = require('../../models/room.model');
const DoctorModel = require('../../models/doctor.model');
const palataModel = require('../../models/palata.model');
const directModel = require('../../models/direct.model')
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class RegistrationController {
     massiv = [];
    getAll = async (req, res, next) => {
        const model = await RegistrationModel.findAll({
            include:[
                {
                    model: UserModel, as: 'user', attributes: ['user_name']
                },
                {
                    model: PatientModel, as: 'patient', attributes: ['fullname']
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
       this.checkValidation(req);
       const {registration_files, registration_palata,queue, direct, registration_doctor, registration_inspection, registration_pay, ...registration} = req.body;
       const model = await RegistrationModel.create({
        "user_id": req.body.user_id,
        "direct_id": req.body.direct_id,
        "status": req.body.status,
        "patient_id": req.body.patient_id,
        "type_service": req.body.type_service,
        "complaint": req.body.complaint,
        "summa": req.body.summa,
        "pay_summa": req.body.pay_summa,
        "backlog": req.body.backlog,
        "discount": req.body.discount,
        "hospital_summa": req.body.hospital_summa
       });
       if(!model){
           throw new HttpException(500, 'model mavjud emas');
       }
       registration_palata.forEach((value, index) =>{
        let day = new Date();
        let date = Math.floor(new Date().getDate() / 1000);
            registration_palataModel.create({
                "palata_id": value.palata_id,
                "registration_id": model.id,
                "price": value.price,
                "day": day.getDay(),
                "date_to": date,
                "date_do": date,
                "date_time": date
            });
            register_palataModel.create({
                "palata_id": value.palata_id,
                "patient_id": model.id,
                "registration_id": model.id,
                "price": value.price,
                "day": value.day,
                "date_to": value.date_to,
                "date_do": value.date_do,
                "date_time": value.date_time
            })
       })
       registration_files.forEach((value, index) => {
           Registration_filesModel.create({
            "registration_id": model.id,
            "href": value.href
           })
       })
       registration_doctor.forEach( async (value, index) =>{
      var {registration_recipe, ...registration_doctor} = value;
      value.registration_id = model.id;
    //   console.log(value);
      var user = await UserModel.findOne({
        where:{
         id: value.doctor_id 
        },
        raw: true
      })
      console.log(user);
      function isHave(item){
        return item.room_id == user.room_id && item.patient_id == model.patient_id;
    }
    var have = await this.massiv.find(isHave);  
    if(have == undefined){
        this.massiv.push({"room_id":user.room_id,"patient_id":model.patient_id,"number":0,"date_time":Math.floor(new Date().getTime() / 1000),"status":registration_doctor.status})
    }
    else if(value.status!=have.status){
      if(value.status!='complete'){
          var index=this.massiv.findIndex(isHave);
          console.log(index);
          this.massiv[index].status=have.status;
      }else if(have.status!='complete'){
          var index=this.massiv.findIndex(isHave);
          this.massiv[index].status=have.status;
      }
  }
     Registration_doctorModel.create({
        "doctor_id": value.doctor_id,
        "registration_id": model.id,
        "status": value.status,
        "price": value.price,
        "text": value.text,
     });
   for(let i = 0; i < registration_recipe.length; i++){
       Registration_recipeModel.create(registration_recipe[i]);
       var date_time = Math.floor(new Date().getTime() / 1000);
       RegisterDoctorModel.create({
           "date_time": date_time,
           "type": value.id,
           "price": value.price,
           "doc_id": 1, 
           "doctor_id": value.doctor_id,
           "doc_type": 'kirim'
       })
   }
    })

    registration_inspection.forEach( async (value, index) => {
            const {registration_inspection_child, ...registration_inspection} = value;
            // console.log(registration_inspection_child);
            var user = await UserModel.findOne({  
                where:{
                    id: value.inspection_id
                },
                raw: true
            })
              function isHave(item){
                  return item.room_id == user.room_id && item.patient_id == model.patient_id;
              }
              var a = await this.massiv.find(isHave);
            //   console.log(a);
              if(a == undefined){
                  this.massiv.push({"room_id":user.room_id,"patient_id":model.patient_id,"number":0,"date_time":Math.floor(new Date().getTime() / 1000),"status":value.status})
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
            Registration_inspectionModel.create({
            "inspection_id": value.inspection_id,
            "registration_id": model.id,
            "price": value.price,
            "type": value.type,
            "category_id": value.category_id,
            "status": value.status,
            });

            for(let i = 0; i < registration_inspection_child.length; i++){
              await  Registration_inspection_childModel.create(registration_inspection_child[i])
            } 
           
            var date_time = Math.floor(new Date().getTime() / 1000);
            // console.log(date_time
                Register_inspectionModel.create({
                    "date_time": date_time,
                    "type": 'kirim',
                    "price": value.price,
                    "doc_id": value.registration_id,
                    "user_id": model.id,
                    "inspection_id": value.inspection_id,
                    "inspection_category": value.category_id
                  })
    })
    registration_pay.forEach((value, index)=>{
        Registration_payModel.create({
            "user_id": value.user_id,
            "registration_id": model.id,
            "pay_type": value.pay_type,
            "summa": value.summa,
            "discount": value.discount
        });
        var date_time = Math.floor(new Date().getTime() / 1000);
        Register_kassaModel.create({
            "date_time": date_time,
            "doctor_id": value.user_id,
            "pay_type": value.pay_type,
            "price": value.summa,    
            "type": value.pay_type,
            "doc_type": 'kirim'
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
        model.direct_id = registration.direct_id;
        model.status = registration.status;
        model.patient_id = registration.patient_id;
        model.type_service = registration.type_service;
        model.complaint = registration.complaint;
        model.summa = registration.summa;
        model.pay_summa = registration.pay_summa;
        model.backlog = registration.backlog;
        model.discount = registration.discount;
    model.save();
       if(!model){
           throw new HttpException(500, 'model mavjud emas');
       }
       registration_files.forEach((value, index) => {
           Registration_filesModel.create(value)
       })
       registration_doctor.forEach(async(value, index) =>{
      var {registration_recipe, ...registration_doctor} = value;
      const user = await UserModel.findOne({
        where: {
            id: value.doctor_id
        },
        raw:true
      })
      function isHave(item){
        return item.room_id == user.room_id && item.patient_id == model.patient_id;
    }
    var a = this.massiv.find(isHave)
    if(a == undefined){
        this.massiv.push({"room_id":user.room_id,"patient_id":model.patient_id,"number":0,"date_time":Math.floor(new Date().getTime() / 1000),"status":value.status})
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

    registration_inspection.forEach(async(value, index) => {
            var {registration_inspection_child, ...registration_inspection} = value;
            const user = await UserModel.findOne({
                where:{
                    id: value.inspection_id
                },
                raw: true
            })
              function isHave(item){
                  return item.room_id == user.room_id && item.patient_id == model.patient_id;
              }
              var a = this.massiv.find(isHave)
              
              if(a == undefined){
                  this.massiv.push({"room_id":user.room_id,"patient_id":model.patient_id,"number":0,"date_time":Math.floor(new Date().getTime() / 1000),"status":value.status})
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
                registration_inspection_child[i].parent_id = model.id;
              await  Registration_inspection_childModel.create(registration_inspection_child[i])
            }
            var date_time = Math.floor(new Date().getTime() / 1000);
            // console.log(value);
            Register_inspectionModel.create({
                "date_time": date_time,
                "type": value.type,
                "price": value.price,
                "doc_id": value.registration_id,
                "user_id": value.id,
                "inspection_id": value.inspection_id,
                "inspection_category": value.category_id
              })
    })
    registration_pay.forEach((value, index)=>{
        Registration_payModel.create(value);
        var date_time = Math.floor(new Date().getTime() / 1000);
        Register_kassaModel.create({
            "date_time": date_time,
            "doctor_id": value.user_id,
            "pay_type": value.pay_type,
            "price": value.summa,    
            "type": 'kirim',
            "doc_type": "chiqim"
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

palata = async (req, res, next) => {
    let query = {}, query_begin = {}, query_end = {}, body = req.body;
    query.date_time = {
        [Op.gte]: body.date_to,
        [Op.lte]: body.date_do,
    }
    query_begin.date_time = {
        [Op.lt]: body.date_to
    }
    query_end.date_time = {
        [Op.lte]: body.date_do
    }
    const models = await registration_palataModel.findAll({
                raw: true,
                include:[
                    {model: palataModel, as: 'palata'}
                ]
            });
            if(models.length == 0){
                const model = await palataModel.findAll();
                model.forEach((value) =>{
                    value.status = 'false'
                })
                res.send(model);
            }
            else{
                let status = true;
    const model = await registration_palataModel.findAll({
        raw: true,
        include:[
            {model: palataModel, as: 'palata'}
        ]
    });
    model.forEach((value) => {
        let days;
        days = value.date_do - value.date_to;
        if(value.date_time >= body.date_to && value.date_time <= body.date_do){
            value.status = status;
        }
        else{
            value.status = !status
        }
    })
    res.send(model);
            }
//    if(body.date_do && body.date_to){
//     let status = true;
//     const model = await registration_palataModel.findAll({
//         raw: true,
//         include:[
//             {model: palataModel, as: 'palata'}
//         ]
//     });
//     // if(!model){
//     //     const model = await palataModel.findAll();
//     //     res.send(model)
//     // }
//     model.forEach((value) => {
//         let days;
//         days = value.date_do - value.date_to;
//         if(value.date_time >= body.date_to && value.date_time <= body.date_do){
//             value.status = status;
//         }
//         else{
//             value.status = !status
//         }
//     })
//     res.send(model);
//    }
//         if(!body.date_do && !body.date_do){
//             const model = await palataModel.findAll();
//             res.send(model);
//         }
        // console.log(model);
   
}

kassaSverka = async (req, res, next) => {
    this.checkValidation(req);

    let result = {begin: null, data : [], end: null};
    let body = req.body; 
    let query = {}, query_begin = {}, query_end = {}, queryx = {};
    query.date_time =  {
        [Op.gte]: body.datetime1,
        [Op.lte]: body.datetime2,
    };
    query_begin.date_time =  {
        [Op.lt]: body.datetime1,
    };
    query_end.date_time =  {
        [Op.lte]: body.datetime2,
    };
    if(body.doctor_id != null){
        query.doctor_id = {[Op.eq] : body.doctor_id } 
        query_begin.doctor_id = {[Op.eq] : body.doctor_id } 
        query_end.doctor_id = {[Op.eq] : body.doctor_id } 
        queryx.id = {[Op.eq] : body.doctor_id}
    };
    
    result.data = await Register_kassaModel.findAll({
        attributes : [
            'doctor_id', 'pay_type', 'date_time', 'type', 'doc_type',
            [sequelize.literal('sum(CASE WHEN `type` = 1 and `pay_type` = 1 THEN `price` ELSE 0 END )'), 'kirim_cash'],
            [sequelize.literal('sum(CASE WHEN `type` = 1 and `pay_type` = 2 THEN `price` ELSE 0 END )'), 'kirim_plastic'],
            [sequelize.literal('sum(CASE WHEN `type` = 0 and `pay_type` = 1 THEN `price` ELSE 0 END )'), 'chiqim_cash'],
            [sequelize.literal('sum(CASE WHEN `type` = 0 and `pay_type` = 2 THEN `price` ELSE 0 END )'), 'chiqim_plastic'],
        ],
        where : query,
        include: [
            { model: DoctorModel, as: 'doctor', attributes: ['name'], where: queryx},
        ],
        order: [
            ['date_time', 'ASC']
        ],
        group: ['doctor_id', 'pay_type'],
    })
    //begin naqd plastik
    let kassa_register = await Register_kassaModel.findOne({
        attributes : [
            [sequelize.literal('sum(CASE WHEN `type` = 1 and `pay_type` = 1 THEN `price` ELSE 0 END )'), 'kirim_cash'],
            [sequelize.literal('sum(CASE WHEN `type` = 1 and `pay_type` = 2 THEN `price` ELSE 0 END )'), 'kirim_plastic'],
            [sequelize.literal('sum(CASE WHEN `type` = 0 and `pay_type` = 1 THEN `price` ELSE 0 END )'), 'chiqim_cash'],
            [sequelize.literal('sum(CASE WHEN `type` = 0 and `pay_type` = 2 THEN `price` ELSE 0 END )'), 'chiqim_plastic'],
        ],
        where : query_begin,
        // group: ['sklad_id'],
    });
    if(kassa_register != null) result.begin = kassa_register;
    //end naqd plastik
    kassa_register = await Register_kassaModel.findOne({
        attributes : [
            [sequelize.literal('sum(CASE WHEN `type` = 1 and `pay_type` = 1 THEN `price` ELSE 0 END )'), 'kirim_cash'],
            [sequelize.literal('sum(CASE WHEN `type` = 1 and `pay_type` = 2 THEN `price` ELSE 0 END )'), 'kirim_plastic'],
            [sequelize.literal('sum(CASE WHEN `type` = 0 and `pay_type` = 1 THEN `price` ELSE 0 END )'), 'chiqim_cash'],
            [sequelize.literal('sum(CASE WHEN `type` = 0 and `pay_type` = 2 THEN `price` ELSE 0 END )'), 'chiqim_plastic'],
        ],
        where : query_end,
        // group: ['sklad_id'],
    });
    if(kassa_register != null) result.end = kassa_register;
    res.send(result);
}

kassa = async (req, res, next) => {
    this.checkValidation(req);

    let result;
    let body = req.body; 
    let datetime1 = body.datetime1;
    let datetime2 = body.datetime2;
    let query = {}, query_begin = {}, query_end = {};
    // query.date_time =  {
    //     [Op.gte]: body.datetime1,
    //     [Op.lte]: body.datetime2,
    // };
    // query_begin.date_time =  {
    //     [Op.lt]: body.datetime1,
    // };
    // query_end.date_time =  {
    //     [Op.lte]: body.datetime2,
    // };
    if(body.doctor_id != null){
        query.doctor_id= {[Op.eq] : body.doctor_id } 
        query_begin.doctor_id = {[Op.eq] : body.doctor_id } 
        query_end.doctor_id = {[Op.eq] : body.doctor_id }
    };
    

    
    result = await Register_kassaModel.findAll({
        attributes : [ 
            //'doc_id', 'doc_type',
            'id', 'doctor_id', "type", "date_time", "doc_type",
            [sequelize.literal("SUM(CASE WHEN register_kassa.date_time < " + datetime1 + " THEN register_kassa.price * power(-1, register_kassa.type) ELSE 0 END)"), 'total'],
            [sequelize.literal("SUM(CASE WHEN register_kassa.date_time >= " + datetime1 + " and register_kassa.date_time <= " + datetime2 + " AND register_kassa.type = 0 THEN register_kassa.price ELSE 0 END)"), 'total_kirim'],
            [sequelize.literal("SUM(CASE WHEN register_kassa.date_time >= " + datetime1 + " and register_kassa.date_time <= " + datetime2 + " AND register_kassa.type = 1 THEN register_kassa.price ELSE 0 END)"), 'total_chiqim'],
            // [sequelize.literal('sum(`price` * power(-1, `register_kassa`.`type` + 1))'), 'total'],
            // [sequelize.literal('sum(`price` * (-1  + `register_kassa`.`type`)) * (-1)'), 'total_chiqim'],
            // [sequelize.literal('sum(`price` * `register_kassa`.`type`)'), 'total_kirim'],
        ],
        include: [
            { model: DoctorModel, as: 'doctor', attributes: ['name', 'id'] },
        ],
        where: query,
        group: ['doctor_id'],
        order: [
            ['date_time', 'ASC']
        ],
        raw: true
    })
    let resultx = [];
    for(let i = 0; i < result.length; i++){
        query_begin.doctor_id = result[i].doctor_id;
        query_end.doctor_id = result[i].doctor_id;
        let kassa_register = await Register_kassaModel.findOne({
            attributes : [
                [sequelize.literal('sum(`price` * power(-1, `type` + 1))'), 'total'],
            ],
            where : query_begin,
            group: ['doctor_id'],
            raw: true
        });
        let kassa_registerx = await Register_kassaModel.findOne({
            attributes : [
                [sequelize.literal('sum(`price` * power(-1, `type` + 1))'), 'total'],
            ],
            where : query_end,
            group: ['doctor_id'],
            raw: true
        });   
        console.log(kassa_register);
        resultx.push(
            {
                'pay_type' : result[i].pay_type,
                'begin_total' : (kassa_register != null ? kassa_register.total : 0),
                'total' : result[i].total,
                'total_kirim' : result[i].total_kirim,
                'total_chiqim' : result[i].total_chiqim,
                'end_total' : (kassa_registerx != null ? kassa_registerx.total : 0),
                'doctor': result[i]['doctor.name'],
                "doctor_id": result[i]['doctor.id'],
                'type': result[i].type,
                'date_time': result[i].date_time,
                'id': result[i].id,
                "doc_type": result[i].doc_type

            }
        );
    }
    res.send(resultx);
};
inspection = async (req, res, next) => {
    this.checkValidation(req);
    let query = {}, queryx = {};
    let body = req.body;
    let datetime1 = body.datetime1;
    let datetime2 = body.datetime2;
    if(body.inspection_category !== null){
        query.id = {[Op.eq] : body.inspection_category }  
        queryx.inspection_category = {[Op.eq]: body.inspection_category}
        
    };
      
    let result = await Register_inspectionModel.findAll({
        attributes: [
             'id', "type", "date_time", "inspection_category",
            [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.type = 0 THEN register_inspection.price ELSE 0 END)"), 'total_kirim'],
            [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.type = 1 THEN register_inspection.price ELSE 0 END)"), 'total_chiqim'],
            [sequelize.literal("COUNT(Case WHEN register_inspection.date_time >=" + datetime1 + " and register_inspection.date_time <= " + datetime2 + " and register_inspection.type = 1 then register_inspection.inspection_category else 0 end)"), 'count']
        ],
        include: [
            { model: inspectionCategory, as: 'inspection', attributes: ['name', 'id'], where: query},
        ],
        where: queryx,
        raw: true,
        group: ['inspection_category'],
        order: [
            ['id', 'ASC']
        ],
    })
    res.send(result);
};
insSverka = async (req, res, next) => {
    this.checkValidation(req);
    let query = {}, queryx = {};
    let body = req.body;
    let datetime1 = body.datetime1;
    let datetime2 = body.datetime2;
    if(body.inspection_category !== null){
        query.id = {[Op.eq] : body.inspection_category }
        queryx.inspection_category = {[Op.eq]: body.inspection_category}
    };

    let result = await Register_inspectionModel.findAll({
        attributes: [
             'id', "doc_id", "date_time", "type",
            [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.type = 0 THEN register_inspection.price ELSE 0 END)"), 'kirim_summa'],
            [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.type = 1 THEN register_inspection.price ELSE 0 END)"), 'chiqim_summa'],
        ],
        include: [
            { model: inspectionCategory, as: 'inspection', attributes: ['name', 'id'], where: query},
        ],
        where: queryx, 
        group: ['inspection_category'],
        order: [
            ['id', 'ASC']
        ],
    })
// console.log(result);
    res.send(result);
};
kassaAll = async (req, res, next) =>{
    const model = await Register_kassaModel.findAll({
        include:[
            {model: DoctorModel, as: 'doctor'}
        ]
    })
    res.send({
        error_code: 200,
        error: false,
        message: "malumotlar chiqdi",
        data: model
    })
}

direct = async (req, res, next) => {
    const model = await directModel.create(req.body);

    res.send({
        error_code: 200,
        error: false,
        message: "malumotlar qoshildi",
        data: model
    })
}

directAll = async (req, res, next) => {
    const model = await directModel.findAll();
    res.send({
        error_code: 200,
        error: false,
        message: "malumotlar chiqdi",
        data: model
    })
}

directDelete = async (req, res, next) =>{
    const model  = await directModel.destroy({
        where: {
            id: req.params.id
        }
    })
    res.send({
        error_code: 200,
        error: false,
        message: "malumot o'chirildi",
        data: model
    })
}

directUpdate = async (req, res, next) =>{
    const model = await directModel.findOne({
        where:{
            id: req.params.id
        }
    })
    model.name = req.body.name,
    model.bonus = req.body.bonus
    model.save();
    res.send({
        error_code: 200,
        error: false,
        message: "malumotlar tahrirlandi",
        data: model
    })
}

directOne = async (req, res, next) =>{
    const model = await directModel.findOne({
        where:{
            id: req.params.id
        }
    })
    if(!model){
        throw new HttpException(401, "bu id da malumot topilmadi")
    }
    res.send({
        error_code: 200,
        error: false,
        message: "malumot chiqdi",
        data: model
    })
}

directHisobot = async (req, res, next) => {
    this.checkValidation(req);
    let query = {}, queryx = {};
    let body = req.body;
    let datetime1 = body.datetime1;
    let datetime2 = body.datetime2;
    if(body.direct_id !== null){
        query.id = {[Op.eq] : body.direct_id }  
        queryx.direct_id = {[Op.eq]: body.direct_id}
    };
      
    let result = await RegistrationModel.findAll({
        attributes: [
             'id', "type_service", "created_at", "direct_id",
            [sequelize.literal("SUM(CASE WHEN registration.created_at >= " + datetime1 + " and registration.created_at <= " + datetime2 + " AND registration.type_service = 1 THEN registration.summa ELSE 0 END)"), 'tushum'],
            [sequelize.literal("COUNT(Case WHEN registration.created_at >=" + datetime1 + " and registration.created_at <= " + datetime2 + " and registration.type_service = 1 then registration.direct_id else 0 end)"), 'count']
        ],
        include: [
            { model: directModel, as: 'direct', where: query},
        ],
        where: queryx,
        raw: true,
        group: ['direct_id'],
        order: [
            ['id', 'ASC']
        ],
    })
    res.send(result);
};

directSverka = async (req, res, next) => {
    this.checkValidation(req);
    let query = {}, queryx = {};
    let body = req.body;
    let datetime1 = body.datetime1;
    let datetime2 = body.datetime2;
    if(body.direct_id !== null){
        query.id = {[Op.eq] : body.direct_id }  
        queryx.direct_id = {[Op.eq]: body.direct_id}
    };
      
    let result = await RegistrationModel.findAll({
        attributes: [
             'id', "type_service", "created_at", "direct_id",
            [sequelize.literal("SUM(CASE WHEN registration.created_at >= " + datetime1 + " and registration.created_at <= " + datetime2 + " AND registration.type_service = 1 THEN registration.summa ELSE 0 END)"), 'tushum'],
            [sequelize.literal("COUNT(Case WHEN registration.created_at >=" + datetime1 + " and registration.created_at <= " + datetime2 + " and registration.type_service = 1 then registration.direct_id else 0 end)"), 'count']
        ],
        include: [
            { model: directModel, as: 'direct', where: query},
        ],
        where: queryx,
        raw: true,
        group: ['direct_id'],
        order: [
            ['id', 'ASC']
        ],
    })
    res.send(result);
};

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
 
queueAll = async (req, res, next) => {
    const model = await QueueModel.findAll({
        where:{
            status:{[Op.not]:'complete'}
        },
        include:[
            {model: RoomModel, as: 'room', attributes: ['name']},
            {model: PatientModel, as: 'patient', attributes: ['fullname']}
        ],
        // group:['room_id'],
        limit: 100,
        order: [
            ['number', 'ASC']
        ],
    });
     res.send({
        error_code: 200,
        error: false,
        message: "malumotlar chiqdi",
        data: model
     })
    
}

registerAll = async (req, res, next) => {
    const model = await Register_kassaModel.findAll({
        include:[
            {model: DoctorModel, as: 'doctor', attributes: ['name']}
        ]
    });

    res.send({
        error_code: 201,
        error: false,
        message: "malumotlar chiqdi",
        data: model
    })
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