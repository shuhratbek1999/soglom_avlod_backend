const UserModel = require('../../models/user.model');
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret_jwt} = require('../../startup/config');
const DoctorModel = require('../../models/doctor.model');
const InspectionModel = require('../../models/inspector_category.model');
const { error } = require('winston');
const RoomModel = require('../../models/room.model');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
    userLogin = async (req, res, next) => {
        this.checkValidation(req);
        const {  password, login } = req.body;
        const model = await UserModel.findOne({
            include:[
                {model: DoctorModel, as: 'doctor',
            
            attributes: ['id', 'name']
        },
        {
            model: InspectionModel, as: 'inspecton',
            attributes: ['id', 'name']
        }
            ],
            where:{
                user_name: login
            }
        });
        const isMatch = await bcrypt.compare(password, model.password)
        delete model['password'];
        console.log(isMatch);
        if(!isMatch){
            throw new HttpException(401, "password xato")
        }

        const token = jwt.sign({ user_id: model.id.toString() }, secret_jwt, {
            expiresIn: '24h'
        });
        model.token = token
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Ro\'yhatdan o\'tdingiz',
            data: model
        });
    };
    byName = async (req, res, next) => {
        const model = await UserModel.findAll({
                    attributes: ['id','user_name']
        })
        res.status(200).send({
            error: false,
            error_code: 20,
            message: 'Malumot keldi',
            data: model
        });
    }
    getAll = async (req, res, next) =>{
        const model = await UserModel.scope('withoutPassword').findAll({
            include:[
                {model: DoctorModel, as: 'doctor',
            attributes: ['id', 'name']
        },
        {
            model: InspectionModel, as: 'inspecton',
            attributes: ['id', 'name']
        },
        {
            model: RoomModel, as: 'Room',
            attributes: ['id', 'name']
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
    getOne = async (req, res, next) =>{
        const model = await UserModel.scope('withoutPassword').findOne({
            where:{
                id: req.params.id
            },
            include:[
                {model: DoctorModel, as: 'doctor',
            
            attributes: ['id', 'name']
        },
        {
            model: InspectionModel, as: 'inspecton',
            attributes: ['id', 'name']
        },
        {
            model: RoomModel, as: 'Room',
            attributes: ['id', 'name']
        }
            ],
        })
        if(!model){
            throw new HttpException(404, "bu id da malumot yo\'q")
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot chiqdi',
            data: model
        });
    }
    create = async(req, res, next) => {
        this.checkValidation(req);
        // console.log(req.body);
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
            console.log(req.body.password);
        }
        const modell = await UserModel.create(req.body);
        // delete req.body['password']
        res.status(200).send({
            error: false,  
            error_code: 200,
            message: 'Malumotlar qo\'shildi',
            data: modell
        });
    }
    update = async (req, res, next) =>{
        const salt = await bcrypt.genSalt();
        let data = req.body;
            const pasXash = await bcrypt.hash(data.password.toString(), salt);
            delete data['password'];
            data['password_hash'] = pasXash;
            const model = await UserModel.scope('withoutPassword').findOne({
                where:{
                    id: req.currentUser.id
                }
            })
        model.user_name = req.body.user_name;
        model.room_id = req.body.room_id;
        model.role = req.body.role;
        model.inspection_category_id = req.body.inspection_category_id;
        model.pay_type = req.body.pay_type;
        model.salary = req.body.salary;
        model.save();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }
    delete = async (req, res, next) =>{
        const model = await UserModel.destroy(req.body);
        if(!model){
            throw new HttpException(404, "bunday id yoq")
        }
        else{
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot ochirildi',
            data: model
        });
    }
    }
    checkValidation = (req) => { 
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
    
}

// console.log(VerifyToken);



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController;