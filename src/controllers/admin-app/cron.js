const cron = require("node-cron");
const moment = require('moment-timezone');
const Model = require('../../models/registration.model');
const registrationDocArx = require('../../models/registration_doctor_arxiv.model');
const registrationArxivModel = require('../../models/registration_arxiv.model')
const { Op, QueryTypes } = require("sequelize");
const db = require('../../db/db-sequelize');
moment.tz.setDefault('Asia/Tashkent');
cron.timezone = 'Asia/Tashkent';


// 30 23 * * *
module.exports = async function() {
    cron.schedule('*/20 * * * *', () => {
        // this.setArchive();
    },
    {
        scheduled: true,
        timezone: "Asia/Tashkent"
    }
    )

    // async function moveTableDataToArchive(sourceTable, archiveTable, conditionColumn, conditionValue) {
    //     let existingData = await db.query(`SELECT * FROM ${archiveTable} WHERE ${conditionColumn} = ${conditionValue}`);
    //     if (!existingData.length) {
    //         await db.query(`INSERT INTO ${archiveTable} SELECT * FROM ${sourceTable} WHERE ${conditionColumn} = ${conditionValue}`);
    //     }
    //     await db.query(`DELETE FROM ${sourceTable} WHERE ${conditionColumn} = ${conditionValue}`);
    // }
    setArchive= async (req, res, next) => {
        // console.log('Test')
        // // Get the current date
        // const today = new Date();

        // // Set the time to 00:00:00
        // today.setHours(0, 0, 0, 0);

        // // Get the integer timestamp
        // const startOfDay = Math.floor(today.getTime() / 1000); // Convert milliseconds to seconds

        // var MyDatas  =  await Model.findAll({
        //     where:{
        //         type_service: 'Ambulator',
        //         backlog: 0,
        //         created_at: {[Op.lt]: startOfDay}
        //     }
        // });

        // console.log(MyDatas);
        // console.log('Cron is running every minut')
        // try{
        //     if(MyDatas.length > 0){
        //         MyDatas.forEach(async item => {
        //             if(item.created_at < startOfDay){
        //                 // Check if data already exists in the archive tables
        //                 let doctorArxiv = await registrationDocArx.findAll({
        //                     where: {
        //                         registration_id: item.dataValues.id
        //                     }
        //                 });
                    
        //                 let reg_id = await registrationArxivModel.findOne({
        //                     where: {
        //                         id: item.dataValues.id
        //                     }
        //                 });
                    
        //                 // Move data to archive only if it doesn't already exist
        //                 if (!doctorArxiv.length) {
        //                     await db.query(`INSERT INTO registration_doctor_arxiv SELECT * FROM registration_doctor WHERE registration_id = ${item.dataValues.id}`);
        //                 }
                    
        //                 if (!reg_id) {
        //                     await db.query(`INSERT INTO registration_arxiv SELECT * FROM registration WHERE id = ${item.dataValues.id}`);
        //                 }
                    
        //                 // Move data for other tables to archive
        //                 await moveTableDataToArchive('registration_inspection_child', 'registration_inspection_child_arxiv', 'registration_id', item.dataValues.id);
        //                 await moveTableDataToArchive('registration_inspection', 'registration_inspection_arxiv', 'registration_id', item.dataValues.id);
        //                 await moveTableDataToArchive('registration_files', 'registration_files_arxiv', 'registration_id', item.dataValues.id);
        //                 await moveTableDataToArchive('registration_recipe', 'registration_recipe_arxiv', 'registration_id', item.dataValues.id);
        //                 await moveTableDataToArchive('registration_pay', 'registration_pay_arxiv', 'registration_id', item.dataValues.id);
        //                 await moveTableDataToArchive('registration_palata', 'registration_palata_arxiv', 'registration_id', item.dataValues.id);
                    
        //                 // Finally, delete from the original tables
        //                 await db.query(`DELETE FROM registration_doctor WHERE registration_id = ${item.dataValues.id}`);
        //                 await db.query(`DELETE FROM registration WHERE id = ${item.dataValues.id}`);
                       
        //                 // await db.query(`INSERT INTO registration_inspection_child_arxiv SELECT * FROM registration_inspection_child where registration_id = ${item.dataValues.id}`);
        //                 // await db.query(`DELETE from registration_inspection_child where registration_id = ${item.dataValues.id}`);
    
        //                 // await db.query(`INSERT INTO registration_inspection_arxiv SELECT * FROM registration_inspection where registration_id = ${item.dataValues.id}`);
        //                 // await db.query(`DELETE from registration_inspection where registration_id = ${item.dataValues.id}`);
    
        //                 // await db.query(`INSERT INTO registration_files_arxiv SELECT * FROM registration_files where registration_id = ${item.dataValues.id}`);
        //                 // await db.query(`DELETE from registration_files where registration_id = ${item.dataValues.id}`);
    
        //                 // await db.query(`INSERT INTO registration_recipe_arxiv SELECT * FROM registration_recipe where registration_id = ${item.dataValues.id}`);
        //                 // await db.query(`DELETE from registration_recipe where registration_id = ${item.dataValues.id}`);
                        
        //                 // let doctorArxiv = await registrationDocArx.findAll({
        //                 //     where: {
        //                 //         registration_id: item.dataValues.id
        //                 //     }
        //                 // })
        //                 // // console.log(doctorArxiv)
        //                 // if(!doctorArxiv){
        //                 //     await db.query(`INSERT INTO registration_doctor_arxiv SELECT * FROM registration_doctor where registration_id = ${item.dataValues.id}`);
        //                 // }
        //                 // await db.query(`DELETE FROM registration_doctor WHERE registration_id = ${item.dataValues.id}`);
                        
        //                 // let reg_id = await registrationArxivModel.findOne({
        //                 //     where:{
        //                 //         id:item.dataValues.id
        //                 //     }
        //                 // })
        //                 // if(!reg_id){
        //                 //     await db.query(`INSERT INTO registration_arxiv SELECT * FROM registration where id = ${item.dataValues.id}`);
        //                 // }
        //                 // await db.query(`DELETE from registration where id = ${item.dataValues.id}`);

        //                 // await db.query(`INSERT INTO registration_pay_arxiv SELECT * FROM registration_pay where registration_id = ${item.dataValues.id}`);
        //                 // await db.query(`DELETE from registration_pay where registration_id = ${item.dataValues.id}`);
    
        //                 // await db.query(`INSERT INTO registration_palata_arxiv SELECT * FROM registration_palata where registration_id = ${item.dataValues.id}`);
        //                 // await db.query(`DELETE from registration_palata where registration_id = ${item.dataValues.id}`);
        //                 // get all records from original table
        //                 // await db.query(`TRUNCATE TABLE queue`);
        //             }
        //             else{
        //                 console.log("salmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        //             }
        //         })
        //     }
        //     else{
        //         console.log("bemor mavjud emas kechagiiiiiii");
        //     }
        // }
        // catch(err){
        //     console.log("ddddddddddddddddddddddddddddddd")
        //     throw new Error(err)
        // }
    
        // res.send({
        //     message: "Malumot arxivga olindi",
        // });
       };


    // cron.schedule("30 23 * * *", async () => {
    //    try {
    //     const tz = 'Asia/Tashkent';
    //     const unixtime = moment.tz(tz).unix();

    //     let Ambulator = await Model.findAll({
    //         where:{
    //             type_service: 'Ambulator',
    //             created_at: {[Op.lt]: unixtime}
    //         }
    //     });

    //     if(Ambulator.length > 0){
    //         Ambulator.forEach(async item => {
    //             if(item.created_at < unixtime){
    //                 await db.query(`INSERT INTO registration_inspection_child_arxiv SELECT * FROM registration_inspection_child where registration_id = ${item.dataValues.id}`);
    //                 await db.query(`DELETE from registration_inspection_child where registration_id = ${item.dataValues.id}`);

    //                 await db.query(`INSERT INTO registration_inspection_arxiv SELECT * FROM registration_inspection where registration_id = ${item.dataValues.id}`);
    //                 await db.query(`DELETE from registration_inspection where registration_id = ${item.dataValues.id}`);

    //                 await db.query(`INSERT INTO registration_files_arxiv SELECT * FROM registration_files where registration_id = ${item.dataValues.id}`);
    //                 await db.query(`DELETE from registration_files where registration_id = ${item.dataValues.id}`);

    //                 await db.query(`INSERT INTO registration_recipe_arxiv SELECT * FROM registration_recipe where registration_id = ${item.dataValues.id}`);
    //                 await db.query(`DELETE from registration_recipe where registration_id = ${item.dataValues.id}`);

    //                 await db.query(`INSERT INTO registration_doctor_arxiv SELECT * FROM registration_doctor where registration_id = ${item.dataValues.id}`);
    //                 await db.query(`DELETE from registration_doctor where registration_id = ${item.dataValues.id}`);

    //                 await db.query(`INSERT INTO registration_arxiv SELECT * FROM registration where id = ${item.dataValues.id}`);
    //                 await db.query(`DELETE from registration where id = ${item.dataValues.id}`);

    //                 await db.query(`INSERT INTO registration_pay_arxiv SELECT * FROM registration_pay where registration_id = ${item.dataValues.id}`);
    //                 await db.query(`DELETE from registration_pay where registration_id = ${item.dataValues.id}`);

    //                 await db.query(`INSERT INTO registration_palata_arxiv SELECT * FROM registration_palata where registration_id = ${item.dataValues.id}`);
    //                 await db.query(`DELETE from registration_palata where registration_id = ${item.dataValues.id}`);
    //                 // get all records from original table
    //                 await db.query(`TRUNCATE TABLE queue`);
    //             }
    //             else{
    //                 console.log("oldin kelgan bemorlar mavjud emas");
    //             }
    //         })
    //     }


    //     const sql = `
    //             SELECT 
    //                 s.*,
    //                 rp.*
    //             FROM 
    //                 registration s
    //             LEFT JOIN 
    //                 register_palata rp ON s.id = rp.registration_id  
    //             WHERE 
    //                 s.type_service = 'Statsionar' AND
    //                 s.backlog <= 0
    //             `;

    //         const Statsionar = await db.query(sql, {
    //             type: QueryTypes.SELECT
    //         });

        
    //     let thisDay = Math.floor(new Date().getTime() / 1000)

    //     if(Statsionar.length > 0) {
    //         Statsionar.forEach(async item => {

    //             if(item.backlog <= 0 && item.date_do >= thisDay){
    //                 await db.query(`INSERT INTO registration_inspection_child_arxiv SELECT * FROM registration_inspection_child where registration_id = ${item.id}`);
    //                 await db.query(`DELETE from registration_inspection_child where registration_id = ${item.id}`);

    //                 await db.query(`INSERT INTO registration_inspection_arxiv SELECT * FROM registration_inspection where registration_id = ${item.id}`);
    //                 await db.query(`DELETE from registration_inspection where registration_id = ${item.id}`);

    //                 await db.query(`INSERT INTO registration_files_arxiv SELECT * FROM registration_files where registration_id = ${item.id}`);
    //                 await db.query(`DELETE from registration_files where registration_id = ${item.id}`);

    //                 await db.query(`INSERT INTO registration_recipe_arxiv SELECT * FROM registration_recipe where registration_id = ${item.id}`);
    //                 await db.query(`DELETE from registration_recipe where registration_id = ${item.id}`);

    //                 await db.query(`INSERT INTO registration_doctor_arxiv SELECT * FROM registration_doctor where registration_id = ${item.id}`);
    //                 await db.query(`DELETE from registration_doctor where registration_id = ${item.id}`);

    //                 await db.query(`INSERT INTO registration_arxiv SELECT * FROM registration where id = ${item.id}`);
    //                 await db.query(`DELETE from registration where id = ${item.id}`);

    //                 await db.query(`INSERT INTO registration_pay_arxiv SELECT * FROM registration_pay where registration_id = ${item.id}`);
    //                 await db.query(`DELETE from registration_pay where registration_id = ${item.id}`);

    //                 await db.query(`INSERT INTO registration_palata_arxiv SELECT * FROM registration_palata where registration_id = ${item.id}`);
    //                 await db.query(`DELETE from registration_palata where registration_id = ${item.id}`);

    //                 await db.query(`INSERT INTO register_palata_arxiv SELECT * FROM register_palata where registration_id = ${item.id}`);
    //                 await db.query(`DELETE from register_palata_arxiv where registration_id = ${item.id}`);

    //                 await db.query(`TRUNCATE TABLE queue`);
    //             }
    //             else{
    //                 console.log("oldin kelgan bemorlar mavjud emas");
    //             }
    //         })
    //     }
    //    } catch (error) {
    //     console.log(error)
    //    }
    // });
}