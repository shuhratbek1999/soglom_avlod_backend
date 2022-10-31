const ModelModel = require('../../models/registration_arxiv.model');
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const registration_palataModel = require('../../models/registration_palata_arxiv.model');
const Registration_inspectionModel = require('../../models/registration_inspection_arxiv.model');
const Registration_inspection_childModel = require('../../models/registration_inspection_child_arxiv.model');
const Registration_recipeModel = require('../../models/registration_recipe_arxiv.model');
const Registration_filesModel = require('../../models/registration_files_arxiv.model');
const UserModel = require('../../models/user.model');
const PatientModel = require('../../models/patient.model');
const QueueModel = require('../../models/queue.model');
const RoomModel = require('../../models/room.model');
const DoctorModel = require('../../models/doctor.model');
const DoctorCategory = require('../../models/doctor_category.model');
const InspectionModel = require('../../models/inspection.model')
const { Op } = require("sequelize");
const palataModel = require('../../models/palata.model')
const PillModel = require('../../models/pill.model');
const Registration_payModel = require('../../models/registration_pay.model');
const Registration_doctor_arxivModel = require('../../models/registration_doctor_arxiv.model');
class Registration_arxivController {
    q=[];
    getAll = async (req, res, next) => {
        const model = await ModelModel.findAll({
            include:[ 
                {
                    model: UserModel, as: 'user', attributes: ['user_name']
                },
                {
                    model: PatientModel, as: 'patient', attributes: ['fullname']
                },

                {
                    model: Registration_doctor_arxivModel, as: 'registration_doctor_arxiv',
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
                { model: Registration_doctor_arxivModel,as: 'registration_doctor_arxiv', 
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
    delQueue = async (req, res, next) => {
        let time=Math.floor(new Date().getTime() / 1000)-20000;
        await QueueModel.destroy({where:{datetime:{[Op.lte]:time}}});
        res.send('deleted');
    };
    
   
    getPechat = async (req, res, next) => {
        const Prixod = await QueueModel.findAll({
            where:{ patient_id: req.params.patient,status:"waiting" },
            include: [
                { model: RoomModel,as: 'room',
                include: [
                    { model: UserModel,as: 'users'}
                ],

            },
                { model: PatientModel,as: 'patient'},
            ],
            order: [
                ['number', 'ASC']
            ],
        });
        if (Prixod === null) {
            throw new HttpException(404, 'Not found');
        }
        // for(var element of Prixod){
        //     element.status='printed';
        //     await element.save();
        // }
        res.send(Prixod);
    };
    getByPatient = async (req, res, next) => {
        const Prixod = await ModelModel.findAll({
            where:{ patient_id: req.params.patient },
            include: [
                { model: PatientModel,as: 'patient'},
                { model: Registration_doctorModel,as: 'doctor', 
                    include : [
                        { model: Registration_recipeModel, as: 'recipe'}
                    ]
                },
                { model: Registration_inspectionModel,as: 'inspection', 
                    include : [
                        { model: Registration_inspection_childModel, as: 'child'}
                    ]
                },
                { model: Registration_filesModel,as: 'files'},
            ],
        });
        if (Prixod === null) {
            throw new HttpException(404, 'Not found');
        }
        res.send(Prixod);
    };

    create = async (req, res, next) => {
        this.checkValidation(req);
        
        var {registration_inspection,registration_doctor,registration_files,registration_palata, registration_pay, ...data} = req.body;
        data.created_at=Math.floor(new Date().getTime() / 1000);
        const model = await ModelModel.create(data);
        if (!model) {
            throw new HttpException(500, 'Something went wrong');
        }
        await this.#inspectionadd(model, registration_inspection);
        await this.#doctoradd(model, registration_doctor);
        await this.#filesadd(model, registration_files);
        await this.#palataadd(model, registration_palata);
        await this.#payAdd(model, registration_pay);
        await this.#queue();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot chiqdi',
            data: model
        });

    };

    update = async (req, res, next) => {
        this.checkValidation(req);
        var {registration_inspection,registration_doctor,registration_files,registration_palata,registration_pay, ...data} = req.body;
        var id = parseInt(req.params.id);
        var model = await ModelModel.findOne({where : {id: id}})

        if (!model) {
            throw new HttpException(404, 'data not found');
        } 
        try{
            model.updated_at=Math.floor(new Date().getTime() / 1000);
            model.user_id = data.user_id;
            model.direct_id = data.direct_id;
            model.status = data.status;
            model.patient_id = data.patient_id;
            model.type_service = data.type_service;
            model.complaint = data.complaint;
            model.summa = data.summa;
            model.pay_summa = data.pay_summa;
            model.backlog = data.backlog;
            model.discount = data.discount;
            await model.validate();
            await model.save();
            await this.#inspectionadd(model, registration_inspection,false);
            await this.#doctoradd(model, registration_doctor,false);
            await this.#filesadd(model, registration_files,false);
            await this.#palataadd(model, registration_palata,false);
            await this.#payAdd(model, registration_pay,false);
            await this.#queue(false);
            res.status(200).send({
                error: false,
                error_code: 200,
                message: 'Malumot chiqdi',
                data: model
            });  
        }catch(e){
            if(e instanceof ValidationError){
                res.status(404).send(e.errors[0].message);
                return;
            }
            throw new HttpException(500, 'Something went wrong');
        }

    };
    delete = async (req, res, next) => {
        const id = req.params.id;
        
        const result = await ModelModel.destroy({where : {id: id } });
        await this.#deletedoctor(id);
        await this.#deleteRecipe(id);
        await this.#deleteInspection(id);
        await this.#deleteFiles(id);
        await this.#deletePalata(id);
        await this.#deletepay(id);
        if (!result) {
            throw new HttpException(404, 'Not found');
        }


        res.send('Has been deleted' );
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    #inspectionadd = async(model, registration_inspection, insert = true) => {
        if(!insert){
            await this.#deleteInspection(model.id);
        }
        var dds;
        for(var element of registration_inspection){
            var {registration_inspection_child,registration_inspection, ...data} = element;
            // console.log(data, "inspection");
            data.registration_id=model.id;
            dds={"inspection_id":data.inspection_id, "user_id": data.user_id,"registration_id":model.id,"type":data.type,"price":data.price,"category_id":data.category_id,'status':model.status}
            const models = await Registration_inspectionModel.create(dds);
           
              let user = await UserModel.findOne({
                  where:{
                    id: data.user_id
                  },
                  raw: true
              })
                function isHave(item) { 
                    return item.room_id == user.room_id&&item.patient_id == model.patient_id;
                  }
                  
                var have=await this.q.find(isHave);
                if(have==undefined){
                    this.q.push({"room_id":user.room_id,"patient_id":model.patient_id,"number":0,"date_time":Math.floor(new Date().getTime() / 1000),"status":data.status});
                }
                else if(data.status!=have.status){
                    if(data.status!='complete'){
                        var index=this.q.findIndex(isHave);
                        this.q[index].status=have.status;
                    }else if(have.status!='complete'){
                        var index=this.q.findIndex(isHave);
                        this.q[index].status=have.status;
                    }
                }
            await this.#inspectionchildadd(models, registration_inspection_child); 
        }
    }
    #inspectionchildadd = async(models, registration_inspection_child) => {
        var dds;
        for(var element of registration_inspection_child){
            dds={"parent_id":models.id,"text":element.text,"norm":element.norm,"name":element.name,"registration_id":models.registration_id,"status":element.status,"price":element.price,"checked":element.checked,"file":element.file}

            await Registration_inspection_childModel.create(dds); 
        }
    }
    #palataadd = async(model, registration_palata, insert = true) =>{
        var palata;
        var date_time = Math.floor(new Date().getTime() / 1000);
        if(!insert){
            await this.#deletePalata(model.id);
        }
        for(let element of registration_palata){
            palata={
                "palata_id": element.palata_id,
                "registration_id":model.id,
                'price':element.price,
                "date_time":date_time,
                "date_do": element.date_do,
                "date_to": element.date_to,
                "day":element.day,
                "total_price":element.total_price};
            await registration_palataModel.create(palata); 
            var date_time = Math.floor(new Date().getTime() / 1000);
        }
    }
      
    #payAdd = async(model, registration_pay, insert = true) =>{
        if(!insert){
            await this.#deletepay(model.id);
        }
        for(var element of registration_pay){
            var pay = {
                "user_id": element.user_id,
                "registration_id": model.id,
                "pay_type": element.pay_type,
                "summa": element.summa,
                "discount": element.discount
            }
            await Registration_payModel.create(pay);
            var date_time = Math.floor(new Date().getTime() / 1000);
            let type = 0, doc_type = '';
            if(element.pay_type == 'Plastik'){
                type = 0,
                doc_type = 'kirim'
            }
            else if(element.pay_type == 'Naqt'){
                type = 0,
                doc_type = 'kirim'
            }
            else if(!element.summa){
                 type = 1,
                 doc_type = 'chiqim'
            }
            else{
                doc_type = 'kirim'
            }
        }
    }

    #doctoradd = async(model, registration_doctor, insert = true) => {
        if(!insert){
            await this.#deletedoctor(model.id);
        }
        for(var element of registration_doctor){
            var {Registration_recipe,...data} = element;
            // console.log(data, "doktor");
            let user = await UserModel.findOne({
                where:{
                    doctor_id: element.doctor_id
                },
                raw: true
            })
            var news={
                "doctor_id":element.doctor_id,
                "registration_id":model.id,
                "price":data.price,
                "status": model.status,
                "text":data.text};
            const models = await Registration_doctorModel.create(news);
            function isHave(item) { 
                return item.room_id == user.room_id&&item.patient_id == model.patient_id;
              }
            var have=await this.q.find(isHave);
            if(have==undefined){
                this.q.push({
                    "room_id":user.room_id,
                    "patient_id":model.patient_id,
                    "number":0,
                    "date_time":Math.floor(new Date().getTime() / 1000),
                    "status":model.status
                });
            }else if(data.status!=have.status){
                if(data.status!='complete'){
                    var index=this.q.findIndex(isHave);
                    this.q[index].status=have.status;
                } else if(have.status!='complete'){
                    var index=this.q.findIndex(isHave);
                    this.q[index].status=have.status;
                }
            }
            await this.#recieptadd(models, element.registration_recipe, false); 
        }
    }
    #recieptadd = async(model, registration_recipe, insert = true) => {
        if(!insert){
            await this.#deleteRecipe(model.id);
        }
        var adds;
        for(var element of registration_recipe){
            adds={
                "registration_doctor_id":model.id,
                "registration_id":model.registration_id,
                'pill_id':element.pill_id,
                "time":element.time,
                "day":element.day,
                "comment":element.comment,
                "name": element.name
            };
            await Registration_recipeModel.create(adds); 
        }
    }
    #filesadd = async(model, registration_files,insert = true) => {
        if(!insert){
            await this.#deleteFiles(model.id);
        }
        var asas;
        for(var element of registration_files){
            asas={'registration_id':model.id,"href":element.href};
            await Registration_filesModel.create(asas); 
        }
    }
    #queue = async(insert=true) => {
        for(var element of this.q){
            if(!insert){
                var has=await QueueModel.findOne({
                    where:{
                        status:{[Op.not]:'complate'},
                        room_id: element.room_id,
                        patient_id: element.patient_id
                    }
                });
                if(has!=null){
                    if(element.status!=has.status){
                        has.status=element.status;
                        await has.save();
                    }
                }else if(element.status!='complate') {
                    var que=await QueueModel.findOne({
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
                    await QueueModel.create(element);
                }
            }else{
                var que=await QueueModel.findOne({
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
                await QueueModel.create(element); 

            }
        } 
        this.q=[];
    }
    #deletedoctor = async(doc_id) =>
     {
        await Registration_doctorModel.destroy({where: {registration_id: doc_id}})
        await Registration_recipeModel.destroy({where: {registration_id: doc_id}})
    }
    #deleteRecipe = async(doc_id) => {
        await Registration_recipeModel.destroy({where: {registration_id: doc_id}})
    }
    #deleteInspection = async(doc_id) => {
        await Registration_inspectionModel.destroy({where: {registration_id: doc_id}})
        await Registration_inspection_childModel.destroy({where: {registration_id: doc_id}})
    }
    #deletePalata = async(doc_id) => {
        await registration_palataModel.destroy({where: {registration_id: doc_id}})
    }
    #deletepay = async(doc_id) => {
        await Registration_payModel.destroy({where: {registration_id: doc_id}})
    }
    #deleteFiles = async(doc_id) => {
        await Registration_filesModel.destroy({where: {registration_id: doc_id}})
    }

    
    queueAll = async (req, res, next) => {
        const model = await QueueModel.findAll({
            where:{
                status:{[Op.not]:'complate'}
            },
            include:[
                {model: RoomModel, as: 'room', attributes: ['name'],
            include:[
                {model: UserModel, as: 'users', attributes: ['doctor_id'],
                include:[
                    {model: DoctorModel, as: 'doctor', attributes: ['name']}
                ]
            }
            ]
            },
                {model: PatientModel, as: 'patient', attributes: ['fullname']},
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
    
    
}



module.exports = new Registration_arxivController;