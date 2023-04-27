const cron = require("node-cron");
const ModelModel = require("../../models/registration.model");
const db = require('../../db/db-sequelize');
module.exports = function(){
    cron.schedule('*/2 * * * *', () => {
        this.setArchive();
    })
    setArchive=async (req, res, next) => {
        var MyDatas  =  await ModelModel.findAll({
            where:{
                type_service: 'Ambulator',
                backlog: 0
            }
        });
        if(MyDatas.length > 0){
            MyDatas.forEach(async item => {
                await db.query(`INSERT INTO registration_inspection_child_arxiv SELECT * FROM registration_inspection_child where registration_id = ${item.dataValues.id}`);
                await db.query(`DELETE from registration_inspection_child where registration_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO registration_inspection_arxiv SELECT * FROM registration_inspection where registration_id = ${item.dataValues.id}`);        
                await db.query(`DELETE from registration_inspection where registration_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO registration_files_arxiv SELECT * FROM registration_files where registration_id = ${item.dataValues.id}`);
                await db.query(`DELETE from registration_files where registration_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO registration_recipe_arxiv SELECT * FROM registration_recipe where registration_id = ${item.dataValues.id}`);
                await db.query(`DELETE from registration_recipe where registration_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO registration_doctor_arxiv SELECT * FROM registration_doctor where registration_id = ${item.dataValues.id}`);
                await db.query(`DELETE from registration_doctor where registration_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO registration_arxiv SELECT * FROM registration where id = ${item.dataValues.id}`);
                await db.query(`DELETE from registration where id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO registration_pay_arxiv SELECT * FROM registration_pay where registration_id = ${item.dataValues.id}`);
                await db.query(`DELETE from registration_pay where registration_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO registration_palata_arxiv SELECT * FROM registration_palata where registration_id = ${item.dataValues.id}`);
                await db.query(`DELETE from registration_palata where registration_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO register_direct_arxiv SELECT * FROM register_direct where doc_id = ${item.dataValues.id}`);
                await db.query(`DELETE from register_direct where doc_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO register_med_direct_arxiv SELECT * FROM register_med_direct where doc_id = ${item.dataValues.id}`);
                await db.query(`DELETE from register_med_direct where doc_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO register_kassa_arxiv SELECT * FROM register_kassa where doctor_id = ${item.dataValues.id}`);
                await db.query(`DELETE from register_kassa where doctor_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO register_inspection_arxiv SELECT * FROM register_inspection where doc_id = ${item.dataValues.id}`);
                await db.query(`DELETE from register_inspection where doc_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO register_doctor_arxiv SELECT * FROM register_doctor where doc_id = ${item.dataValues.id}`);
                await db.query(`DELETE from register_doctor where doc_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO register_mkb_arxiv SELECT * FROM register_mkb where registration_id = ${item.dataValues.id}`);
                await db.query(`DELETE from register_mkb where registration_id = ${item.dataValues.id}`);
    
                await db.query(`INSERT INTO register_palata_arxiv SELECT * FROM register_palata where registration_id = ${item.dataValues.id}`);
                await db.query(`DELETE from register_palata where registration_id = ${item.dataValues.id}`);
                
                await db.query(`DELETE from queue where patient_id = ${item.dataValues.patient}`);
            })
        }
    
        // res.send({
        //     message: "Malumot arxivga olindi",
        // });
       };
}

