const DoctorModel = require("../../models/doctor.model");
const palataModel = require("../../models/palata.model");
const register_directModel = require("../../models/register_direct.model");
const register_doctorModel = require("../../models/register_doctor.model");
const Register_inspectionModel = require("../../models/register_inspection.model");
const Register_kassaModel = require("../../models/register_kassa.model");
const register_med_direct_arxivModel = require("../../models/register_med_direct.model");
const registration_palataModel = require("../../models/registration_palata.model");



class HisobotController {
    directSverka = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.direct_id !== null){
            query.id = {[Op.eq] : body.direct_id }  
            queryx.direct_id = {[Op.eq]: body.direct_id}
        };
          
        let model = await register_directModel.findAll({
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
        // res.send(result)
        // result.forEach(val=> {
        //     if(val.dataValues.end_total == 0){
        //         result = [];
        //         res.send(result)
        //     }
        //     else{
        //         res.send(result)
        //     }
        // })
    };
    
    medHisobot = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.direct_id !== null){
            query.id = {[Op.eq] : body.direct_id }  
            queryx.direct_id = {[Op.eq]: body.direct_id}
        };
        let model = await register_med_direct_arxivModel.findAll({
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
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.direct_id !== null){
            query.id = {[Op.eq] : body.direct_id }  
            queryx.direct_id = {[Op.eq]: body.direct_id}
        };
          
        let model = await register_med_direct_arxivModel.findAll({
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
    directHisobot = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.direct_id !== null){
            query.id = {[Op.eq] : body.direct_id }  
            queryx.direct_id = {[Op.eq]: body.direct_id}
        };
        let model = await register_directModel.findAll({
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
                 'id', "type", "date_time", "inspection_category", "doc_id","comment",
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'kirim' THEN register_inspection.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'chiqim' THEN register_inspection.price ELSE 0 END)"), 'total_chiqim'],
                [sequelize.literal("COUNT(Case WHEN register_inspection.date_time >=" + datetime1 + " and register_inspection.date_time <= " + datetime2 + " and register_inspection.inspection_category = inspection.id then register_inspection.inspection_category else 0 end)"), 'count']
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
    InspectionSverka = async (req, res, next) => {
        this.checkValidation(req);
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
               [sequelize.literal("SUM(CASE WHEN register_inspection.date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
               [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'kirim' THEN register_inspection.price ELSE 0 END)"), 'kirim'],
               [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'chiqim' THEN register_inspection.price ELSE 0 END)"), 'chiqim'],
               [sequelize.literal("SUM(CASE WHEN register_inspection.date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total'],
        ],
           group: ['id']
        })
        res.send(model)
       }
       kassaSverka = async (req, res, next) => {
        this.checkValidation(req);
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
                    {model: RegistrationModel, as: 'registration', attributes: ['id'],
                include:[
                    {model: Registration_doctorModel, as: 'registration_doctor', attributes: ['doctor_id'],
                include: [
                    {model: DoctorModel, as: 'doctor', attributes: ['name']}
                ]
                }
                ]
                }
                ],
                group: ['id']
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
                    {model: RegistrationModel, as: 'registration', attributes: [],
                include:[
                    {model: Registration_doctorModel, as: 'registration_doctor', attributes: [],
                include: [
                    {model: DoctorModel, as: 'doctor', attributes: ['name']}
                ]
                }
                ]
                }
                ],
                group: ['id']
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
                    {model: registration_palataModel, as: 'palatas', attributes: ['id','date_time', 'date_do', 'palata_id'],
                }
                ],
                // raw: true
               })
        result.forEach(value => {
           if(value.dataValues.palatas.length > 0){
            value.dataValues.palatas.forEach(el => {
                if(el.dataValues.date_do >= data1 &&
                    el.dataValues.date_do >= data2
                    ){
                        value.dataValues.status = true;
                    }
                    else if(el.dataValues.date_do >= data1 && el.dataValues.date_time <= data2){
                        value.dataValues.status = true;
                    }
                    else if(el.dataValues.date_do <= data1 && el.dataValues.date_time <= data2){
                        value.dataValues.status = false;
                    }
                    else{
                        value.dataValues.status = false;
                    }
                    // console.log("if4", value.dataValues);
                })
           }
           else{
            value.dataValues.status = false;
           }
            
        })
       
            res.send(result);
    }
    create = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.doctor_id !== null){
            query.id = {[Op.eq] : body.doctor_id }  
            queryx.doctor_id = {[Op.eq]: body.doctor_id}
        };
          
        if(body.datetime1 < body.datetime2){
            let result = await register_doctorModel.findAll({
                attributes: [
                     'id', "type", "date_time", "doc_id","comment", "place",
                     [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                    [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'kirim' THEN register_doctor.price ELSE 0 END)"), 'total_kirim'],
                    [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'chiqim' THEN register_doctor.price ELSE 0 END)"), 'total_chiqim'],
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
            let result = await register_doctorModel.findAll({
                attributes: [
                     'id', "type", "date_time", "place",
                     [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                    [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'kirim' THEN register_doctor.price ELSE 0 END)"), 'total_kirim'],
                    [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'chiqim' THEN register_doctor.price ELSE 0 END)"), 'total_chiqim'],
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
    };
     
    TekshiruvSoni = async(req, res, next) => {
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
                { model: RegistrationModel, as: 'registration', attributes: ['patient_id']}
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
   
   DoctorSverka = async (req, res, next) => {
    let query = {}, queryx = {};
    let body = req.body;
    let datetime1 = body.datetime1;
    let datetime2 = body.datetime2;
    if(body.doctor_id !== null){
        query.id = {[Op.eq] : body.doctor_id }
        queryx.doctor_id = {[Op.eq]: body.doctor_id}
    };
    const model = await register_doctorModel.findAll({
        attributes: [ 'doc_type', 'id', 'date_time', "doc_id", "comment","doctor_id", "place",
            [sequelize.literal("SUM(CASE WHEN register_doctor.date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
           [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'kirim' THEN register_doctor.price ELSE 0 END)"), 'kirim'],
           [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'chiqim' THEN register_doctor.price ELSE 0 END)"), 'chiqim'],
       ],  
       where: queryx,
       group: ['id']
    })
    res.send(model)
   }
}


module.exports = new HisobotController;