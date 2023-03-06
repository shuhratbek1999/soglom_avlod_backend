const ModelModel = require('../../models/registration_arxiv.model');
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const registration_palataModel = require('../../models/registration_palata_arxiv.model');
const Registration_inspectionModel = require('../../models/registration_inspection_arxiv.model');
const Registration_inspection_childModel = require('../../models/registration_inspection_child_arxiv.model');
const Registration_recipeModel = require('../../models/registration_recipe_arxiv.model');
const Registration_filesModel = require('../../models/registration_files_arxiv.model');
const UserModel = require('../../models/user.model');
const { sequelize } = require('../../models/user.model');
const PatientModel = require('../../models/patient.model');
// const QueueModel = require('../../models/queue.model');
// const RoomModel = require('../../models/room.model');
const DoctorModel = require('../../models/doctor.model');
const DoctorCategory = require('../../models/doctor_category.model');
const InspectionModel = require('../../models/inspection.model')
const { Op } = require("sequelize");
const palataModel = require('../../models/palata.model')
const PillModel = require('../../models/pill.model');
const Registration_payModel = require('../../models/registration_pay_arxiv.model');
const Registration_doctorModel = require('../../models/registration_doctor_arxiv.model');
const Register_inspectionModel = require('../../models/register_inspection_arxiv.model');
const inspectionCategory = require('../../models/inspector_category.model');
const Register_kassaModel = require('../../models/register_kassa_arxiv.model');
const Register_DoctorModel = require('../../models/register_doctor_arxiv.model');
const registerDirectModel= require('../../models/register_direct_arxiv.model');
const registerMedDirectModel= require('../../models/register_med_direct_arxiv.model');
class Registration_arxivController {
    getAll_arxiv = async (req, res, next) => {
        // this.#arxiv();
        const model = await ModelModel.findAll({
            include:[ 
                {
                    model: UserModel, as: 'user', attributes: ['user_name', 'room_id']
                },
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
                            model: Registration_inspection_childModel, as: 'registration_inspection_child'
                        }
                    ]
                } 
             ],
             limit: 200,
             order: [
                ['created_at', 'DESC']
             ]
        });
        res.status(200).send({  
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }
    searchsArxiv = async (req, res, next) => {
        let ModelList = await ModelModel.findAll({
            include:[
                {
                    model: Registration_doctorModel, as: 'registration_doctor',
                    include:[
                        {
                            model: Registration_recipeModel, as: 'registration_recipe'
                        }
                    ]
                },
                {model: PatientModel, as: 'patient', 
                where:{ 
                    fullname:{  [Op.like]: '%'+req.body.name+'%'}
                }
            },
            {
                model: UserModel, as: 'user', attributes: ['user_name']
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
                        model: Registration_inspection_childModel, as: 'registration_inspection_child'
                    }
                ]
            } 
            ],
            limit:100
        });
        
        if(req.body.name.length == 0){
            let model = await ModelModel.findAll({
                limit: 50,
                include:[
                    {
                        model: UserModel, as: 'user', attributes: ['user_name']
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
                                model: Registration_inspection_childModel, as: 'registration_inspection_child'
                            }
                        ]
                    },
                    {model: PatientModel, as:'patient'}
                ]
            })
            res.send({
                "error": false,
                "error_code": 200,
                "message": "malumotlar chiqdi",
                data: model
            });
        }
        else{
            res.send({
                "error": false,
                "error_code": 200,
                "message": "Malumotlar chiqdi",
                data: ModelList
            });
        }
       
    };
    getOne = async (req, res, next) => {
        
        const Prixod = await ModelModel.findOne({
            where:{ id: req.params.id },
            include: [
                {
                  model: UserModel, as: 'user', attributes:['user_name']
                }, 
                {
                  model: registration_palataModel, as: 'registration_palata',
                  include:[
                    {model: palataModel, as: 'palatas', attributes: ['name']}
                  ]
                }, 
                { model: Registration_doctorModel,as: 'registration_doctor', 
                    include : [
                        { model: Registration_recipeModel, as: 'registration_recipe',
                        include:[
                            {model:PillModel,as:'pill'}]
                    },
                        { model: DoctorModel, as: 'doctor',
                    include:[
                        {model:DoctorCategory,as:'doctor_category',attributes:['name']},
                    ]}
                    ]
                },
                { model: Registration_inspectionModel,as: 'registration_inspection', 
                    include : [
                        { model: Registration_inspection_childModel, as: 'registration_inspection_child'},
                        { model: InspectionModel, as: 'inspection',
                        include:[
                            {model:UserModel,as:'User',attributes:['user_name']}
                        ]
                    }
                    ]
                },
                { model: Registration_filesModel,as: 'registration_files'},
                { model: PatientModel,as: 'patient'},
                {model: Registration_payModel, as: 'registration_pay'}
            ],
            limit: 200,
            order: [
                ['created_at', 'DESC']
             ]
        });
        if (Prixod === null) {
            throw new HttpException(404, 'Not found');
        }
        
       res.status(200).send({  
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: Prixod
        });
    }
    palata = async (req, res, next) => {
        let query = {}, query_begin = {}, query_end = {}, body = req.body;
        let data1 = body.date_to;
        let data2 = body.date_do;
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

        let result = await palataModel.findAll({
                include:[
                    {model: registration_palataModel, as: 'palatas', attributes: ['id','date_time', 'date_do']}
                ],
                raw: true
        })
        result.forEach(value => {
            if(value['palatas.date_time'] !== null && value['palatas.date_time'] <= data1 && value['palatas.date_do'] >= data2 ){
                value.status = true
            }
            else if(value['palatas.date_do'] <= data2 && value['palatas.do'] <= data1){
                value.status = false
            }
            else if(value['palatas.date_do'] >= data1 && value['palatas.date_time'] <= data1){
                 value.status = true
            }
            else{
                value.status = false
            }
        })
            res.send(result);
    }
    
    kassaSverka = async (req, res, next) => {
        
        let result;
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
        
        if(req.body.datetime1 < req.body.datetime2){
            result = await Register_kassaModel.findAll({
                where: {
                    date_time: {[Op.gt]: body.datetime1, [Op.lt]: body.datetime2},
                  },
                  include:[
                    {model: ModelModel, as: 'registration', attributes: ['id'],
                include:[
                    {model: Registration_doctorModel, as: 'registration_doctor', attributes: ['doctor_id'],
                include: [
                    {model: DoctorModel, as: 'doctor', attributes: ['name']}
                ]
                }
                ]
                }
                ],
                order: [
                    ['date_time', 'ASC']
                ]
            })
            result.forEach(val => {
                if(val.dataValues.pay_type == 'Plastik' || val.dataValues.pay_type == 'plastik'){
                    if(val.dataValues.doc_type == 'Kirim'){
                        val.dataValues.Plaskirim = val.dataValues.price
                    }
                    else{
                    val.dataValues.PlasChiqim = val.dataValues.price
                    }
                }
                else{
                    if(val.dataValues.doc_type != 'chiqim'){
                        val.dataValues.Nahdkirim = val.dataValues.price
                    }
                    else{
                    val.dataValues.NahdChiqim = val.dataValues.price
                    }
                }
            })
        res.send(result);
        }
        else{
            result = await Register_kassaModel.findAll({
                where: {
                    date_time: {[Op.lt]: body.datetime1},
                  },
                  include:[
                    {model: ModelModel, as: 'registration', attributes: [],
                include:[
                    {model: Registration_doctorModel, as: 'registration_doctor', attributes: [],
                include: [
                    {model: DoctorModel, as: 'doctor', attributes: ['name']}
                ]
                }
                ]
                }
                ],
                order: [
                    ['date_time', 'ASC']
                ]
            })
            result.forEach(val => {
                if(val.dataValues.pay_type == 'Plastik' || val.dataValues.pay_type == 'plastik'){
                    if(val.dataValues.doc_type == 'Kirim'){
                        val.dataValues.Plaskirim = val.dataValues.price
                    }
                    else{
                    val.dataValues.PlasChiqim = val.dataValues.price
                    }
                }
                else{
                    if(val.dataValues.doc_type != 'chiqim'){
                        val.dataValues.Nahdkirim = val.dataValues.price
                    }
                    else{
                    val.dataValues.NahdChiqim = val.dataValues.price
                    }
                }
            })
        res.send(result);
        }
    }
    
    kassa = async (req, res, next) => {
        try{
            let result;
        let body = req.body; 
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        let query = {}, query_begin = {}, query_end = {};
        query.date_time =  {
            [Op.gte]: body.datetime1,
            [Op.lte]: body.datetime2,
        };
        query_begin.date_time =  {
            [Op.lt]: body.datetime1,
        };
        query_end.date_time =  {
            [Op.lte]: body.datetime2,
        }
        result = await Register_kassaModel.findAll({
            attributes : [ 
                'id', 'doctor_id', "type", "date_time", "doc_type",
                [sequelize.literal("SUM(CASE WHEN register_kassa_arxiv.date_time < " + datetime1 + " THEN register_kassa_arxiv.price * power(-1, 'type') ELSE 0 END)"), 'total'],
                [sequelize.literal("SUM(CASE WHEN register_kassa_arxiv.date_time >= " + datetime1 + " and register_kassa_arxiv.date_time <= " + datetime2 + " AND register_kassa_arxiv.doc_type = 'Kirim' THEN register_kassa_arxiv.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_kassa_arxiv.date_time >= " + datetime1 + " and register_kassa_arxiv.date_time <= " + datetime2 + " AND register_kassa_arxiv.doc_type = 'chiqim' THEN register_kassa_arxiv.price ELSE 0 END)"), 'total_chiqim'],
            ],
            include: [
                { model: DoctorModel, as: 'doctor', attributes: ['name', 'id'] },
            ],
            order: [
                ['date_time', 'ASC']
            ],
            raw: true
        }) 
        let resultx = [];
        for(let i = 0; i < result.length; i++){
            let kassa_register = await Register_kassaModel.findOne({
                attributes : [ 'id', 'doctor_id', "type", "date_time", "doc_type",
                    [sequelize.literal('sum(`price` * power(-1, `type` + 1))'), 'total'],
                ],
                where : query_begin,
                raw: true,
                include: [
                    { model: DoctorModel, as: 'doctor', attributes: ['name', 'id'] },
                ],
            });
            let kassa_registerx = await Register_kassaModel.findOne({
                attributes : [ 'id', 'doctor_id', "type", "date_time", "doc_type",
                    [sequelize.literal('sum(`price` * power(-1, `type` + 1))'), 'total'],
                ],
                where : query_end,
                include: [
                    { model: DoctorModel, as: 'doctor', attributes: ['name', 'id'] },
                ],
                raw: true
            }); 
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
        }
        catch(err){
            console.log(err);
        }
    };
    
    register = async(req, res, next) => {
        const model = await ModelModel.findAll({
            where:{
                patient_id: req.body.patient_id
            },
            include:[ 
                {
                    model: UserModel, as: 'user', attributes: ['user_name', 'room_id']
                },
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
                            model: Registration_inspection_childModel, as: 'registration_inspection_child'
                        }
                    ]
                } 
             ],
             limit: 200,
             order: [
                ['created_at', 'DESC']
             ]
        })
        if(!model){
            throw new HttpException(401, 'bemor topilmadi')
        }
        res.send({
            error: false,
            error_code: 201,
            message: 'malumot chiqdi',
            data: model
        })
    }

    inspection = async (req, res, next) => {
         try{
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
                 'id', "type", "date_time", "inspection_category", "doc_id","comment",
                [sequelize.literal("SUM(CASE WHEN register_inspection_arxiv.date_time >= " + datetime1 + " and register_inspection_arxiv.date_time <= " + datetime2 + " AND register_inspection_arxiv.doc_type = 'kirim' THEN register_inspection_arxiv.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_inspection_arxiv.date_time >= " + datetime1 + " and register_inspection_arxiv.date_time <= " + datetime2 + " AND register_inspection_arxiv.doc_type = 'chiqim' THEN register_inspection_arxiv.price ELSE 0 END)"), 'total_chiqim'],
                [sequelize.literal("COUNT(Case WHEN register_inspection_arxiv.date_time >=" + datetime1 + " and register_inspection_arxiv.date_time <= " + datetime2 + " and register_inspection_arxiv.inspection_category = inspection.id then register_inspection_arxiv.inspection_category else 0 end)"), 'count']
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
         }
         catch(err){
            console.log(err);
         }
    };
    InspectionSverka = async (req, res, next) => {     
         try{
            let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.inspection_category !== null){
            query.id = {[Op.eq] : body.inspection_category }
            queryx.inspection_category = {[Op.eq]: body.inspection_category}
        };
        const model = await Register_inspectionModel.findAll({
            attributes: [ 'doc_type', 'id', 'date_time', "doc_id","comment","inspection_id","place",
               [sequelize.literal("SUM(CASE WHEN register_inspection_arxiv.date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
               [sequelize.literal("SUM(CASE WHEN register_inspection_arxiv.date_time >= " + datetime1 + " and register_inspection_arxiv.date_time <= " + datetime2 + " AND register_inspection_arxiv.doc_type = 'kirim' THEN register_inspection_arxiv.price ELSE 0 END)"), 'kirim'],
               [sequelize.literal("SUM(CASE WHEN register_inspection_arxiv.date_time >= " + datetime1 + " and register_inspection_arxiv.date_time <= " + datetime2 + " AND register_inspection_arxiv.doc_type = 'chiqim' THEN register_inspection_arxiv.price ELSE 0 END)"), 'chiqim'],
               [sequelize.literal("SUM(CASE WHEN register_inspection_arxiv.date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total'],
        ],
           group: ['id']
        })
        res.send(model)
         }
         catch(err){
            console.log(err);
         }
       }
       create = async (req, res, next) => {
           try{
            let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.doctor_id !== null){
            query.id = {[Op.eq] : body.doctor_id }  
            queryx.doctor_id = {[Op.eq]: body.doctor_id}
        };
          
        if(body.datetime1 < body.datetime2){
            let result = await Register_DoctorModel.findAll({
                attributes: [
                     'id', "type", "date_time", "doc_id","comment", "place", "doctor_id",
                     [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                    [sequelize.literal("SUM(CASE WHEN register_doctor_arxiv.date_time >= " + datetime1 + " and register_doctor_arxiv.date_time <= " + datetime2 + " AND register_doctor_arxiv.doc_type = 'kirim' THEN register_doctor_arxiv.price ELSE 0 END)"), 'total_kirim'],
                    [sequelize.literal("SUM(CASE WHEN register_doctor_arxiv.date_time >= " + datetime1 + " and register_doctor_arxiv.date_time <= " + datetime2 + " AND register_doctor_arxiv.doc_type = 'chiqim' THEN register_doctor_arxiv.price ELSE 0 END)"), 'total_chiqim'],
                    [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
                ],
                include: [
                    { model: DoctorModel, as: 'doctor', attributes: ['name', 'id'], where: query},
                ],
                where: queryx,
                raw: true,
                group: ['doctor_id'],
                order: [
                    ['id', 'ASC']
                ],
            })
            res.send(result);
        }
        else{
            let result = await Register_DoctorModel.findAll({
                attributes: [
                     'id', "type", "date_time", "place", "doctor_id",
                     [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                    [sequelize.literal("SUM(CASE WHEN register_doctor_arxiv.date_time >= " + datetime1 + " and register_doctor_arxiv.date_time <= " + datetime2 + " AND register_doctor_arxiv.doc_type = 'kirim' THEN register_doctor_arxiv.price ELSE 0 END)"), 'total_kirim'],
                    [sequelize.literal("SUM(CASE WHEN register_doctor_arxiv.date_time >= " + datetime1 + " and register_doctor_arxiv.date_time <= " + datetime2 + " AND register_doctor_arxiv.doc_type = 'chiqim' THEN register_doctor_arxiv.price ELSE 0 END)"), 'total_chiqim'],
                    [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
                ],
                include: [
                    { model: DoctorModel, as: 'doctor', attributes: ['name', 'id'], where: query},
                ],
                where: queryx,
                raw: true,
                group: ['doctor_id'],
                order: [
                    ['id', 'ASC']
                ],
            })
            res.send(result);
           }
        }
        catch(err){
            console.log(err);
        }
    };
     
    TekshiruvSoni = async(req, res, next) => {
        try{
            let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.inspection_category !== null){
            query.id = {[Op.eq] : body.inspection_category }  
            queryx.inspection_category = {[Op.eq]: body.inspection_category}
        };
        const model = await Register_inspectionModel.findAll({
            attributes:[
                [sequelize.fn("COUNT", sequelize.col("registration.patient_id")), "count"]
            ],
            include: [
                { model: inspectionCategory, as: 'inspection', attributes: ['name'], where: query},
                { model: ModelModel, as: 'registration', attributes: ['patient_id']}
            ],
            where: {
                inspection_category: {[Op.eq]: body.inspection_category},
                date_time: {
                    [Op.gte]: datetime1,
                    [Op.lte]: datetime2
                }
            }
        })
        res.send(model)
        }
        catch(err){
            console.log(err);
        }
    }
   
   DoctorSverka = async (req, res, next) => {
    try{
        let query = {}, queryx = {};
    let body = req.body;
    let datetime1 = body.datetime1;
    let datetime2 = body.datetime2;
    if(body.doctor_id !== null){
        query.id = {[Op.eq] : body.doctor_id }
        queryx.doctor_id = {[Op.eq]: body.doctor_id}
    };
    const model = await Register_DoctorModel.findAll({
        attributes: [ 'doc_type', 'id', 'date_time', "doc_id", "comment","doctor_id", "place",
            [sequelize.literal("SUM(CASE WHEN register_doctor_arxiv.date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
           [sequelize.literal("SUM(CASE WHEN register_doctor_arxiv.date_time >= " + datetime1 + " and register_doctor_arxiv.date_time <= " + datetime2 + " AND register_doctor_arxiv.doc_type = 'kirim' THEN register_doctor_arxiv.price ELSE 0 END)"), 'kirim'],
           [sequelize.literal("SUM(CASE WHEN register_doctor_arxiv.date_time >= " + datetime1 + " and register_doctor_arxiv.date_time <= " + datetime2 + " AND register_doctor_arxiv.doc_type = 'chiqim' THEN register_doctor_arxiv.price ELSE 0 END)"), 'chiqim'],
       ],  
       where: queryx,
       group: ['id']
    })
    res.send(model)
   }
   catch(err){
    console.log(err);
   }
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
        let model = await registerDirectModel.findAll({
            attributes: [
                'id', "type", "date_time", "direct_id", "doc_id","comment", "place", "doc_type",
               [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'kirim' THEN register_direct.price ELSE 0 END)"), 'total_kirim'],
               [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'chiqim' THEN register_direct.price ELSE 0 END)"), 'total_chiqim'],
               [sequelize.literal("COUNT(Case WHEN register_direct.date_time >=" + datetime1 + " and register_direct.date_time <= " + datetime2 + ` and register_direct.direct_id = ${body.direct_id} then register_direct.direct_id else 0 end)`), 'count']
           ],
           where: queryx
        })
        model.forEach(val=> {
            if(val.dataValues.id == null){
                model = [];
                res.send(model)
            }
            else{
                res.send(model)
            }
        })
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
          
        let model = await registerDirectModel.findAll({
            attributes: [
                'id', "type", "date_time", "direct_id", "doc_id","comment", "place", "doc_type",
               [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'kirim' THEN register_direct.price ELSE 0 END)"), 'total_kirim'],
               [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'chiqim' THEN register_direct.price ELSE 0 END)"), 'total_chiqim'],
               [sequelize.literal("SUM(CASE WHEN register_direct.date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
           ], 
           where: queryx,
           group: ['id']
           
        })
        model.forEach(val=> {
            if(val.dataValues.end_total == 0){
                model = [];
                res.send(model)
            }
            else{
                res.send(model)
            }
        })
    }
    medHisobot = async (req, res, next) => {
        this.checkValidation(req);
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.direct_id !== null){
            query.id = {[Op.eq] : body.direct_id }  
            queryx.direct_id = {[Op.eq]: body.direct_id}
        };
        let model = await registerMedDirectModel.findAll({
            attributes: [
                'id', "type", "date_time", "direct_id", "doc_id","comment", "place", "doc_type",
               [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time >= " + datetime1 + " and register_med_direct.date_time <= " + datetime2 + " AND register_med_direct.doc_type = 'kirim' THEN register_med_direct.price ELSE 0 END)"), 'total_kirim'],
               [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time >= " + datetime1 + " and register_med_direct.date_time <= " + datetime2 + " AND register_med_direct.doc_type = 'chiqim' THEN register_med_direct.price ELSE 0 END)"), 'total_chiqim'],
               [sequelize.literal("COUNT(Case WHEN register_med_direct.date_time >=" + datetime1 + " and register_med_direct.date_time <= " + datetime2 + ` and register_med_direct.direct_id = ${body.direct_id} then register_med_direct.direct_id else 0 end)`), 'count']
           ],
           where: queryx
        })
        model.forEach(val=> {
            if(val.dataValues.total_kirim == 0 && val.dataValues.total_chiqim == 0){
                model = [];
                res.send(model)
            }
            else{
                res.send(model)
            }
        })
    };
    
    medSverka = async (req, res, next) => {
        this.checkValidation(req);
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.direct_id !== null){
            query.id = {[Op.eq] : body.direct_id }  
            queryx.direct_id = {[Op.eq]: body.direct_id}
        };
          
        let model = await registerMedDirectModel.findAll({
            attributes: [
                'id', "type", "date_time", "direct_id", "doc_id","comment", "place", "doc_type",
               [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time >= " + datetime1 + " and register_med_direct.date_time <= " + datetime2 + " AND register_med_direct.doc_type = 'kirim' THEN register_med_direct.price ELSE 0 END)"), 'total_kirim'],
               [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time >= " + datetime1 + " and register_med_direct.date_time <= " + datetime2 + " AND register_med_direct.doc_type = 'chiqim' THEN register_med_direct.price ELSE 0 END)"), 'total_chiqim'],
               [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
           ], 
           where: queryx,
           group: ['id']
           
        })
        model.forEach(val=> {
            if(val.dataValues.total_kirim == 0 && val.dataValues.total_chiqim == 0){
                model = [];
                res.send(model)
            }
            else{
                res.send(model)
            }
        })
    };
}



module.exports = new Registration_arxivController;