const DoctorModel = require("../../models/doctor.model");
const palataModel = require("../../models/palata.model");
const pastavchikModel = require("../../models/pastavchik.model");
const reagentModel = require("../../models/reagent.model");
const reagentDepartmentModel = require("../../models/reagent_department.model");
const register_directModel = require("../../models/register_direct.model");
const register_doctorModel = require("../../models/register_doctor.model");
const Register_inspectionModel = require("../../models/register_inspection.model");
const Register_kassaModel = require("../../models/register_kassa.model");
const register_med_directModel = require("../../models/register_med_direct.model");
const register_reagentModel = require("../../models/register_reagent.model");
const register_supplierModel = require("../../models/register_supplier.model");
const registration_palataModel = require("../../models/registration_palata.model");
const doctorCategory = require("../../models/doctor_category.model");
const inspectionCategory = require("../../models/inspector_category.model");
const {Op} = require("sequelize");
const sequelize = require("sequelize");
const RegistrationModel = require("../../models/registration.model");
const PatientModel = require("../../models/patient.model");
const register_kirish = require("../../models/register_kirish.model");


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
                model.push(val)
            }
        })
       res.send(model)
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
        let model = await register_med_directModel.findAll({
            attributes: [
                'id', "type", "date_time", "direct_id", "doc_id","comment", "place", "doc_type",
               [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time >= " + datetime1 + " and register_med_direct.date_time <= " + datetime2 + " AND register_med_direct.doc_type = 'kirim' THEN register_med_direct.price ELSE 0 END)"), 'total_kirim'],
               [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time >= " + datetime1 + " and register_med_direct.date_time <= " + datetime2 + " AND register_med_direct.doc_type = 'chiqim' THEN register_med_direct.price ELSE 0 END)"), 'total_chiqim'],
               [sequelize.literal("COUNT(Case WHEN register_med_direct.date_time >=" + datetime1 + " and register_med_direct.date_time <= " + datetime2 + ` and register_med_direct.direct_id != null then register_med_direct.direct_id else 0 end)`), 'count']
           ],
           where: queryx,
           group: ['direct_id']
        })
        res.send(model)
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
          
        let model = await register_med_directModel.findAll({
            attributes: [
                'id', "type", "date_time", "direct_id", "doc_id","comment", "place", "doc_type",
               [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time >= " + datetime1 + " and register_med_direct.date_time <= " + datetime2 + " AND register_med_direct.doc_type = 'kirim' THEN register_med_direct.price ELSE 0 END)"), 'total_kirim'],
               [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time >= " + datetime1 + " and register_med_direct.date_time <= " + datetime2 + " AND register_med_direct.doc_type = 'chiqim' THEN register_med_direct.price ELSE 0 END)"), 'total_chiqim'],
               [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
           ], 
           where: queryx,
           group: ['id']
           
        })
        res.send(model)
    };
    directHisobot = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        queryx.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
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
           where: queryx,
           group: ['direct_id']
        })
        model.forEach(val=> {
            if(val.dataValues.id == null){
                model = [];
                model.push(val)
            }
        })
        res.send(model)
    };
    inspection = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        query.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        if(body.inspection_category !== null){
            queryx.id = {[Op.eq] : body.inspection_category }  
            query.inspection_category = {[Op.eq]: body.inspection_category}
            
        };
          
        let result = await Register_inspectionModel.findAll({
            attributes: [
                 'id', "type", "date_time", "inspection_category", "doc_id","comment",
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'kirim' THEN register_inspection.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'chiqim' THEN register_inspection.price ELSE 0 END)"), 'total_chiqim'],
                [sequelize.literal("COUNT(Case WHEN register_inspection.date_time >=" + datetime1 + " and register_inspection.date_time <= " + datetime2 + " and register_inspection.inspection_id = inspection.id then register_inspection.inspection_id else 0 end)"), 'count']
            ],
            include: [
                { model: inspectionCategory, as: 'inspection', attributes: ['name', 'id'], where: queryx},
            ],
            where: query,
            raw: true,
            group: ['inspection_category'],
            order: [
                ['id', 'ASC']
            ],
        })
        res.send(result);
    };
    InspectionSverka = async (req, res, next) => {
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
           where: queryx,
           group: ['id']
        })
        res.send(model)
       }
       kassaSverka = async (req, res, next) => {
        let result, results;
        let body = req.body; 
        let query = {}, query_begin = {}, query_end = {}, queryx = {};
        query_begin.date_time =  {
            [Op.lt]: body.datetime1,
        };
        query_end.date_time =  {
            [Op.lte]: body.datetime2,
        };
        let datetime1 = body.datetime1,
        datetime2 = body.datetime2
        result = await Register_kassaModel.findAll({
            attributes: [ 'doc_type','pay_type', 'id', 'date_time', "doctor_id","place", `price`,
                [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` < " + datetime1 + " THEN `register_kassa`.`price` * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` >= " + datetime1 + " and `register_kassa`.`date_time` <= " + datetime2 + " AND `register_kassa`.`doc_type` = 'Kirim' and `register_kassa`.`pay_type` = 'Naqt' THEN `register_kassa`.`price` ELSE 0 END)"), 'kirim_naqt'],
                [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` >= " + datetime1 + " and `register_kassa`.`date_time` <= " + datetime2 + " AND `register_kassa`.`doc_type` = 'Kirim' and `register_kassa`.`pay_type` = 'Plastik' THEN `register_kassa`.`price` ELSE 0 END)"), 'kirim_plastik'],
                [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` >= " + datetime1 + " and `register_kassa`.`date_time` <= " + datetime2 + " AND `register_kassa`.`doc_type` = 'Chiqim' and `register_kassa`.`pay_type` = 'Plastik' THEN `register_kassa`.`price` ELSE 0 END)"), 'chiqim_plastik'],
                [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` >= " + datetime1 + " and `register_kassa`.`date_time` <= " + datetime2 + " AND `register_kassa`.`doc_type` = 'Chiqim' and `register_kassa`.`pay_type` = 'Naqt' THEN `register_kassa`.`price` ELSE 0 END)"), 'chiqim_naqt'],
                [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` <= " + datetime2 + " THEN `price` * power(-1, 'type') ELSE 0 END)"), 'end_total'],
            ],
            include:[
              {model: RegistrationModel, as: 'registration', attributes: ['id'],
              include:[
                {model: PatientModel, as: 'patient', attributes: ['fullname']}
              ]
          }
          ],
          group: ['id']
      })
      res.send(result);
        // if(req.body.datetime1 < req.body.datetime2){
        //     result = await Register_kassaModel.findAll({
        //           include:[
        //             {model: RegistrationModel, as: 'registration', attributes: ['id'],
        //         include:[
        //             {model: Registration_doctorModel, as: 'registration_doctor', attributes: ['doctor_id'],
        //         include: [
        //             {model: DoctorModel, as: 'doctor', attributes: ['name']}
        //         ]
        //         }
        //         ]
        //         }
        //         ],
        //         group: ['id']
        //     })
        //     result.forEach(val => {
        //         if(val.dataValues.pay_type == 'Plastik' || val.dataValues.pay_type == 'plastik'){
        //             if(val.dataValues.doc_type == 'Kirim'){
        //                 val.dataValues.Plaskirim = val.dataValues.price
        //             }
        //             else{
        //             val.dataValues.PlasChiqim = val.dataValues.price
        //             }
        //         }
        //         else{
        //             if(val.dataValues.doc_type != 'chiqim'){
        //                 val.dataValues.Nahdkirim = val.dataValues.price
        //             }
        //             else{
        //             val.dataValues.NahdChiqim = val.dataValues.price
        //             }
        //         }
        //     })
        // res.send(result);
        // }
        // else{
        //     result = await Register_kassaModel.findAll({
        //         where: {
        //             date_time: {[Op.lt]: body.datetime1},
        //           },
        //           include:[
        //             {model: RegistrationModel, as: 'registration', attributes: [],
        //         include:[
        //             {model: Registration_doctorModel, as: 'registration_doctor', attributes: [],
        //         include: [
        //             {model: DoctorModel, as: 'doctor', attributes: ['name']}
        //         ]
        //         }
        //         ]
        //         }
        //         ],
        //         group: ['id']
        //     })
        //     result.forEach(val => {
        //         if(val.dataValues.pay_type == 'Plastik' || val.dataValues.pay_type == 'plastik'){
        //             if(val.dataValues.doc_type == 'Kirim'){
        //                 val.dataValues.Plaskirim = val.dataValues.price
        //             }
        //             else{
        //             val.dataValues.PlasChiqim = val.dataValues.price
        //             }
        //         }
        //         else{
        //             if(val.dataValues.doc_type != 'chiqim'){
        //                 val.dataValues.Nahdkirim = val.dataValues.price
        //             }
        //             else{
        //             val.dataValues.NahdChiqim = val.dataValues.price
        //             }
        //         }
        //     })
        // res.send(result);
        // }
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
    doctorHisobot = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.doctor_id !== null){
            queryx.id = {[Op.eq] : body.doctor_id }  
            query.doctor_id = {[Op.eq]: body.doctor_id}
        };
        let result = await register_doctorModel.findAll({
            attributes: [
                 'id', "type", "date_time", "doc_id","comment", "place",
                 [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'kirim' THEN register_doctor.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'chiqim' THEN register_doctor.price ELSE 0 END)"), 'total_chiqim'],
                [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
            ],
            include: [
                { model: DoctorModel, as: 'doctor', attributes: ['name', 'id'], where: queryx},
            ],
            where: query,
            raw: true,
            group: ['doctor_id'],
            order: [
                ['id', 'ASC']
            ],
        })
        res.send(result);
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
        queryx.id = {[Op.eq] : body.doctor_id }  
        query.doctor_id = {[Op.eq]: body.doctor_id}
    };
    const model = await register_doctorModel.findAll({
        attributes: [ 'doc_type', 'id', 'date_time', "doc_id", "comment","doctor_id", "place",
            [sequelize.literal("SUM(CASE WHEN register_doctor.date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
           [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'kirim' THEN register_doctor.price ELSE 0 END)"), 'kirim'],
           [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'chiqim' THEN register_doctor.price ELSE 0 END)"), 'chiqim'],
           [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
       ],  
       where: query,
       group: ['id']
    })
    res.send(model)
   }
   pastavchikSverka = async(req, res, next) => {
    let body = req.body; 
    let query = {}, queryx = {};
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.pastavchik_id !== null){
            query.id = {[Op.eq] : body.pastavchik_id }  
            queryx.pastavchik_id = {[Op.eq]: body.pastavchik_id}
            
        };
    let model = await register_supplierModel.findAll({
        attributes : [ 
            'id', 'pastavchik_id', "type", "date_time", "doc_type", "summa", "doc_id", "place",
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time < " + datetime1 + " THEN register_supplier.summa * power(-1, 'type') ELSE 0 END)"), 'total'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time >= " + datetime1 + " and register_supplier.date_time <= " + datetime2 + " AND register_supplier.doc_type = 'kirim' THEN register_supplier.summa ELSE 0 END)"), 'total_kirim'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time >= " + datetime1 + " and register_supplier.date_time <= " + datetime2 + " AND register_supplier.doc_type = 'chiqim' THEN register_supplier.summa ELSE 0 END)"), 'total_chiqim'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time < " + datetime2 + " THEN register_supplier.summa * power(-1, 'type') ELSE 0 END)"), 'end_total'],
        ],
        where: queryx,
        group: ['id']
    })
    res.send(model)
 } 
 pastavchikHisobot = async(req, res, next) => {
    let body = req.body; 
    let query = {}, queryx = {};
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.pastavchik_id !== null){
            query.id = {[Op.eq] : body.pastavchik_id }  
            queryx.pastavchik_id = {[Op.eq]: body.pastavchik_id}
            
        };
    let model = await register_supplierModel.findAll({
        attributes : [ 
            'id', 'doc_id', "type", "date_time", "doc_type", "summa", "pastavchik_id", "place",
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time < " + datetime1 + " THEN register_supplier.summa * power(-1, 'type') ELSE 0 END)"), 'total'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time >= " + datetime1 + " and register_supplier.date_time <= " + datetime2 + " AND register_supplier.doc_type = 'kirim' THEN register_supplier.summa ELSE 0 END)"), 'total_kirim'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time >= " + datetime1 + " and register_supplier.date_time <= " + datetime2 + " AND register_supplier.doc_type = 'chiqim' THEN register_supplier.summa ELSE 0 END)"), 'total_chiqim'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time < " + datetime2 + " THEN register_supplier.summa * power(-1, 'type') ELSE 0 END)"), 'end_total'],
        ],
        include:[
            {model: pastavchikModel, as: 'pastavchik'}
        ],
        where: queryx,
        group: ['pastavchik_id']
    })
    res.send(model)
 } 
 Hisobot = async(req, res, next) => {
    let query = {}, queryx = {};
    let body = req.body;
    let datetime1 = body.datetime1;
    let datetime2 = body.datetime2;
    if(body.reagent_id !== null){
        query.id = {[Op.eq] : body.reagent_id }  
        queryx.reagent_id = {[Op.eq]: body.reagent_id}
    };
    let model  = await register_reagentModel.findAll({
        attributes: [
            'id', "price", "date_time", "doc_id","count", "summa", "reagent_id", "doc_type",
            [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " THEN summa * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
           [sequelize.literal("SUM(CASE WHEN register_reagent.date_time >= " + datetime1 + " and register_reagent.date_time <= " + datetime2 + ` AND register_reagent.doc_type = 'kirim' THEN register_reagent.summa ELSE 0 END)`), 'total_kirim'],
           [sequelize.literal("SUM(CASE WHEN register_reagent.date_time >= " + datetime1 + " and register_reagent.date_time <= " + datetime2 + ` AND register_reagent.doc_type = 'chiqim' THEN register_reagent.summa ELSE 0 END)`), 'total_chiqim'],
           [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN summa * power(-1, 'type') ELSE 0 END)"), 'end_total']
       ],
        include:[
            {model: reagentDepartmentModel, as: 'reagent_department',
        include:[
            {model: reagentModel, as: 'reagent'},
            // {model: departmentModel, as:'department'}
        ]
        },
        {model: reagentModel, as: 'reagent'}
         ],
       where: queryx,
       group: ['reagent_id']
    })
    res.send(model)
}
Sverka = async(req, res, next) => {
    let query = {}, queryx = {};
    let body = req.body;
    let datetime1 = body.datetime1;
    let datetime2 = body.datetime2;
    if(body.reagent_id !== null){
        query.id = {[Op.eq] : body.reagent_id }  
        queryx.reagent_id = {[Op.eq]: body.reagent_id}
    };
    let model  = await register_reagentModel.findAll({
        attributes: [
            'id', "price", "date_time", "doc_id","count", "summa", "reagent_id", "doc_type",
            [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " THEN summa * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
           [sequelize.literal("SUM(CASE WHEN register_reagent.date_time >= " + datetime1 + " and register_reagent.date_time <= " + datetime2 + ` AND register_reagent.doc_type = 'kirim' THEN register_reagent.summa ELSE 0 END)`), 'total_kirim'],
           [sequelize.literal("SUM(CASE WHEN register_reagent.date_time >= " + datetime1 + " and register_reagent.date_time <= " + datetime2 + ` AND register_reagent.doc_type = 'chiqim' THEN register_reagent.summa ELSE 0 END)`), 'total_chiqim'],
           [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN summa * power(-1, 'type') ELSE 0 END)"), 'end_total']
       ],
       include:[
        {model: reagentDepartmentModel, as: 'reagent_department',
    include:[
        {model: reagentModel, as: 'reagent'},
        {model: doctorCategory, as:'department'}
    ]
    },
    {model: reagentModel, as: 'reagent'}
     ],
       where: queryx,
       group: ['id']
    })
    res.send(model)
}
    kirishHisobot = async(req, res, next) => {
        let query = {}, queryx = {};
    let body = req.body;
    let datetime1 = body.datetime1;
    let datetime2 = body.datetime2;
    query.date_time = {
        [Op.gte]: datetime1,
        [Op.lte]: datetime2
    }
    // if(body.reagent_id !== null){
    //     query.id = {[Op.eq] : body.reagent_id }  
    //     queryx.reagent_id = {[Op.eq]: body.reagent_id}
    // };
        let model = await register_kirish.findAll({
            attributes:[
                'id', "date_time","mashina_soni","odam_soni","doc_type",
                [sequelize.literal("SUM(CASE WHEN register_kirish.date_time < " + datetime1 + " THEN register_kirish.price * power(-1, '0') + register_kirish.mashina_price * power(-1, '0') ELSE 0 END)"), 'begin_odam_price'],
                [sequelize.literal("SUM(CASE WHEN register_kirish.date_time >= " + datetime1 + " and register_kirish.date_time <= " + datetime2 + ` AND register_kirish.doc_type = 'Kirim' and type = 'Naqt' THEN register_kirish.price ELSE 0 END)`), 'odam_price'],
                [sequelize.literal("SUM(CASE WHEN register_kirish.date_time >= " + datetime1 + " and register_kirish.date_time <= " + datetime2 + ` AND register_kirish.doc_type = 'Kirim' and type = 'Naqt' THEN register_kirish.mashina_price ELSE 0 END)`), 'mashina_price'],
                [sequelize.literal("SUM(CASE WHEN register_kirish.date_time <= " + datetime2 + " THEN register_kirish.price * power(-1, '0') + register_kirish.mashina_price * power(-1, '0') ELSE 0 END)"), 'end_summa']
            ],
            where: query,
            group: ['id']
        })
        res.send(model)
    }

    kirish = async(req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        query.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        let model = await register_kirish.findAll({
            attributes:[
                'id', "date_time","mashina_soni","odam_soni","doc_type",
                [sequelize.literal("SUM(CASE WHEN register_kirish.date_time < " + datetime1 + " THEN register_kirish.price * power(-1, '0') + register_kirish.mashina_price * power(-1, '0') ELSE 0 END)"), 'begin_odam_price'],
                [sequelize.literal("SUM(CASE WHEN register_kirish.date_time >= " + datetime1 + " and register_kirish.date_time <= " + datetime2 + ` AND register_kirish.doc_type = 'Kirim' and type = 'Naqt' THEN register_kirish.price + register_kirish.mashina_price ELSE 0 END)`), 'umumiy_summa'],
                [sequelize.literal("SUM(CASE WHEN register_kirish.date_time <= " + datetime2 + " THEN register_kirish.price * power(-1, '0') + register_kirish.mashina_price * power(-1, '0') ELSE 0 END)"), 'end_summa']
            ],
            group: ['id']
        })
        res.send(model)
    }
}


module.exports = new HisobotController;